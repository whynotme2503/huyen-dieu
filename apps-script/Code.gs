/**
 * HUYEN DIEU · Máy chủ Google Apps Script
 * Dán toàn bộ file này vào Apps Script của Google Sheet, chạy hàm setup() một lần,
 * rồi Triển khai (Deploy) → Ứng dụng web (Web app) → Bất kỳ ai có link.
 * Sau khi sửa code: Triển khai → Quản lý bản triển khai → Sửa → Phiên bản mới.
 */
var DEF = {
  HS: { name: "HocSinh", head: ["Mã", "Họ tên", "Lớp", "Trạng thái", "Ngày tạo"] },
  KQ: { name: "KetQua", head: ["Thời gian", "Mã", "Họ tên", "Lớp", "Bài", "Game", "Điểm", "Tổng", "Phần trăm", "Giây", "Từ đã làm", "Từ sai", "Mã bài tập", "Mã game"] },
  BT: { name: "BaiTap", head: ["ID", "Tiêu đề", "Bài", "Game", "Hạn nộp", "Lớp", "Ghi chú", "Ngày giao"] },
  LOP: { name: "Lop", head: ["Tên lớp", "Ghi chú", "Ngày tạo", "File quản lý"] },
  CD: { name: "CaiDat", head: [] }
};

function setup() {
  sheet_("HS"); sheet_("KQ"); sheet_("BT"); sheet_("LOP");
  syncClasses_();
  SpreadsheetApp.create; // cần quyền tạo file riêng cho từng lớp
  var cd = sheet_("CD");
  if (!cd.getRange("B1").getValue()) {
    cd.getRange("A1").setValue("Mã giáo viên");
    cd.getRange("B1").setValue("GV-" + randomCode_(8));
    cd.getRange("A3").setValue("Hãy đổi mã giáo viên ở ô B1 nếu muốn. Giữ bí mật mã này.");
  }
  var th = ss_().getSheetByName("TongHop") || ss_().insertSheet("TongHop");
  th.getRange("A1").setFormula('=IFERROR(QUERY(KetQua!A2:N,"select C, D, E, count(B), avg(I) where B is not null group by C, D, E order by C, E label C \'Học sinh\', D \'Lớp\', E \'Bài\', count(B) \'Số lượt\', avg(I) \'Điểm TB (%)\'",0),"Chưa có dữ liệu")');
  setupBackup();
  Logger.log("Đã bật sao lưu tự động mỗi Chủ nhật. Thư mục sao lưu: Huyen Dieu - Sao lưu (giữ " + BACKUP_KEEP + " bản gần nhất).");
  Logger.log("Xong. Mã giáo viên: " + cd.getRange("B1").getValue());
}

/* ---------- sao lưu tự động hằng tuần ---------- */
var BACKUP_KEEP = 8;
function backupNow() {
  var tz = Session.getScriptTimeZone(), name = "Sao lưu Huyen Dieu - " + Utilities.formatDate(new Date(), tz, "yyyy-MM-dd HH:mm");
  var it = DriveApp.getFoldersByName("Huyen Dieu - Sao lưu"), folder = it.hasNext() ? it.next() : DriveApp.createFolder("Huyen Dieu - Sao lưu");
  DriveApp.getFileById(ss_().getId()).makeCopy(name, folder);
  var files = [], fi = folder.getFiles();
  while (fi.hasNext()) files.push(fi.next());
  files.sort(function (a, b) { return b.getDateCreated() - a.getDateCreated(); });
  files.slice(BACKUP_KEEP).forEach(function (f) { f.setTrashed(true); });
  Logger.log("Đã sao lưu: " + name);
}
function setupBackup() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "backupNow") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("backupNow").timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(2).create();
}

function doGet() { return ContentService.createTextOutput("Huyen Dieu API đang chạy."); }

