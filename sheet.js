/* HUYEN DIEU · Bài tập tự soạn (phiếu bài tập nhiều phần).
   Dữ liệu nằm trong HD_SHEETS (data.js). Học sinh làm một lượt, nộp bài, xem ngay câu đúng/sai và đáp án. */
(function () {
  "use strict";
  var H, X = null;

  function esc(s) { return H.esc(s); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* bỏ dấu câu, khoảng trắng, chữ hoa/thường để không chấm gắt */
  function norm(s) { return String(s || "").replace(/[\s　。，、！？；：“”‘’「」（）…·.,!?;:"'()\-]/g, "").toLowerCase(); }
  function hz(s) { return /[㐀-鿿]/.test(s) ? " hz" : ""; }
  function fmt(s) { return ("0" + Math.floor(s / 60)).slice(-2) + ":" + ("0" + (s % 60)).slice(-2); }

  function flatten(sheet) {
    var qs = [], n = 0;
    sheet.parts.forEach(function (p, pi) {
      p.items.forEach(function (it) {
        n++;
        var q = { n: n, part: pi, type: it.opts ? "choice" : it.w ? "order" : "type", q: it.q || "", opts: it.opts || null, a: it.a, fields: it.fields || null, exp: it.exp || "", ph: p.ph || "Gõ chữ Hán tại đây" };
        if (q.type === "order") q.pool = shuffle(it.w.map(function (w, k) { return { w: w, k: k }; }));
        qs.push(q);
      });
    });
    return qs;
  }

  function isDone(q, v) {
    if (q.fields) return !!v && q.fields.every(function (f, i) { return String(v[i] || "").trim() !== ""; });
    return q.type === "order" ? (v && v.length === q.pool.length) : (v !== undefined && v !== null && String(v) !== "");
  }

  function qHTML(q) {
    var v = X.ans[q.n], body = "";
    if (q.type === "choice") {
      body = '<div class="sh-opts">' + q.opts.map(function (o, j) { return '<button class="sh-opt' + (v === j ? " sel" : "") + '" data-sh="pick" data-n="' + q.n + '" data-o="' + j + '"><span class="key">' + "ABCDEF"[j] + '</span><span class="' + hz(o).trim() + '">' + esc(o) + "</span></button>"; }).join("") + "</div>";
    } else if (q.type === "order") {
      v = v || [];
      var used = {}; v.forEach(function (k) { used[k] = 1; });
      body = '<div class="sh-built' + (v.length ? "" : " empty") + '">' + (v.length ? v.map(function (k, idx) { return '<button class="sh-tok on hz" data-sh="untok" data-n="' + q.n + '" data-i="' + idx + '">' + esc(q.pool.filter(function (p) { return p.k === k; })[0].w) + "</button>"; }).join("") : "Bấm các từ bên dưới theo đúng thứ tự") + "</div>" +
        '<div class="sh-pool">' + q.pool.map(function (p) { return '<button class="sh-tok hz" data-sh="tok" data-n="' + q.n + '" data-k="' + p.k + '"' + (used[p.k] ? " disabled" : "") + ">" + esc(p.w) + "</button>"; }).join("") + (v.length ? '<button class="linkb" data-sh="clear" data-n="' + q.n + '">Xóa làm lại</button>' : "") + "</div>";
    } else if (q.fields) {
      v = v || [];
      body = q.fields.map(function (f, i) { return '<label class="sh-fl"><span class="t-sub">' + esc(f.label) + '</span><input class="sh-input hz" data-sh="type" data-n="' + q.n + '" data-f="' + i + '" value="' + esc(v[i] || "") + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh"></label>'; }).join("");
    } else {
      body = '<input class="sh-input hz" data-sh="type" data-n="' + q.n + '" value="' + esc(v || "") + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">';
    }
    return '<div class="sh-q" id="shq-' + q.n + '"><div class="sh-qt"><span class="sh-n">' + q.n + "</span>" + (q.q ? '<span class="sh-qp' + hz(q.q) + '">' + esc(q.q) + "</span>" : '<span class="sh-qp">Sắp xếp thành câu đúng:</span>') + "</div>" + body + "</div>";
  }

  function render() {
    var sh = X.sheet, html = "", cur = -1, left = X.qs.filter(function (q) { return !isDone(q, X.ans[q.n]); }).length;
    X.qs.forEach(function (q) {
      if (q.part !== cur) { cur = q.part; var p = sh.parts[cur]; html += '<div class="sh-part"><h3>' + esc(p.title) + "</h3>" + (p.note ? '<p class="t-sub">' + esc(p.note) + "</p>" : "") + (p.bank ? '<div class="sh-bank">' + p.bank.map(function (b) { return '<span class="hz">' + esc(b) + "</span>"; }).join("") + "</div>" : "") + "</div>"; }
      html += qHTML(q);
    });
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-sh="exit">' + H.ICONS.back + "Bài tập</button></div>" +
      '<section class="card sh-card" style="margin-top:10px"><div class="eyebrow">' + esc(sh.title) + '</div><h1 class="h1" style="margin:4px 0 6px">' + X.qs.length + ' câu</h1><p class="sub" style="margin:0 0 14px">Làm hết các phần rồi bấm “Nộp bài”. Phần gõ chữ Hán không cần chú ý dấu câu.</p>' + html +
      '<div class="afoot"><span class="t-sub" id="sh-left">' + (left ? "Còn " + left + " câu chưa làm" : "Đã làm hết các câu") + '</span><button class="btn" data-sh="submit" style="margin-left:auto" id="sh-submit">Nộp bài</button></div></section>';
  }

  function refreshLeft() {
    var left = X.qs.filter(function (q) { return !isDone(q, X.ans[q.n]); }).length, el = document.getElementById("sh-left");
    if (el) el.textContent = left ? "Còn " + left + " câu chưa làm" : "Đã làm hết các câu";
    X.warned = false; var b = document.getElementById("sh-submit"); if (b) b.textContent = "Nộp bài";
  }
  function rerender(n) { var q = X.qs[n - 1], el = document.getElementById("shq-" + n); if (el) el.outerHTML = qHTML(q); refreshLeft(); }

  function correctText(q) {
    if (q.type === "choice") return "ABCDEF"[q.a] + ". " + q.opts[q.a];
    if (q.type === "order") return q.a;
    if (q.fields) return q.fields.map(function (f) { return f.a[0]; }).join("  →  ");
    return Array.isArray(q.a) ? q.a[0] : q.a;
  }
  function userText(q, v) {
    if (!isDone(q, v)) return "(chưa trả lời)";
    if (q.type === "choice") return "ABCDEF"[v] + ". " + q.opts[v];
    if (q.type === "order") return v.map(function (k) { return q.pool.filter(function (p) { return p.k === k; })[0].w; }).join(" ");
    if (q.fields) return v.join("  →  ");
    return v;
  }
  function grade(q, v) {
    if (!isDone(q, v)) return false;
    if (q.type === "choice") return v === q.a;
    if (q.type === "order") return norm(v.map(function (k) { return q.pool.filter(function (p) { return p.k === k; })[0].w; }).join("")) === norm(q.a);
    if (q.fields) return q.fields.every(function (f, i) { return f.a.some(function (a) { return norm(a) === norm(v[i]); }); });
    return (Array.isArray(q.a) ? q.a : [q.a]).some(function (a) { return norm(a) === norm(v); });
  }

  function submit() {
    var sh = X.sheet, secs = Math.floor((Date.now() - X.t0) / 1000), score = 0, per = sh.parts.map(function () { return { ok: 0, n: 0 }; });
    X.qs.forEach(function (q) { var ok = grade(q, X.ans[q.n]); q.ok = ok; per[q.part].n++; if (ok) { per[q.part].ok++; score++; } });
    var N = X.qs.length, pct = Math.round(score / N * 100);
    var sync = X.onRecord({ lesson: sh.lesson, game: sh.id, gameName: sh.title, score: score, total: N, pct: pct, secs: secs, words: [], wrong: X.qs.filter(function (q) { return !q.ok; }).map(function (q) { return "Câu " + q.n + ": " + userText(q, X.ans[q.n]).replace(/\|/g, "/"); }) });
    H.sfx(pct >= 70 ? "win" : "meh");
    var msg = pct === 100 ? "Tuyệt vời, đúng hết!" : pct >= 80 ? "Rất tốt!" : pct >= 50 ? "Khá ổn, xem lại các câu sai bên dưới nhé." : "Cần ôn thêm, xem đáp án bên dưới rồi làm lại nhé.";
    var review = "", cur = -1;
    X.qs.forEach(function (q) {
      if (q.part !== cur) { cur = q.part; review += '<div class="sh-part"><h3>' + esc(sh.parts[cur].title) + " · " + per[cur].ok + "/" + per[cur].n + "</h3></div>"; }
      var v = X.ans[q.n];
      review += '<div class="sh-r ' + (q.ok ? "ok" : "bad") + '"><div class="sh-qt"><span class="sh-n">' + q.n + '</span><span class="sh-qp' + hz(q.q) + '">' + (q.q ? esc(q.q) : "Sắp xếp thành câu đúng") + '</span><span class="sh-mark">' + (q.ok ? "Đúng" : "Sai") + "</span></div>" +
        '<div class="sh-ans"><span class="lb">Bạn trả lời</span><span class="' + hz(userText(q, v)).trim() + '">' + esc(userText(q, v)) + "</span></div>" +
        (q.ok ? "" : '<div class="sh-ans good"><span class="lb">Đáp án</span><span class="' + hz(correctText(q)).trim() + '">' + esc(correctText(q)) + "</span></div>") + (q.exp ? '<div class="sh-ans"><span class="lb">Ghi chú</span><span class="sh-exp">' + esc(q.exp) + "</span></div>" : "") + "</div>";
    });
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-sh="exit">' + H.ICONS.back + "Bài tập</button></div>" +
      '<section class="card" style="margin-top:10px"><div class="result"><div class="eyebrow">' + esc(sh.title) + '</div><div class="score">' + score + "<small>/" + N + '</small></div><h2 class="h1">' + msg + '</h2><div class="stats"><span class="chip">Đúng ' + pct + '%</span><span class="chip">' + H.ICONS.clock + fmt(secs) + "</span></div></div>" +
      '<div class="sync" id="sync">' + sync + '</div><div class="rbtns"><button class="btn" data-sh="again">Làm lại</button><button class="btn ghost" data-sh="exit">Về trang Bài tập</button></div></section>' +
      '<section class="card" style="margin-top:14px"><div class="eyebrow" style="margin-bottom:8px">Đáp án chi tiết</div>' + review + "</section>";
    X.done = true; window.scrollTo(0, 0);
  }

  function onClick(e) {
    var b = e.target.closest("[data-sh]"); if (!b || !X || H.view() !== "sheet") return;
    var a = b.dataset.sh, n = +b.dataset.n;
    if (a === "pick") { X.ans[n] = +b.dataset.o; H.sfx("flip"); var box = b.parentNode; [].forEach.call(box.children, function (c) { c.classList.toggle("sel", c === b); }); return refreshLeft(); }
    if (a === "tok") { (X.ans[n] = X.ans[n] || []).push(+b.dataset.k); H.sfx("pair"); return rerender(n); }
    if (a === "untok") { X.ans[n].splice(+b.dataset.i, 1); return rerender(n); }
    if (a === "clear") { X.ans[n] = []; return rerender(n); }
    if (a === "submit") {
      var left = X.qs.filter(function (q) { return !isDone(q, X.ans[q.n]); }).length;
      if (left && !X.warned) { X.warned = true; b.textContent = "Còn " + left + " câu trống. Bấm lần nữa để vẫn nộp"; return; }
      return submit();
    }
    if (a === "again") return window.HD_SHEET.start(X.sheet, { onRecord: X.onRecord, onExit: X.onExit });
    if (a === "exit") { var cb = X.onExit; X = null; return cb && cb(); }
  }
  function onInput(e) {
    var t = e.target; if (!X || !t.dataset || t.dataset.sh !== "type") return;
    var n = +t.dataset.n;
    if (t.dataset.f !== undefined) { var arr = X.ans[n] || (X.ans[n] = []); arr[+t.dataset.f] = t.value; } else X.ans[n] = t.value;
    refreshLeft();
  }

  /* danh sách câu hỏi kèm đáp án đúng, để giáo viên xem chi tiết bài làm */
  function info(sheet) {
    var out = [], n = 0;
    sheet.parts.forEach(function (p, pi) {
      p.items.forEach(function (it) {
        n++;
        var c = it.opts ? "ABCDEF"[it.a] + ". " + it.opts[it.a] : it.w ? it.a : it.fields ? it.fields.map(function (f) { return f.a[0]; }).join(" → ") : (Array.isArray(it.a) ? it.a[0] : it.a);
        out.push({ n: n, part: p.title, q: it.q || it.w.join(" / "), correct: c });
      });
    });
    return out;
  }

  window.HD_SHEET = {
    info: info,
    init: function (host) { H = host; H.app.addEventListener("click", onClick); H.app.addEventListener("input", onInput); },
    start: function (sheet, opt) {
      X = { sheet: sheet, qs: flatten(sheet), ans: {}, t0: Date.now(), warned: false, onRecord: opt.onRecord, onExit: opt.onExit, done: false };
      render(); window.scrollTo(0, 0);
    },
    stop: function () { X = null; }
  };
})();
