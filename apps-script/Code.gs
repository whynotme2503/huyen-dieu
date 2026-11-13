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
  CD: { name: "CaiDat", head: [] }
};

function setup() {
  sheet_("HS"); sheet_("KQ"); sheet_("BT");
  var cd = sheet_("CD");
  if (!cd.getRange("B1").getValue()) {
    cd.getRange("A1").setValue("Mã giáo viên");
    cd.getRange("B1").setValue("GV-" + randomCode_(8));
    cd.getRange("A3").setValue("Hãy đổi mã giáo viên ở ô B1 nếu muốn. Giữ bí mật mã này.");
  }
  var th = ss_().getSheetByName("TongHop") || ss_().insertSheet("TongHop");
  th.getRange("A1").setFormula('=IFERROR(QUERY(KetQua!A2:N,"select C, D, E, count(B), avg(I) where B is not null group by C, D, E order by C, E label C \'Học sinh\', D \'Lớp\', E \'Bài\', count(B) \'Số lượt\', avg(I) \'Điểm TB (%)\'",0),"Chưa có dữ liệu")');
  Logger.log("Xong. Mã giáo viên: " + cd.getRange("B1").getValue());
}

function doGet() { return ContentService.createTextOutput("Huyen Dieu API đang chạy."); }

function doPost(e) {
  var out;
  try { out = handle_(JSON.parse(e.postData.contents)); }
  catch (err) { out = { ok: false, error: String(err) }; }
  return ContentService.createTextOutput(JSON.stringify(out)).setMimeType(ContentService.MimeType.JSON);
}

function handle_(req) {
  var u = auth_(req.code);
  if (req.action === "login") return u ? { ok: true, role: u.role, name: u.name, cls: u.cls, code: u.code } : { ok: false, error: "auth" };
  if (!u) return { ok: false, error: "auth" };
  var lock = LockService.getScriptLock();
  switch (req.action) {
    case "submit":
      if (u.role !== "student") return { ok: false, error: "role" };
      lock.waitLock(20000);
      try {
        var r = req.rec || {};
        sheet_("KQ").appendRow([new Date(), u.code, u.name, u.cls, String(r.lesson), r.gameName || r.game, num_(r.score), num_(r.total), num_(r.pct), num_(r.secs), (r.words || []).join("|"), (r.wrong || []).join("|"), r.assignmentId || "", r.game || ""]);
      } finally { lock.releaseLock(); }
      return { ok: true };
    case "me":
      return { ok: true, results: results_(u.code), assignments: assignments_().filter(function (a) { return !a.cls || a.cls === "all" || a.cls === u.cls; }) };
  }
  if (u.role !== "teacher") return { ok: false, error: "role" };
  switch (req.action) {
    case "admin":
      return { ok: true, students: students_(), results: results_(null), assignments: assignments_() };
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
function results_(code) {
  var v = sheet_("KQ").getDataRange().getValues(), out = [];
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
