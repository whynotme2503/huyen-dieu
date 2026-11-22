/* HUYEN DIEU · Bài tập tự soạn (phiếu bài tập nhiều phần).
   Dữ liệu nằm trong HD_SHEETS (data.js). Học sinh làm một lượt, nộp bài, xem ngay câu đúng/sai và đáp án. */
(function () {
  "use strict";
  var H, X = null, LET = "ABCDEFGHIJ";

  function esc(s) { return H.esc(s); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* bỏ dấu câu, khoảng trắng, chữ hoa/thường để không chấm gắt */
  function norm(s) { return String(s || "").replace(/〇/g, "零").replace(/[\s　。，、！？；：“”‘’「」（）…·.,!?;:"'()\-]/g, "").toLowerCase(); }
  function hz(s) { return /[㐀-鿿]/.test(s) ? " hz" : ""; }
  function fmt(s) { return ("0" + Math.floor(s / 60)).slice(-2) + ":" + ("0" + (s % 60)).slice(-2); }

  function flatten(sheet) {
    var qs = [], n = 0;
    sheet.parts.forEach(function (p, pi) {
      p.items.forEach(function (it) {
        n++;
        var q = { n: n, part: pi, type: it.sent ? "sent" : it.opts ? "choice" : it.w ? "order" : it.valid ? "multi" : "type", img: it.img || null, pass: it.pass || "", py: it.py || "", word: it.word || "", lettersOnly: !!it.opts && it.opts.every(function (o, j) { return o === LET[j]; }), valid: it.valid || null, min: it.min || 0, pre: it.pre || null, vi: it.vi || "", q: it.q || (it.sent ? it.word : "") || "", opts: it.opts || null, a: it.a, fields: it.fields || null, exp: it.exp || "", ph: p.ph || "Gõ chữ Hán tại đây", sub: it.sub || "" };
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
    var v = X.ans[q.n], body = "", gap = !!(q.py && q.q && q.q.indexOf("（　　）") >= 0);
    if (q.type === "choice" && q.lettersOnly) {
      body = '<div class="sh-opts sh-letters">' + q.opts.map(function (o, j) { return '<button class="sh-opt' + (v === j ? " sel" : "") + '" data-sh="pick" data-n="' + q.n + '" data-o="' + j + '"><span class="key">' + LET[j] + "</span></button>"; }).join("") + "</div>";
    } else if (q.type === "choice") {
      body = '<div class="sh-opts">' + q.opts.map(function (o, j) { return '<button class="sh-opt' + (v === j ? " sel" : "") + '" data-sh="pick" data-n="' + q.n + '" data-o="' + j + '"><span class="key">' + LET[j] + '</span><span class="' + hz(o).trim() + '">' + esc(o) + "</span></button>"; }).join("") + "</div>";
    } else if (q.type === "order") {
      v = v || [];
      var used = {}; v.forEach(function (k) { used[k] = 1; });
      body = '<div class="sh-built' + (v.length ? "" : " empty") + '">' + (v.length ? v.map(function (k, idx) { return '<button class="sh-tok on hz" data-sh="untok" data-n="' + q.n + '" data-i="' + idx + '">' + esc(q.pool.filter(function (p) { return p.k === k; })[0].w) + "</button>"; }).join("") : "Bấm các từ bên dưới theo đúng thứ tự") + "</div>" +
        '<div class="sh-pool">' + q.pool.map(function (p) { return '<button class="sh-tok hz" data-sh="tok" data-n="' + q.n + '" data-k="' + p.k + '"' + (used[p.k] ? " disabled" : "") + ">" + esc(p.w) + "</button>"; }).join("") + (v.length ? '<button class="linkb" data-sh="clear" data-n="' + q.n + '">Xóa làm lại</button>' : "") + "</div>";
    } else if (q.type === "multi") {
      body = '<textarea class="sh-input hz" rows="3" data-sh="type" data-n="' + q.n + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">' + esc(v || "") + "</textarea>";
    } else if (q.fields) {
      v = v || [];
      body = q.fields.map(function (f, i) { return '<label class="sh-fl"><span class="t-sub">' + esc(f.label) + '</span><input class="sh-input hz" data-sh="type" data-n="' + q.n + '" data-f="' + i + '" value="' + esc(v[i] || "") + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh"></label>'; }).join("");
    } else if (q.type === "sent") {
      body = '<textarea class="sh-input hz" rows="2" data-sh="type" data-n="' + q.n + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">' + esc(v || "") + "</textarea>";
    } else {
      body = '<input class="sh-input hz" data-sh="type" data-n="' + q.n + '" value="' + esc(v || "") + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">';
    }
    return '<div class="sh-q" id="shq-' + q.n + '">' + (q.pass ? '<div class="sh-pass hz">' + esc(q.pass) + "</div>" : "") + (q.img ? '<img class="sh-img" src="' + esc(q.img) + '" alt="" loading="lazy">' : "") + (q.py && !gap ? '<div class="sh-py">' + esc(q.py) + "</div>" : "") + '<div class="sh-qt"><span class="sh-n">' + q.n + "</span>" + (q.q ? '<span class="sh-qp' + hz(q.q) + '">' + (gap ? esc(q.q).replace("（　　）", '（<span class="sh-gap"><i>' + esc(q.py) + "</i></span>）") : esc(q.q)) + "</span>" : q.type === "order" ? '<span class="sh-qp">Sắp xếp thành câu đúng:</span>' : "") + "</div>" + (q.vi ? '<div class="sh-vi">' + esc(q.vi) + "</div>" : "") + (q.sub ? '<div class="sh-sub' + (hz(q.sub) ? " hzb hz" : "") + '">' + esc(q.sub) + "</div>" : "") + body + "</div>";
  }

  function render() {
    var sh = X.sheet, html = "", cur = -1, left = X.qs.filter(function (q) { return !isDone(q, X.ans[q.n]); }).length;
    X.qs.forEach(function (q) {
      if (q.part !== cur) { cur = q.part; var p = sh.parts[cur]; html += '<div class="sh-part"><h3>' + esc(p.title) + "</h3>" + (p.note ? '<p class="t-sub">' + esc(p.note) + "</p>" : "") + (p.passage ? '<div class="sh-pass hz">' + esc(p.passage) + "</div>" : "") + (p.ex ? '<div class="sh-ex hz">' + esc(p.ex) + "</div>" : "") + (p.imgs ? '<div class="sh-imgs">' + p.imgs.map(function (src, k) { return '<figure><span class="key">' + LET[k] + '</span><img src="' + esc(src) + '" alt="" loading="lazy"></figure>'; }).join("") + "</div>" : "") + (p.box ? '<div class="sh-box hz">' + p.box.map(function (b, k) { return '<div><span class="key">' + LET[k] + "</span>" + esc(b) + "</div>"; }).join("") + "</div>" : "") + (p.bank ? '<div class="sh-bank">' + p.bank.map(function (b) { return '<span class="hz">' + esc(b) + "</span>"; }).join("") + "</div>" : "") + "</div>"; }
      html += qHTML(q);
    });
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-sh="exit">' + H.ICONS.back + "Bài tập</button></div>" +
      '<section class="card sh-card" style="margin-top:10px"><div class="eyebrow">' + esc(sh.title) + '</div><h1 class="h1" style="margin:4px 0 6px">' + X.qs.length + ' câu</h1><p class="sub" style="margin:0 0 14px">Làm hết các phần rồi bấm “Nộp bài”. Phần gõ chữ Hán không cần chú ý dấu câu.</p>' + (sh.audio ? '<div class="sh-audio" id="sh-audio"><b>Bản ghi âm phần Nghe</b><audio controls preload="none" src="' + esc(sh.audio) + '"></audio></div>' : "") + html +
      '<div class="afoot"><span class="t-sub" id="sh-left">' + (left ? "Còn " + left + " câu chưa làm" : "Đã làm hết các câu") + '</span><button class="btn" data-sh="submit" style="margin-left:auto" id="sh-submit">Nộp bài</button></div></section>';
  }

  function refreshLeft() {
    var left = X.qs.filter(function (q) { return !isDone(q, X.ans[q.n]); }).length, el = document.getElementById("sh-left");
    if (el) el.textContent = left ? "Còn " + left + " câu chưa làm" : "Đã làm hết các câu";
    X.warned = false; var b = document.getElementById("sh-submit"); if (b) b.textContent = "Nộp bài";
  }
  function rerender(n) { var q = X.qs[n - 1], el = document.getElementById("shq-" + n); if (el) el.outerHTML = qHTML(q); refreshLeft(); }

  function correctText(q) {
    if (q.type === "choice") return q.lettersOnly ? LET[q.a] : LET[q.a] + ". " + q.opts[q.a];
    if (q.type === "sent") return "Câu có dùng từ " + (Array.isArray(q.a) ? q.a[0] : q.a) + " (viết tự do, từ 6 chữ trở lên)";
    if (q.type === "order") return q.a;
    if (q.fields) return q.fields.map(function (f) { return f.a[0]; }).join("  →  ");
    if (q.type === "multi") return "Cần ít nhất " + q.min + " từ, ví dụ: " + q.valid.join("、");
    return Array.isArray(q.a) ? q.a[0] : q.a;
  }
  function userText(q, v) {
    if (!isDone(q, v)) return "(chưa trả lời)";
    if (q.type === "choice") return q.lettersOnly ? LET[v] : LET[v] + ". " + q.opts[v];
    if (q.type === "order") return v.map(function (k) { return q.pool.filter(function (p) { return p.k === k; })[0].w; }).join(" ");
    if (q.fields) return v.join("  →  ");
    if (q.type === "multi") return v + "  (đúng " + multiCount(q, v) + "/" + q.min + " từ cần có)";
    return v;
  }
  function okAns(a, v, pre) { var nv = norm(v); return (pre || [""]).some(function (p) { return norm(p) + norm(a) === nv; }); }
  function multiCount(q, v) { var nv = norm(v), seen = {}, k = 0; q.valid.forEach(function (w) { if (!seen[w] && nv.indexOf(norm(w)) >= 0) { seen[w] = 1; k++; } }); return k; }
  function sentOK(q, v) { var t = norm(v); return (Array.isArray(q.a) ? q.a : [q.a]).some(function (w) { return t.indexOf(norm(w)) >= 0; }) && (t.match(/[㐀-鿿]/g) || []).length >= (q.minLen || 6); }
  function grade(q, v) {
    if (q.type === "sent") return true; /* câu viết tự do: luôn tính đúng */
    if (!isDone(q, v)) return false;
    if (q.type === "choice") return v === q.a;
    if (q.type === "order") return norm(v.map(function (k) { return q.pool.filter(function (p) { return p.k === k; })[0].w; }).join("")) === norm(q.a);
    if (q.type === "multi") return multiCount(q, v) >= q.min;
    if (q.fields) return q.fields.every(function (f, i) { return f.a.some(function (a) { return okAns(a, v[i], f.pre || q.pre); }); });
    return (Array.isArray(q.a) ? q.a : [q.a]).some(function (a) { return okAns(a, v, q.pre); });
  }

  function rkey(sh) { return "hd-shrev:" + (H.session ? H.session.code : "") + ":" + sh.id; }
  function submit(rv) {
    var sh = X.sheet, secs = rv ? rv.secs : Math.floor((Date.now() - X.t0) / 1000), score = 0, per = sh.parts.map(function () { return { ok: 0, n: 0 }; });
    X.qs.forEach(function (q) { var ok = grade(q, X.ans[q.n]); q.ok = ok; per[q.part].n++; if (ok) { per[q.part].ok++; score++; } });
    var N = X.qs.length, pct = Math.round(score / N * 100);
    if (!rv) { try { localStorage.setItem(rkey(sh), JSON.stringify({ ans: X.ans, secs: secs })); } catch (er) {} }
    var sync = rv ? "Đây là bài làm gần nhất của bạn. Bấm Làm lại nếu muốn làm lượt mới." : X.onRecord({ lesson: sh.lesson, game: sh.id, gameName: sh.title, score: score, total: N, pct: pct, secs: secs, words: X.qs.filter(function (q) { return q.type === "sent" && X.ans[q.n]; }).map(function (q) { return "Câu " + q.n + ": " + String(X.ans[q.n]).replace(/\|/g, "/"); }), wrong: X.qs.filter(function (q) { return !q.ok; }).map(function (q) { return "Câu " + q.n + ": " + userText(q, X.ans[q.n]).replace(/\|/g, "/"); }) });
    if (!rv) H.sfx(pct >= 70 ? "win" : "meh");
    var msg = pct === 100 ? "Tuyệt vời, đúng hết!" : pct >= 80 ? "Rất tốt!" : pct >= 50 ? "Khá ổn, xem lại các câu sai bên dưới nhé." : "Cần ôn thêm, xem đáp án bên dưới rồi làm lại nhé.";
    var review = "", cur = -1;
    X.qs.forEach(function (q) {
      if (q.part !== cur) { cur = q.part; review += '<div class="sh-part"><h3>' + esc(sh.parts[cur].title) + " · " + per[cur].ok + "/" + per[cur].n + "</h3></div>"; }
      var v = X.ans[q.n];
      review += '<div class="sh-r ' + (q.ok ? "ok" : "bad") + '"><div class="sh-qt"><span class="sh-n">' + q.n + '</span><span class="sh-qp' + hz(q.q) + '">' + (q.q ? esc(q.q) : q.type === "order" ? "Sắp xếp thành câu đúng" : q.type === "sent" ? esc(q.word) : q.lettersOnly ? "🎧" : esc(q.opts.join("  /  "))) + (q.sub && !hz(q.sub) ? ' <small class="sh-subr">' + esc(q.sub) + "</small>" : "") + (q.vi ? ' <small class="sh-subr">' + esc(q.vi) + "</small>" : "") + '</span><span class="sh-mark">' + (q.ok ? "Đúng" : "Sai") + "</span></div>" +
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
        var c = it.sent ? "Câu có từ " + (Array.isArray(it.a) ? it.a[0] : it.a) : it.opts ? (it.opts.every(function (o, j) { return o === LET[j]; }) ? LET[it.a] : LET[it.a] + ". " + it.opts[it.a]) : it.w ? it.a : it.fields ? it.fields.map(function (f) { return f.a[0]; }).join(" → ") : it.valid ? "Cần ít nhất " + it.min + " từ: " + it.valid.join("、") : (Array.isArray(it.a) ? it.a[0] : it.a);
        out.push({ n: n, part: p.title, q: it.q || it.word || (it.w ? it.w.join(" / ") : "") || it.vi || "", correct: c });
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
    review: function (sheet, opt) {
      var raw; try { raw = JSON.parse(localStorage.getItem(rkey(sheet)) || "null"); } catch (er) { raw = null; }
      if (!raw || !raw.ans) return false;
      X = { sheet: sheet, qs: flatten(sheet), ans: raw.ans, t0: Date.now(), warned: false, onRecord: opt.onRecord, onExit: opt.onExit, done: true };
      submit({ secs: raw.secs || 0 }); return true;
    },
    stop: function () { X = null; }
  };
})();
