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

  /* ---------- bảng xếp hạng thi đua (tuần / tháng) ----------
     Điểm mỗi lượt = pct / 10 làm tròn (tối đa 10), tính tối đa 12 lượt mỗi ngày, lượt phải có từ 5 câu trở lên.
     Nộp bài tập được giao đúng hạn: +20 điểm cho mỗi bài tập. */
  var BOARD_DAILY_CAP = 12, BOARD_ASSIGN_BONUS = 20, BOARD_MIN_TOTAL = 5;
  function shortName_(n) { var p = String(n || "").trim().split(/\s+/); return p.length < 2 ? p[0] || "" : p[p.length - 1] + " " + p[0].charAt(0).toUpperCase() + "."; }
  function boardCalc_(students, results, assignments, dayOf, starts) {
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
      var list = Object.keys(P).map(function (c) { var s = act[c]; return { code: c, n: shortName_(s.name), c: s.cls || "", p: P[c].p, k: P[c].k }; })
        .filter(function (x) { return x.p > 0; })
        .sort(function (a, b) { return b.p - a.p || b.k - a.k || (a.n < b.n ? -1 : 1); });
      var cls = {};
      list.forEach(function (x) { if (x.c) { var o = cls[x.c] || (cls[x.c] = { c: x.c, tot: 0, act: 0 }); o.tot += x.p; o.act++; } });
      var cl = Object.keys(byClass).map(function (c) { var o = cls[c] || { tot: 0, act: 0 }; return { c: c, n: byClass[c], act: o.act, tot: o.tot, avg: Math.round(o.tot / byClass[c] * 10) / 10 }; })
        .sort(function (a, b) { return b.avg - a.avg || b.tot - a.tot || (a.c < b.c ? -1 : 1); });
      out[per] = { students: list, classes: cl };
    });
    return out;
  }
  /* rút gọn cho từng người xem: top 10 + thứ hạng của chính mình, không lộ mã học sinh */
  function boardView_(full, me) {
    var out = {};
    Object.keys(full).forEach(function (per) {
      var f = full[per], idx = -1;
      f.students.forEach(function (x, i) { if (me && x.code === me.code) idx = i; });
      out[per] = { students: f.students.slice(0, 10).map(function (x, i) { return { r: i + 1, n: x.n, c: x.c, p: x.p, me: !!(me && x.code === me.code) }; }), classes: f.classes, total: f.students.length, me: idx >= 0 ? { r: idx + 1, p: f.students[idx].p } : null };
    });
    return out;
  }

  function localBoard(D, u) {
    var now = new Date(), d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()), dow = (now.getDay() + 6) % 7;
    var week = new Date(d0.getTime() - dow * 86400000).getTime(), month = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
    var two = function (n) { return ("0" + n).slice(-2); };
    var full = boardCalc_(D.students, D.results, D.assignments, function (t) { var d = new Date(t); return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate()); }, { week: week, month: month });
    return boardView_(full, u.role === "student" ? u : null);
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
    if (action === "board") return { ok: true, board: localBoard(D, u) };
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
    if (action === "refreshAll") return { ok: true, demo: true, classes: D.classes || [] };
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
