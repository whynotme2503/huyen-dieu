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
  LOP: { name: "Lop", head: ["Tên lớp", "Ghi chú", "Ngày tạo", "File quản lý", "Trình độ"] },
  CD: { name: "CaiDat", head: [] }
};

function setup() {
  sheet_("HS"); sheet_("KQ"); sheet_("BT"); sheet_("LOP");
  var lop = sheet_("LOP"); if (!lop.getRange("E1").getValue()) lop.getRange("E1").setValue("Trình độ");
  syncClasses_();
  var cd = sheet_("CD");
  if (!cd.getRange("B1").getValue()) {
    cd.getRange("A1").setValue("Mã giáo viên");
    cd.getRange("B1").setValue("GV-" + randomCode_(8));
    cd.getRange("A3").setValue("Hãy đổi mã giáo viên ở ô B1 nếu muốn. Giữ bí mật mã này.");
  }
  var th = ss_().getSheetByName("TongHop") || ss_().insertSheet("TongHop");
  th.getRange("A1").setFormula('=IFERROR(QUERY(KetQua!A2:N,"select C, D, E, count(B), avg(I) where B is not null group by C, D, E order by C, E label C \'Học sinh\', D \'Lớp\', E \'Bài\', count(B) \'Số lượt\', avg(I) \'Điểm TB (%)\'",0),"Chưa có dữ liệu")');
  setupBackup();
  setupRefresh();
  try { refreshAllClasses(); } catch (e) { Logger.log("Chưa tạo được file lớp: " + e); }
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
  if (req.action === "login") return { ok: true, role: u.role, name: u.name, cls: u.cls, code: u.code, level: classLevels_()[u.cls] || 1 };
  var lock = LockService.getScriptLock();
  switch (req.action) {
    case "submit":
      if (u.role !== "student") return { ok: false, error: "role" };
      lock.waitLock(20000);
      try {
        var r = req.rec || {};
        var row = [new Date(), u.code, u.name, u.cls, String(r.lesson), r.gameName || r.game, num_(r.score), num_(r.total), num_(r.pct), num_(r.secs), (r.words || []).join("|"), (r.wrong || []).join("|"), r.assignmentId || "", r.game || ""];
        sheet_("KQ").appendRow(row);
      } finally { lock.releaseLock(); }
      return { ok: true };
    case "board":
      return { ok: true, level: boardLevel_(u, req), board: boardView_(boardFull_(), u.role === "student" ? u : null, boardLevel_(u, req)) };
    case "me":
      return { ok: true, level: classLevels_()[u.cls] || 1, results: results_(u.code, 180), assignments: assignments_().filter(function (a) { return !a.cls || a.cls === "all" || a.cls === u.cls; }) };
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
        sheet_("LOP").appendRow([nm, String(req.note || "").slice(0, 80), new Date(), "", lvl_(req.level)]);
        return { ok: true };
      } finally { lock.releaseLock(); }
    case "setClassLevel":
      lock.waitLock(20000);
      try {
        var lp2 = sheet_("LOP"), lv2 = lp2.getDataRange().getValues(), done2 = false;
        for (var k2 = 1; k2 < lv2.length; k2++) if (String(lv2[k2][0]) === String(req.name)) { lp2.getRange(k2 + 1, 5).setValue(lvl_(req.level)); done2 = true; }
        CacheService.getScriptCache().remove("board2");
        return done2 ? { ok: true, classes: classes_() } : { ok: false, error: "name" };
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
      var xc = ctx_(), xu = exportClass_(String(req.name || ""), xc);
      writeIndex_(ctx_());
      return { ok: true, url: xu };
    case "refreshAll":
      refreshAllClasses();
      return { ok: true, classes: classes_() };
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
/** Trình độ của lớp: 1, 2 hoặc 3 (HSK 1/2/3). Ô trống hoặc sai thì coi là HSK 1. */
function lvl_(x) { x = Math.round(+x); return x >= 1 && x <= 3 ? x : 1; }
function classLevels_() { var m = {}; classes_().forEach(function (c) { m[c.name] = c.level; }); return m; }
function classes_() {
  var v = sheet_("LOP").getDataRange().getValues(), out = [];
  for (var i = 1; i < v.length; i++) if (v[i][0]) out.push({ name: String(v[i][0]), note: String(v[i][1] || ""), url: String(v[i][3] || ""), level: lvl_(v[i][4]) });
  return out;
}
function syncClasses_() {
  var have = {}; classes_().forEach(function (c) { have[c.name] = 1; });
  students_().forEach(function (s) { if (s.cls && !have[s.cls]) { have[s.cls] = 1; sheet_("LOP").appendRow([s.cls, "", new Date(), "", 1]); } });
}

  /* ---------- bảng xếp hạng thi đua (tuần / tháng) ----------
     Điểm mỗi lượt = pct / 10 làm tròn (tối đa 10), tính tối đa 12 lượt mỗi ngày, lượt phải có từ 5 câu trở lên.
     Nộp bài tập được giao đúng hạn: +20 điểm cho mỗi bài tập. */
  var BOARD_DAILY_CAP = 12, BOARD_ASSIGN_BONUS = 20, BOARD_MIN_TOTAL = 5;
  function shortName_(n) { var p = String(n || "").trim().split(/\s+/); return p.length < 2 ? p[0] || "" : p[p.length - 1] + " " + p[0].charAt(0).toUpperCase() + "."; }
  function boardCalc_(students, results, assignments, dayOf, starts, lvOf) {
    lvOf = lvOf || {};
    var act = {}, byClass = {}, out = {};
    students.forEach(function (s) { if (s.active !== false) { act[s.code] = s; if (s.cls) byClass[s.cls] = (byClass[s.cls] || 0) + 1; } });
    var asg = {}; assignments.forEach(function (a) { asg[a.id] = a; });
    var rs = results.map(function (r) { return { r: r, ms: new Date(r.t).getTime() }; }).sort(function (a, b) { return a.ms - b.ms; });
    Object.keys(starts).forEach(function (per) {
      var st = starts[per], P = {}, dayCnt = {}, seenAsg = {};
      rs.forEach(function (x) {
        var r = x.r; if (x.ms < st || !act[r.code]) return;
        var p = P[r.code] || (P[r.code] = { code: r.code, p: 0, k: 0 });
        var day = dayOf(x.ms), key = r.code + "|" + day;
        if ((+r.total || 0) >= BOARD_MIN_TOTAL && (dayCnt[key] = (dayCnt[key] || 0) + 1) <= BOARD_DAILY_CAP) { p.p += Math.min(10, Math.round((+r.pct || 0) / 10)); p.k++; }
        var a = r.assignmentId ? asg[r.assignmentId] : null, ak = r.code + "|" + r.assignmentId;
        if (a && !seenAsg[ak]) { seenAsg[ak] = 1; if (!a.due || day <= a.due) p.p += BOARD_ASSIGN_BONUS; }
      });
      var list = Object.keys(P).map(function (c) { var s = act[c]; return { code: c, n: shortName_(s.name), c: s.cls || "", lv: lvOf[s.cls] || 1, p: P[c].p, k: P[c].k }; })
        .filter(function (x) { return x.p > 0; })
        .sort(function (a, b) { return b.p - a.p || b.k - a.k || (a.n < b.n ? -1 : 1); });
      var cls = {};
      list.forEach(function (x) { if (x.c) { var o = cls[x.c] || (cls[x.c] = { c: x.c, tot: 0, act: 0 }); o.tot += x.p; o.act++; } });
      var cl = Object.keys(byClass).map(function (c) { var o = cls[c] || { tot: 0, act: 0 }; return { c: c, lv: lvOf[c] || 1, n: byClass[c], act: o.act, tot: o.tot, avg: Math.round(o.tot / byClass[c] * 10) / 10 }; })
        .sort(function (a, b) { return b.avg - a.avg || b.tot - a.tot || (a.c < b.c ? -1 : 1); });
      out[per] = { students: list, classes: cl };
    });
    return out;
  }
  /* rút gọn cho từng người xem: top 10 + thứ hạng của chính mình, không lộ mã học sinh */
  function boardView_(full, me, level) {
    var out = {};
    Object.keys(full).forEach(function (per) {
      var f = { students: full[per].students.filter(function (x) { return x.lv === level; }), classes: full[per].classes.filter(function (x) { return x.lv === level; }) }, idx = -1;
      f.students.forEach(function (x, i) { if (me && x.code === me.code) idx = i; });
      out[per] = { students: f.students.slice(0, 10).map(function (x, i) { return { r: i + 1, n: x.n, c: x.c, p: x.p, me: !!(me && x.code === me.code) }; }), classes: f.classes, total: f.students.length, me: idx >= 0 ? { r: idx + 1, p: f.students[idx].p } : null };
    });
    return out;
  }

/** Học sinh xem bảng của trình độ lớp mình; giáo viên chọn trình độ (mặc định HSK 1). */
function boardLevel_(u, req) { return u.role === "student" ? (classLevels_()[u.cls] || 1) : lvl_(req.level); }
function boardFull_() {
  var cache = CacheService.getScriptCache(), hit = cache.get("board2");
  if (hit) { try { return JSON.parse(hit); } catch (e) { /* tính lại */ } }
  var tz = Session.getScriptTimeZone(), now = new Date();
  var dow = +Utilities.formatDate(now, tz, "u"), ms = now.getTime();
  var weekStart = Utilities.parseDate(Utilities.formatDate(new Date(ms - (dow - 1) * 86400000), tz, "yyyy-MM-dd"), tz, "yyyy-MM-dd").getTime();
  var monthStart = Utilities.parseDate(Utilities.formatDate(now, tz, "yyyy-MM") + "-01", tz, "yyyy-MM-dd").getTime();
  var full = boardCalc_(students_(), results_(null, 33), assignments_(), function (t) { return Utilities.formatDate(new Date(t), tz, "yyyy-MM-dd"); }, { week: weekStart, month: monthStart }, classLevels_());
  try { cache.put("board2", JSON.stringify(full), 300); } catch (e2) { /* quá lớn thì bỏ qua cache */ }
  return full;
}

/* ---------- file riêng cho từng lớp ----------
   Google Sheet gốc có tab "Các lớp" liệt kê mọi lớp, mỗi lớp có link mở file riêng gồm:
   Tổng quan, Bài tập, từng "Bài N" (điểm từng game), "CT ..." (từng câu của bài tập soạn sẵn),
   "Xem từng bạn" (chọn tên để xem lịch sử) và "Kết quả" (nhật ký đầy đủ). */
var CLASS_FOLDER = "Huyen Dieu - Các lớp";
var TAB_HEAD_BG = "#e5eee8";

function setupRefresh() {
  ScriptApp.getProjectTriggers().forEach(function (t) { if (t.getHandlerFunction() === "refreshAllClasses") ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger("refreshAllClasses").timeBased().everyDays(1).atHour(23).create();
}
function ctx_() { return { st: students_(), rs: results_(null, 0), as: assignments_(), cl: classes_() }; }
/** Cập nhật file của mọi lớp và tab "Các lớp". Chạy tự động mỗi ngày 23 giờ, hoặc bấm nút trên web. */
function refreshAllClasses() {
  var c = ctx_(), names = {}, list = [];
  c.cl.forEach(function (x) { if (!names[x.name]) { names[x.name] = 1; list.push(x.name); } });
  c.st.forEach(function (s) { if (s.cls && !names[s.cls]) { names[s.cls] = 1; list.push(s.cls); } });
  list.forEach(function (n) { try { exportClass_(n, c); } catch (e) { Logger.log("Lỗi lớp " + n + ": " + e); } });
  writeIndex_(ctx_());
}
function classFolder_() {
  var it = DriveApp.getFoldersByName(CLASS_FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(CLASS_FOLDER);
}
function tabName_(s) { return String(s).replace(/[\[\]\*\?\:\/\\]/g, "-").slice(0, 90); }
function fmtT_(iso) { return iso ? Utilities.formatDate(new Date(iso), Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm") : ""; }
function lessonLabel_(l) { return l === "all" ? "Tổng hợp" : "Bài " + l; }

/** Ghi một bảng vào tab (tạo nếu chưa có). Hàng đầu là tiêu đề, cố định hàng 1 và cột 1. */
function put_(file, title, rows) {
  title = tabName_(title);
  var t = file.getSheetByName(title) || file.insertSheet(title);
  t.clear(); t.setConditionalFormatRules([]);
  if (!rows.length) return t;
  var w = Math.max.apply(null, rows.map(function (r) { return r.length; }));
  rows = rows.map(function (r) { r = r.slice(); while (r.length < w) r.push(""); return r; });
  t.getRange(1, 1, rows.length, w).setValues(rows);
  t.getRange(1, 1, 1, w).setFontWeight("bold").setBackground(TAB_HEAD_BG);
  t.setFrozenRows(1); t.setFrozenColumns(1);
  t.setColumnWidth(1, 190); if (w > 1) t.setColumnWidths(2, w - 1, 120);
  return t;
}
function colorText_(t, rangeA1, startsWith, bg) {
  var rules = t.getConditionalFormatRules();
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextStartsWith(startsWith).setBackground(bg).setRanges([t.getRange(rangeA1)]).build());
  t.setConditionalFormatRules(rules);
}
function order_(file, names) {
  var pos = 1;
  names.forEach(function (n) { var s = file.getSheetByName(tabName_(n)); if (s) { file.setActiveSheet(s); file.moveActiveSheet(pos++); } });
}
function bestPct_(arr) { return arr.length ? Math.max.apply(null, arr.map(function (r) { return r.pct; })) : ""; }
function avgPct_(arr) { return arr.length ? Math.round(arr.reduce(function (a, r) { return a + r.pct; }, 0) / arr.length) : ""; }
function lastOf_(arr) { var m = ""; arr.forEach(function (r) { if (r.t > m) m = r.t; }); return m; }

/** Tạo (hoặc cập nhật) file Google Sheet riêng cho một lớp. */
function exportClass_(cls, c) {
  if (!cls) throw "Thiếu tên lớp";
  c = c || ctx_();
  var info = c.cl.filter(function (x) { return x.name === cls; })[0], file = null;
  if (info && info.url) { try { file = SpreadsheetApp.openByUrl(info.url); } catch (e) { file = null; } }
  if (!file) {
    file = SpreadsheetApp.create("Huyen Dieu - " + cls);
    try { DriveApp.getFileById(file.getId()).moveTo(classFolder_()); } catch (e2) { Logger.log("Chưa chuyển được file vào thư mục: " + e2); }
  }
  var st = c.st.filter(function (s) { return s.cls === cls; }), codes = {};
  st.forEach(function (s) { codes[s.code] = 1; });
  var rs = c.rs.filter(function (r) { return codes[r.code]; });
  var as = c.as.filter(function (a) { return a.cls === "all" || a.cls === cls; });
  var asTitle = {}; c.as.forEach(function (a) { asTitle[a.id] = a.title; });
  var byCode = {}; st.forEach(function (s) { byCode[s.code] = rs.filter(function (r) { return r.code === s.code; }); });
  var names = [];

  /* 1. Tổng quan */
  var sum = [["Học sinh", "Mã", "Trạng thái", "Số lượt", "Điểm TB (%)", "Điểm cao nhất (%)", "Lần cuối", "Bài tập đã nộp"]];
  st.forEach(function (s) {
    var mine = byCode[s.code], done = as.filter(function (a) { return mine.some(function (r) { return r.assignmentId === a.id; }); }).length;
    sum.push([s.name, s.code, s.active ? "Hoạt động" : "Khóa", mine.length, avgPct_(mine), bestPct_(mine), fmtT_(lastOf_(mine)), done + "/" + as.length]);
  });
  sum.push(["Cả lớp", "", "", rs.length, avgPct_(rs), "", fmtT_(lastOf_(rs)), ""]);
  put_(file, "Tổng quan", sum).getRange(sum.length, 1, 1, 8).setFontWeight("bold"); names.push("Tổng quan");

  /* 2. Bài tập: học sinh x bài tập được giao */
  var head = ["Học sinh"]; as.forEach(function (a) { head.push(a.title + " (hạn " + a.due + ")"); });
  var mat = [head];
  st.forEach(function (s) {
    var row = [s.name];
    as.forEach(function (a) { var m = byCode[s.code].filter(function (r) { return r.assignmentId === a.id; }); row.push(m.length ? bestPct_(m) + "%" : "chưa nộp"); });
    mat.push(row);
  });
  var tb = put_(file, "Bài tập", mat); names.push("Bài tập");
  if (as.length && st.length) colorText_(tb, "B2:" + colLetter_(as.length + 1) + (st.length + 1), "chưa nộp", "#f6d9d5");

  /* 3. Từng bài học: học sinh x game (điểm cao nhất) */
  var lessons = {}; rs.forEach(function (r) { lessons[r.lesson] = 1; });
  Object.keys(lessons).sort(function (a, b) { return a === "all" ? 1 : b === "all" ? -1 : a - b; }).forEach(function (L) {
    var inL = rs.filter(function (r) { return r.lesson === L; }), games = [];
    inL.forEach(function (r) { if (games.indexOf(r.gameName) < 0) games.push(r.gameName); });
    var rows = [["Học sinh"].concat(games, ["Số lượt", "Điểm TB (%)", "Lần cuối"])];
    st.forEach(function (s) {
      var mine = byCode[s.code].filter(function (r) { return r.lesson === L; }), row = [s.name];
      games.forEach(function (g) { var m = mine.filter(function (r) { return r.gameName === g; }); row.push(m.length ? bestPct_(m) : ""); });
      row.push(mine.length, avgPct_(mine), fmtT_(lastOf_(mine))); rows.push(row);
    });
    var avgRow = ["Trung bình lớp"];
    games.forEach(function (g) { var v = []; st.forEach(function (s) { var m = byCode[s.code].filter(function (r) { return r.lesson === L && r.gameName === g; }); if (m.length) v.push(bestPct_(m)); }); avgRow.push(v.length ? Math.round(v.reduce(function (a, b) { return a + b; }, 0) / v.length) : ""); });
    avgRow.push(inL.length, avgPct_(inL), "");
    rows.push(avgRow);
    var nm = lessonLabel_(L); put_(file, nm, rows).getRange(rows.length, 1, 1, rows[0].length).setFontWeight("bold"); names.push(nm);
  });

  /* 4. Chi tiết từng câu của bài tập soạn sẵn (game có mã bắt đầu bằng sheet-) */
  var sheets = {}; rs.forEach(function (r) { if (r.game && r.game.indexOf("sheet-") === 0) sheets[r.game] = r.gameName; });
  Object.keys(sheets).sort().forEach(function (gid) {
    var all = rs.filter(function (r) { return r.game === gid; }), N = 0;
    all.forEach(function (r) { if (r.total > N) N = r.total; });
    var h = ["Học sinh", "Số lượt", "Đúng", "Tổng", "Điểm (%)", "Thời gian nộp"]; for (var q = 1; q <= N; q++) h.push("Câu " + q);
    var rows = [h], wrongCount = [];
    for (var z = 0; z < N; z++) wrongCount.push(0);
    st.forEach(function (s) {
      var m = byCode[s.code].filter(function (r) { return r.game === gid; });
      if (!m.length) { rows.push([s.name, 0, "", "", "", "chưa làm"]); return; }
      var r = m[m.length - 1], row = [s.name, m.length, r.score, r.total, r.pct, fmtT_(r.t)], wrong = {};
      r.wrong.forEach(function (w) { var mm = /^Câu (\d+): ([\s\S]*)$/.exec(w); if (mm) wrong[+mm[1]] = mm[2]; });
      var noDetail = !r.wrong.length && r.score < r.total;
      for (var k = 1; k <= N; k++) {
        if (wrong[k] !== undefined) { row.push("✗ " + wrong[k]); wrongCount[k - 1]++; }
        else row.push(noDetail ? "?" : "✓");
      }
      rows.push(row);
    });
    var foot = ["Số bạn sai", "", "", "", "", ""]; wrongCount.forEach(function (n) { foot.push(n); });
    rows.push(foot);
    var nm = "CT " + sheets[gid], t = put_(file, nm, rows); names.push(nm);
    t.getRange(rows.length, 1, 1, h.length).setFontWeight("bold");
    if (N > 0 && st.length) colorText_(t, "G2:" + colLetter_(6 + N) + (st.length + 1), "✗", "#f6d9d5");
    t.setColumnWidths(7, Math.max(N, 1), 90);
  });

  /* 5. Kết quả: nhật ký đầy đủ, mới nhất ở trên */
  var res = [["Thời gian", "Học sinh", "Bài", "Game", "Đúng", "Tổng", "Điểm (%)", "Giây", "Từ/câu sai", "Bài tập"]];
  rs.slice().reverse().forEach(function (r) { res.push([new Date(r.t), r.name, lessonLabel_(r.lesson), r.gameName, r.score, r.total, r.pct, r.secs, r.wrong.join(" · "), asTitle[r.assignmentId] || ""]); });
  var tr = put_(file, "Kết quả", res);
  if (res.length > 1) tr.getRange(2, 1, res.length - 1, 1).setNumberFormat("dd/MM/yyyy HH:mm");
  tr.setColumnWidth(1, 140);

  /* 6. Xem từng bạn: chọn tên ở ô B1 để xem lịch sử */
  var pv = file.getSheetByName("Xem từng bạn"), nameList = st.map(function (s) { return s.name; });
  if (!pv) {
    pv = file.insertSheet("Xem từng bạn");
    pv.getRange("A1").setValue("Chọn học sinh:").setFontWeight("bold");
    pv.getRange("A2").setValue("Số lượt").setFontWeight("bold"); pv.getRange("C2").setValue("Điểm TB (%)").setFontWeight("bold");
    pv.getRange("B2").setFormula("=IF(B1=\"\",\"\",COUNTIF('Kết quả'!B:B,B1))");
    pv.getRange("D2").setFormula("=IF(B1=\"\",\"\",IFERROR(ROUND(AVERAGEIF('Kết quả'!B:B,B1,'Kết quả'!G:G),0),\"\"))");
    pv.getRange("A4").setFormula("=IF(B1=\"\",\"Chọn tên học sinh ở ô B1 để xem lịch sử làm bài.\",IFERROR(QUERY('Kết quả'!A:J,\"select A,C,D,E,F,G,I,J where B = '\"&B1&\"' order by A desc label A 'Thời gian', C 'Bài', D 'Game', E 'Đúng', F 'Tổng', G 'Điểm (%)', I 'Từ/câu sai', J 'Bài tập'\",1),\"Chưa có kết quả\"))");
    pv.getRange("A:A").setNumberFormat("dd/MM/yyyy HH:mm"); pv.setColumnWidth(1, 190);
    pv.getRange("B1").setBackground("#fff8e1");
  }
  if (nameList.length) pv.getRange("B1").setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(nameList, true).setAllowInvalid(false).build());
  names.push("Xem từng bạn", "Kết quả");

  order_(file, names);
  var dflt = file.getSheetByName("Sheet1") || file.getSheetByName("Trang tính1");
  if (dflt && file.getSheets().length > 1) { try { file.deleteSheet(dflt); } catch (e3) { /* bỏ qua */ } }
  var url = file.getUrl(), lp = sheet_("LOP"), v = lp.getDataRange().getValues(), found = false;
  for (var i = 1; i < v.length; i++) if (String(v[i][0]) === cls) { lp.getRange(i + 1, 4).setValue(url); found = true; }
  if (!found) lp.appendRow([cls, "", new Date(), url]);
  return url;
}
function colLetter_(n) { var s = ""; while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); } return s; }

/** Tab "Các lớp" ở Google Sheet gốc: mỗi lớp một dòng, bấm "Mở" để vào file riêng của lớp. */
function writeIndex_(c) {
  var names = [], seen = {};
  c.cl.forEach(function (x) { if (!seen[x.name]) { seen[x.name] = 1; names.push(x); } });
  c.st.forEach(function (s) { if (s.cls && !seen[s.cls]) { seen[s.cls] = 1; names.push({ name: s.cls, url: "" }); } });
  var cut = Date.now() - 30 * 86400000, td = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  var rows = [["Lớp", "Học sinh", "Lượt làm (30 ngày)", "Điểm TB 30 ngày (%)", "Bài tập đang mở", "Hoạt động gần nhất", "File riêng của lớp"]];
  names.sort(function (a, b) { return a.name < b.name ? -1 : 1; }).forEach(function (x) {
    var st = c.st.filter(function (s) { return s.cls === x.name && s.active; }), codes = {};
    st.forEach(function (s) { codes[s.code] = 1; });
    var mine = c.rs.filter(function (r) { return codes[r.code]; }), recent = mine.filter(function (r) { return new Date(r.t).getTime() >= cut; });
    var open = c.as.filter(function (a) { return a.cls === x.name && (!a.due || a.due >= td); }).length;
    var url = x.url || (c.cl.filter(function (y) { return y.name === x.name; })[0] || {}).url || "";
    rows.push([x.name, st.length, recent.length, avgPct_(recent), open, fmtT_(lastOf_(mine)), url ? '=HYPERLINK("' + url + '","Mở file lớp ▶")' : "(chưa có)"]);
  });
  var ss = ss_(), t = ss.getSheetByName("Các lớp") || ss.insertSheet("Các lớp");
  t.clear();
  t.getRange(1, 1, rows.length, rows[0].length).setValues(rows.map(function (r, i) { return i === 0 ? r : r.slice(0, 6).concat([r[6]]); }));
  for (var i = 1; i < rows.length; i++) if (String(rows[i][6]).charAt(0) === "=") t.getRange(i + 1, 7).setFormula(rows[i][6]);
  t.getRange(1, 1, 1, rows[0].length).setFontWeight("bold").setBackground(TAB_HEAD_BG);
  t.setFrozenRows(1); t.setColumnWidth(1, 220); t.setColumnWidths(2, 6, 150);
  t.getRange("A:A").setFontWeight("bold"); t.getRange(1, 1).setFontWeight("bold");
  ss.setActiveSheet(t); ss.moveActiveSheet(1);
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
