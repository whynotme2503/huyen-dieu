/* HUYEN DIEU · Trang "Bài khóa & Ngữ pháp" của từng bài (dữ liệu trong textbook.js: window.HD_TB).
   Thứ tự: bài khóa (kèm giải thích từ mới, câu hỏi đọc hiểu) → ngữ pháp (kèm luyện tập) → luyện tập tổng hợp. */
(function () {
  "use strict";
  var H, CUR = null, ANS = {};
  var PREF_KEY = "hd-tb-pref";
  var LET = "ABCDEFGH";

  function esc(s) { return H.esc(s); }
  function pref() { try { return JSON.parse(localStorage.getItem(PREF_KEY) || "null") || { py: true, vi: false }; } catch (e) { return { py: true, vi: false }; } }
  function savePref(p) { try { localStorage.setItem(PREF_KEY, JSON.stringify(p)); } catch (e) { /* bỏ qua */ } }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s || "").replace(/[\s，。？！、,.?!“”"：:；;（）()]/g, ""); }

  /* tô từ mới của bài trong câu (khớp dài nhất trước) */
  function vocab(id) {
    var L = H.LESSONS.filter(function (l) { return String(l.id) === String(id); })[0];
    return L ? L.words.slice().sort(function (a, b) { return b.hanzi.length - a.hanzi.length; }) : [];
  }
  function mark(zh, V) {
    var out = "", i = 0;
    while (i < zh.length) {
      var hit = null;
      for (var k = 0; k < V.length; k++) if (zh.substr(i, V[k].hanzi.length) === V[k].hanzi) { hit = V[k]; break; }
      if (hit) { out += '<span class="nw" data-tb="nw" data-w="' + esc(hit.hanzi) + '">' + esc(hit.hanzi) + "</span>"; i += hit.hanzi.length; }
      else { out += esc(zh[i]); i++; }
    }
    return out;
  }
  function spk(zh) { return '<button class="tb-spk" data-tb="say" data-z="' + esc(zh) + '" aria-label="Nghe">' + H.ICONS.speaker + "</button>"; }
  function sent(e, V) {
    return '<div class="tb-sent">' + spk(e.zh) + '<div><div class="tb-zh">' + (V ? mark(e.zh, V) : esc(e.zh)) + "</div>" + (e.py ? '<div class="tb-py">' + esc(e.py) + "</div>" : "") + (e.vi ? '<div class="tb-vi">' + esc(e.vi) + "</div>" : "") + "</div></div>";
  }
  var isZh = function (s) { return /^[㐀-鿿，。？！、“”：；（）\s0-9]+$/.test(s); };

  /* ---------- bài khóa ---------- */
  function wordCard(w, n) {
    var body = "", grp = [];
    var flush = function () { if (grp.length) { body += '<div class="tb-wex">' + grp.map(function (z) { return sent({ zh: z }); }).join("") + "</div>"; grp = []; } };
    w.lines.forEach(function (l) { if (isZh(l)) grp.push(l); else { flush(); body += '<p class="tb-note' + (/^Nghĩa \d/.test(l) ? " sub" : "") + '">' + esc(l) + "</p>"; } });
    flush();
    return '<div class="tb-word"><div class="tb-wh"><span class="tb-wn">' + n + '</span><span class="tb-whz">' + esc(w.w) + '</span><span class="tb-wpy">' + esc(w.py) + '</span>' + spk(w.w) + '<span class="tb-wmean">' + esc(w.mean) + "</span></div>" + body + "</div>";
  }
  function textCard(t, i, V, D) {
    var who = {}, cols = ["c1", "c2"], nWho = 0, lines = "";
    t.lines.forEach(function (l) {
      if (l.note) { lines += '<div class="tb-tip tb-lnote">💡 ' + esc(l.note) + "</div>"; return; }
      var c = l.who ? (who[l.who] || (who[l.who] = cols[nWho++ % 2])) : "";
      lines += '<div class="tb-line' + (t.prose || !l.who ? " prose" : "") + '">' + (l.who ? '<span class="tb-who ' + c + '">' + esc(l.who) + "</span>" : "") + '<div class="tb-lbody">' + sent(l, V) + "</div></div>";
    });
    var ws = t.words && D.words ? D.words.slice(t.words[0], t.words[1]) : [];
    var listen = (t.listen || []).map(function (q, k) { return task({ t: "choice", q: "（" + (k + 1) + "）" + q.q, opts: q.opts, a: q.a, exp: "" }, "l" + i + "-" + k); }).join("");
    var badge = t.rhyme ? "Đọc vui" : "Bài khóa " + (t.num || i + 1);
    return '<section class="card tb-card" id="tb-text-' + (i + 1) + '"><div class="tb-head"><span class="tb-badge">' + badge + '</span><h2 class="tb-h2">' + esc(t.title) + "</h2></div>" +
      (t.img ? '<div class="tb-media"><img src="' + esc(t.img) + '" alt="" loading="lazy"><div class="tb-scene">' + sent(t.scene) + "</div></div>" : t.scene ? '<div class="tb-media"><div class="tb-scene">' + sent(t.scene) + "</div></div>" : "") +
      (t.audio ? '<audio class="tb-audio" controls preload="none" src="' + esc(t.audio) + '"></audio>' : "") +
      (listen ? '<div class="tb-prac tb-listen"><div class="eyebrow">听两遍对话，选择正确答案 · Nghe hai lượt rồi chọn đáp án đúng</div>' + listen + "</div>" : "") +
      (listen ? '<details class="tb-det tb-script"' + (t.open ? " open" : "") + '><summary><span class="ic">📖</span><span><b>Xem lời bài khóa</b><small>Nghe và làm câu hỏi trước, rồi bấm vào đây để đọc lời thoại</small></span></summary><div class="tb-lines">' + lines + "</div></details>" : '<div class="tb-lines">' + lines + "</div>") +
      (ws.length ? '<details class="tb-det"><summary>Giải thích từ mới (' + ws.length + ")</summary>" + ws.map(function (w, k) { return wordCard(w, t.words[0] + k + 1); }).join("") + "</details>" : "") +
      ((t.qs || []).length ? '<div class="tb-qs"><div class="eyebrow">读后回答问题 · Đọc rồi trả lời câu hỏi</div>' + t.qs.map(function (q, k) {
        return '<div class="tb-q"><div class="tb-qq"><span class="tb-qn">' + (k + 1) + '</span><span class="tb-zh">' + esc(q[0]) + '</span></div><details class="tb-qa"><summary>Xem gợi ý trả lời</summary><div class="tb-zh">' + esc(q[1]) + '</div><div class="tb-vi show">' + esc(q[2]) + "</div></details></div>";
      }).join("") + "</div>" : "") + "</section>";
  }

  /* ---------- ngữ pháp ---------- */
  function task(t, key) {
    var st = ANS[key] || {};
    if (t.t === "choice") {
      return '<div class="tb-task" id="tk-' + key + '">' + (t.pass ? '<div class="tb-pass tb-zh">' + esc(t.pass) + "</div>" : "") + '<div class="tb-tq' + (isZh(t.q.replace(/[（）()★：:]/g, "")) ? " tb-zh big" : "") + '">' + esc(t.q) + '</div><div class="tb-opts">' + t.opts.map(function (o, j) {
        var cls = st.pick === j ? (j === t.a ? " ok" : " bad") : (st.pick !== undefined && j === t.a ? " ok" : "");
        return '<button class="tb-opt' + cls + '" data-tb="pick" data-k="' + key + '" data-j="' + j + '"' + (st.pick !== undefined ? " disabled" : "") + '><span class="key">' + LET[j] + '</span><span class="' + (isZh(o.replace(/[a-zA-Z]/g, "")) ? "tb-zh" : "") + '">' + esc(o) + "</span></button>";
      }).join("") + "</div>" + (st.pick !== undefined ? '<div class="tb-fb ' + (st.pick === t.a ? "ok" : "bad") + '">' + (st.pick === t.a ? "Đúng rồi! " : "Chưa đúng. ") + esc(t.exp || "") + "</div>" : "") + "</div>";
    }
    if (t.t === "order") {
      var pool = st.pool || (st.pool = shuffle(t.tok.map(function (w, i) { return i; }))), built = st.built || (st.built = []);
      ANS[key] = st;
      var done = st.res !== undefined;
      return '<div class="tb-task" id="tk-' + key + '"><div class="tb-tq">' + esc(t.q) + '</div><div class="tb-built' + (built.length ? "" : " empty") + '">' + (built.length ? built.map(function (k, idx) { return '<button class="tb-tok on" data-tb="untok" data-k="' + key + '" data-i="' + idx + '"' + (done ? " disabled" : "") + ">" + esc(t.tok[k]) + "</button>"; }).join("") : "Bấm các từ bên dưới theo đúng thứ tự") + "</div>" +
        '<div class="tb-pool">' + pool.map(function (k) { return '<button class="tb-tok" data-tb="tok" data-k="' + key + '" data-i="' + k + '"' + (built.indexOf(k) >= 0 || done ? " disabled" : "") + ">" + esc(t.tok[k]) + "</button>"; }).join("") + "</div>" +
        (done ? '<div class="tb-fb ' + (st.res ? "ok" : "bad") + '">' + (st.res ? "Đúng rồi! " : "Chưa đúng. Đáp án: ") + '<span class="tb-zh">' + esc(t.a) + "。</span>" + (st.res ? "" : ' <button class="linkb" data-tb="redo" data-k="' + key + '">Làm lại</button>') + "</div>" :
          (built.length === t.tok.length ? '<button class="btn sm" data-tb="chk" data-k="' + key + '">Kiểm tra</button>' : "")) + "</div>";
    }
    /* open: tự viết, có câu gợi ý */
    return '<div class="tb-task"><div class="tb-tq">' + esc(t.q) + "</div>" + (t.img ? '<img class="tb-timg" src="' + esc(t.img) + '" alt="" loading="lazy">' : "") + t.items.map(function (it, j) {
      return '<div class="tb-open"><div class="tb-zh pre">（' + (j + 1) + "）" + esc(it[0]) + '</div><textarea class="tb-in tb-zh" rows="1" lang="zh-CN" placeholder="Viết câu của bạn…"></textarea><details class="tb-qa"><summary>Xem câu gợi ý</summary><div class="tb-zh">' + esc(it[1]) + "</div></details></div>";
    }).join("") + "</div>";
  }
  function gLabel(gi) {
    var G = window.HD_TB[CUR].grammar, g = G[gi]; if (g.badge) return g.badge;
    var n = 0; for (var k = 0; k <= gi; k++) if (!G[k].badge) n++; return "Ngữ pháp " + n;
  }
  function grammarCard(g, i) {
    var b = "";
    b += '<p class="tb-intro">' + esc(g.intro) + "</p>";
    if (g.formula) b += '<div class="tb-formula">' + g.formula.map(function (f, k) { return (k ? '<span class="plus">+</span>' : "") + '<span class="tb-f' + ((g.keys ? g.keys.indexOf(k) >= 0 : k === 1) ? " key" : "") + '">' + esc(f) + "</span>"; }).join("") + "</div>";
    if (g.order) b += '<div class="eyebrow">Trật tự thường gặp</div><div class="tb-chain">' + g.order.map(function (f, k) { return (k ? '<span class="arr">→</span>' : "") + '<span class="tb-f' + (f === "的" ? " key tb-zh" : "") + '">' + esc(f) + "</span>"; }).join("") + "</div>";
    if (g.uses) b += g.uses.map(function (u) { return '<div class="tb-use"><div class="tb-uset">' + esc(u[0]) + "</div><p>" + esc(u[1]) + "</p>" + sent({ zh: u[2] }) + "</div>"; }).join("");
    if (g.compare) b += '<div class="tb-cmp">' + g.compare.map(function (c) { return '<div><span class="tb-zh">' + esc(c[0]) + "</span><span>" + esc(c[1]) + "</span></div>"; }).join("") + "</div>";
    if (g.parse) b += '<div class="eyebrow">Phân tích</div><div class="tb-parse">' + g.parse.map(function (p) { return '<div><span class="tb-zh">' + esc(p[0]) + "</span><small>" + esc(p[1]) + "</small></div>"; }).join("") + "</div>";
    if (g.notes) b += g.notes.map(function (n, k) { return '<div class="tb-tip"><b>Lưu ý' + (g.notes.length > 1 ? " " + (k + 1) : "") + ":</b> " + esc(n[0]) + (n[1] ? ' <span class="tb-zh">' + esc(n[1]) + "</span>" + (n[2] ? " " + esc(n[2]) : "") : "") + "</div>"; }).join("");
    if (g.ex && g.ex.length) b += '<div class="eyebrow">Ví dụ</div><div class="tb-exs">' + g.ex.map(function (e) { return sent(e); }).join("") + "</div>";
    if (g.tasks && g.tasks.length) b += '<div class="tb-prac"><div class="eyebrow">Luyện tập</div>' + g.tasks.map(function (t, k) { return task(t, "g" + i + "-" + k); }).join("") + "</div>";
    return '<section class="card tb-card" id="tb-gram-' + (i + 1) + '"><div class="tb-head"><span class="tb-badge gram' + (g.badge ? " tip" : "") + '">' + esc(gLabel(i)) + '</span><h2 class="tb-h2">' + esc(g.title) + '</h2><p class="tb-sub">' + esc(g.sub) + "</p></div>" + b + "</section>";
  }

  /* ---------- luyện tập tổng hợp: chọn từ điền vào chỗ trống ---------- */
  function practice(D) {
    var n = 0, body = D.practice.map(function (grp, gi) {
      var chips = function (key, st, done) { return grp.bank.map(function (w) { return '<button class="tb-chip' + (st.v === w ? " on" : "") + '" data-tb="fill" data-k="' + key + '" data-v="' + esc(w) + '"' + (done ? " disabled" : "") + '><span class="tb-zh">' + esc(w) + "</span></button>"; }).join(""); };
      if (grp.passage) {
        var n0 = n, k2 = 0, done = ANS.pdone;
        var pas = esc(grp.passage).replace(/___/g, function () {
          var it = grp.items[k2++], key = "p" + (n0 + k2), st = ANS[key] || {};
          return '<span class="tb-blank' + (st.v ? " fill" : "") + (done ? (st.v === it[1] ? " ok" : " bad") : "") + '"><sup>' + (n0 + k2) + "</sup>" + (st.v ? esc(st.v) : "　　") + "</span>";
        });
        var rows = grp.items.map(function (it, j) {
          n++; var key = "p" + n, st = ANS[key] || {};
          return '<div class="tb-fill pr"><span class="tb-qn">' + n + '</span><div class="tb-chips">' + chips(key, st, done) + "</div>" + (done && st.v !== it[1] ? '<div class="tb-fb bad">Đáp án: <span class="tb-zh">' + esc(it[1]) + "</span></div>" : "") + "</div>";
        }).join("");
        return (grp.title ? '<div class="eyebrow tb-ptitle">' + esc(grp.title) + "</div>" : "") + '<div class="tb-bank">' + grp.bank.map(function (w, j) { return '<span><b>' + LET[j] + '</b> <span class="tb-zh">' + esc(w) + "</span></span>"; }).join("") + "</div>" +
          '<div class="tb-pass tb-zh tb-cloze">' + pas + "</div>" + rows;
      }
      return (grp.title ? '<div class="eyebrow tb-ptitle">' + esc(grp.title) + "</div>" : "") + '<div class="tb-bank">' + grp.bank.map(function (w, j) { return '<span><b>' + LET[j] + '</b> <span class="tb-zh">' + esc(w) + "</span></span>"; }).join("") + "</div>" +
        grp.items.map(function (it) {
          n++; var key = "p" + n, st = ANS[key] || {}, done = ANS.pdone;
          var q = esc(it[0]).replace("___", '<span class="tb-blank' + (st.v ? " fill" : "") + (done ? (st.v === it[1] ? " ok" : " bad") : "") + '">' + (st.v ? esc(st.v) : "　　") + "</span>").replace(/\n/g, "<br>");
          return '<div class="tb-fill"><div class="tb-zh"><span class="tb-qn">' + n + "</span>" + q + '</div><div class="tb-chips">' + grp.bank.map(function (w) {
            return '<button class="tb-chip' + (st.v === w ? " on" : "") + '" data-tb="fill" data-k="' + key + '" data-v="' + esc(w) + '"' + (done ? " disabled" : "") + '><span class="tb-zh">' + esc(w) + "</span></button>";
          }).join("") + "</div>" + (done && st.v !== it[1] ? '<div class="tb-fb bad">Đáp án: <span class="tb-zh">' + esc(it[1]) + "</span></div>" : "") + "</div>";
        }).join("");
    }).join("");
    var total = n, score = 0, k = 0;
    D.practice.forEach(function (g) { g.items.forEach(function (it) { k++; if ((ANS["p" + k] || {}).v === it[1]) score++; }); });
    return '<section class="card tb-card" id="tb-prac"><div class="tb-head"><span class="tb-badge prac">Luyện tập</span><h2 class="tb-h2">选词填空</h2><p class="tb-sub">Chọn từ thích hợp điền vào chỗ trống' + (D.practice.some(function (g) { return g.passage; }) ? " trong câu và trong đoạn văn" : "") + '.</p></div>' + body +
      '<div class="tb-pfoot">' + (ANS.pdone ? '<span class="tb-score">Đúng ' + score + "/" + total + '</span><button class="btn ghost" data-tb="preset">Làm lại</button>' : '<button class="btn" data-tb="pcheck">Kiểm tra đáp án</button>') + "</div></section>";
  }

  function gAfter(g, gi) { return g.after !== undefined ? g.after : gi; }
  function render(id) {
    var D = (window.HD_TB || {})[id]; if (!D) return false;
    CUR = id; var V = vocab(id), p = pref();
    var title = (H.lname ? H.lname(id) : id);
    var nav = '<div class="tb-nav">' + D.texts.map(function (tx, i) { return '<a href="#" data-tb="jump" data-to="tb-text-' + (i + 1) + '">' + (tx.rhyme ? "Đọc vui" : "Bài khóa " + (tx.num || i + 1)) + "</a>" + D.grammar.map(function (g, gi) { return gAfter(g, gi) === i ? '<a href="#" class="g" data-tb="jump" data-to="tb-gram-' + (gi + 1) + '">' + esc(gLabel(gi)) + "</a>" : ""; }).join(""); }).join("") + (D.practice && D.practice.length ? '<a href="#" data-tb="jump" data-to="tb-prac">Luyện tập</a>' : "") + (D.extra && D.extra.length ? '<a href="#" data-tb="jump" data-to="tb-extra-1">Bài tập thêm</a>' : "") + "</div>";
    var tg = '<div class="tb-toggles"><button class="tb-tg' + (p.py ? " on" : "") + '" data-tb="tg" data-v="py">Pinyin</button><button class="tb-tg' + (p.vi ? " on" : "") + '" data-tb="tg" data-v="vi">Tiếng Việt</button></div>';
    H.app.innerHTML = '<div class="tb' + (p.py ? "" : " nopy") + (p.vi ? "" : " novi") + '" id="tb-root"><button class="back" data-go="bai-khoa">' + H.ICONS.back + "Bài khóa</button>" +
      '<div class="tb-hero"><div class="eyebrow">' + esc(title) + ' · Bài khóa' + (D.grammar.length ? " &amp; Ngữ pháp" : "") + '</div><h1 class="tb-h1">' + esc(D.zh) + '</h1><div class="tb-hpy">' + esc(D.py) + '</div><div class="tb-hvi">' + esc(D.vi) + "</div></div>" +
      '<div class="tb-bar">' + nav + tg + "</div>" +
      '<p class="tb-help">Bấm ' + H.ICONS.speaker + ' để nghe từng câu. Chữ <span class="nw">gạch chân</span> là từ mới của bài, bấm vào để xem nghĩa.</p>' +
      D.texts.map(function (tx, i) { return textCard(tx, i, V, D) + D.grammar.map(function (g, gi) { return gAfter(g, gi) === i ? grammarCard(g, gi) : ""; }).join(""); }).join("") +
      (D.practice && D.practice.length ? '<div class="tb-sec">练习 · Luyện tập tổng hợp</div>' + practice(D) : "") +
      (D.extra && D.extra.length ? '<div class="tb-sec">补充练习 · Bài tập thêm</div><div id="tb-xsec" class="tb-xsec">' + D.extra.map(function (x, xi) {
        return '<section class="card tb-card" id="tb-extra-' + (xi + 1) + '"><div class="tb-head"><span class="tb-badge prac">Bài tập thêm ' + (xi + 1) + '</span><h2 class="tb-h2">' + esc(x.title) + "</h2>" + (x.sub ? '<p class="tb-sub">' + esc(x.sub) + "</p>" : "") + "</div>" + x.tasks.map(function (tk, k) { return task(tk, "e" + xi + "-" + k); }).join("") + "</section>";
      }).join("") + '<div class="card tb-card tb-submit" id="tb-submit"></div></div>' : "") + "</div>";
    return true;
  }
  function xKey() { return "hd-tbx:" + (H.session ? H.session.code : "") + ":" + CUR; }
  function xLoad() { try { return JSON.parse(localStorage.getItem(xKey()) || "null"); } catch (e) { return null; } }
  function xBoxes() { return [].slice.call(document.querySelectorAll("#tb-xsec .tb-in")); }
  function xPaint() {
    var box = document.getElementById("tb-submit"); if (!box) return;
    var sv = xLoad(), root = document.getElementById("tb-xsec");
    if (sv) {
      xBoxes().forEach(function (el, i) { el.value = sv.ans[i] || ""; el.readOnly = true; el.style.height = "auto"; el.style.height = el.scrollHeight + "px"; });
      root.classList.add("done");
      [].forEach.call(root.querySelectorAll(".tb-open .tb-qa"), function (d) { d.open = true; });
      box.innerHTML = '<div class="tb-subok">✓ Đã nộp bài lúc ' + esc(new Date(sv.t).toLocaleString("vi-VN")) + '. Câu gợi ý đã hiện ở dưới mỗi câu để bạn tự so sánh.</div><p class="sub" id="sync" style="margin:6px 0 0">' + esc(sv.msg || "") + '</p><button class="btn ghost" data-tb="xredo">Làm lại</button>';
    } else {
      root.classList.remove("done");
      [].forEach.call(root.querySelectorAll(".tb-open .tb-qa"), function (d) { d.open = false; });
      xBoxes().forEach(function (el) { el.readOnly = false; });
      box.innerHTML = '<p class="sub" style="margin:0 0 10px">Làm xong các câu tự viết ở trên thì bấm <b>Nộp bài</b>. Bài làm sẽ gửi cho giáo viên, sau đó câu gợi ý mới hiện ra.</p><button class="btn" data-tb="xsubmit">Nộp bài</button>';
    }
  }
  function xSubmit() {
    var els = xBoxes(), ans = els.map(function (el) { return el.value.trim(); }), filled = ans.filter(Boolean).length;
    if (!filled) { H.toast("Bạn chưa viết câu nào."); return; }
    if (filled < ans.length && !window.confirm("Còn " + (ans.length - filled) + " câu chưa viết. Vẫn nộp bài?")) return;
    var D = window.HD_TB[CUR], words = [];
    ans.forEach(function (a, i) { words.push((i + 1) + ". " + (a || "(bỏ trống)").replace(/\|/g, "/").replace(/\n/g, " ")); });
    var msg = H.record ? H.record({ lesson: CUR, game: "tb-extra", gameName: "Bài tập thêm · " + (H.lname ? H.lname(CUR) : CUR), score: filled, total: ans.length, pct: Math.round(filled * 100 / ans.length), secs: 0, words: words, wrong: [] }) : "";
    try { localStorage.setItem(xKey(), JSON.stringify({ t: Date.now(), ans: ans, msg: msg })); } catch (e) { /* bỏ qua */ }
    H.sfx && H.sfx("win"); xPaint();
  }
  function repaintTask(key) {
    var D = window.HD_TB[CUR], m = /^g(\d+)-(\d+)$/.exec(key), el = document.getElementById("tk-" + key);
    var ml = /^l(\d+)-(\d+)$/.exec(key); if (ml && el) { var q = D.texts[+ml[1]].listen[+ml[2]]; el.outerHTML = task({ t: "choice", q: "（" + (+ml[2] + 1) + "）" + q.q, opts: q.opts, a: q.a, exp: "" }, key); return; }
    if (m && el) el.outerHTML = task(D.grammar[+m[1]].tasks[+m[2]], key);
    var me = /^e(\d+)-(\d+)$/.exec(key); if (me && el) el.outerHTML = task(D.extra[+me[1]].tasks[+me[2]], key);
  }
  function repaintPractice() { var el = document.getElementById("tb-prac"); if (el) el.outerHTML = practice(window.HD_TB[CUR]); }

  function onClick(e) {
    if (!CUR || !document.getElementById("tb-root")) return;
    var b = e.target.closest("[data-tb]"); if (!b) return;
    var a = b.dataset.tb, k = b.dataset.k;
    if (a === "say") { H.speak({ hanzi: b.dataset.z }); return; }
    if (a === "nw") { var w = vocab(CUR).filter(function (x) { return x.hanzi === b.dataset.w; })[0]; if (w) { H.toast(w.hanzi + "  " + w.pinyin + " · " + w.vi); H.speak({ hanzi: w.hanzi, audio: w.audio }); } return; }
    if (a === "jump") { e.preventDefault(); var t = document.getElementById(b.dataset.to); if (t) t.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (a === "tg") { var p = pref(); p[b.dataset.v] = !p[b.dataset.v]; savePref(p); b.classList.toggle("on", p[b.dataset.v]); document.getElementById("tb-root").classList.toggle("no" + b.dataset.v, !p[b.dataset.v]); return; }
    if (a === "pick") { ANS[k] = { pick: +b.dataset.j }; H.sfx(+b.dataset.j === taskOf(k).a ? "pair" : "flip"); return repaintTask(k); }
    if (a === "tok") { ANS[k].built.push(+b.dataset.i); return repaintTask(k); }
    if (a === "untok") { ANS[k].built.splice(+b.dataset.i, 1); return repaintTask(k); }
    if (a === "chk") { var t2 = taskOf(k), s = ANS[k]; s.res = norm(s.built.map(function (i) { return t2.tok[i]; }).join("")) === norm(t2.a); H.sfx(s.res ? "pair" : "flip"); return repaintTask(k); }
    if (a === "redo") { ANS[k] = {}; return repaintTask(k); }
    if (a === "fill") { ANS[k] = { v: b.dataset.v }; return repaintPractice(); }
    if (a === "pcheck") { ANS.pdone = true; H.sfx("win"); repaintPractice(); return; }
    if (a === "xsubmit") return xSubmit();
    if (a === "xredo") { try { localStorage.removeItem(xKey()); } catch (er) { /* bỏ qua */ } xBoxes().forEach(function (el) { el.value = ""; }); return xPaint(); }
    if (a === "preset") { Object.keys(ANS).forEach(function (x) { if (/^p/.test(x)) delete ANS[x]; }); return repaintPractice(); }
  }
  function taskOf(key) { var ml = /^l(\d+)-(\d+)$/.exec(key); if (ml) return window.HD_TB[CUR].texts[+ml[1]].listen[+ml[2]]; var me = /^e(\d+)-(\d+)$/.exec(key); if (me) return window.HD_TB[CUR].extra[+me[1]].tasks[+me[2]]; var m = /^g(\d+)-(\d+)$/.exec(key); return window.HD_TB[CUR].grammar[+m[1]].tasks[+m[2]]; }
  function onInput(e) { if (e.target.classList && e.target.classList.contains("tb-in")) { e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; } }

  window.HD_TBV = {
    has: function (id) { return !!(window.HD_TB || {})[id]; },
    init: function (host) { H = host; H.app.addEventListener("click", onClick); H.app.addEventListener("input", onInput); },
    render: function (id) { ANS = {}; var ok = render(id); if (ok) xPaint(); return ok; }
  };
})();