function doPost(e) {
  var out;
  try { out = handle_(JSON.parse(e.postData.contents)); }
  catch (err) { out = { ok: false, error: String(err) }; }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

var MAX_FAILS = 60;      // số lần nhập sai tối đa trong 10 phút trên toàn hệ thống
var FAIL_WINDOW = 600;   // giây

function handle_(req) {
  var cache = CacheService.getScriptCache();
  if ((+cache.get("fails") || 0) >= MAX_FAILS) return { ok: false, error: "locked" };
  var u = auth_(req.code);
  if (!u) { cache.put("fails", String((+cache.get("fails") || 0) + 1), FAIL_WINDOW); return { ok: false, error: "auth" }; }
  if (req.action === "login") return { ok: true, role: u.role, name: u.name, cls: u.cls, code: u.code };
  var lock = LockService.getScriptLock();
  switch (req.action) {
    case "submit":
      if (u.role !== "student") return { ok: false, error: "role" };
      lock.waitLock(20000);
      try {
        var r = req.rec || {};
        var row = [new Date(), u.code, u.name, u.cls, String(r.lesson), r.gameName || r.game, num_(r.score), num_(r.total), num_(r.pct), num_(r.secs), (r.words || []).join("|"), (r.wrong || []).join("|"), r.assignmentId || "", r.game || ""];
        sheet_("KQ").appendRow(row);
        if (u.cls) classSheet_(u.cls).appendRow(row);
      } finally { lock.releaseLock(); }
      return { ok: true };
    case "me":
      return { ok: true, results: results_(u.code, 180), assignments: assignments_().filter(function (a) { return !a.cls || a.cls === "all" || a.cls === u.cls; }) };
  }
  if (u.role !== "teacher") return { ok: false, error: "role" };
  switch (req.action) {
    case "admin":
      return { ok: true, students: students_(), results: results_(null, +req.days || 0), assignments: assignments_(), classes: classes_(), partial: (+req.days || 0) > 0 };
    case "addClass":
      lock.waitLock(20000);
      try {
        var nm = String(req.name || "").trim().slice(0, 40);
        if (!nm) return { ok: false, error: "name" };
        if (classes_().some(function (c) { return c.name.toLowerCase() === nm.toLowerCase(); })) return { ok: false, error: "exists" };
        sheet_("LOP").appendRow([nm, String(req.note || "").slice(0, 80), new Date(), ""]);
        classSheet_(nm);
        return { ok: true };
      } finally { lock.releaseLock(); }
    case "deleteClass":
      lock.waitLock(20000);
      try {
        if (students_().some(function (s) { return s.cls === req.name; })) return { ok: false, error: "notEmpty" };
        var lp = sheet_("LOP"), lv = lp.getDataRange().getValues();
        for (var k = lv.length - 1; k >= 1; k--) if (String(lv[k][0]) === String(req.name)) lp.deleteRow(k + 1);
        return { ok: true };
      } finally { lock.releaseLock(); }
    case "moveStudent":
      lock.waitLock(20000);
      try {
        var hs2 = sheet_("HS"), v2 = hs2.getDataRange().getValues();
        for (var m = 1; m < v2.length; m++) if (norm_(v2[m][0]) === norm_(req.studentCode)) hs2.getRange(m + 1, 3).setValue(String(req.cls || ""));
        return { ok: true };
      } finally { lock.releaseLock(); }
    case "exportClass":
      return { ok: true, url: exportClass_(String(req.name || "")) };
    case "addStudents":
      lock.waitLock(20000);
      try {
        var sh = sheet_("HS"), existing = {}, made = [];
        students_().forEach(function (s) { existing[s.code] = 1; });
        (req.list || []).forEach(function (x) {
          if (!x.name) return;
          var code; do { code = "HD-" + randomCode_(4); } while (existing[code]);
          existing[code] = 1;
          sh.appendRow([code, String(x.name).slice(0, 60), String(x.cls || "").slice(0, 30), "Hoạt động", new Date()]);
          made.push({ code: code, name: x.name, cls: x.cls || "", active: true });
        });
        syncClasses_();
        return { ok: true, created: made };
      } finally { lock.releaseLock(); }
    case "setActive":
      lock.waitLock(20000);
      try {
        var hs = sheet_("HS"), v = hs.getDataRange().getValues();
        for (var i = 1; i < v.length; i++) if (norm_(v[i][0]) === norm_(req.studentCode)) hs.getRange(i + 1, 4).setValue(req.active ? "Hoạt động" : "Khóa");
      } finally { lock.releaseLock(); }
      return { ok: true };
    case "saveAssignment":
      lock.waitLock(20000);
      try {
        var a = req.a || {}, id = "A" + new Date().getTime().toString(36);
        sheet_("BT").appendRow([id, a.title || "", String(a.lesson), a.game || "", a.due || "", a.cls || "all", a.note || "", new Date()]);
        return { ok: true, id: id };
      } finally { lock.releaseLock(); }
    case "deleteAssignment":
      lock.waitLock(20000);
      try {
        var bt = sheet_("BT"), w = bt.getDataRange().getValues();
        for (var j = w.length - 1; j >= 1; j--) if (String(w[j][0]) === String(req.id)) bt.deleteRow(j + 1);
      } finally { lock.releaseLock(); }
      return { ok: true };
  }
  return { ok: false, error: "unknown" };
}

/* ---------- đọc dữ liệu ---------- */
function auth_(code) {
  code = norm_(code); if (!code) return null;
  var t = sheet_("CD").getRange("B1").getValue();
  if (t && code === norm_(t)) return { role: "teacher", name: "Giáo viên", cls: "", code: code };
  var s = students_().filter(function (x) { return norm_(x.code) === code && x.active; })[0];
  return s ? { role: "student", name: s.name, cls: s.cls, code: s.code } : null;
}
function students_() {
  var v = sheet_("HS").getDataRange().getValues(), out = [];
  for (var i = 1; i < v.length; i++) if (v[i][0]) out.push({ code: String(v[i][0]), name: String(v[i][1]), cls: String(v[i][2] || ""), active: String(v[i][3]) !== "Khóa", created: iso_(v[i][4]) });
  return out;
}
/** Đọc kết quả. sinceDays > 0 chỉ đọc phần dữ liệu từ N ngày gần đây (nhanh hơn khi Sheet lớn). */
function results_(code, sinceDays) {
  var sh = sheet_("KQ"), last = sh.getLastRow(), out = [];
  if (last < 2) return out;
  var start = 2;
  if (sinceDays > 0) {
    var since = Date.now() - sinceDays * 86400000, times = sh.getRange(2, 1, last - 1, 1).getValues(), first = -1;
    for (var t = 0; t < times.length; t++) { var ms = times[t][0] instanceof Date ? times[t][0].getTime() : new Date(times[t][0]).getTime(); if (ms >= since) { first = t; break; } }
    if (first < 0) return out;
    start = 2 + first;
  }
  var v = sh.getRange(start, 1, last - start + 1, 14).getValues();
  v.unshift([]);
  for (var i = 1; i < v.length; i++) {
    var r = v[i]; if (!r[1]) continue;
    if (code && norm_(r[1]) !== norm_(code)) continue;
    out.push({ t: iso_(r[0]), code: String(r[1]), name: String(r[2]), cls: String(r[3] || ""), lesson: String(r[4]), gameName: String(r[5]), score: +r[6], total: +r[7], pct: +r[8], secs: +r[9], words: split_(r[10]), wrong: split_(r[11]), assignmentId: String(r[12] || ""), game: String(r[13] || "") });
  }
  return out;
}
function assignments_() {
  var v = sheet_("BT").getDataRange().getValues(), out = [];
  for (var i = 1; i < v.length; i++) if (v[i][0]) out.push({ id: String(v[i][0]), title: String(v[i][1]), lesson: String(v[i][2]), game: String(v[i][3] || ""), due: dueStr_(v[i][4]), cls: String(v[i][5] || "all"), note: String(v[i][6] || ""), created: iso_(v[i][7]) });
  return out;
}

/* ---------- lớp học ---------- */
function classes_() {
  var v = sheet_("LOP").getDataRange().getValues(), out = [];
  for (var i = 1; i < v.length; i++) if (v[i][0]) out.push({ name: String(v[i][0]), note: String(v[i][1] || ""), url: String(v[i][3] || "") });
  return out;
}
function syncClasses_() {
  var have = {}; classes_().forEach(function (c) { have[c.name] = 1; });
  students_().forEach(function (s) { if (s.cls && !have[s.cls]) { have[s.cls] = 1; sheet_("LOP").appendRow([s.cls, "", new Date(), ""]); } });
}
function classSheet_(cls) {
  var name = ("KQ - " + cls).replace(/[\[\]\*\?\:\/\\]/g, "-").slice(0, 99), s = ss_().getSheetByName(name);
  if (!s) {
    s = ss_().insertSheet(name);
    var h = DEF.KQ.head; s.getRange(1, 1, 1, h.length).setValues([h]).setFontWeight("bold").setBackground("#e5eee8"); s.setFrozenRows(1);
    s.getRange("E:E").setNumberFormat("@"); s.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm:ss");
  }
  return s;
}
function writeTab_(file, title, rows, first) {
  var t = first ? file.getSheets()[0] : (file.getSheetByName(title) || file.insertSheet(title));
  if (first) t.setName(title);
  t.clear();
  if (rows.length) {
    var w = Math.max.apply(null, rows.map(function (r) { return r.length; }));
    rows = rows.map(function (r) { while (r.length < w) r.push(""); return r; });
    t.getRange(1, 1, rows.length, w).setValues(rows);
    t.getRange(1, 1, 1, w).setFontWeight("bold").setBackground("#e5eee8");
    t.setFrozenRows(1);
  }
}
/** Tạo (hoặc cập nhật) một file Google Sheet riêng cho một lớp: Tổng quan, Kết quả, Bài tập. */
function exportClass_(cls) {
  if (!cls) throw "Thiếu tên lớp";
  var info = classes_().filter(function (c) { return c.name === cls; })[0], file = null;
  if (info && info.url) { try { file = SpreadsheetApp.openByUrl(info.url); } catch (e) { file = null; } }
  if (!file) file = SpreadsheetApp.create("Huyen Dieu - " + cls);
  var st = students_().filter(function (s) { return s.cls === cls; }), codes = {};
  st.forEach(function (s) { codes[s.code] = 1; });
  var rs = results_(null, 0).filter(function (r) { return codes[r.code]; }), as = assignments_().filter(function (a) { return a.cls === "all" || a.cls === cls; });
  var tz = Session.getScriptTimeZone(), fmt = function (iso) { return iso ? Utilities.formatDate(new Date(iso), tz, "dd/MM/yyyy HH:mm") : ""; };
  var sum = [["Học sinh", "Mã", "Trạng thái", "Số lượt", "Điểm TB (%)", "Điểm cao nhất (%)", "Lần cuối", "Bài tập đã nộp"]];
  st.forEach(function (s) {
    var mine = rs.filter(function (r) { return r.code === s.code; }), avg = mine.length ? Math.round(mine.reduce(function (a, r) { return a + r.pct; }, 0) / mine.length) : "";
    var best = mine.length ? Math.max.apply(null, mine.map(function (r) { return r.pct; })) : "", last = mine.length ? mine[mine.length - 1].t : "";
    var done = as.filter(function (a) { return mine.some(function (r) { return r.assignmentId === a.id; }); }).length;
    sum.push([s.name, s.code, s.active ? "Hoạt động" : "Khóa", mine.length, avg, best, fmt(last), done + "/" + as.length]);
  });
  writeTab_(file, "Tổng quan", sum, true);
  var res = [["Thời gian", "Học sinh", "Bài", "Game", "Đúng", "Tổng", "Điểm (%)", "Giây", "Từ sai", "Bài tập"]];
  rs.slice().reverse().forEach(function (r) { res.push([fmt(r.t), r.name, r.lesson === "all" ? "Tổng hợp" : "Bài " + r.lesson, r.gameName, r.score, r.total, r.pct, r.secs, r.wrong.join(" "), r.assignmentId]); });
  writeTab_(file, "Kết quả", res, false);
  var head = ["Học sinh"]; as.forEach(function (a) { head.push(a.title + " (hạn " + a.due + ")"); });
  var mat = [head];
  st.forEach(function (s) {
    var row = [s.name];
    as.forEach(function (a) { var m = rs.filter(function (r) { return r.code === s.code && r.assignmentId === a.id; }); row.push(m.length ? Math.max.apply(null, m.map(function (r) { return r.pct; })) + "%" : "chưa nộp"); });
    mat.push(row);
  });
  writeTab_(file, "Bài tập", mat, false);
  var url = file.getUrl(), lp = sheet_("LOP"), v = lp.getDataRange().getValues(), found = false;
  for (var i = 1; i < v.length; i++) if (String(v[i][0]) === cls) { lp.getRange(i + 1, 4).setValue(url); found = true; }
  if (!found) lp.appendRow([cls, "", new Date(), url]);
  return url;
}

/* ---------- tiện ích ---------- */
function ss_() { return SpreadsheetApp.getActive(); }
function sheet_(key) {
  var d = DEF[key], s = ss_().getSheetByName(d.name);
  if (!s) {
    s = ss_().insertSheet(d.name);
    if (d.head.length) { s.getRange(1, 1, 1, d.head.length).setValues([d.head]).setFontWeight("bold").setBackground("#e5eee8"); s.setFrozenRows(1); }
    if (key === "KQ") { s.getRange("E:E").setNumberFormat("@"); s.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm:ss"); }
    if (key === "BT") { s.getRange("A:C").setNumberFormat("@"); s.getRange("E:E").setNumberFormat("@"); }
  }
  return s;
}
function norm_(c) { return String(c || "").trim().toUpperCase(); }
function num_(n) { n = Number(n); return isNaN(n) ? 0 : n; }
function split_(s) { return s ? String(s).split("|").filter(String) : []; }
function iso_(d) { return d instanceof Date ? d.toISOString() : String(d || ""); }
function dueStr_(d) { return d instanceof Date ? Utilities.formatDate(d, Session.getScriptTimeZone(), "yyyy-MM-dd") : String(d || ""); }
function randomCode_(n) {
  var A = "23456789ABCDEFGHJKMNPQRSTUVWXYZ", c = "";
  for (var i = 0; i < n; i++) c += A.charAt(Math.floor(Math.random() * A.length));
  return c;
}
