/* HUYEN DIEU · logic game. Dữ liệu bài học nằm trong data.js, file này thường không cần sửa. */
(function () {
  "use strict";
  var CFG = window.HD_CONFIG, RAW = window.HD_LESSONS;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var app = $("#app");

  /* ---------- dữ liệu ---------- */
  var LESSONS = RAW.map(function (l) {
    return {
      id: l.id, topic: l.topic || "",
      words: (l.words || []).map(function (w) {
        return { hanzi: w[0], pinyin: w[1], vi: w[2] || "", audio: w[3] || "", lesson: l.id };
      })
    };
  });
  var ALL = [].concat.apply([], LESSONS.map(function (l) { return l.words; }));
  var openLessons = LESSONS.filter(function (l) { return l.words.length; });

  /* ---------- tiện ích ---------- */
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function fmtTime(s) { var m = Math.floor(s / 60), r = s % 60; return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r; }
  var toastTimer;
  function toast(msg) { var t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.hidden = true; }, 2600); }

  var ICONS = {
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l13-7.5z"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/></svg>',
    chars: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h16M12 4v16M6 14c2 0 4 1 6 4M18 14c-2 0-4 1-6 4"/></svg>',
    abc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18l4-12 4 12M5.5 14h5M15 6v12M15 9h3a3 3 0 0 1 0 6h-3"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/></svg>',
    match: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="6" height="6" rx="1.5"/><rect x="15" y="14" width="6" height="6" rx="1.5"/><path d="M9 7h3a3 3 0 0 1 3 3v4"/></svg>',
    cards: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="14" height="14" rx="2.5"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/></svg>',
    pen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
    keys: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M7 14h10"/></svg>',
    shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h4v4M4 20 20 4M20 16v4h-4M4 4l5 5M15 15l5 5"/></svg>'
  };

  /* ---------- tiến độ (lưu trong trình duyệt) ---------- */
  var api = window.HD_API_CLIENT, SESSION = null, MY = { results: [], assignments: [] }, curAssign = null, queue = [], flushing = false;
  try { SESSION = JSON.parse(localStorage.getItem("hd-session") || "null"); } catch (e) { SESSION = null; }
  function bestOf(lid, gid) {
    var best = 0, plays = 0;
    MY.results.forEach(function (r) { if (String(r.lesson) === String(lid) && r.game === gid) { plays++; if (r.pct > best) best = r.pct; } });
    return plays ? { best: best, plays: plays } : null;
  }

  /* ---------- hiệu ứng âm thanh (tạo bằng WebAudio, không cần file) ---------- */
  var muted = false, actx = null;
  try { muted = localStorage.getItem("hd-muted") === "1"; } catch (e) { /* bỏ qua */ }
  function paintMute() {
    var b = $("#mute"); if (!b) return;
    b.classList.toggle("off", muted);
    b.innerHTML = muted
      ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M22 9l-6 6M16 9l6 6"/></svg>'
      : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H3v6h3l5 4V5z" fill="currentColor"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/></svg>';
  }
  function beep(f, t0, dur, type, vol) {
    var o = actx.createOscillator(), g = actx.createGain(), t = actx.currentTime + t0;
    o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.16, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + dur + 0.02);
  }
  var SEQ = {
    ok: [[660, 0, .1], [880, .09, .16]],
    combo: [[660, 0, .08], [880, .07, .08], [1175, .14, .2]],
    no: [[250, 0, .14, "triangle", .2], [180, .12, .22, "triangle", .2]],
    pair: [[740, 0, .08], [988, .08, .12]],
    flip: [[520, 0, .05, "triangle", .1]],
    win: [[523, 0, .12], [659, .11, .12], [784, .22, .12], [1047, .33, .32]],
    meh: [[392, 0, .14], [330, .14, .24]]
  };
  function sfx(name) {
    if (muted) return;
    try {
      if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
      if (actx.state === "suspended") actx.resume();
      (SEQ[name] || []).forEach(function (n) { beep(n[0], n[1], n[2], n[3], n[4]); });
    } catch (e) { /* bỏ qua */ }
  }

  /* ---------- âm thanh ---------- */
  var zhVoice = null, voiceWarned = false, curAudio = null, hasTTS = "speechSynthesis" in window;
  function pickVoice() {
    if (!hasTTS) return;
    var vs = speechSynthesis.getVoices();
    zhVoice = vs.filter(function (v) { return /zh[-_]CN/i.test(v.lang); })[0] || vs.filter(function (v) { return /^zh/i.test(v.lang); })[0] || null;
  }
  if (hasTTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(w) {
    try { if (curAudio) { curAudio.pause(); curAudio = null; } if (hasTTS) speechSynthesis.cancel(); } catch (e) { /* bỏ qua */ }
    if (w.audio) {
      var a = new Audio((CFG.audioBase || "") + w.audio); curAudio = a;
      a.play().catch(function () { tts(w); });
      return;
    }
    tts(w);
  }
  function tts(w) {
    if (!hasTTS) { toast("Thiết bị này chưa hỗ trợ đọc tiếng Trung."); return; }
    if (!zhVoice && !voiceWarned && speechSynthesis.getVoices().length) { voiceWarned = true; toast("Máy bạn chưa có giọng đọc tiếng Trung nên âm thanh có thể không rõ. Hãy cài thêm giọng tiếng Trung trong Cài đặt của máy."); }
    var u = new SpeechSynthesisUtterance(w.hanzi);
    u.lang = "zh-CN"; u.rate = 0.8; if (zhVoice) u.voice = zhVoice;
    u.onerror = function () { toast("Không phát được âm thanh. Thử bật giọng đọc tiếng Trung trong cài đặt thiết bị."); };
    speechSynthesis.speak(u);
  }

  /* ---------- pinyin: đổi thanh điệu để tạo đáp án gây nhiễu ---------- */
  var TONES = { a: "āáǎà", e: "ēéěè", i: "īíǐì", o: "ōóǒò", u: "ūúǔù", "ü": "ǖǘǚǜ" }, MARK = {};
  Object.keys(TONES).forEach(function (b) { Array.from(TONES[b]).forEach(function (c, i) { MARK[c] = [b, i + 1]; }); });
  function toneVariants(py) {
    var chars = Array.from(py), out = [];
    chars.forEach(function (c, i) {
      if (!MARK[c]) return;
      for (var n = 1; n <= 4; n++) { if (n === MARK[c][1]) continue; var c2 = chars.slice(); c2[i] = TONES[MARK[c][0]][n - 1]; out.push(c2.join("")); }
    });
    return shuffle(out);
  }
  function plain(s) { return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/v/g, "u").replace(/[0-9\s'’\-]/g, ""); }

  /* ---------- danh sách game ---------- */
  var GAMES = [
    { id: "listen-hanzi", name: "Nghe → chọn chữ Hán", desc: "Nghe âm thanh, chọn đúng mặt chữ.", icon: "speaker", kind: "quiz", prompt: "audio", answer: "hanzi", type: "Nghe" },
    { id: "listen-pinyin", name: "Nghe → chọn pinyin", desc: "Nghe và phân biệt thanh điệu.", icon: "list", kind: "quiz", prompt: "audio", answer: "pinyin", type: "Nghe" },
    { id: "hanzi-pinyin", name: "Chữ Hán → pinyin", desc: "Nhìn chữ, chọn phiên âm đúng.", icon: "chars", kind: "quiz", prompt: "hanzi", answer: "pinyin", type: "Mặt chữ" },
    { id: "pinyin-hanzi", name: "Pinyin → chữ Hán", desc: "Đọc pinyin, nhận ra mặt chữ.", icon: "abc", kind: "quiz", prompt: "pinyin", answer: "hanzi", type: "Pinyin" },
    { id: "match", name: "Ghép cặp", desc: "Nối chữ Hán với pinyin tương ứng.", icon: "match", kind: "match", type: "Mặt chữ" },
    { id: "dictation", name: "Nghe → gõ chữ Hán", desc: "Nghe rồi gõ lại bằng chữ Hán (cần bàn phím tiếng Trung).", icon: "keys", kind: "type", type: "Nghe" },
    { id: "write", name: "Tập viết chữ Hán", desc: "Xem thứ tự nét, tập viết ngay trên màn hình.", icon: "pen", kind: "write", type: "Viết" },
    { id: "flash", name: "Thẻ ghi nhớ", desc: "Lật thẻ, tự chấm đã nhớ hay chưa.", icon: "cards", kind: "flash", type: "Ôn nhanh" }
  ];
  window.HD_GAMES = GAMES;
  function gameById(id) { return GAMES.filter(function (g) { return g.id === id; })[0]; }

  /* ---------- trạng thái ---------- */
  var S = { view: "home", lesson: null, game: null }, timerId = null;
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }
  function lessonById(id) {
    if (id === "all") return { id: "all", title: "Tổng hợp", topic: "Trộn từ tất cả bài", words: ALL };
    var l = LESSONS.filter(function (x) { return String(x.id) === String(id); })[0];
    return l ? { id: l.id, title: "Bài " + l.id, topic: l.topic, words: l.words } : null;
  }
  function setRight(html) { $("#hdr-right").innerHTML = html || ""; paintNav(); }

  /* ---------- điều hướng ---------- */
  function nav(h) { if (location.hash === h) route(); else location.hash = h; }
  function route() {
    stopTimer(); if (window.HD_WRITE) window.HD_WRITE.stop();
    try { if (hasTTS) speechSynthesis.cancel(); } catch (e) { /* bỏ qua */ }
    var h = location.hash.replace("#", "");
    if (!SESSION) return renderLogin();
    if (!h && SESSION.role === "teacher") h = "giao-vien";
    if (h === "giao-vien" && SESSION.role === "teacher") { S.view = "teacher"; setRight(""); return window.HD_TEACHER.render(); }
    if (h === "lich-su" && SESSION.role === "student") return renderHistory();
    if (h === "tu-vung") return renderVocab();
    if (h === "bai-tap") return renderAssignments();
    if (!/^(bai-\d+|tong-hop)$/.test(h)) curAssign = null;
    var m = /^bai-(\d+)$/.exec(h);
    if (m && lessonById(m[1]) && lessonById(m[1]).words.length) return renderLesson(lessonById(m[1]));
    if (h === "tong-hop" && ALL.length) return renderLesson(lessonById("all"));
    renderHome();
  }
  window.addEventListener("hashchange", route);

  /* ---------- trang chủ ---------- */
  function playedCount(lid) { return GAMES.filter(function (g) { return bestOf(lid, g.id); }).length; }
  function renderVocab() {
    S.view = "vocab"; curAssign = null;
    setRight('<span class="chip">HSK 1 · ' + openLessons.length + "/" + LESSONS.length + " bài</span>");
    var html = previewBanner() + '<div class="home-head"><h1 class="h1">Từ vựng HSK 1</h1><p class="sub">Chọn một bài, mỗi bài có nhiều trò chơi: nghe, mặt chữ và pinyin.</p></div><div class="lesson-grid">';
    if (openLessons.length > 1) {
      html += '<button class="lcard all" data-go="tong-hop"><span class="ico">' + ICONS.shuffle + '</span><span><span class="name">Ôn tổng hợp</span><br><span class="meta">Trộn ' + ALL.length + " từ của " + openLessons.length + ' bài đã học</span></span><span class="go pill" style="background:var(--panel-2);color:var(--panel-ink)">Chơi ngay</span></button>';
    }
    LESSONS.forEach(function (l) {
      if (l.words.length) {
        var p = playedCount(l.id), pct = Math.round(p / GAMES.length * 100);
        html += '<button class="lcard" data-go="bai-' + l.id + '"><span class="num">' + l.id + '</span><span class="name">Bài ' + l.id + '</span><span class="meta">' + esc(l.topic || "HSK 1") + " · " + l.words.length + ' từ</span><span class="meta">' + p + "/" + GAMES.length + ' game đã chơi</span><span class="bar"><i style="width:' + pct + '%"></i></span></button>';
      } else {
        html += '<div class="lcard locked" aria-disabled="true"><span class="num">' + l.id + '</span><span class="name">Bài ' + l.id + '</span><span class="meta">Chưa có từ vựng</span><span><span class="pill">Sắp có</span></span></div>';
      }
    });
    app.innerHTML = html + "</div>";
  }


  /* ---------- trang chủ (trang chào) và thanh điều hướng ---------- */
  var MQ = { q: null, answered: false }, qShift = 0;
  var NAV = [
    { id: "home", label: "Trang chủ", href: "#home" },
    { id: "tu-vung", label: "Từ vựng", href: "#tu-vung" },
    { id: "bai-tap", label: "Bài tập", href: "#bai-tap" },
    { id: "bai-khoa", label: "Bài khóa", soon: true },
    { id: "luyen-nghe", label: "Luyện nghe", soon: true }
  ];
  function paintNav() {
    var n = $("#mainnav"); if (!n) return;
    if (!SESSION || S.view === "login" || S.view === "teacher") { n.hidden = true; return; }
    n.hidden = false;
    var act = S.view === "home" ? "home" : S.view === "assign" ? "bai-tap" : S.view === "history" ? "" : (curAssign ? "bai-tap" : "tu-vung"), pend = pendingCount();
    n.innerHTML = NAV.map(function (it) {
      if (it.soon) return '<span class="nv soon" aria-disabled="true">' + it.label + "<small>Sắp có</small></span>";
      return '<a class="nv' + (it.id === act ? " on" : "") + '" href="' + it.href + '"' + (it.id === act ? ' aria-current="page"' : "") + ">" + it.label + (it.id === "bai-tap" && pend ? '<b class="dot">' + pend + "</b>" : "") + "</a>";
    }).join("");
  }
  function localDay(d) { return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function streakInfo() {
    var days = {}; MY.results.forEach(function (r) { days[localDay(new Date(r.t))] = 1; });
    var d = new Date(), today = !!days[localDay(d)], n = 0;
    if (!today) d.setDate(d.getDate() - 1);
    while (days[localDay(d)]) { n++; d.setDate(d.getDate() - 1); }
    return { n: n, today: today };
  }
  function weakWords() {
    var m = {};
    MY.results.forEach(function (r) {
      if (r.game === "write" || !r.words) return;
      var wr = {}; (r.wrong || []).forEach(function (h) { wr[h] = 1; });
      var ts = new Date(r.t).getTime();
      r.words.forEach(function (h) { var x = m[h] || (m[h] = { seen: 0, wrong: 0, last: 0 }); x.seen++; if (wr[h]) { x.wrong++; if (ts > x.last) x.last = ts; } });
    });
    return Object.keys(m).map(function (h) { var x = m[h]; x.h = h; x.rate = x.wrong / x.seen; return x; })
      .filter(function (x) { return x.wrong >= 1 && x.rate >= 0.25; })
      .sort(function (a, b) { return b.rate - a.rate || b.last - a.last; }).slice(0, 10)
      .map(function (x) { return ALL.filter(function (w) { return w.hanzi === x.h; })[0]; }).filter(Boolean);
  }
  function startWeak() {
    var ws = weakWords(); if (ws.length < 2) { toast("Chưa có đủ từ cần ôn."); return; }
    var pick = ["listen-hanzi", "hanzi-pinyin", "listen-pinyin", "pinyin-hanzi"][Math.floor(Math.random() * 4)];
    S = { view: "home", lesson: lessonById("all") }; curAssign = null; startGame(pick, ws);
  }
  function dayNum() { var d = new Date(); return Math.floor(new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() / 86400000); }
  function greeting() { var h = new Date().getHours(); return h < 11 ? "Chào buổi sáng" : h < 14 ? "Chào buổi trưa" : h < 18 ? "Chào buổi chiều" : "Chào buổi tối"; }
  function dailyQuote() { var Q = window.HD_QUOTES || []; return Q.length ? Q[(dayNum() + qShift) % Q.length] : null; }
  function newMini() {
    if (!ALL.length) { MQ.q = null; return; }
    var w = ALL[(dayNum() * 7 + qShift * 3 + Math.floor(Math.random() * 1000)) % ALL.length];
    MQ.q = buildQuestion(gameById("listen-hanzi"), w, ALL); MQ.answered = false;
  }
  function miniHtml() {
    if (!MQ.q) return '<p class="sub" style="margin:0">Chưa có từ vựng để luyện.</p>';
    var q = MQ.q;
    return '<p class="sub" style="margin:0 0 10px">Nghe và chọn chữ Hán đúng.</p><button class="mq-spk" data-mqspeak="1">' + ICONS.speaker + ' Nghe</button><div class="mq-opts">' + q.opts.map(function (o, i) {
      var cl = MQ.answered ? (o.ok ? " correct" : (o.picked ? " wrong" : " dim")) : "";
      return '<button class="mq-opt' + cl + '" data-mq="' + i + '"' + (MQ.answered ? " disabled" : "") + ">" + esc(o.text) + "</button>";
    }).join("") + '</div><div class="mq-fb">' + (MQ.answered ? (q.opts.filter(function (o) { return o.picked; })[0].ok ? '<b class="ok">Chính xác!</b> ' : '<b class="no">Chưa đúng.</b> ') + '<span class="hzs">' + esc(q.w.hanzi) + "</span> · " + esc(q.w.pinyin) + " — " + esc(q.w.vi) : "") + "</div>";
  }
  function renderHome() {
    S.view = "home"; curAssign = null; setRight("");
    var first = SESSION.role === "teacher" ? "thầy/cô" : SESSION.name.trim().split(/\s+/).slice(-1)[0];
    var q = dailyQuote(), pend = pendingCount();
    if (!MQ.q) newMini();
    var hero = q ? '<section class="hero" data-char="' + esc(q[0].charAt(0)) + '"><div class="hero-top"><span class="pchip">CÂU NÓI HÔM NAY</span></div><div class="hero-q">' + esc(q[0]) + '</div><div class="hero-py">' + esc(q[1]) + '</div><div class="hero-vi">' + esc(q[2]) + '</div><div class="hero-btns"><button class="hbtn" data-quote="speak">' + ICONS.speaker + 'Nghe</button><button class="hbtn ghost" data-quote="next">Câu khác</button></div></section>' : "";
    var tiles = '<div class="hub-tiles"><a class="htile" href="#tu-vung"><span class="hn">' + openLessons.length + '</span><span class="hl">Từ vựng</span><span class="hs">' + ALL.length + ' từ · ' + GAMES.length + ' game</span></a>' +
      '<a class="htile' + (pend ? " alert" : "") + '" href="#bai-tap"><span class="hn">' + pend + '</span><span class="hl">Bài tập</span><span class="hs">' + (pend ? "bài chưa làm" : "đã làm hết") + '</span></a>' +
      '<span class="htile soon"><span class="hn">…</span><span class="hl">Bài khóa</span><span class="hs">Sắp có</span></span><span class="htile soon"><span class="hn">…</span><span class="hl">Luyện nghe</span><span class="hs">Sắp có</span></span></div>';
    var st = SESSION.role === "student" ? streakInfo() : null, weak = SESSION.role === "student" ? weakWords() : [];
    var streak = st ? '<span class="streak' + (st.n ? " on" : "") + '">' + (st.n ? "Chuỗi " + st.n + " ngày" + (st.today ? "" : " · hôm nay chưa luyện") : "Hôm nay hãy luyện một lượt nhé") + "</span>" : "";
    var weakCard = SESSION.role === "student" ? '<section class="card hub-card weakbox"><div class="eyebrow">Ôn từ hay sai hôm nay</div>' + (weak.length >= 2 ? '<div class="weak-chips">' + weak.map(function (w) { return '<span class="wc"><span class="hz">' + esc(w.hanzi) + "</span>" + esc(w.pinyin) + "</span>"; }).join("") + '</div><button class="btn small" data-weak="1">Ôn ' + weak.length + " từ này</button>" : '<p class="sub" style="margin:6px 0 0">Chưa có từ nào cần ôn lại. Làm thêm vài bài, web sẽ gợi ý các từ bạn hay nhầm.</p>') + "</section>" : "";
    app.innerHTML = previewBanner() + '<div class="home-head"><div class="hh-row"><h1 class="h1">' + greeting() + ", " + esc(first) + '!</h1>' + streak + '</div><p class="sub">' + (SESSION.role === "student" && pend ? "Bạn có " + pend + " bài tập chưa làm. " : "") + 'Hôm nay học một chút nhé.</p></div>' + hero + weakCard +
      '<div class="hub-grid"><section class="card hub-card"><div class="eyebrow">Bài tập nhỏ hôm nay</div><div id="mini">' + miniHtml() + '</div><button class="btn ghost small" data-mq-new="1" style="margin-top:12px">Câu khác</button></section><section class="card hub-card"><div class="eyebrow">Đi tới</div>' + tiles + "</section></div>";
  }

  /* ---------- trang bài học ---------- */
  function renderLesson(L) {
    S.view = "lesson"; S.lesson = L;
    setRight('<span class="chip">' + L.words.length + " từ</span>");
    var rows = L.words.map(function (w, i) {
      return '<div class="wrow"><span class="hz">' + esc(w.hanzi) + '</span><span><span class="py">' + esc(w.pinyin) + (L.id === "all" ? '<span class="tag">B' + w.lesson + "</span>" : "") + '</span><br><span class="vi">' + esc(w.vi) + '</span></span><span class="rowbtns"><button class="spk" data-write="' + i + '" aria-label="Tập viết ' + esc(w.hanzi) + '" title="Tập viết">' + ICONS.pen + '</button><button class="spk" data-say="' + i + '" aria-label="Nghe ' + esc(w.hanzi) + '">' + ICONS.speaker + "</button></span></div>";
    }).join("");
    var cards = GAMES.map(function (g) {
      var b = bestOf(L.id, g.id);
      var best = b && b.plays ? "Điểm cao nhất: <b>" + b.best + "%</b> · " + b.plays + " lượt" : "Chưa chơi";
      return '<button class="gcard" data-game="' + g.id + '"><span class="gico">' + ICONS[g.icon] + '</span><span class="gtype">' + g.type + '</span><span class="gname">' + g.name + '</span><span class="gdesc">' + g.desc + '</span><span class="gbest">' + best + "</span></button>";
    }).join("");
    app.innerHTML = '<button class="back" data-go="tu-vung">' + ICONS.back + 'Từ vựng</button>' +
      '<div class="lesson-title"><h1 class="h1">' + (L.id === "all" ? "Ôn tổng hợp" : "Bài " + L.id + (L.topic ? " · " + esc(L.topic) : "")) + '</h1><p class="sub">Chọn một trò chơi để bắt đầu.</p></div>' +
      '<div class="lesson-wrap"><section class="card"><div class="eyebrow">Từ vựng · nhấn loa để nghe</div><div class="wlist">' + rows + '</div></section>' +
      '<section><div class="eyebrow section-label">Trò chơi</div><div class="games">' + cards + "</div></section></div>";
  }

  /* ---------- bắt đầu game ---------- */
  function startGame(gid, words) {
    var g = gameById(gid), L = S.lesson, pool = L.words;
    var n = words ? words.length : (g.kind === "match" ? Math.min(CFG.matchPairs, pool.length) : g.kind === "flash" ? pool.length : Math.min(CFG.questionsPerRound, pool.length));
    var round = words ? shuffle(words) : shuffle(pool).slice(0, n);
    S = { view: "game", lesson: L, game: g, round: round, i: 0, score: 0, answered: false, mistakes: [], t0: Date.now(), pool: pool, streak: 0, hints: 3 };
    stopTimer();
    setRight('<span class="chip mono">' + ICONS.clock + '<span id="timer">00:00</span></span>');
    timerId = setInterval(function () { var t = $("#timer"); if (t) t.textContent = fmtTime(Math.floor((Date.now() - S.t0) / 1000)); }, 1000);
    if (g.kind === "write") {
      S.view = "write";
      var okw = window.HD_WRITE && window.HD_WRITE.start({ target: words || pool, words: pool, lessonId: S.lesson.id, onRecord: record, onExit: function () { stopTimer(); renderLesson(S.lesson); } });
      if (!okw) { stopTimer(); renderLesson(S.lesson); }
      return;
    }
    if (g.kind === "match") return renderMatch();
    if (g.kind === "flash") { S.flipped = false; return renderFlash(); }
    if (g.kind === "type") return renderType();
    S.qs = round.map(function (w) { return buildQuestion(g, w, pool); });
    renderQuiz();
  }

  /* ---------- tạo câu hỏi trắc nghiệm ---------- */
  function fillFrom(list, key, taken, need) {
    var out = [];
    shuffle(list).forEach(function (x) { if (out.length < need && taken.indexOf(x[key]) < 0 && out.indexOf(x[key]) < 0) out.push(x[key]); });
    return out;
  }
  function buildQuestion(g, w, pool) {
    var opts = [];
    if (g.answer === "hanzi") {
      var bad = function (x) { return x.hanzi === w.hanzi || x.pinyin === w.pinyin; };
      var d = fillFrom(pool.filter(function (x) { return !bad(x); }), "hanzi", [w.hanzi], 3);
      if (d.length < 3) d = d.concat(fillFrom(ALL.filter(function (x) { return !bad(x); }), "hanzi", [w.hanzi].concat(d), 3 - d.length));
      opts = [w.hanzi].concat(d);
    } else {
      var vs = toneVariants(w.pinyin).slice(0, 2), taken = [w.pinyin].concat(vs);
      var others = fillFrom(pool.filter(function (x) { return x.pinyin !== w.pinyin; }), "pinyin", taken, 3 - vs.length);
      if (others.length < 3 - vs.length) others = others.concat(fillFrom(ALL, "pinyin", taken.concat(others), 3 - vs.length - others.length));
      opts = [w.pinyin].concat(vs, others);
    }
    var items = shuffle(opts).map(function (t) { return { text: t, ok: t === (g.answer === "hanzi" ? w.hanzi : w.pinyin) }; });
    return { w: w, opts: items };
  }

  function topBar(extra) {
    return '<div style="display:flex;align-items:center;gap:6px">' + '<button class="back" data-leave="1">' + ICONS.back + (S.lesson.id === "all" ? "Ôn tổng hợp" : "Bài " + S.lesson.id) + "</button>" + (extra || "") + "</div>";
  }

  /* ---------- game trắc nghiệm ---------- */
  function renderQuiz() {
    var g = S.game, q = S.qs[S.i], w = q.w, N = S.qs.length;
    var left;
    if (g.prompt === "audio") {
      left = '<span class="pchip">PINYIN DRILL AUDIO</span><button class="bigspk" data-replay="1" aria-label="Phát âm thanh">' + ICONS.speaker + '</button><div><div class="ptitle">Nghe và chọn đáp án</div><div class="psub">Nhấn loa hoặc phím <kbd>R</kbd> để nghe lại</div></div>';
    } else if (g.prompt === "hanzi") {
      left = '<span class="pchip">CHỮ HÁN</span><div class="pbig-hz">' + esc(w.hanzi) + '</div>';
    } else {
      left = '<span class="pchip">PINYIN</span><div class="pbig-py">' + esc(w.pinyin) + "</div>";
    }
    var opts = q.opts.map(function (o, i) {
      return '<button class="opt" data-opt="' + i + '"><span class="key">' + "ABCD"[i] + '</span><span class="txt ' + (g.answer === "hanzi" ? "hz" : "py") + '">' + esc(o.text) + "</span></button>";
    }).join("");
    app.innerHTML = topBar('<span class="eyebrow" style="margin-left:8px">' + g.name + "</span>") +
      '<section class="card play-card" style="margin-top:10px"><div class="play-meta"><span class="qchip">Câu ' + (S.i + 1) + "/" + N + '</span><span class="tip">Mẹo: phím <kbd>1-4</kbd> để chọn, <kbd>Enter</kbd> câu tiếp, <kbd>R</kbd> nghe lại.</span><span class="done-count">' + ICONS.list.replace("<svg", '<svg style="width:16px;height:16px;vertical-align:-3px;margin-right:6px"') + "Đã làm: " + S.i + "/" + N + '</span></div>' +
      '<div class="progress"><i style="width:' + (S.i / N * 100) + '%"></i></div>' +
      '<div class="play"><div class="panel">' + left + '<div class="feedback" id="fb"></div><button class="play-btn" data-replay="1">' + ICONS.play + "Phát âm thanh</button></div>" +
      '<div class="answers"><div class="alabel">Chọn ' + (g.answer === "hanzi" ? "chữ Hán" : "phiên âm pinyin") + ' đúng:</div><div class="opts">' + opts + '</div><div class="afoot"><button class="btn ghost" id="hint" style="margin-right:auto"' + (S.hints ? "" : " disabled") + '>Gợi ý 50:50 (' + S.hints + ')</button><button class="btn" id="next" disabled>' + (S.i + 1 === N ? "Xem kết quả" : "Câu tiếp") + " " + ICONS.next + "</button></div></div></div></section>";
    S.answered = false;
    if (g.prompt === "audio") setTimeout(function () { speak(w); }, 150);
  }
  function pick(i) {
    if (S.answered || S.game.kind !== "quiz") return;
    var q = S.qs[S.i]; if (!q.opts[i] || q.opts[i].off) return;
    S.answered = true;
    var ok = q.opts[i].ok, btns = app.querySelectorAll(".opt");
    btns.forEach(function (b, k) {
      b.disabled = true;
      if (q.opts[k].ok) b.classList.add("correct"); else if (k === i) b.classList.add("wrong"); else b.classList.add("dim");
    });
    if (ok) { S.score++; S.streak++; } else { S.mistakes.push(q.w); S.streak = 0; }
    sfx(ok ? (S.streak >= 3 ? "combo" : "ok") : "no");
    showFeedback(q.w, ok);
    var hb = $("#hint"); if (hb) hb.disabled = true;
    var nx = $("#next"); nx.disabled = false; nx.focus();
  }
  function showFeedback(w, ok) {
    $("#fb").innerHTML = '<div class="' + (ok ? "ok" : "no") + '">' + (ok ? "Chính xác!" : "Chưa đúng") + (ok && S.streak >= 3 ? '<span class="combo">Chuỗi ' + S.streak + " câu đúng</span>" : "") + '</div><div class="ans"><span class="hz">' + esc(w.hanzi) + '</span> · <span class="py">' + esc(w.pinyin) + "</span> — " + esc(w.vi) + "</div>";
  }
  function useHint() {
    if (S.answered) return;
    if (S.game.kind === "type") {
      var w = S.round[S.i], t = $("#hinttxt"); if (t) t.textContent = "Gợi ý: " + w.hanzi.length + " chữ, bắt đầu bằng “" + w.hanzi.charAt(0) + "”, nghĩa là: " + w.vi + ".";
      var hb = $("#hint"); if (hb) hb.disabled = true; var inp = $("#ans"); if (inp) inp.focus(); return;
    }
    if (S.game.kind !== "quiz" || S.hints <= 0) return;
    var q = S.qs[S.i], wrong = shuffle(q.opts.map(function (o, k) { return k; }).filter(function (k) { return !q.opts[k].ok && !q.opts[k].off; })).slice(0, 2);
    if (wrong.length < 2) { toast("Câu này không còn đủ đáp án để loại."); return; }
    S.hints--;
    var btns = app.querySelectorAll(".opt");
    wrong.forEach(function (k) { q.opts[k].off = true; btns[k].disabled = true; btns[k].classList.add("dim"); });
    var hb2 = $("#hint"); hb2.textContent = "Gợi ý 50:50 (" + S.hints + ")"; hb2.disabled = true;
  }
  function next() {
    S.i++;
    if (S.i >= S.round.length) return finish();
    if (S.game.kind === "quiz") renderQuiz(); else if (S.game.kind === "type") renderType(); else if (S.game.kind === "flash") { S.flipped = false; renderFlash(); }
  }
  function replay() { var w = S.game.kind === "quiz" ? S.qs[S.i].w : S.round[S.i]; if (w) speak(w); }

  /* ---------- game nghe → gõ pinyin ---------- */
  function renderType() {
    var w = S.round[S.i], N = S.round.length;
    app.innerHTML = topBar('<span class="eyebrow" style="margin-left:8px">' + S.game.name + "</span>") +
      '<section class="card play-card" style="margin-top:10px"><div class="play-meta"><span class="qchip">Câu ' + (S.i + 1) + "/" + N + '</span><span class="tip">Bật bàn phím tiếng Trung để gõ. Nhấn <kbd>Enter</kbd> để kiểm tra.</span><span class="done-count">Đã làm: ' + S.i + "/" + N + '</span></div><div class="progress"><i style="width:' + (S.i / N * 100) + '%"></i></div>' +
      '<div class="play"><div class="panel"><span class="pchip">NGHE &amp; GÕ</span><button class="bigspk" data-replay="1" aria-label="Phát âm thanh">' + ICONS.speaker + '</button><div><div class="ptitle">Nghe và gõ chữ Hán</div><div class="psub">Ví dụ: nghe “nǐ hǎo” → gõ 你好</div></div><div class="feedback" id="fb"></div><button class="play-btn" data-replay="1">' + ICONS.play + "Nghe lại</button></div>" +
      '<div class="answers"><div class="alabel">Gõ chữ Hán bạn nghe được:</div><div class="typebox"><input class="inp hz" id="ans" type="text" lang="zh-CN" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Gõ chữ Hán ở đây"><div class="hint" id="hinttxt">Từ này có ' + w.hanzi.length + ' chữ Hán.</div></div><div class="afoot"><button class="btn ghost" id="hint">Gợi ý</button><button class="btn ghost" id="skip" style="margin-right:auto">Bỏ qua</button><button class="btn" id="check">Kiểm tra</button></div></div></div></section>';
    S.answered = false;
    setTimeout(function () { speak(w); var i = $("#ans"); if (i) i.focus(); }, 150);
  }
  function cleanHan(s) { return String(s).replace(/[\s，。！？、；：“”‘’,.!?;:'"]/g, ""); }
  function checkType(skip) {
    if (S.answered) return;
    var w = S.round[S.i], inp = $("#ans"), ok = !skip && cleanHan(inp.value) === cleanHan(w.hanzi);
    if (!skip && !inp.value.trim()) return;
    S.answered = true; inp.disabled = true; inp.classList.add(ok ? "correct" : "wrong");
    if (ok) { S.score++; S.streak++; } else { S.mistakes.push(w); S.streak = 0; }
    sfx(ok ? (S.streak >= 3 ? "combo" : "ok") : "no");
    showFeedback(w, ok);
    var hb = $("#hint"); if (hb) hb.remove();
    var b = $("#check"); b.textContent = S.i + 1 === S.round.length ? "Xem kết quả" : "Câu tiếp"; b.id = "next"; b.innerHTML += " " + ICONS.next; b.focus();
    var sk = $("#skip"); if (sk) sk.remove();
  }

  /* ---------- game ghép cặp ---------- */
  function renderMatch() {
    var ws = S.round, hz = shuffle(ws.map(function (w, i) { return { i: i, w: w }; })), py = shuffle(ws.map(function (w, i) { return { i: i, w: w }; }));
    S.matchSel = null; S.matched = 0; S.missed = {};
    var colH = hz.map(function (x) { return '<button class="tile hz" data-side="h" data-idx="' + x.i + '">' + esc(x.w.hanzi) + "</button>"; }).join("");
    var colP = py.map(function (x) { return '<button class="tile py" data-side="p" data-idx="' + x.i + '">' + esc(x.w.pinyin) + "</button>"; }).join("");
    app.innerHTML = topBar('<span class="eyebrow" style="margin-left:8px">' + S.game.name + "</span>") +
      '<section class="card play-card" style="margin-top:10px"><div class="play-meta"><span class="qchip">' + ws.length + ' cặp</span><span class="tip">Chọn một chữ Hán rồi chọn pinyin tương ứng. Bấm chữ Hán sẽ nghe đọc.</span><span class="done-count" id="mcount">Đã ghép: 0/' + ws.length + '</span></div><div class="progress"><i id="mbar" style="width:0%"></i></div>' +
      '<div class="match"><div class="col">' + colH + '</div><div class="col">' + colP + "</div></div></section>";
  }
  function tilePick(btn) {
    if (btn.classList.contains("done")) return;
    var side = btn.dataset.side, idx = +btn.dataset.idx;
    if (side === "h") speak(S.round[idx]);
    var sel = S.matchSel;
    if (!sel || sel.side === side) {
      app.querySelectorAll(".tile.sel").forEach(function (t) { if (t.dataset.side === side) t.classList.remove("sel"); });
      if (sel && sel.btn === btn) { S.matchSel = null; return; }
      btn.classList.add("sel"); S.matchSel = { side: side, idx: idx, btn: btn }; return;
    }
    var a = sel, b = { side: side, idx: idx, btn: btn };
    var wa = S.round[a.idx], wb = S.round[b.idx];
    var ok = wa.pinyin === wb.pinyin;
    S.matchSel = null;
    if (ok) {
      [a.btn, b.btn].forEach(function (t) { t.classList.remove("sel"); t.classList.add("done"); t.disabled = true; });
      sfx("pair"); S.matched++;
      $("#mcount").textContent = "Đã ghép: " + S.matched + "/" + S.round.length;
      $("#mbar").style.width = (S.matched / S.round.length * 100) + "%";
      if (S.matched === S.round.length) setTimeout(finish, 700);
    } else {
      var hw = a.side === "h" ? wa : wb; S.missed[hw.hanzi] = hw; sfx("no");
      [a.btn, b.btn].forEach(function (t) { t.classList.remove("sel"); t.classList.add("bad"); });
      setTimeout(function () { [a.btn, b.btn].forEach(function (t) { t.classList.remove("bad"); }); }, 400);
    }
  }

  /* ---------- game thẻ ghi nhớ ---------- */
  function renderFlash() {
    var w = S.round[S.i], N = S.round.length;
    app.innerHTML = topBar('<span class="eyebrow" style="margin-left:8px">' + S.game.name + "</span>") +
      '<section class="card play-card" style="margin-top:10px"><div class="play-meta"><span class="qchip">Thẻ ' + (S.i + 1) + "/" + N + '</span><span class="tip">Nhấn <kbd>Space</kbd> để lật, <kbd>←</kbd> chưa nhớ, <kbd>→</kbd> đã nhớ.</span><span class="done-count">Đã nhớ: ' + S.score + '</span></div><div class="progress"><i style="width:' + (S.i / N * 100) + '%"></i></div>' +
      '<div class="flash-wrap"><button class="fcard" id="fcard" aria-label="Lật thẻ"><div class="fin"><div class="face front"><div class="hzbig">' + esc(w.hanzi) + '</div><div class="flip-tip">Nhấn để lật</div></div><div class="face back"><div class="pybig">' + esc(w.pinyin) + '</div><div class="vibig">' + esc(w.vi) + '</div><div class="hz-s">' + esc(w.hanzi) + "</div></div></div></button>" +
      '<button class="btn ghost" data-replay="1">' + ICONS.speaker + 'Nghe</button><div class="frow"><button class="btn no" data-know="0">Chưa nhớ</button><button class="btn yes" data-know="1">Đã nhớ</button></div></div></section>';
    S.flipped = false;
  }
  function flip() { var c = $("#fcard"); if (!c) return; S.flipped = !S.flipped; sfx("flip"); c.classList.toggle("flip", S.flipped); if (S.flipped) speak(S.round[S.i]); }
  function know(v) {
    if (v) S.score++; else S.mistakes.push(S.round[S.i]);
    sfx(v ? "ok" : "no");
    next();
  }

  /* ---------- kết quả ---------- */
  function finish() {
    stopTimer();
    var g = S.game, N = S.round.length, secs = Math.floor((Date.now() - S.t0) / 1000), score = S.score, mist = S.mistakes;
    if (g.kind === "match") { mist = Object.keys(S.missed).map(function (k) { return S.missed[k]; }); score = N - mist.length; }
    var pct = Math.round(score / N * 100);
    var sync = record({ lesson: S.lesson.id, game: g.id, gameName: g.name, score: score, total: N, pct: pct, secs: secs, words: S.round.map(function (w) { return w.hanzi; }), wrong: mist.map(function (w) { return w.hanzi; }) });
    var b = bestOf(S.lesson.id, g.id) || { best: pct };
    sfx(pct >= 70 ? "win" : "meh");
    var msg = pct === 100 ? "Tuyệt vời, không sai câu nào!" : pct >= 80 ? "Rất tốt, sắp đạt tuyệt đối rồi." : pct >= 50 ? "Khá ổn, ôn lại các từ sai bên dưới nhé." : "Cần luyện thêm, thử chơi lại nhé.";
    var miss = mist.length ? '<div class="miss"><div class="eyebrow" style="margin-bottom:6px">Từ cần ôn lại (' + mist.length + ')</div><div class="wlist">' + mist.map(function (w, i) {
      return '<div class="wrow"><span class="hz">' + esc(w.hanzi) + '</span><span><span class="py">' + esc(w.pinyin) + '</span><br><span class="vi">' + esc(w.vi) + '</span></span><button class="spk" data-saym="' + i + '" aria-label="Nghe">' + ICONS.speaker + "</button></div>";
    }).join("") + "</div></div>" : "";
    S.finalMist = mist;
    setRight('<span class="chip">' + g.name + "</span>");
    app.innerHTML = topBar() + '<section class="card" style="margin-top:10px"><div class="result"><div class="eyebrow">' + g.name + '</div><div class="score">' + score + "<small>/" + N + '</small></div><h2 class="h1">' + msg + '</h2><div class="stats"><span class="chip">Chính xác ' + pct + '%</span><span class="chip">' + ICONS.clock + fmtTime(secs) + '</span><span class="chip">Cao nhất ' + b.best + '%</span></div>' +
      '<div class="sync" id="sync">' + sync + '</div><div class="rbtns"><button class="btn" data-again="1">Chơi lại</button>' + (mist.length ? '<button class="btn soft" data-retry="1">Ôn lại từ sai</button>' : "") + '<button class="btn ghost" data-leave="1">Chọn game khác</button></div></div>' + miss + "</section>";
    S.view = "result";
  }

  /* ---------- sự kiện ---------- */
  app.addEventListener("click", function (e) {
    var t = e.target.closest("button"); if (!t) return;
    if (t.dataset.go) return nav("#" + t.dataset.go);
    if (t.dataset.assign) return startAssignment(t.dataset.assign);
    if (t.dataset.weak) return startWeak();
    if (t.dataset.quote === "speak") { var qq = dailyQuote(); if (qq) speak({ hanzi: qq[0], audio: "" }); return; }
    if (t.dataset.quote === "next") { qShift++; return renderHome(); }
    if (t.dataset.mqspeak && MQ.q) return speak(MQ.q.w);
    if (t.dataset.mqNew) { newMini(); $("#mini").innerHTML = miniHtml(); return; }
    if (t.dataset.mq !== undefined && MQ.q && !MQ.answered) { var o = MQ.q.opts[+t.dataset.mq]; o.picked = true; MQ.answered = true; sfx(o.ok ? "ok" : "no"); $("#mini").innerHTML = miniHtml(); return; }
    if (t.dataset.game) return startGame(t.dataset.game);
    if (t.dataset.say !== undefined) return speak(S.lesson.words[+t.dataset.say]);
    if (t.dataset.write !== undefined) return startGame("write", [S.lesson.words[+t.dataset.write]]);
    if (t.dataset.saym !== undefined) return speak(S.finalMist[+t.dataset.saym]);
    if (t.dataset.leave) { if (window.HD_WRITE) window.HD_WRITE.stop(); return renderLesson(S.lesson) || stopTimer(); }
    if (t.dataset.opt !== undefined) return pick(+t.dataset.opt);
    if (t.dataset.replay) return replay();
    if (t.dataset.side) return tilePick(t);
    if (t.dataset.know !== undefined) return know(+t.dataset.know);
    if (t.id === "fcard") return flip();
    if (t.id === "hint") return useHint();
    if (t.id === "mute") return;
    if (t.id === "next") return next();
    if (t.id === "check") return checkType(false);
    if (t.id === "skip") return checkType(true);
    if (t.dataset.again) return startGame(S.game.id);
    if (t.dataset.retry) return startGame(S.game.id, S.finalMist);
  });
  document.addEventListener("keydown", function (e) {
    if (S.view !== "game" || e.ctrlKey || e.metaKey || e.altKey) return;
    var k = e.key, tag = e.target.tagName, kind = S.game.kind;
    if ((k === "Enter" || k === " ") && tag === "BUTTON") return;
    if (kind === "quiz") {
      if (/^[1-4]$/.test(k)) pick(+k - 1);
      else if (/^[a-d]$/i.test(k)) pick(k.toLowerCase().charCodeAt(0) - 97);
      else if ((k === "Enter" || k === " ") && S.answered) { e.preventDefault(); next(); }
      else if (/^r$/i.test(k)) replay();
    } else if (kind === "type") {
      if (k === "Enter") { e.preventDefault(); S.answered ? next() : checkType(false); }
    } else if (kind === "flash") {
      if (k === " ") { e.preventDefault(); flip(); }
      else if (k === "ArrowLeft") know(0);
      else if (k === "ArrowRight") know(1);
      else if (/^r$/i.test(k)) replay();
    }
  });

  $("#mute").addEventListener("click", function () {
    muted = !muted; try { localStorage.setItem("hd-muted", muted ? "1" : "0"); } catch (e) { /* bỏ qua */ }
    paintMute(); if (!muted) sfx("ok");
  });

  /* ---------- đăng nhập, gửi kết quả, bài tập ---------- */
  function norm(c) { return String(c || "").trim().toUpperCase(); }
  function qKey() { return "hd-queue:" + (SESSION ? SESSION.code : ""); }
  function qLoad() { try { queue = JSON.parse(localStorage.getItem(qKey()) || "[]") || []; } catch (e) { queue = []; } }
  function qSave() { try { localStorage.setItem(qKey(), JSON.stringify(queue)); } catch (e) { /* bỏ qua */ } }
  function flush() {
    if (!SESSION || SESSION.role !== "student") return Promise.resolve(true);
    if (!queue.length) return Promise.resolve(true);
    if (flushing) return Promise.resolve(false);
    flushing = true;
    return api.call("submit", { code: SESSION.code, rec: queue[0] }).then(function (r) {
      flushing = false;
      if (r && r.ok) { queue.shift(); qSave(); return flush(); }
      return false;
    });
  }
  function record(rec) {
    if (!SESSION) return "";
    if (SESSION.role === "teacher") return "Bạn đang xem thử với vai trò giáo viên, kết quả này không được lưu.";
    var asg = MY.assignments.filter(function (a) { return a.id === curAssign; })[0];
    rec.assignmentId = asg && String(asg.lesson) === String(rec.lesson) && (!asg.game || asg.game === rec.game) ? asg.id : "";
    var item = JSON.parse(JSON.stringify(rec));
    MY.results.push({ t: new Date().toISOString(), lesson: String(rec.lesson), game: rec.game, gameName: rec.gameName, score: rec.score, total: rec.total, pct: rec.pct, secs: rec.secs, words: rec.words, wrong: rec.wrong, assignmentId: rec.assignmentId });
    queue.push(item); qSave();
    flush().then(function (ok) {
      var el = $("#sync"); if (el) el.textContent = ok ? "Đã gửi kết quả cho giáo viên." : "Chưa gửi được. Kết quả được giữ trên máy này và sẽ tự gửi lại khi có mạng.";
    });
    return "Đang gửi kết quả cho giáo viên…";
  }
  function refreshMe() {
    if (!SESSION || SESSION.role !== "student") return Promise.resolve();
    return flush().then(function () { return api.call("me", { code: SESSION.code }); }).then(function (r) {
      if (r && r.error === "auth") return logout("Tài khoản của bạn đã bị khóa hoặc mã không còn hiệu lực.");
      if (!r || !r.ok) return;
      MY.results = (r.results || []).map(function (x) { x.pct = +x.pct || 0; x.lesson = String(x.lesson); return x; });
      queue.forEach(function (q) { MY.results.push({ t: new Date().toISOString(), lesson: String(q.lesson), game: q.game, gameName: q.gameName, score: q.score, total: q.total, pct: q.pct, secs: q.secs, words: q.words, wrong: q.wrong, assignmentId: q.assignmentId }); });
      MY.assignments = r.assignments || [];
      if (S.view === "home" || S.view === "vocab" || S.view === "assign" || S.view === "lesson") route();
    });
  }
  function paintUser() {
    var b = $("#userbtn"), m = $("#umenu"); m.hidden = true;
    if (!SESSION) { b.hidden = true; return; }
    b.hidden = false;
    b.innerHTML = '<span class="uav">' + esc((SESSION.name || "?").trim().charAt(0).toUpperCase()) + '</span><span class="uname">' + esc(SESSION.name) + (SESSION.cls ? " · " + esc(SESSION.cls) : "") + "</span>";
    m.innerHTML = (SESSION.role === "teacher"
      ? '<button data-um="teacher">Bảng giáo viên</button><button data-um="home">Xem trang học sinh</button>'
      : '<button data-um="home">Trang chủ</button><button data-um="history">Lịch sử của tôi</button>') + '<button data-um="logout">Đăng xuất</button>';
  }
  function logout(msg) {
    SESSION = null; MY = { results: [], assignments: [] }; queue = []; curAssign = null;
    try { localStorage.removeItem("hd-session"); } catch (e) { /* bỏ qua */ }
    if (window.HD_TEACHER) window.HD_TEACHER.reset();
    renderLogin(typeof msg === "string" ? msg : "");
  }
  function renderLogin(msg) {
    S = { view: "login", lesson: null, game: null }; stopTimer(); setRight(""); paintUser();
    var demo = api.demo ? '<div class="demo-banner"><b>Chế độ thử</b> (chưa kết nối Google Sheet). Mã học sinh: <code>HS-0001</code> đến <code>HS-0006</code>. Mã giáo viên: <code>GV-DEMO</code>.</div>' : "";
    app.innerHTML = '<section class="card login"><span class="logo big" aria-hidden="true">中</span><h1 class="h1">Đăng nhập</h1><p class="sub">Nhập mã do giáo viên cấp cho bạn.</p><form id="loginform" autocomplete="off"><input class="t-input big" id="code" type="text" inputmode="text" autocapitalize="characters" spellcheck="false" placeholder="Ví dụ: HD-K7M2" maxlength="30" aria-label="Mã đăng nhập"><button class="btn" type="submit" id="loginbtn">Vào học</button><p class="lerr" id="lerr" role="alert">' + esc(msg || "") + "</p></form>" + demo + "</section>";
    var c = $("#code"); if (c) c.focus();
  }
  function doLogin(code) {
    code = norm(code); var err = $("#lerr"), btn = $("#loginbtn");
    if (!code) { err.textContent = "Hãy nhập mã đăng nhập."; return; }
    btn.disabled = true; err.textContent = "Đang kiểm tra…";
    api.call("login", { code: code }).then(function (r) {
      btn.disabled = false;
      if (!r || !r.ok) { err.textContent = r && r.error === "network" ? "Không kết nối được máy chủ. Kiểm tra mạng rồi thử lại." : r && r.error === "locked" ? "Hệ thống tạm khóa đăng nhập vì có quá nhiều lần nhập sai. Hãy thử lại sau 10 phút." : "Mã không đúng hoặc tài khoản đã bị khóa. Hãy hỏi lại giáo viên."; return; }
      SESSION = { code: r.code, name: r.name, cls: r.cls, role: r.role };
      try { localStorage.setItem("hd-session", JSON.stringify(SESSION)); } catch (e) { /* bỏ qua */ }
      qLoad(); paintUser(); sfx("win");
      location.hash = r.role === "teacher" ? "#giao-vien" : "#home"; route();
      refreshMe();
    });
  }
  function previewBanner() {
    return SESSION && SESSION.role === "teacher" ? '<div class="demo-banner">Bạn đang xem trang học sinh với vai trò giáo viên, kết quả chơi thử không được lưu. <a href="#giao-vien"><b>Về bảng giáo viên</b></a></div>' : "";
  }
  function dueInfo(a, done) {
    if (!a.due) return { t: "Không có hạn", k: "" };
    var days = Math.round((new Date(a.due + "T23:59:59").getTime() - Date.now()) / 86400000);
    if (done) return { t: "Hạn " + a.due.split("-").reverse().join("/"), k: "" };
    return days < 0 ? { t: "Quá hạn " + (-days) + " ngày", k: "bad" } : days === 0 ? { t: "Hạn hôm nay", k: "warn" } : { t: "Còn " + days + " ngày", k: days <= 2 ? "warn" : "" };
  }
  function assignItems() {
    if (!SESSION || SESSION.role !== "student") return [];
    return MY.assignments.map(function (a) {
      var mine = MY.results.filter(function (r) { return r.assignmentId === a.id; });
      return { a: a, done: mine.length > 0, best: mine.length ? Math.max.apply(null, mine.map(function (r) { return r.pct; })) : 0 };
    }).sort(function (x, y) { return (x.done - y.done) || String(x.a.due).localeCompare(String(y.a.due)); });
  }
  function pendingCount() { return assignItems().filter(function (it) { return !it.done; }).length; }
  function assignCard(it) {
    var a = it.a, g = a.game ? gameById(a.game) : null, d = dueInfo(a, it.done), L = lessonById(a.lesson);
    return '<button class="acard' + (it.done ? " done" : "") + '" data-assign="' + esc(a.id) + '"><span class="at"><b>' + esc(a.title) + "</b><span>" + (L ? L.title : "Bài " + esc(a.lesson)) + " · " + (g ? esc(g.name) : "Tự chọn game") + "</span>" + (a.note ? '<span class="an">' + esc(a.note) + "</span>" : "") + '</span><span class="as"><span class="tp ' + (it.done ? "good" : d.k) + '">' + (it.done ? "Đã làm · " + it.best + "%" : d.t) + '</span><span class="go">' + (it.done ? "Làm lại" : "Làm bài") + "</span></span></button>";
  }
  function renderAssignments() {
    S.view = "assign"; curAssign = null; setRight('<span class="chip">' + pendingCount() + " bài chưa làm</span>");
    var items = assignItems(), todo = items.filter(function (x) { return !x.done; }), done = items.filter(function (x) { return x.done; });
    var empty = SESSION && SESSION.role === "teacher" ? "Giáo viên giao và theo dõi bài tập ở Bảng giáo viên." : "Giáo viên chưa giao bài tập nào. Bạn có thể luyện thêm ở mục Từ vựng.";
    app.innerHTML = previewBanner() + '<div class="home-head"><h1 class="h1">Bài tập</h1><p class="sub">Bài tập giáo viên giao cho bạn. Làm xong, kết quả tự gửi về cho giáo viên.</p></div>' +
      (items.length ? (todo.length ? '<div class="eyebrow">Cần làm (' + todo.length + ')</div><div class="acards" style="margin:8px 0 22px">' + todo.map(assignCard).join("") + "</div>" : '<p class="sub" style="margin-bottom:18px">Bạn đã làm hết bài tập được giao.</p>') + (done.length ? '<div class="eyebrow">Đã làm (' + done.length + ')</div><div class="acards" style="margin-top:8px">' + done.map(assignCard).join("") + "</div>" : "") : '<section class="card"><p class="sub" style="margin:0">' + empty + "</p></section>");
  }
  function startAssignment(id) {
    var a = MY.assignments.filter(function (x) { return x.id === id; })[0]; if (!a) return;
    var L = lessonById(a.lesson); if (!L || !L.words.length) { toast("Bài này chưa có từ vựng."); return; }
    curAssign = id; S.lesson = L;
    if (a.game && gameById(a.game)) return startGame(a.game);
    nav("#" + (String(a.lesson) === "all" ? "tong-hop" : "bai-" + a.lesson));
  }
  function renderHistory() {
    S.view = "history"; curAssign = null; setRight('<span class="chip">' + MY.results.length + " lượt</span>");
    var rs = MY.results.slice().sort(function (a, b) { return new Date(b.t) - new Date(a.t); }), avgP = rs.length ? Math.round(rs.reduce(function (s, r) { return s + r.pct; }, 0) / rs.length) : 0;
    var rows = rs.slice(0, 50).map(function (r) { var d = new Date(r.t); return "<tr><td>" + ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + "</td><td>" + (String(r.lesson) === "all" ? "Tổng hợp" : "Bài " + esc(r.lesson)) + "</td><td>" + esc(r.gameName || r.game) + "</td><td>" + r.score + "/" + r.total + '</td><td><span class="tp ' + (r.pct >= 80 ? "good" : r.pct >= 60 ? "warn" : "bad") + '">' + r.pct + "%</span></td></tr>"; }).join("");
    app.innerHTML = '<button class="back" data-go="home">' + ICONS.back + 'Trang chủ</button><div class="lesson-title"><h1 class="h1">Lịch sử của tôi</h1><p class="sub">' + (rs.length ? rs.length + " lượt làm bài, điểm trung bình " + avgP + "%." : "Bạn chưa làm bài nào.") + '</p></div><section class="card t-card"><div class="t-scroll"><table class="t-table"><thead><tr><th>Thời gian</th><th>Bài</th><th>Game</th><th>Đúng</th><th>Điểm</th></tr></thead><tbody>' + (rows || '<tr><td colspan="5" class="t-empty">Chưa có dữ liệu.</td></tr>') + "</tbody></table></div></section>";
  }
  app.addEventListener("submit", function (e) { if (e.target.id === "loginform") { e.preventDefault(); doLogin($("#code").value); } });
  $("#userbtn").addEventListener("click", function (e) { e.stopPropagation(); var m = $("#umenu"); m.hidden = !m.hidden; });
  $("#umenu").addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return; $("#umenu").hidden = true;
    var v = b.dataset.um;
    if (v === "logout") logout(); else if (v === "teacher") nav("#giao-vien"); else if (v === "history") nav("#lich-su"); else nav("#home");
  });
  document.addEventListener("click", function (e) { if (!e.target.closest("#umenu") && !e.target.closest("#userbtn")) $("#umenu").hidden = true; });
  window.addEventListener("online", function () { flush(); });

  window.HD = { app: app, esc: esc, toast: toast, topBar: topBar, speak: speak, sfx: sfx, ICONS: ICONS, GAMES: GAMES, LESSONS: LESSONS, ALL: ALL, api: api, get session() { return SESSION; }, view: function () { return S.view; } };
  if (window.HD_TEACHER) window.HD_TEACHER.init(window.HD);
  if (window.HD_WRITE) window.HD_WRITE.init(window.HD);

  /* ---------- khởi động ---------- */
  paintMute();
  $("#tagline").textContent = CFG.tagline;
  $("#foot-name").textContent = CFG.siteName.toUpperCase();
  $("#foot-phone").textContent = CFG.phone;
  try { if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register("sw.js").catch(function () { /* bỏ qua */ }); } catch (e) { /* bỏ qua */ }
  if (SESSION) { qLoad(); paintUser(); }
  route();
  refreshMe();
})();
