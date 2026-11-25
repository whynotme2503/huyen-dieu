/* HUYEN DIEU · Luyện nghe: nghe một câu tiếng Trung rồi chọn nghĩa tiếng Việt đúng.
   Câu lấy từ phần "ví dụ" của các từ đã học (HD_EXTRA). Âm thanh dùng giọng đọc của thiết bị. */
(function () {
  "use strict";
  var H, ST = null, LEN = 8, CUR = "all";

  function esc(s) { return H.esc(s); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s).replace(/[！!。.，,？?\s]/g, ""); }

  /* Chỉ lấy câu chỉ gồm chữ Hán đã học từ bài 1 đến bài đang chọn (không có chữ của bài sau, không chữ Latin). */
  function han(s) { return Array.from(s).filter(function (c) { return /[㐀-鿿]/.test(c); }); }
  function lessonPool(idx, open) {
    var X = window.HD_EXTRA || {}, known = {}, seen = {}, out = [];
    open.slice(0, idx + 1).forEach(function (l) { l.words.forEach(function (w) { han(w.hanzi).forEach(function (c) { known[c] = 1; }); }); });
    open[idx].words.forEach(function (w) {
      ((X[w.hanzi] && X[w.hanzi].ex) || []).forEach(function (e) {
        var k = norm(e[0]); if (seen[k] || !e[2] || /[A-Za-z]/.test(e[0])) return; seen[k] = 1;
        if (han(e[0]).every(function (c) { return known[c]; })) out.push({ zh: e[0], py: e[1], vi: e[2], w: w.hanzi });
      });
    });
    return out;
  }
  function pool(id) {
    var open = H.LESSONS.filter(function (l) { return l.words.length; }), out = [], seen = {};
    open.forEach(function (l, i) {
      if (id === "all" ? l.level !== H.level() : String(l.id) !== String(id)) return;
      if ((window.HD_DICT || {})[String(l.id)]) return;
      lessonPool(i, open).forEach(function (s) { var k = norm(s.zh); if (!seen[k]) { seen[k] = 1; out.push(s); } });
    });
    return out;
  }

  function question(it, all) {
    var wrong = shuffle(all.filter(function (x) { return x.vi !== it.vi; })).slice(0, 3);
    return { it: it, opts: shuffle([{ vi: it.vi, ok: true }].concat(wrong.map(function (x) { return { vi: x.vi, ok: false }; }))), picked: -1 };
  }

  function picker() {
    ST = null;
    if (H.lvOK && !H.lvOK(H.level())) H.setLevel(H.maxLv());
    var rows = H.LESSONS.filter(function (l) { return l.words.length && l.level === H.level(); }).map(function (l) {
      var n = pool(l.id).length;
      var dc = (window.HD_DICT || {})[String(l.id)];
      if (dc) return '<button class="ln-les ln-dict" data-ldict="' + esc(l.id) + '"><span class="ln-n">' + esc(l.num) + '</span><span class="ln-t"><b>Bài ' + esc(l.num) + "</b><small>" + esc(dc.topic ? dc.topic + " · " : "") + "nghe rồi gõ lại câu bằng chữ Hán</small></span><span class=\"ln-c\">" + dc.items.length + " câu</span></button>";
      return '<button class="ln-les" data-llesson="' + esc(l.id) + '"' + (n < 4 ? " disabled" : "") + '><span class="ln-n">' + esc(l.num) + '</span><span class="ln-t"><b>Bài ' + esc(l.num) + "</b><small>" + esc(l.topic || l.title || "") + "</small></span><span class=\"ln-c\">" + n + " câu</span></button>" +
        (dc ? '<button class="ln-les ln-dict" data-ldict="' + esc(l.id) + '"><span class="ln-n">✍</span><span class="ln-t"><b>Bài ' + esc(l.num) + " · " + esc(dc.title) + "</b><small>Nghe rồi gõ lại câu bằng chữ Hán</small></span><span class=\"ln-c\">" + dc.items.length + " câu</span></button>" : "");
    }).join("");
    var nAll = pool("all").length;
    var mx = H.maxLv ? H.maxLv() : 1, tabs = "";
    if (mx > 1) { tabs = '<div class="lvtabs" role="tablist" style="margin:10px 0 0">'; for (var k = 1; k <= mx; k++) tabs += '<button class="lvtab' + (k === H.level() ? " on" : "") + '" data-lnlv="' + k + '">HSK ' + k + "</button>"; tabs += "</div>"; }
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><a class="back" href="#home">' + H.ICONS.back + 'Trang chủ</a></div>' + tabs + '<section class="card ln-card"><div class="eyebrow">Luyện nghe</div><h2 class="h1" style="margin:4px 0 4px">Chọn bài để luyện nghe</h2><p class="sub" style="margin:0 0 12px">Mỗi lượt gồm ' + LEN + ' câu của bài bạn chọn.</p><div class="ln-list">' + rows +
      '<button class="ln-les" data-llesson="all"' + (nAll < 4 ? " disabled" : "") + '><span class="ln-n">∗</span><span class="ln-t"><b>Tổng hợp</b><small>Trộn câu của tất cả các bài</small></span><span class="ln-c">' + nAll + " câu</span></button></div></section>";
  }

  function start(id) {
    CUR = id || CUR;
    var all = pool(CUR);
    if (all.length < 4) { picker(); return; }
    var qs = shuffle(all).slice(0, Math.min(LEN, all.length)).map(function (it) { return question(it, all); });
    ST = { lesson: CUR, qs: qs, i: 0, score: 0, t0: Date.now(), done: false, wrong: [], words: [] };
    paint(true);
  }

  function say(slow) { var q = ST.qs[ST.i], A = window.HD_SENT_AUDIO || {}, f = A[norm(q.it.zh)]; H.speak(f ? { hanzi: q.it.zh, audio: f } : { hanzi: q.it.zh }, slow); }

  function paint(auto) {
    var q = ST.qs[ST.i], n = ST.qs.length, ans = q.picked >= 0;
    var opts = q.opts.map(function (o, i) {
      var cl = ans ? (o.ok ? " correct" : (i === q.picked ? " wrong" : " dim")) : "";
      return '<button class="mq-opt ln-opt' + cl + '" data-lo="' + i + '"' + (ans ? " disabled" : "") + ">" + esc(o.vi) + "</button>";
    }).join("");
    var fb = ans ? '<div class="ln-fb">' + (q.opts[q.picked].ok ? '<b class="ok">Chính xác!</b> ' : '<b class="no">Chưa đúng.</b> ') + '<div class="ln-zh">' + esc(q.it.zh) + '</div><div class="ln-py">' + esc(q.it.py) + '</div></div><button class="btn" data-lnext="1">' + (ST.i + 1 >= n ? "Xem kết quả" : "Câu tiếp") + "</button>" : "";
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-lpick="1">' + H.ICONS.back + (ST.lesson === "all" ? "Tổng hợp" : esc(H.lname(ST.lesson))) + '</button><span class="chip" style="margin-left:auto">Câu ' + (ST.i + 1) + "/" + n + '</span></div>' +
      '<section class="card ln-card"><div class="eyebrow">Luyện nghe</div><p class="sub" style="margin:4px 0 12px">Nghe câu tiếng Trung, chọn nghĩa tiếng Việt đúng.</p>' +
      '<div class="ln-spk"><button class="mq-spk" data-lplay="1">' + H.ICONS.speaker + ' Nghe</button><button class="btn ghost small" data-lslow="1">Nghe chậm</button></div>' +
      '<div class="mq-opts ln-opts">' + opts + "</div>" + fb + "</section>";
    if (auto) setTimeout(function () { if (H.view() === "listen" && ST && !ST.done) say(); }, 250);
  }

  function pick(i) {
    var q = ST.qs[ST.i]; if (q.picked >= 0) return;
    q.picked = i;
    if (q.opts[i].ok) { ST.score++; H.sfx("ok"); } else { ST.wrong.push(q.it.zh); H.sfx("no"); }
    if (q.it.w) ST.words.push(q.it.w);
    paint(false);
  }

  function finish() {
    ST.done = true;
    var n = ST.qs.length, pct = Math.round(ST.score / n * 100), secs = Math.floor((Date.now() - ST.t0) / 1000);
    var sync = H.record({ lesson: ST.lesson, game: "listen-sentence", gameName: "Nghe câu → chọn nghĩa", score: ST.score, total: n, pct: pct, secs: secs, words: [], wrong: ST.wrong.map(function (z, i) { return "Câu " + (i + 1) + ": " + z; }) });
    var msg = pct === 100 ? "Tai nghe cực tốt, không sai câu nào!" : pct >= 70 ? "Nghe khá tốt rồi, luyện thêm nhé." : "Nghe thêm vài lần nữa, bạn sẽ quen dần.";
    var miss = ST.qs.filter(function (q) { return !q.opts[q.picked].ok; }).map(function (q) {
      return '<div class="sr-ex"><span class="zh">' + esc(q.it.zh) + '</span><span class="py">' + esc(q.it.py) + '</span><span class="vi">' + esc(q.it.vi) + "</span></div>";
    }).join("");
    H.app.innerHTML = '<section class="card" style="margin-top:10px"><div class="result"><div class="eyebrow">Luyện nghe · ' + (ST.lesson === "all" ? "Tổng hợp" : esc(H.lname(ST.lesson))) + '</div><div class="score">' + ST.score + "<small>/" + n + '</small></div><h2 class="h1">' + msg + '</h2><div class="sync">' + esc(sync || "") + '</div><div class="rbtns"><button class="btn" data-lagain="1">Luyện tiếp</button><button class="btn ghost" data-lpick="1">Chọn bài khác</button></div></div>' +
      (miss ? '<div class="miss"><div class="eyebrow" style="margin-bottom:6px">Câu cần nghe lại</div>' + miss + "</div>" : "") + "</section>";
  }

  /* ---------- Nghe – gõ câu ---------- */
  var AU = null;
  function dnorm(s) { return String(s || "").replace(/[\s　。，、！？；：“”‘’「」（）….,!?;:"'()\-]/g, ""); }
  /* So khớp: bỏ dấu câu/khoảng trắng; 他 = 她 (đại từ chỉ người); 儿 tùy chọn ở 面条儿, 有点儿, 一点儿, 玩儿. */
  function dkey(s) { return dnorm(s).replace(/她/g, "他").replace(/(面条|有点|一点|玩)儿/g, "$1"); }
  function dplay(slow) { var q = ST.qs[ST.i]; try { if (AU) AU.pause(); AU = new Audio(q.audio); AU.playbackRate = slow ? 0.7 : 1; AU.play(); } catch (e) { /* bỏ qua */ } }
  function dstart(id) {
    var D = (window.HD_DICT || {})[String(id)]; if (!D) return picker();
    ST = { mode: "dict", lesson: String(id), title: D.title, qs: D.items.map(function (x) { return { zh: x.zh, audio: x.audio, val: "", res: null }; }), i: 0, score: 0, t0: Date.now(), done: false };
    dpaint(true);
  }
  function dpaint(auto) {
    var q = ST.qs[ST.i], n = ST.qs.length, done = q.res !== null;
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><button class="back" data-lpick="1">' + H.ICONS.back + esc(H.lname(ST.lesson)) + '</button><span class="chip" style="margin-left:auto">Câu ' + (ST.i + 1) + "/" + n + '</span></div>' +
      '<section class="card ln-card"><div class="eyebrow">Luyện nghe · ' + esc(ST.title) + '</div><p class="sub" style="margin:4px 0 12px">Nghe rồi gõ lại cả câu bằng chữ Hán. Không cần gõ dấu câu. Nghe lại bao nhiêu lần cũng được.</p>' +
      '<div class="ln-spk"><button class="mq-spk" data-dplay="1">' + H.ICONS.speaker + ' Nghe</button><button class="btn ghost small" data-dslow="1">Nghe chậm</button></div>' +
      '<input class="t-input ln-in" id="ln-in" lang="zh-CN" autocomplete="off" placeholder="Gõ câu bạn nghe được…" value="' + esc(q.val) + '"' + (done ? " readonly" : "") + ">" +
      (done ? '<div class="ln-fb">' + (q.res ? '<b class="ok">Chính xác!</b>' : '<b class="no">Chưa đúng.</b><div class="ln-you">Bạn gõ: ' + esc(q.val || "(bỏ trống)") + "</div>") + '<div class="ln-zh">' + esc(q.zh) + '</div></div><button class="btn" data-dnext="1">' + (ST.i + 1 >= n ? "Xem kết quả" : "Câu tiếp") + "</button>"
        : '<button class="btn" data-dchk="1">Kiểm tra</button>') + "</section>";
    var inp = document.getElementById("ln-in"); if (inp && !done) inp.focus(); var nb = H.app.querySelector("[data-dnext]"); if (nb) nb.focus();
    if (auto) setTimeout(function () { if (H.view() === "listen" && ST && ST.mode === "dict" && !ST.done) dplay(false); }, 250);
  }
  function dcheck() {
    var q = ST.qs[ST.i], inp = document.getElementById("ln-in"); q.val = inp ? inp.value.trim() : "";
    if (!q.val && !window.confirm("Bạn chưa gõ gì. Bỏ qua câu này?")) return;
    q.res = !!q.val && dkey(q.val) === dkey(q.zh); if (q.res) { ST.score++; H.sfx("ok"); } else H.sfx("no");
    dpaint(false);
  }
  function dfinish() {
    ST.done = true;
    var n = ST.qs.length, pct = Math.round(ST.score / n * 100), secs = Math.floor((Date.now() - ST.t0) / 1000);
    var bad = ST.qs.map(function (q, i) { return { q: q, i: i }; }).filter(function (x) { return !x.q.res; });
    var sync = H.record({ lesson: ST.lesson, game: "listen-dict", gameName: "Nghe – gõ câu", score: ST.score, total: n, pct: pct, secs: secs, words: [], wrong: bad.map(function (x) { return "Câu " + (x.i + 1) + ": " + (x.q.val || "(bỏ trống)") + " → " + x.q.zh; }) });
    var msg = pct === 100 ? "Nghe và gõ đúng hết, quá giỏi!" : pct >= 70 ? "Khá tốt rồi, xem lại các câu sai nhé." : "Nghe lại từng câu và gõ thêm vài lượt nữa nhé.";
    H.app.innerHTML = '<section class="card" style="margin-top:10px"><div class="result"><div class="eyebrow">Luyện nghe · ' + esc(H.lname(ST.lesson)) + " · " + esc(ST.title) + '</div><div class="score">' + ST.score + "<small>/" + n + '</small></div><h2 class="h1">' + msg + '</h2><div class="sync" id="sync">' + esc(sync || "") + '</div><div class="row" style="justify-content:center;gap:8px;margin-top:10px"><button class="btn" data-dagain="1">Làm lại</button><button class="btn ghost" data-lpick="1">Chọn bài khác</button></div></div>' +
      (bad.length ? '<div class="miss"><div class="eyebrow" style="margin-bottom:6px">Câu cần nghe lại</div>' + bad.map(function (x) {
        return '<div class="sr-ex"><button class="tb-spk" data-dsay="' + esc(x.q.audio) + '" aria-label="Nghe">' + H.ICONS.speaker + '</button><span class="zh">' + (x.i + 1) + ". " + esc(x.q.zh) + '</span><span class="vi">Bạn gõ: ' + esc(x.q.val || "(bỏ trống)") + "</span></div>";
      }).join("") + "</div>" : "") + "</section>";
  }

  function onClick(e) {
    if (H.view() !== "listen") return;
    var t = e.target.closest("button"); if (!t) return;
    if (t.dataset.ldict) return dstart(t.dataset.ldict);
    if (t.dataset.dplay) return dplay(false);
    if (t.dataset.dslow) return dplay(true);
    if (t.dataset.dchk) return dcheck();
    if (t.dataset.dnext) { if (ST.i + 1 >= ST.qs.length) return dfinish(); ST.i++; return dpaint(true); }
    if (t.dataset.dagain) return dstart(ST.lesson);
    if (t.dataset.dsay) { try { if (AU) AU.pause(); AU = new Audio(t.dataset.dsay); AU.play(); } catch (er) { /* bỏ qua */ } return; }
    if (t.dataset.lplay) return say(false);
    if (t.dataset.lslow) return say(true);
    if (t.dataset.lo) return pick(+t.dataset.lo);
    if (t.dataset.lnext) { if (ST.i + 1 >= ST.qs.length) return finish(); ST.i++; return paint(true); }
    if (t.dataset.lagain) return start(ST.lesson);
    if (t.dataset.lpick) return picker();
    if (t.dataset.lnlv) { H.setLevel(+t.dataset.lnlv); return picker(); }
    if (t.dataset.llesson) return start(t.dataset.llesson);
  }

  function onKey(e) {
    if (H.view() !== "listen" || !ST || ST.mode !== "dict" || e.key !== "Enter" || e.isComposing) return;
    if (e.target.id !== "ln-in") return;
    e.preventDefault(); var q = ST.qs[ST.i]; if (q.res === null) dcheck(); else { if (ST.i + 1 >= ST.qs.length) dfinish(); else { ST.i++; dpaint(true); } }
  }
  window.HD_LISTEN = { init: function (host) { H = host; H.app.addEventListener("click", onClick); H.app.addEventListener("keydown", onKey); }, render: picker };
})();
