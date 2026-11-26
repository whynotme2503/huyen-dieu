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
        var q = { n: n, part: pi, type: it.trans ? "trans" : it.sent ? "sent" : it.opts ? "choice" : it.w ? "order" : it.valid ? "multi" : "type", img: it.img || null, pass: it.pass || "", py: it.py || "", word: it.word || "", lettersOnly: !!it.opts && it.opts.every(function (o, j) { return o === LET[j]; }), valid: it.valid || null, min: it.min || 0, pre: it.pre || null, vi: it.vi || "", q: it.q || (it.sent ? it.word : "") || "", opts: it.opts || null, a: it.a, show: it.show || "", audio: it.audio || "", fields: it.fields || null, exp: it.exp || "", ph: p.ph || "Gõ chữ Hán tại đây", sub: it.sub || "" };
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

  function playBtn(q) { return q.audio ? '<button class="sh-play" data-sh="play" data-src="' + esc(q.audio) + '" aria-label="Nghe">' + H.ICONS.speaker + "<span>Nghe</span></button>" : ""; }
  var AU = null;
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
    } else if (q.type === "trans") {
      body = '<textarea class="sh-input hz sh-trans" rows="9" data-sh="type" data-n="' + q.n + '" placeholder="Viết bản dịch tiếng Trung của bạn…" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">' + esc(v || "") + "</textarea>";
    } else if (q.type === "sent") {
      body = '<textarea class="sh-input hz" rows="2" data-sh="type" data-n="' + q.n + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">' + esc(v || "") + "</textarea>";
    } else {
      body = '<input class="sh-input hz" data-sh="type" data-n="' + q.n + '" value="' + esc(v || "") + '" placeholder="' + esc(q.ph) + '" autocomplete="off" autocapitalize="off" spellcheck="false" lang="zh">';
    }
    return '<div class="sh-q" id="shq-' + q.n + '">' + (q.pass ? '<div class="sh-pass hz">' + esc(q.pass) + "</div>" : "") + (q.img ? '<img class="sh-img" src="' + esc(q.img) + '" alt="" loading="lazy">' : "") + (q.py && !gap ? '<div class="sh-py">' + esc(q.py) + "</div>" : "") + '<div class="sh-qt"><span class="sh-n">' + q.n + "</span>" + playBtn(q) + (q.q ? '<span class="sh-qp' + hz(q.q) + '">' + (gap ? esc(q.q).replace("（　　）", '（<span class="sh-gap"><i>' + esc(q.py) + "</i></span>）") : esc(q.q)) + "</span>" : q.type === "order" ? '<span class="sh-qp">Sắp xếp thành câu đúng:</span>' : "") + "</div>" + (q.vi ? '<div class="sh-vi">' + esc(q.vi) + "</div>" : "") + (q.sub ? '<div class="sh-sub' + (hz(q.sub) ? " hzb hz" : "") + '">' + esc(q.sub) + "</div>" : "") + body + "</div>";
  }

  function render() {
    var sh = X.sheet, html = "", cur = -1, left = X.qs.filter(function (q) { return !isDone(q, X.ans[q.n]); }).length;
    X.qs.forEach(function (q) {
      if (q.part !== cur) { cur = q.part; var p = sh.parts[cur]; html += '<div class="sh-part"><h3>' + esc(p.title) + "</h3>" + (p.note ? '<p class="t-sub">' + esc(p.note) + "</p>" : "") + (p.passage ? '<div class="sh-pass hz">' + esc(p.passage) + "</div>" : "") + (p.ex ? '<div class="sh-ex hz">' + esc(p.ex) + "</div>" : "") + (p.imgs ? '<div class="sh-imgs">' + p.imgs.map(function (src, k) { return '<figure><span class="key">' + LET[k] + '</span><img src="' + esc(src) + '" alt="" loading="lazy"></figure>'; }).join("") + "</div>" : "") + (p.box ? '<div class="sh-box hz">' + p.box.map(function (b, k) { return '<div><span class="key">' + LET[k] + "</span>" + esc(b) + "</div>"; }).join("") + "</div>" : "") + (p.bank ? '<div class="sh-bank">' + p.bank.map(function (b) { return '<span class="hz">' + esc(b) + "</span>"; }).join("") + "</div>" : "") + "</div>"; }
      html += qHTML(q);
    });
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-sh="exit">' + H.ICONS.back + "Bài tập</button></div>" +
      '<section class="card sh-card" style="margin-top:10px"><div class="eyebrow">' + esc(sh.title) + '</div><h1 class="h1" style="margin:4px 0 6px">' + (X.qs.every(function (q) { return q.type === "trans"; }) ? "Luyện dịch đoạn văn" : X.qs.length + " câu") + '</h1><p class="sub" style="margin:0 0 14px">' + (sh.intro ? esc(sh.intro) : "Làm hết các phần rồi bấm “Nộp bài”. Phần gõ chữ Hán không cần chú ý dấu câu.") + '</p>' + (sh.audio ? '<div class="sh-audio" id="sh-audio"><b>Bản ghi âm phần Nghe</b><audio controls preload="none" src="' + esc(sh.audio) + '"></audio></div>' : "") + html +
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
    return q.show || (Array.isArray(q.a) ? q.a[0] : q.a);
  }
  function userText(q, v) {
    if (!isDone(q, v)) return "(chưa trả lời)";
    if (q.type === "choice") return q.lettersOnly ? LET[v] : LET[v] + ". " + q.opts[v];
    if (q.type === "order") return v.map(function (k) { return q.pool.filter(function (p) { return p.k === k; })[0].w; }).join(" ");
    if (q.fields) return v.join("  →  ");
    if (q.type === "multi") return v + "  (đúng " + multiCount(q, v) + "/" + q.min + " từ cần có)";
    return v;
  }
  /* Luyện dịch: so bài làm với đáp án theo từng chữ Hán (dãy con chung dài nhất).
     Không tính dấu câu; 他 = 她; 儿 sau 面条/有点/一点/玩 có hay không đều được.
     Trả về r = 2·(số chữ khớp) / (số chữ bài làm + số chữ đáp án) và HTML bài làm tô xanh (khớp) / đỏ (khác). */
  function tSeq(t) {
    var cs = Array.from(String(t || "")), out = [];
    cs.forEach(function (c, i) {
      if (!/[㐀-鿿A-Za-z0-9]/.test(c)) return;
      if (c === "儿") { var pv = out.map(function (x) { return x.c; }).join("").slice(-2); if (/(面条|有点|一点)$/.test(pv) || pv.slice(-1) === "玩") { out.push({ i: i, c: c, opt: true }); return; } }
      out.push({ i: i, c: c, k: c === "她" ? "他" : c.toLowerCase() });
    });
    return { cs: cs, seq: out };
  }
  function tDiff(v, a) {
    var U = tSeq(v), A = tSeq(a), us = U.seq.filter(function (x) { return !x.opt; }), as = A.seq.filter(function (x) { return !x.opt; });
    var n = us.length, m = as.length, D = [], i, j;
    for (i = 0; i <= n; i++) { D.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) for (j = m - 1; j >= 0; j--) D[i][j] = us[i].k === as[j].k ? D[i + 1][j + 1] + 1 : Math.max(D[i + 1][j], D[i][j + 1]);
    var hit = {}; i = 0; j = 0;
    while (i < n && j < m) { if (us[i].k === as[j].k) { hit[us[i].i] = 1; i++; j++; } else if (D[i + 1][j] >= D[i][j + 1]) i++; else j++; }
    var mark = {}; U.seq.forEach(function (x) { mark[x.i] = x.opt ? "ok" : hit[x.i] ? "ok" : "bad"; });
    var html = U.cs.map(function (c, k) { return mark[k] ? '<span class="td-' + mark[k] + '">' + esc(c) + "</span>" : esc(c); }).join("");
    var tot = n + m;
    return { r: tot ? 2 * D[0][0] / tot : 0, html: html };
  }
  /* Đáp án bắt đầu bằng "re:" là biểu thức chính quy, so với câu trả lời đã bỏ dấu câu/khoảng trắng (chữ thường).
     Dùng cho câu có nhiều cách trả lời đúng (thứ tự, chủ ngữ, câu dài/ngắn). */
  function okAns(a, v, pre) {
    var nv = norm(v);
    if (/^re:/.test(a)) { try { return new RegExp("^(?:" + a.slice(3) + ")$").test(nv); } catch (e) { return false; } }
    if ((pre || [""]).some(function (p) { return norm(p) + norm(a) === nv; })) return true;
    /* câu đọc hiểu: chấp nhận trả lời dài, có thêm chủ ngữ lấy từ chính câu hỏi (vd: Lan妈妈今年四十六岁) */
    if (pre && PREQ) { var na = norm(a); if (na && nv.length > na.length && nv.slice(-na.length) === na) { var head = nv.slice(0, nv.length - na.length), okc = PREQ + "她他们的有是今年"; return head.split("").every(function (c) { return okc.indexOf(c) >= 0; }); } }
    return false;
  }
  var PREQ = "";
  function multiCount(q, v) { var nv = norm(v), seen = {}, k = 0; q.valid.forEach(function (w) { if (!seen[w] && nv.indexOf(norm(w)) >= 0) { seen[w] = 1; k++; } }); return k; }
  function sentOK(q, v) { var t = norm(v); return (Array.isArray(q.a) ? q.a : [q.a]).some(function (w) { return t.indexOf(norm(w)) >= 0; }) && (t.match(/[㐀-鿿]/g) || []).length >= (q.minLen || 6); }
  function grade(q, v) {
    if (q.type === "sent") return true; /* câu viết tự do: luôn tính đúng */
    if (q.type === "trans") return tDiff(v || "", q.a).r >= 0.9;
    if (!isDone(q, v)) return false;
    if (q.type === "choice") return v === q.a;
    if (q.type === "order") return norm(v.map(function (k) { return q.pool.filter(function (p) { return p.k === k; })[0].w; }).join("")) === norm(q.a);
    if (q.type === "multi") return multiCount(q, v) >= q.min;
    if (q.fields) return q.fields.every(function (f, i) { return f.a.some(function (a) { return okAns(a, v[i], f.pre || q.pre); }); });
    PREQ = q.pre ? norm(q.q) : "";
    var r = (Array.isArray(q.a) ? q.a : [q.a]).some(function (a) { return okAns(a, v, q.pre); }); PREQ = ""; return r;
  }

  function rkey(sh) { return "hd-shrev:" + (H.session ? H.session.code : "") + ":" + sh.id; }
  function submit(rv) {
    var sh = X.sheet, secs = rv ? rv.secs : Math.floor((Date.now() - X.t0) / 1000), score = 0, per = sh.parts.map(function () { return { ok: 0, n: 0 }; });
    var FX = rv && rv.fixed;
    var allT = X.qs.every(function (q) { return q.type === "trans"; }), tsum = 0;
    X.qs.forEach(function (q) {
      if (q.type === "trans") { var tv = FX ? (FX[q.n] !== undefined ? FX[q.n] : "") : (X.ans[q.n] || ""); if (FX) X.ans[q.n] = tv === "(chưa trả lời)" ? "" : tv; q.td = tDiff(X.ans[q.n] || "", q.a); tsum += q.td.r; }
      var ok = q.type === "trans" ? q.td.r >= 0.9 : FX ? !(q.n in FX) : grade(q, X.ans[q.n]); q.ok = ok; per[q.part].n++; if (ok) { per[q.part].ok++; score++; } });
    var N = X.qs.length, pct = Math.round(score / N * 100);
    if (allT) { pct = Math.round(tsum / N * 100); score = pct; N = 100; }
    if (!rv) { try { localStorage.setItem(rkey(sh), JSON.stringify({ ans: X.ans, secs: secs })); } catch (er) {} }
    var sync = rv ? "Đây là bài làm gần nhất của bạn. Bấm Làm lại nếu muốn làm lượt mới." : X.onRecord({ lesson: sh.lesson, game: sh.id, gameName: sh.title, score: score, total: N, pct: pct, secs: secs, words: X.qs.filter(function (q) { return q.type === "sent" && X.ans[q.n]; }).map(function (q) { return "Câu " + q.n + ": " + String(X.ans[q.n]).replace(/\|/g, "/"); }), wrong: X.qs.filter(function (q) { return !q.ok || q.type === "trans"; }).map(function (q) { return "Câu " + q.n + ": " + userText(q, X.ans[q.n]).replace(/\|/g, "/").replace(/\n/g, " "); }) });
    if (!rv) H.sfx(pct >= 70 ? "win" : "meh");
    var msg = pct === 100 ? "Tuyệt vời, đúng hết!" : pct >= 80 ? "Rất tốt!" : pct >= 50 ? "Khá ổn, xem lại các câu sai bên dưới nhé." : "Cần ôn thêm, xem đáp án bên dưới rồi làm lại nhé.";
    var review = "", cur = -1;
    X.qs.forEach(function (q) {
      if (q.part !== cur) { cur = q.part; review += '<div class="sh-part"><h3>' + esc(sh.parts[cur].title) + (allT ? "" : " · " + per[cur].ok + "/" + per[cur].n) + "</h3></div>"; }
      if (q.type === "trans") {
        review += '<div class="sh-r ' + (q.ok ? "ok" : "bad") + '"><div class="sh-qt"><span class="sh-n">' + q.n + '</span><span class="sh-qp sh-trvi">' + esc(q.vi) + '</span><span class="sh-mark">Khớp ' + Math.round(q.td.r * 100) + "%</span></div>" +
          '<div class="sh-ans sh-tr"><span class="lb">Bài làm</span><span class="hz sh-diff">' + (X.ans[q.n] ? q.td.html : "(chưa trả lời)") + "</span></div>" +
          '<div class="sh-ans good sh-tr"><span class="lb">Đáp án</span><span class="hz">' + esc(q.a) + "</span></div>" +
          '<div class="sh-ans"><span class="lb">Ghi chú</span><span class="sh-exp">Chữ xanh: khớp với đáp án. Chữ đỏ: khác đáp án (có thể là cách dịch khác vẫn đúng, đối chiếu lại với đáp án nhé). Không tính dấu câu.</span></div></div>';
        return;
      }
      var v = X.ans[q.n], ut = FX ? (q.n in FX ? FX[q.n] : "✓ Đúng") : userText(q, v);
      review += '<div class="sh-r ' + (q.ok ? "ok" : "bad") + '"><div class="sh-qt"><span class="sh-n">' + q.n + '</span>' + playBtn(q) + '<span class="sh-qp' + hz(q.q) + '">' + (q.q ? esc(q.q) : q.type === "order" ? "Sắp xếp thành câu đúng" : q.type === "sent" ? esc(q.word) : q.lettersOnly ? "🎧" : esc(q.opts.join("  /  "))) + (q.sub && !hz(q.sub) ? ' <small class="sh-subr">' + esc(q.sub) + "</small>" : "") + (q.vi ? ' <small class="sh-subr">' + esc(q.vi) + "</small>" : "") + '</span><span class="sh-mark">' + (q.ok ? "Đúng" : "Sai") + "</span></div>" +
        '<div class="sh-ans"><span class="lb">Bạn trả lời</span><span class="' + hz(ut).trim() + '">' + esc(ut) + "</span></div>" +
        (q.ok && !rv ? "" : '<div class="sh-ans good"><span class="lb">Đáp án</span><span class="' + hz(correctText(q)).trim() + '">' + esc(correctText(q)) + "</span></div>") + (q.exp ? '<div class="sh-ans"><span class="lb">Ghi chú</span><span class="sh-exp">' + esc(q.exp) + "</span></div>" : "") + "</div>";
    });
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-sh="exit">' + H.ICONS.back + "Bài tập</button></div>" +
      '<section class="card" style="margin-top:10px"><div class="result"><div class="eyebrow">' + esc(sh.title) + '</div><div class="score">' + score + "<small>/" + N + '</small></div><h2 class="h1">' + msg + '</h2><div class="stats"><span class="chip">' + (allT ? "Khớp đáp án " : "Đúng ") + pct + '%</span><span class="chip">' + H.ICONS.clock + fmt(secs) + "</span></div></div>" +
      '<div class="sync" id="sync">' + sync + '</div><div class="rbtns"><button class="btn" data-sh="again">Làm lại</button><button class="btn ghost" data-sh="exit">Về trang Bài tập</button></div></section>' +
      '<section class="card" style="margin-top:14px"><div class="eyebrow" style="margin-bottom:8px">Đáp án chi tiết</div>' + review + "</section>";
    X.done = true; window.scrollTo(0, 0);
  }

  function onClick(e) {
    var b = e.target.closest("[data-sh]"); if (!b || !X || H.view() !== "sheet") return;
    var a = b.dataset.sh, n = +b.dataset.n;
    if (a === "play") { try { if (AU) AU.pause(); AU = new Audio(b.dataset.src); AU.play(); b.classList.add("on"); AU.onended = function () { b.classList.remove("on"); }; } catch (er) { /* bỏ qua */ } return; }
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
        var c = it.sent ? "Câu có từ " + (Array.isArray(it.a) ? it.a[0] : it.a) : it.opts ? (it.opts.every(function (o, j) { return o === LET[j]; }) ? LET[it.a] : LET[it.a] + ". " + it.opts[it.a]) : it.w ? it.a : it.fields ? it.fields.map(function (f) { return f.a[0]; }).join(" → ") : it.valid ? "Cần ít nhất " + it.min + " từ: " + it.valid.join("、") : (it.show || (Array.isArray(it.a) ? it.a[0] : it.a));
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
      if (!raw || !raw.ans) {
        /* máy khác / chưa lưu: dựng lại từ kết quả trên Google Sheet (câu sai kèm bài làm, các câu còn lại tính đúng) */
        var r = opt.result; if (!r) return false;
        var fixed = {}; (r.wrong || []).forEach(function (w) { var m = /^Câu (\d+): ([\s\S]*)$/.exec(w); if (m) fixed[+m[1]] = m[2]; });
        X = { sheet: sheet, qs: flatten(sheet), ans: {}, t0: Date.now(), warned: false, onRecord: opt.onRecord, onExit: opt.onExit, done: true };
        submit({ secs: r.secs || 0, fixed: fixed }); return true;
      }
      X = { sheet: sheet, qs: flatten(sheet), ans: raw.ans, t0: Date.now(), warned: false, onRecord: opt.onRecord, onExit: opt.onExit, done: true };
      submit({ secs: raw.secs || 0 }); return true;
    },
    stop: function () { X = null; }
  };
})();
