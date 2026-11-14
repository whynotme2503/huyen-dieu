/* HUYEN DIEU · Tập viết chữ Hán: xem thứ tự nét, tập viết theo nét mờ, tự viết có chấm lỗi.
   Dùng thư viện Hanzi Writer (vendor/hanzi-writer.min.js) và dữ liệu nét trong thư mục chars/.
   Chữ nào chưa có trong chars/ sẽ tự tải từ mạng (jsdelivr) khi có Internet. */
(function () {
  "use strict";
  var H, W = null, cache = {}, CDN = "https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/";

  function esc(s) { return H.esc(s); }
  function hex(ch) { return ch.charCodeAt(0).toString(16); }
  function loadChar(ch) {
    if (cache[ch]) return Promise.resolve(cache[ch]);
    return fetch("chars/" + hex(ch) + ".json").then(function (r) { if (!r.ok) throw new Error("local"); return r.json(); })
      .catch(function () { return fetch(CDN + encodeURIComponent(ch) + ".json").then(function (r) { if (!r.ok) throw new Error("cdn"); return r.json(); }); })
      .then(function (d) { cache[ch] = d; return d; });
  }
  function cssv(n, fb) { var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim(); return v || fb; }

  /* danh sách chữ duy nhất, giữ thứ tự xuất hiện */
  function uniqueChars(words) {
    var seen = {}, out = [];
    words.forEach(function (w) { Array.from(w.hanzi).forEach(function (c) { if (/[㐀-鿿]/.test(c) && !seen[c]) { seen[c] = 1; out.push(c); } }); });
    return out;
  }

  /* hình thứ tự nét: mỗi ô là một nét được nhấn màu, các nét trước màu xám */
  function strokeThumbs(data) {
    var n = data.strokes.length, out = '<div class="wr-thumbs">';
    for (var k = 0; k < n; k++) {
      var paths = "";
      for (var j = 0; j <= k; j++) paths += '<path d="' + data.strokes[j] + '" class="' + (j === k ? "cur" : "old") + '"/>';
      var m = data.medians && data.medians[k] ? data.medians[k][0] : null;
      var num = m ? '<circle cx="' + m[0] + '" cy="' + (900 - m[1]) + '" r="62" class="nc"/><text x="' + m[0] + '" y="' + (900 - m[1] + 38) + '" text-anchor="middle" class="nt">' + (k + 1) + "</text>" : "";
      out += '<figure class="wr-th"><svg viewBox="0 0 1024 1024" aria-label="Nét ' + (k + 1) + '"><line x1="512" y1="0" x2="512" y2="1024" class="gl"/><line x1="0" y1="512" x2="1024" y2="512" class="gl"/><g transform="translate(0,900) scale(1,-1)">' + paths.replace(/ class="/g, ' class="s ') + "</g><g>" + num + "</g></svg><figcaption>" + (k + 1) + "</figcaption></figure>";
    }
    return out + "</div>";
  }

  function wordsWith(ch) { return W.words.filter(function (w) { return w.hanzi.indexOf(ch) >= 0; }).slice(0, 3); }

  function render() {
    var ch = W.chars[W.i], N = W.chars.length, ws = wordsWith(ch), doneN = Object.keys(W.done).length;
    H.app.innerHTML = H.topBar('<span class="eyebrow" style="margin-left:8px">Tập viết chữ Hán</span>') +
      '<section class="card play-card" style="margin-top:10px"><div class="play-meta"><span class="qchip">Chữ ' + (W.i + 1) + "/" + N + '</span><span class="tip">Xem cách viết, rồi tập viết theo nét mờ, cuối cùng tự viết.</span><span class="done-count">Đã tập: ' + doneN + "/" + N + '</span></div><div class="progress"><i style="width:' + (W.i / N * 100) + '%"></i></div>' +
      '<div class="wr-grid"><div class="wr-left"><div class="wr-board" id="wr-board"><div id="wr-target" aria-label="Khung viết chữ ' + esc(ch) + '"></div></div><div class="wr-status" id="wr-status">Đang tải nét chữ…</div></div>' +
      '<div class="wr-right"><div class="wr-head"><span class="wr-ch">' + esc(ch) + '</span><div class="wr-meta"><div class="eyebrow">Có trong từ</div>' + (ws.length ? ws.map(function (w) { return '<div class="wr-w"><span class="hz">' + esc(w.hanzi) + "</span> " + esc(w.pinyin) + " · " + esc(w.vi) + "</div>"; }).join("") : '<div class="wr-w">…</div>') + '<div class="wr-w t" id="wr-count"></div></div></div>' +
      '<div class="eyebrow" style="margin-top:12px">Thứ tự các nét</div><div id="wr-thumbs"><p class="t-empty">Đang tải…</p></div>' +
      '<div class="wr-modes"><button class="btn ghost small" data-w="demo">Xem cách viết</button><button class="btn small" data-w="trace">Tập viết theo nét mờ</button><button class="btn small soft" data-w="free">Tự viết</button><button class="btn ghost small" data-w="say">' + H.ICONS.speaker + 'Nghe</button></div></div></div>' +
      '<div class="afoot"><button class="btn ghost" data-w="prev"' + (W.i === 0 ? " disabled" : "") + '>' + H.ICONS.back + 'Chữ trước</button><button class="btn" data-w="next" style="margin-left:auto">' + (W.i + 1 === N ? "Hoàn thành" : "Chữ sau") + " " + H.ICONS.next + "</button></div></section>";
    mountWriter(ch);
  }

  function setStatus(t, k) { var s = document.getElementById("wr-status"); if (s) { s.textContent = t; s.className = "wr-status" + (k ? " " + k : ""); } }

  function mountWriter(ch) {
    var token = ++W.token;
    if (typeof window.HanziWriter === "undefined") { setStatus("Chưa tải được thư viện tập viết. Kiểm tra kết nối mạng rồi tải lại trang.", "bad"); return; }
    loadChar(ch).then(function (data) {
      if (token !== W.token) return;
      var box = document.getElementById("wr-board"); if (!box) return;
      var size = Math.max(220, Math.min(340, box.clientWidth || 300));
      document.getElementById("wr-thumbs").innerHTML = strokeThumbs(data);
      document.getElementById("wr-count").textContent = data.strokes.length + " nét";
      document.getElementById("wr-target").innerHTML = "";
      W.mode = "demo"; W.strokes = data.strokes.length;
      W.writer = window.HanziWriter.create("wr-target", ch, {
        width: size, height: size, padding: 14, showOutline: true,
        strokeColor: cssv("--ink", "#1f2a2e"), outlineColor: cssv("--line", "#d8d6c8"), drawingColor: cssv("--accent", "#4f7a69"), highlightColor: cssv("--accent", "#4f7a69"),
        drawingWidth: 6, strokeAnimationSpeed: 1.1, delayBetweenStrokes: 260, showHintAfterMisses: 3, highlightOnComplete: true, leniency: 1.1,
        charDataLoader: function (c, ok, err) { loadChar(c).then(ok, err); }
      });
      setStatus("Bấm “Xem cách viết” để xem thứ tự nét, hoặc bắt đầu tập viết.");
    }).catch(function () {
      if (token !== W.token) return;
      setStatus("Chưa có dữ liệu nét cho chữ “" + ch + "”. Cần kết nối Internet để tải.", "bad");
      var t = document.getElementById("wr-thumbs"); if (t) t.innerHTML = '<p class="t-empty">Không có dữ liệu nét.</p>';
    });
  }

  function startQuiz(mode) {
    if (!W.writer) return;
    W.mode = mode; W.mist = 0; W.t0 = Date.now();
    W.writer.cancelQuiz && W.writer.cancelQuiz();
    if (mode === "trace") W.writer.showOutline(); else W.writer.hideOutline();
    setStatus(mode === "trace" ? "Viết theo nét mờ, đúng thứ tự từng nét." : "Tự viết chữ này theo thứ tự nét. Sai 3 lần sẽ có gợi ý.");
    W.writer.quiz({
      onCorrectStroke: function () { H.sfx("pair"); },
      onMistake: function () { W.mist++; H.sfx("no"); setStatus("Chưa đúng, thử lại nét này.", "bad"); },
      onComplete: function () { done(); }
    });
  }

  function done() {
    var ch = W.chars[W.i], total = W.strokes, score = Math.max(0, total - W.mist), pct = total ? Math.round(score / total * 100) : 100;
    W.done[ch] = true; H.sfx(pct >= 70 ? "win" : "meh");
    setStatus("Hoàn thành! " + (W.mist ? "Sai " + W.mist + " lần." : "Không sai nét nào.") + " Bấm “Chữ sau” để tiếp tục.", "ok");
    var d = document.querySelector(".done-count"); if (d) d.textContent = "Đã tập: " + Object.keys(W.done).length + "/" + W.chars.length;
    if (W.onRecord) W.onRecord({ lesson: W.lessonId, game: "write", gameName: "Tập viết chữ Hán", score: score, total: total, pct: pct, secs: Math.floor((Date.now() - W.t0) / 1000), words: [ch], wrong: W.mist ? [ch] : [] });
  }

  function onClick(e) {
    var b = e.target.closest("[data-w]"); if (!b || !W || H.view() !== "write") return;
    var a = b.dataset.w;
    if (a === "demo") { if (!W.writer) return; W.writer.cancelQuiz && W.writer.cancelQuiz(); W.writer.showOutline(); setStatus("Xem thứ tự nét…"); W.writer.animateCharacter({ onComplete: function () { setStatus("Xong. Bấm “Tập viết theo nét mờ” để tự tập."); } }); return; }
    if (a === "trace" || a === "free") return startQuiz(a);
    if (a === "say") return H.speak({ hanzi: W.chars[W.i], audio: "" });
    if (a === "prev" && W.i > 0) { W.i--; return render(); }
    if (a === "next") { if (W.i + 1 >= W.chars.length) { var cb = W.onExit; W = null; return cb && cb(); } W.i++; return render(); }
  }

  /* hình cách viết thu gọn (dùng trong mục Tra từ): thứ tự nét + nút xem lại hoạt ảnh cho từng chữ */
  function inline(el, word) {
    var chars = uniqueChars([{ hanzi: word }]);
    el.innerHTML = chars.map(function (c, i) { return '<div class="wi" data-i="' + i + '"><div class="wi-top"><div class="wi-box" id="wi-' + i + '"></div><div class="wi-side"><span class="wi-ch">' + esc(c) + '</span><button class="btn ghost small" data-wi="' + i + '">Xem lại</button><span class="t-sub wi-n"></span></div></div><div class="wi-th"><p class="t-empty">Đang tải…</p></div></div>'; }).join("");
    chars.forEach(function (c, i) {
      var host = el.querySelector(".wi[data-i='" + i + "']");
      loadChar(c).then(function (data) {
        host.querySelector(".wi-th").innerHTML = strokeThumbs(data);
        host.querySelector(".wi-n").textContent = data.strokes.length + " nét";
        if (typeof window.HanziWriter === "undefined") return;
        var wr = window.HanziWriter.create("wi-" + i, c, { width: 130, height: 130, padding: 8, showOutline: true, strokeColor: cssv("--ink", "#1f2a2e"), outlineColor: cssv("--line", "#d8d6c8"), strokeAnimationSpeed: 1.1, delayBetweenStrokes: 220, charDataLoader: function (ch, ok, err) { loadChar(ch).then(ok, err); } });
        host._w = wr; wr.animateCharacter();
        host.querySelector("[data-wi]").onclick = function () { wr.animateCharacter(); };
      }).catch(function () { host.querySelector(".wi-th").innerHTML = '<p class="t-empty">Chưa có dữ liệu nét cho chữ này (cần mạng để tải).</p>'; });
    });
  }

  window.HD_WRITE = {
    inline: inline,
    init: function (host) { H = host; H.app.addEventListener("click", onClick); },
    chars: uniqueChars,
    start: function (opt) {
      var chars = uniqueChars(opt.target);
      if (!chars.length) { H.toast("Bài này chưa có chữ Hán để tập viết."); return false; }
      W = { chars: chars, words: opt.words, lessonId: opt.lessonId, onRecord: opt.onRecord, onExit: opt.onExit, i: 0, done: {}, token: 0, writer: null, mist: 0, t0: Date.now() };
      render(); return true;
    },
    stop: function () { W = null; }
  };
})();
