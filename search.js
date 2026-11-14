/* HUYEN DIEU · Tra từ: tìm từ đã học bằng chữ Hán, pinyin (có hoặc không dấu) hoặc tiếng Việt.
   Kết quả có nghĩa, ví dụ, ghi chú ngữ pháp (HD_EXTRA trong data.js) và cách viết từng chữ. */
(function () {
  "use strict";
  var H, Q = "", IDX = null;

  function esc(s) { return H.esc(s); }
  function plain(s) { return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase().replace(/[^a-z0-9]/g, ""); }
  function hasHan(s) { return /[㐀-鿿]/.test(s); }

  function build() {
    if (IDX) return IDX;
    IDX = [];
    H.LESSONS.forEach(function (l) {
      if (!l.words) return;
      l.words.forEach(function (w) {
        IDX.push({ w: w, lesson: l.id, py: plain(w.pinyin), vi: plain(w.vi), viRaw: w.vi.toLowerCase(), extra: (window.HD_EXTRA || {})[w.hanzi] || null });
      });
    });
    return IDX;
  }

  function search(raw) {
    var q = raw.trim(); if (!q) return [];
    var out = [];
    if (hasHan(q)) {
      build().forEach(function (x) {
        var h = x.w.hanzi, s = h === q ? 0 : h.indexOf(q) === 0 ? 1 : h.indexOf(q) > 0 ? 2 : q.indexOf(h) >= 0 ? 3 : -1;
        if (s < 0 && x.extra) { var hit = (x.extra.ex || []).some(function (e) { return e[0].indexOf(q) >= 0; }); if (hit) s = 4; }
        if (s >= 0) out.push({ x: x, s: s });
      });
    } else {
      var p = plain(q); if (!p) return [];
      build().forEach(function (x) {
        var s = -1;
        if (x.py === p || x.vi === p) s = 0;
        else if (x.py.indexOf(p) === 0 || x.vi.indexOf(p) === 0) s = 1;
        else if (x.py.indexOf(p) > 0 || x.vi.indexOf(p) > 0) s = 2;
        if (s >= 0) out.push({ x: x, s: s });
      });
    }
    out.sort(function (a, b) { return a.s - b.s || a.x.w.hanzi.length - b.x.w.hanzi.length; });
    return out.slice(0, 30).map(function (o) { return o.x; });
  }

  function card(x, i) {
    var w = x.w, ex = x.extra, exH = "", gr = "";
    if (ex && ex.ex && ex.ex.length) exH = '<div class="sr-sec"><div class="eyebrow">Ví dụ</div>' + ex.ex.map(function (e) { return '<div class="sr-ex"><span class="zh">' + esc(e[0]) + '</span><span class="py">' + esc(e[1]) + '</span><span class="vi">' + esc(e[2]) + "</span></div>"; }).join("") + "</div>";
    if (ex && ex.gram) gr = '<div class="sr-sec"><div class="eyebrow">Ngữ pháp</div><p class="sr-gram">' + esc(ex.gram) + "</p></div>";
    return '<article class="card sr-card" data-i="' + i + '"><div class="sr-head"><span class="sr-hz">' + esc(w.hanzi) + '</span><div class="sr-m"><div class="sr-py">' + esc(w.pinyin) + '</div><div class="sr-vi">' + esc(w.vi) + '</div><div class="t-sub">Bài ' + x.lesson + '</div></div><button class="spk" data-sr="say" aria-label="Nghe">' + H.ICONS.speaker + "</button></div>" +
      exH + gr + '<div class="sr-btns"><button class="btn ghost small" data-sr="strokes">Cách viết</button><button class="btn small soft" data-sr="practice">Luyện viết</button></div><div class="sr-strokes" hidden></div></article>';
  }

  function results() {
    var el = document.getElementById("sr-out"); if (!el) return;
    var q = Q.trim();
    if (!q) { el.innerHTML = '<p class="sub sr-hint">Gõ chữ Hán, pinyin (có dấu hoặc không dấu) hoặc nghĩa tiếng Việt. Ví dụ: <b>你好</b>, <b>xuesheng</b>, <b>cảm ơn</b>.</p>'; return; }
    var rs = search(q); el.__rs = rs;
    el.innerHTML = rs.length ? '<div class="eyebrow" style="margin:6px 0 10px">' + rs.length + ' kết quả</div>' + rs.map(card).join("") : '<section class="card"><p class="sub" style="margin:0">Không thấy từ nào khớp với “' + esc(q) + '”. Thử gõ pinyin không dấu hoặc một phần của nghĩa nhé. Web chỉ tra các từ đã có trong bài học.</p></section>';
  }

  function render() {
    build();
    H.app.innerHTML = '<div class="home-head"><h1 class="h1">Tra từ</h1><p class="sub">Tìm trong ' + IDX.length + ' từ đã học bằng chữ Hán, pinyin hoặc tiếng Việt.</p></div>' +
      '<div class="sr-box"><input id="sr-q" class="t-input sr-input" type="search" placeholder="Ví dụ: 你好, nihao, cảm ơn" value="' + esc(Q) + '" autocomplete="off" autocapitalize="off" spellcheck="false" enterkeyhint="search"></div><div id="sr-out"></div>';
    results();
    var inp = document.getElementById("sr-q"); if (inp && !Q) { try { inp.focus({ preventScroll: true }); } catch (e) { /* bỏ qua */ } }
  }

  function onInput(e) { if (e.target.id !== "sr-q" || H.view() !== "search") return; Q = e.target.value; results(); }
  function onClick(e) {
    var b = e.target.closest("[data-sr]"); if (!b || H.view() !== "search") return;
    var card = b.closest(".sr-card"), out = document.getElementById("sr-out"), x = out && out.__rs ? out.__rs[+card.dataset.i] : null; if (!x) return;
    var a = b.dataset.sr;
    if (a === "say") return H.speak(x.w);
    if (a === "strokes") {
      var box = card.querySelector(".sr-strokes");
      if (!box.hidden) { box.hidden = true; b.textContent = "Cách viết"; return; }
      box.hidden = false; b.textContent = "Ẩn cách viết";
      if (!box.dataset.ready) { box.dataset.ready = "1"; if (window.HD_WRITE && window.HD_WRITE.inline) window.HD_WRITE.inline(box, x.w.hanzi); }
      return;
    }
    if (a === "practice") return H.writeWord(x.w, function () { render(); });
  }

  window.HD_SEARCH = {
    init: function (host) { H = host; H.app.addEventListener("input", onInput); H.app.addEventListener("click", onClick); },
    render: render
  };
})();
