/* HUYEN DIEU · Luyện nghe: nghe một câu tiếng Trung rồi chọn nghĩa tiếng Việt đúng.
   Câu lấy từ phần "ví dụ" của các từ đã học (HD_EXTRA). Âm thanh dùng giọng đọc của thiết bị. */
(function () {
  "use strict";
  var H, ST = null, LEN = 8;

  function esc(s) { return H.esc(s); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s).replace(/[！!。.，,？?\s]/g, ""); }

  function pool() {
    var X = window.HD_EXTRA || {}, seen = {}, out = [];
    H.ALL.forEach(function (w) {
      ((X[w.hanzi] && X[w.hanzi].ex) || []).forEach(function (e) {
        var k = norm(e[0]); if (seen[k] || !e[2]) return; seen[k] = 1;
        out.push({ zh: e[0], py: e[1], vi: e[2], w: w.hanzi });
      });
    });
    return out;
  }

  function question(it, all) {
    var wrong = shuffle(all.filter(function (x) { return x.vi !== it.vi; })).slice(0, 3);
    return { it: it, opts: shuffle([{ vi: it.vi, ok: true }].concat(wrong.map(function (x) { return { vi: x.vi, ok: false }; }))), picked: -1 };
  }

  function start() {
    var all = pool();
    if (all.length < 4) { H.app.innerHTML = '<section class="card"><h2 class="h1">Luyện nghe</h2><p class="sub">Chưa có đủ câu để luyện nghe. Học thêm từ vựng nhé.</p><a class="btn" href="#home">Về trang chủ</a></section>'; return; }
    var qs = shuffle(all).slice(0, Math.min(LEN, all.length)).map(function (it) { return question(it, all); });
    ST = { qs: qs, i: 0, score: 0, t0: Date.now(), done: false, wrong: [], words: [] };
    paint(true);
  }

  function say(slow) { var q = ST.qs[ST.i]; H.speak({ hanzi: q.it.zh }, slow); }

  function paint(auto) {
    var q = ST.qs[ST.i], n = ST.qs.length, ans = q.picked >= 0;
    var opts = q.opts.map(function (o, i) {
      var cl = ans ? (o.ok ? " correct" : (i === q.picked ? " wrong" : " dim")) : "";
      return '<button class="mq-opt ln-opt' + cl + '" data-lo="' + i + '"' + (ans ? " disabled" : "") + ">" + esc(o.vi) + "</button>";
    }).join("");
    var fb = ans ? '<div class="ln-fb">' + (q.opts[q.picked].ok ? '<b class="ok">Chính xác!</b> ' : '<b class="no">Chưa đúng.</b> ') + '<div class="ln-zh">' + esc(q.it.zh) + '</div><div class="ln-py">' + esc(q.it.py) + '</div></div><button class="btn" data-lnext="1">' + (ST.i + 1 >= n ? "Xem kết quả" : "Câu tiếp") + "</button>" : "";
    H.app.innerHTML = '<div style="display:flex;align-items:center;gap:6px"><a class="back" href="#home">' + H.ICONS.back + 'Trang chủ</a><span class="chip" style="margin-left:auto">Câu ' + (ST.i + 1) + "/" + n + '</span></div>' +
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
    var sync = H.record({ lesson: "all", game: "listen-sentence", gameName: "Nghe câu → chọn nghĩa", score: ST.score, total: n, pct: pct, secs: secs, words: [], wrong: ST.wrong.map(function (z, i) { return "Câu " + (i + 1) + ": " + z; }) });
    var msg = pct === 100 ? "Tai nghe cực tốt, không sai câu nào!" : pct >= 70 ? "Nghe khá tốt rồi, luyện thêm nhé." : "Nghe thêm vài lần nữa, bạn sẽ quen dần.";
    var miss = ST.qs.filter(function (q) { return !q.opts[q.picked].ok; }).map(function (q) {
      return '<div class="sr-ex"><span class="zh">' + esc(q.it.zh) + '</span><span class="py">' + esc(q.it.py) + '</span><span class="vi">' + esc(q.it.vi) + "</span></div>";
    }).join("");
    H.app.innerHTML = '<section class="card" style="margin-top:10px"><div class="result"><div class="eyebrow">Luyện nghe</div><div class="score">' + ST.score + "<small>/" + n + '</small></div><h2 class="h1">' + msg + '</h2><div class="sync">' + esc(sync || "") + '</div><div class="rbtns"><button class="btn" data-lagain="1">Luyện tiếp</button><a class="btn ghost" href="#home">Về trang chủ</a></div></div>' +
      (miss ? '<div class="miss"><div class="eyebrow" style="margin-bottom:6px">Câu cần nghe lại</div>' + miss + "</div>" : "") + "</section>";
  }

  function onClick(e) {
    if (H.view() !== "listen") return;
    var t = e.target.closest("button"); if (!t) return;
    if (t.dataset.lplay) return say(false);
    if (t.dataset.lslow) return say(true);
    if (t.dataset.lo) return pick(+t.dataset.lo);
    if (t.dataset.lnext) { if (ST.i + 1 >= ST.qs.length) return finish(); ST.i++; return paint(true); }
    if (t.dataset.lagain) return start();
  }

  window.HD_LISTEN = { init: function (host) { H = host; H.app.addEventListener("click", onClick); }, render: start };
})();
