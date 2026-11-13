/* HUYEN DIEU · kết nối máy chủ (Google Apps Script) hoặc chế độ thử trong trình duyệt. */
(function () {
  "use strict";
  var URLX = (window.HD_API && window.HD_API.url) || "", demo = !URLX;

  function remote(action, payload) {
    var ctl = new AbortController(), t = setTimeout(function () { ctl.abort(); }, 25000);
    var body = {}; for (var k in (payload || {})) body[k] = payload[k]; body.action = action;
    return fetch(URLX, { method: "POST", body: JSON.stringify(body), signal: ctl.signal, redirect: "follow" })
      .then(function (r) { return r.json(); })
      .catch(function () { return { ok: false, error: "network" }; })
      .then(function (x) { clearTimeout(t); return x; });
  }

  /* ---------- chế độ thử ---------- */
  var DBK = "hd-demo-db-v1", mem = null, DAY = 86400000;
  function norm(c) { return String(c || "").trim().toUpperCase(); }
  function rng(s) { return function () { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; }
  function seed() {
    var R = rng(20261113), L = window.HD_LESSONS, G = window.HD_GAMES || [];
    var names = [["Học sinh mẫu 1", "Lớp A", .93], ["Học sinh mẫu 2", "Lớp A", .78], ["Học sinh mẫu 3", "Lớp A", .55], ["Học sinh mẫu 4", "Lớp B", .86], ["Học sinh mẫu 5", "Lớp B", .66], ["Học sinh mẫu 6", "Lớp B", .72]];
    var D = { teacherCode: "GV-DEMO", students: [], results: [], assignments: [], classes: [{ name: "Lớp A", note: "Ví dụ", url: "" }, { name: "Lớp B", note: "Ví dụ", url: "" }], seq: 0 };
    names.forEach(function (n, i) {
      var code = "HS-000" + (i + 1); D.students.push({ code: code, name: n[0], cls: n[1], active: true, created: new Date(Date.now() - 25 * DAY).toISOString() });
      var count = i === 2 ? 5 : 8 + Math.floor(R() * 8);
      for (var k = 0; k < count; k++) {
        var lessonObj = L.filter(function (l) { return l.words.length; }), lp = lessonObj[Math.floor(R() * lessonObj.length)], lid = R() < .15 ? "all" : String(lp.id);
        var pool = lid === "all" ? [].concat.apply([], lessonObj.map(function (l) { return l.words; })) : lp.words, g = G[Math.floor(R() * G.length)] || { id: "listen-hanzi", name: "Nghe → chọn chữ Hán" };
        var total = g.id === "match" ? Math.min(6, pool.length) : Math.min(10, pool.length), score = Math.max(0, Math.min(total, Math.round(total * (n[2] + (R() - .5) * .3))));
        var words = pool.slice().sort(function () { return R() - .5; }).slice(0, total).map(function (w) { return w[0]; });
        var wrong = words.slice().sort(function (a, b) { return (pool.map(function (w) { return w[0]; }).indexOf(a) < 3 ? -1 : 0) + (R() - .5); }).slice(0, total - score);
        D.results.push({ t: new Date(Date.now() - Math.floor(R() * (i === 2 ? 14 : 20)) * DAY - Math.floor(R() * 36000000)).toISOString(), code: code, name: n[0], cls: n[1], lesson: lid, game: g.id, gameName: g.name, score: score, total: total, pct: Math.round(score / total * 100), secs: 40 + Math.floor(R() * 120), words: words, wrong: wrong, assignmentId: "" });
      }
    });
    D.assignments.push({ id: "A-demo1", title: "Ôn nghe Bài 1", lesson: "1", game: "listen-hanzi", due: new Date(Date.now() + 3 * DAY).toISOString().slice(0, 10), cls: "all", note: "Làm ít nhất 1 lượt, cố gắng đạt trên 80%.", created: new Date().toISOString() });
    return D;
  }
  function db() {
    if (mem) return mem;
    try { var d = JSON.parse(localStorage.getItem(DBK)); if (d && d.students) { mem = d; return d; } } catch (e) { /* bỏ qua */ }
    mem = seed(); persist(); return mem;
  }
  function persist() { try { localStorage.setItem(DBK, JSON.stringify(mem)); } catch (e) { /* bỏ qua */ } }
  function who(D, code) {
    code = norm(code);
    if (code && code === norm(D.teacherCode)) return { role: "teacher", name: "Giáo viên", cls: "", code: code };
    var s = D.students.filter(function (x) { return norm(x.code) === code && x.active !== false; })[0];
    return s ? { role: "student", name: s.name, cls: s.cls, code: s.code } : null;
  }
  function genCode(D) {
    var A = "23456789ABCDEFGHJKMNPQRSTUVWXYZ", c;
    do { c = "HD-"; for (var i = 0; i < 4; i++) c += A.charAt(Math.floor(Math.random() * A.length)); } while (D.students.some(function (s) { return s.code === c; }));
    return c;
  }
  function local(action, req) {
    var D = db(), u = who(D, req.code);
    if (action === "login") return u ? { ok: true, role: u.role, name: u.name, cls: u.cls, code: u.code } : { ok: false, error: "auth" };
    if (!u) return { ok: false, error: "auth" };
    if (action === "submit") {
      if (u.role !== "student") return { ok: false, error: "role" };
      var r = req.rec; D.results.push({ t: new Date().toISOString(), code: u.code, name: u.name, cls: u.cls, lesson: String(r.lesson), game: r.game, gameName: r.gameName, score: r.score, total: r.total, pct: r.pct, secs: r.secs, words: r.words || [], wrong: r.wrong || [], assignmentId: r.assignmentId || "" });
      persist(); return { ok: true };
    }
    if (action === "me") {
      return { ok: true, results: D.results.filter(function (x) { return x.code === u.code; }), assignments: D.assignments.filter(function (a) { return !a.cls || a.cls === "all" || a.cls === u.cls; }) };
    }
    if (u.role !== "teacher") return { ok: false, error: "role" };
    if (action === "admin") return { ok: true, students: D.students, results: D.results, assignments: D.assignments, classes: D.classes || [] };
    if (action === "addClass") {
      var nm = String(req.name || "").trim().slice(0, 40); if (!nm) return { ok: false, error: "name" };
      D.classes = D.classes || []; if (D.classes.some(function (c) { return c.name.toLowerCase() === nm.toLowerCase(); })) return { ok: false, error: "exists" };
      D.classes.push({ name: nm, note: String(req.note || "").slice(0, 80), url: "" }); persist(); return { ok: true };
    }
    if (action === "deleteClass") {
      if (D.students.some(function (s) { return s.cls === req.name; })) return { ok: false, error: "notEmpty" };
      D.classes = (D.classes || []).filter(function (c) { return c.name !== req.name; }); persist(); return { ok: true };
    }
    if (action === "moveStudent") { D.students.forEach(function (s) { if (s.code === req.studentCode) s.cls = String(req.cls || ""); }); persist(); return { ok: true }; }
    if (action === "exportClass") return { ok: true, url: "", demo: true };
    if (action === "addStudents") {
      var made = (req.list || []).map(function (x) { var s = { code: genCode(D), name: String(x.name).slice(0, 60), cls: String(x.cls || "").slice(0, 30), active: true, created: new Date().toISOString() }; D.students.push(s); return s; });
      persist(); return { ok: true, created: made };
    }
    if (action === "setActive") { D.students.forEach(function (s) { if (s.code === req.studentCode) s.active = !!req.active; }); persist(); return { ok: true }; }
    if (action === "saveAssignment") { var a = req.a; a.id = "A" + Date.now().toString(36); a.created = new Date().toISOString(); D.assignments.push(a); persist(); return { ok: true, id: a.id }; }
    if (action === "deleteAssignment") { D.assignments = D.assignments.filter(function (x) { return x.id !== req.id; }); persist(); return { ok: true }; }
    if (action === "resetDemo") { mem = seed(); persist(); return { ok: true }; }
    return { ok: false, error: "unknown" };
  }
  function call(action, payload) {
    if (!demo) return remote(action, payload);
    return new Promise(function (res) { setTimeout(function () { var out; try { out = JSON.parse(JSON.stringify(local(action, payload || {}))); } catch (e) { out = { ok: false, error: String(e) }; } res(out); }, 120); });
  }
  window.HD_API_CLIENT = { call: call, demo: demo };
})();
