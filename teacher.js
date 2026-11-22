/* HUYEN DIEU · Bảng giáo viên: xem kết quả theo bài, theo học sinh, giao bài tập, cấp tài khoản. */
(function () {
  "use strict";
  var H, T = { tab: "overview", data: null, cls: "", range: 30, lesson: "", student: "", search: "", newCodes: null, err: "", busy: false, openAssign: {}, aCls: "", aStatus: "open", addCls: "", accCls: "", confirmCls: null, full: false };
  var SKILLS = { "listen-hanzi": "Nghe", "listen-pinyin": "Nghe", "dictation": "Nghe", "hanzi-pinyin": "Mặt chữ", "match": "Mặt chữ", "pinyin-hanzi": "Pinyin", "write": "Viết" };
  var SKILL_ORDER = ["Nghe", "Mặt chữ", "Pinyin", "Viết"];
  var TABS = [["overview", "Tổng quan"], ["classes", "Lớp"], ["lessons", "Theo bài"], ["students", "Theo học sinh"], ["assign", "Bài tập"], ["accounts", "Tài khoản"], ["guide", "Hướng dẫn"]];
  var DAY = 86400000;

  function esc(s) { return H.esc(s); }
  function avg(a) { return a.length ? a.reduce(function (x, y) { return x + y; }, 0) / a.length : 0; }
  function r0(n) { return Math.round(n); }
  function two(n) { return (n < 10 ? "0" : "") + n; }
  function fmt(ts) { var d = new Date(ts); return two(d.getDate()) + "/" + two(d.getMonth() + 1) + " " + two(d.getHours()) + ":" + two(d.getMinutes()); }
  function ago(ts) { if (!ts) return "chưa luyện"; var d = Math.floor((Date.now() - ts) / DAY); return d <= 0 ? "hôm nay" : d + " ngày trước"; }
  function lname(l) { if (String(l) === "all") return "Tổng hợp"; var m = /^(\d)-(\d+)$/.exec(String(l)); return m ? "HSK " + m[1] + " · Bài " + m[2] : "Bài " + l; }
  function lkey(l) { var m = /^(\d)-(\d+)$/.exec(String(l)); return m ? +m[1] * 1000 + +m[2] : +l; }
  function secs(s) { s = +s || 0; return s >= 3600 ? Math.floor(s / 3600) + " giờ " + Math.floor(s % 3600 / 60) + " phút" : Math.floor(s / 60) + " phút"; }
  function cls4(p) { return p >= 100 ? "h4" : p >= 80 ? "h3" : p >= 60 ? "h2" : p >= 40 ? "h1" : "h0"; }
  function wordInfo(h) { return H.ALL.filter(function (w) { return w.hanzi === h; })[0] || { hanzi: h, pinyin: "", vi: "" }; }

  /* ---------- dữ liệu ---------- */
  function prep(d) {
    d.students = d.students || []; d.results = d.results || []; d.assignments = d.assignments || []; d.classes = d.classes || [];
    d.results.forEach(function (r) {
      r.ts = new Date(r.t).getTime(); r.pct = +r.pct || 0; r.lesson = String(r.lesson); r.secs = +r.secs || 0;
      r.words = Array.isArray(r.words) ? r.words : []; r.wrong = Array.isArray(r.wrong) ? r.wrong : [];
    });
    d.results.sort(function (a, b) { return a.ts - b.ts; });
    return d;
  }
  function students() { return T.data.students.filter(function (s) { return s.active !== false && (!T.cls || s.cls === T.cls); }); }
  function results() {
    var cut = T.range ? Date.now() - T.range * DAY : 0, codes = {};
    students().forEach(function (s) { codes[s.code] = 1; });
    return T.data.results.filter(function (r) { return codes[r.code] && r.ts >= cut; });
  }
  function classes() { var o = {}; (T.data.classes || []).forEach(function (c) { o[c.name] = 1; }); T.data.students.forEach(function (s) { if (s.cls) o[s.cls] = 1; }); return Object.keys(o).sort(function (a, b) { return a.localeCompare(b, "vi"); }); }
  function today() { var d = new Date(); return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate()); }
  function plusDays(n) { var d = new Date(Date.now() + n * DAY); return d.getFullYear() + "-" + two(d.getMonth() + 1) + "-" + two(d.getDate()); }
  function lastOf(code) { var l = 0; T.data.results.forEach(function (r) { if (r.code === code && r.ts > l) l = r.ts; }); return l; }
  function wordStats(rs) {
    var m = {};
    rs.forEach(function (r) {
      r.words.forEach(function (w) { (m[w] = m[w] || { h: w, seen: 0, wrong: 0 }).seen++; });
      r.wrong.forEach(function (w) { if (/^Câu \d+:/.test(w)) return; (m[w] = m[w] || { h: w, seen: 0, wrong: 0 }).wrong++; });
    });
    return Object.keys(m).map(function (k) { var x = m[k]; x.seen = Math.max(x.seen, x.wrong); x.rate = x.seen ? x.wrong / x.seen * 100 : 0; return x; })
      .filter(function (x) { return x.wrong > 0 && x.seen >= 3; }).sort(function (a, b) { return b.rate - a.rate || b.wrong - a.wrong; });
  }
  function skillAvg(rs) {
    var o = {};
    rs.forEach(function (r) { var s = SKILLS[r.game]; if (s) (o[s] = o[s] || []).push(r.pct); });
    return SKILL_ORDER.filter(function (s) { return o[s]; }).map(function (s) { return { name: s, avg: avg(o[s]), n: o[s].length }; });
  }

  /* ---------- thành phần giao diện ---------- */
  function tile(label, val, sub) { return '<div class="t-tile"><div class="t-val">' + val + '</div><div class="t-lbl">' + label + "</div>" + (sub ? '<div class="t-sub">' + sub + "</div>" : "") + "</div>"; }
  function hbars(items, max) {
    if (!items.length) return '<p class="t-empty">Chưa có dữ liệu.</p>';
    return '<div class="hbars">' + items.map(function (it) {
      return '<div class="hb"><span class="hb-l">' + esc(it.label) + '</span><span class="hb-t"><i class="' + cls4(it.v) + '" style="width:' + Math.max(2, it.v / (max || 100) * 100) + '%"></i></span><span class="hb-v">' + (it.text || r0(it.v) + "%") + "</span></div>";
    }).join("") + "</div>";
  }
  function dayBars(rs) {
    var n = 14, now = new Date(); now.setHours(0, 0, 0, 0); var base = now.getTime() - (n - 1) * DAY, c = [], i;
    for (i = 0; i < n; i++) c.push(0);
    rs.forEach(function (r) { var k = Math.floor((r.ts - base) / DAY); if (k >= 0 && k < n) c[k]++; });
    var mx = Math.max.apply(null, c.concat([1])), w = 420, hgt = 110, bw = w / n, out = '<svg class="chart" viewBox="0 0 ' + w + " " + (hgt + 22) + '" role="img" aria-label="Số lượt làm bài 14 ngày gần đây">';
    c.forEach(function (v, k) {
      var bh = v / mx * hgt, d = new Date(base + k * DAY);
      out += '<rect x="' + (k * bw + 4) + '" y="' + (hgt - bh) + '" width="' + (bw - 8) + '" height="' + Math.max(bh, 2) + '" rx="4" class="bar' + (v ? "" : " zero") + '"/>';
      if (v) out += '<text x="' + (k * bw + bw / 2) + '" y="' + (hgt - bh - 4) + '" text-anchor="middle" class="ctext">' + v + "</text>";
      if (k % 2 === 0 || k === n - 1) out += '<text x="' + (k * bw + bw / 2) + '" y="' + (hgt + 15) + '" text-anchor="middle" class="ctext dim">' + d.getDate() + "/" + (d.getMonth() + 1) + "</text>";
    });
    return out + "</svg>";
  }
  function spark(vals) {
    if (vals.length < 2) return '<p class="t-empty">Cần ít nhất 2 lượt làm để vẽ xu hướng.</p>';
    var w = 420, h = 90, pad = 8, step = (w - pad * 2) / (vals.length - 1), pts = vals.map(function (v, i) { return [pad + i * step, pad + (100 - v) / 100 * (h - pad * 2)]; });
    var d = pts.map(function (p, i) { return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1); }).join(" ");
    var last = pts[pts.length - 1];
    return '<svg class="chart" viewBox="0 0 ' + w + " " + h + '" role="img" aria-label="Xu hướng điểm"><line x1="0" x2="' + w + '" y1="' + (pad + 0.2 * (h - pad * 2)) + '" y2="' + (pad + 0.2 * (h - pad * 2)) + '" class="gridl"/><path d="' + d + '" class="spark"/><circle cx="' + last[0] + '" cy="' + last[1] + '" r="4.5" class="sdot"/></svg>';
  }
  function panel(title, body, extra) { return '<section class="card t-card' + (extra ? " " + extra : "") + '"><h3 class="t-h">' + title + "</h3>" + body + "</section>"; }
  function table(head, rows, cls) {
    return '<div class="t-scroll"><table class="t-table ' + (cls || "") + '"><thead><tr>' + head.map(function (h) { return "<th>" + h + "</th>"; }).join("") + "</tr></thead><tbody>" + (rows.length ? rows.join("") : '<tr><td colspan="' + head.length + '" class="t-empty">Chưa có dữ liệu.</td></tr>') + "</tbody></table></div>";
  }
  function pill(t, k) { return '<span class="tp ' + (k || "") + '">' + esc(t) + "</span>"; }

  /* ---------- các tab ---------- */
  function tabOverview() {
    var st = students(), rs = results(), week = Date.now() - 7 * DAY, act = {}, flags = [];
    T.data.results.forEach(function (r) { if (r.ts >= week) act[r.code] = 1; });
    var activeN = st.filter(function (s) { return act[s.code]; }).length;
    st.forEach(function (s) {
      var mine = rs.filter(function (r) { return r.code === s.code; }), last = lastOf(s.code);
      if (!last) flags.push({ s: s, why: "Chưa làm bài nào", k: "bad" });
      else if (Date.now() - last > 7 * DAY) flags.push({ s: s, why: "Chưa luyện " + ago(last), k: "warn" });
      if (mine.length >= 3 && avg(mine.map(function (r) { return r.pct; })) < 60) flags.push({ s: s, why: "Điểm TB " + r0(avg(mine.map(function (r) { return r.pct; }))) + "%", k: "bad" });
    });
    var byL = {};
    rs.forEach(function (r) { (byL[r.lesson] = byL[r.lesson] || []).push(r.pct); });
    var lessons = Object.keys(byL).sort(function (a, b) { return a === "all" ? 1 : b === "all" ? -1 : lkey(a) - lkey(b); }).map(function (k) { return { label: lname(k), v: avg(byL[k]), text: r0(avg(byL[k])) + "% · " + byL[k].length + " lượt" }; });
    var ws = wordStats(rs).slice(0, 8);
    var tiles = '<div class="t-tiles">' + tile("Học sinh", st.length, activeN + " em luyện trong 7 ngày") + tile("Lượt làm bài", rs.length, T.range ? T.range + " ngày gần đây" : "Từ trước đến nay") + tile("Điểm trung bình", rs.length ? r0(avg(rs.map(function (r) { return r.pct; }))) + "%" : "–") + tile("Thời gian luyện", secs(rs.reduce(function (a, r) { return a + r.secs; }, 0))) + "</div>";
    var merged = {};
    flags.forEach(function (f) { var m = merged[f.s.code]; if (!m) merged[f.s.code] = f; else { m.why += " · " + f.why; m.k = "bad"; } });
    flags = Object.keys(merged).map(function (k) { return merged[k]; });
    var flagHtml = flags.length ? '<div class="flaglist">' + flags.slice(0, 12).map(function (f) { return '<button class="flag" data-ta="openStudent" data-code="' + esc(f.s.code) + '"><b>' + esc(f.s.name) + "</b><span>" + esc(f.s.cls || "") + "</span>" + pill(f.why, f.k) + "</button>"; }).join("") + "</div>" : '<p class="t-empty">Không có học sinh nào cần chú ý.</p>';
    var wsHtml = ws.length ? table(["Từ", "Pinyin", "Nghĩa", "Tỉ lệ sai"], ws.map(function (x) { var w = wordInfo(x.h); return '<tr><td class="hz">' + esc(x.h) + "</td><td>" + esc(w.pinyin) + "</td><td>" + esc(w.vi) + "</td><td>" + pill(r0(x.rate) + "% (" + x.wrong + "/" + x.seen + ")", x.rate >= 50 ? "bad" : "warn") + "</td></tr>"; })) : '<p class="t-empty">Cần thêm dữ liệu (mỗi từ xuất hiện từ 3 lần trở lên).</p>';
    return tiles + '<div class="t-grid">' + panel("Hoạt động 14 ngày qua", dayBars(T.data.results.filter(function (r) { return st.some(function (s) { return s.code === r.code; }); }))) + panel("Điểm trung bình theo bài", hbars(lessons)) + panel("Học sinh cần chú ý", flagHtml) + panel("Từ sai nhiều nhất", wsHtml) + "</div>";
  }

  function tabLessons() {
    var rs = results(), have = {};
    rs.forEach(function (r) { have[r.lesson] = 1; });
    var keys = Object.keys(have).sort(function (a, b) { return a === "all" ? 1 : b === "all" ? -1 : lkey(a) - lkey(b); });
    if (!keys.length) return panel("Theo bài", '<p class="t-empty">Chưa có kết quả trong khoảng thời gian này.</p>');
    if (!have[T.lesson]) T.lesson = keys[0];
    var chips = '<div class="t-chips">' + keys.map(function (k) { return '<button class="t-chip' + (k === T.lesson ? " on" : "") + '" data-ta="lesson" data-v="' + k + '">' + lname(k) + "</button>"; }).join("") + "</div>";
    var lr = rs.filter(function (r) { return r.lesson === T.lesson; }), st = students();
    var G = H.GAMES, gameRows = G.map(function (g) {
      var a = lr.filter(function (r) { return r.game === g.id; });
      var who = {}; a.forEach(function (r) { who[r.code] = 1; });
      return '<tr><td>' + esc(g.name) + "</td><td>" + a.length + "</td><td>" + Object.keys(who).length + "/" + st.length + "</td><td>" + (a.length ? pill(r0(avg(a.map(function (r) { return r.pct; }))) + "%", cls4(avg(a.map(function (r) { return r.pct; })))) : "–") + "</td></tr>";
    });
    var head = ["Học sinh"].concat(G.map(function (g) { return '<span title="' + esc(g.name) + '">' + esc(g.name.replace(/ →.*/, "").replace("Thẻ ghi nhớ", "Thẻ").replace("Tập viết chữ Hán", "Viết")) + "</span>"; })).concat(["TB"]);
    var matrix = st.map(function (s) {
      var mine = lr.filter(function (r) { return r.code === s.code; });
      var cells = G.map(function (g) { var a = mine.filter(function (r) { return r.game === g.id; }); if (!a.length) return '<td class="hm none">–</td>'; var b = Math.max.apply(null, a.map(function (r) { return r.pct; })); return '<td class="hm ' + cls4(b) + '" title="' + a.length + ' lượt, cao nhất ' + b + '%">' + b + "</td>"; }).join("");
      return '<tr><td><button class="linkb" data-ta="openStudent" data-code="' + esc(s.code) + '">' + esc(s.name) + "</button></td>" + cells + "<td>" + (mine.length ? "<b>" + r0(avg(mine.map(function (r) { return r.pct; }))) + "%</b>" : "–") + "</td></tr>";
    });
    var ws = wordStats(lr).slice(0, 10);
    var wsT = ws.length ? hbars(ws.map(function (x) { var w = wordInfo(x.h); return { label: x.h + "  " + w.pinyin, v: x.rate, text: r0(x.rate) + "% sai" }; })) : '<p class="t-empty">Chưa đủ dữ liệu để chỉ ra từ khó.</p>';
    return chips + '<div class="t-grid">' + panel("Các game của " + lname(T.lesson), table(["Game", "Lượt", "Số HS", "Điểm TB"], gameRows)) + panel("Từ khó trong " + lname(T.lesson), wsT) + "</div>" +
      panel("Bảng điểm cao nhất của từng học sinh (%)", '<p class="t-sub">Mỗi ô là điểm cao nhất của học sinh ở game đó. Rê chuột lên ô để xem số lượt.</p>' + table(head, matrix, "matrix"), "wide");
  }

  function studentList() {
    var q = T.search.trim().toLowerCase(), st = students().filter(function (s) { return !q || (s.name + " " + s.code).toLowerCase().indexOf(q) >= 0; }).sort(function (a, b) { return a.name.localeCompare(b.name, "vi"); });
    if (!st.length) return '<p class="t-empty">Không tìm thấy học sinh.</p>';
    return st.map(function (s) {
      var mine = T.data.results.filter(function (r) { return r.code === s.code; }), a = mine.length ? r0(avg(mine.map(function (r) { return r.pct; }))) : null;
      return '<button class="srow' + (s.code === T.student ? " on" : "") + '" data-ta="openStudent" data-code="' + esc(s.code) + '"><span class="sname">' + esc(s.name) + '</span><span class="smeta">' + esc(s.cls || "") + " · " + ago(lastOf(s.code)) + "</span>" + (a === null ? pill("mới", "") : pill(a + "%", cls4(a))) + "</button>";
    }).join("");
  }
  function insights(s, mine, all) {
    var out = [], sk = skillAvg(mine);
    if (!mine.length) return ["Học sinh này chưa làm bài nào trong khoảng thời gian đang chọn."];
    var a = avg(mine.map(function (r) { return r.pct; }));
    out.push("Điểm trung bình " + r0(a) + "% sau " + mine.length + " lượt làm bài" + (a >= 85 ? ", nắm bài rất chắc." : a >= 65 ? ", mức khá." : ", cần ôn thêm."));
    if (sk.length >= 2) { var hi = sk.slice().sort(function (x, y) { return y.avg - x.avg; }), lo = hi[hi.length - 1]; if (hi[0].avg - lo.avg >= 12) out.push("Mạnh về " + hi[0].name.toLowerCase() + " (" + r0(hi[0].avg) + "%), yếu hơn ở " + lo.name.toLowerCase() + " (" + r0(lo.avg) + "%). Nên cho luyện thêm dạng " + lo.name.toLowerCase() + "."); else out.push("Các kỹ năng khá đồng đều (chênh dưới 12 điểm)."); }
    if (all.length >= 6) { var l5 = avg(all.slice(-5).map(function (r) { return r.pct; })), p5 = avg(all.slice(-10, -5).map(function (r) { return r.pct; })); if (all.length >= 10 || all.length >= 6) { var d = l5 - (all.length >= 10 ? p5 : avg(all.slice(0, all.length - 5).map(function (r) { return r.pct; }))); if (d >= 5) out.push("Đang tiến bộ: 5 lượt gần nhất cao hơn " + r0(d) + " điểm so với trước đó."); else if (d <= -5) out.push("Điểm đang giảm " + r0(-d) + " điểm so với trước đó, nên hỏi thăm em."); } }
    var gap = Date.now() - lastOf(s.code); if (gap > 7 * DAY) out.push("Đã " + Math.floor(gap / DAY) + " ngày chưa luyện tập.");
    var w = wordStats(mine).slice(0, 3); if (w.length) out.push("Hay sai các từ: " + w.map(function (x) { return x.h + " (" + wordInfo(x.h).pinyin + ")"; }).join(", ") + ".");
    return out;
  }
  function studentDetail() {
    var s = T.data.students.filter(function (x) { return x.code === T.student; })[0];
    if (!s) return '<div class="card t-card"><p class="t-empty">Chọn một học sinh ở danh sách bên trái để xem chi tiết.</p></div>';
    var cut = T.range ? Date.now() - T.range * DAY : 0, all = T.data.results.filter(function (r) { return r.code === s.code; }), mine = all.filter(function (r) { return r.ts >= cut; });
    var days = {}; mine.forEach(function (r) { days[new Date(r.ts).toDateString()] = 1; });
    var tiles = '<div class="t-tiles small">' + tile("Lượt làm", mine.length) + tile("Điểm TB", mine.length ? r0(avg(mine.map(function (r) { return r.pct; }))) + "%" : "–") + tile("Số ngày luyện", Object.keys(days).length) + tile("Thời gian", secs(mine.reduce(function (a, r) { return a + r.secs; }, 0))) + "</div>";
    var bl = {}; mine.forEach(function (r) { (bl[r.lesson] = bl[r.lesson] || []).push(r.pct); });
    var lessons = Object.keys(bl).sort(function (a, b) { return a === "all" ? 1 : b === "all" ? -1 : lkey(a) - lkey(b); }).map(function (k) { return { label: lname(k), v: avg(bl[k]), text: r0(avg(bl[k])) + "% · " + bl[k].length + " lượt" }; });
    var sk = skillAvg(mine).map(function (x) { return { label: x.name, v: x.avg, text: r0(x.avg) + "% · " + x.n + " lượt" }; });
    var ws = wordStats(mine).slice(0, 8);
    var wsHtml = ws.length ? table(["Từ", "Pinyin", "Nghĩa", "Sai"], ws.map(function (x) { var w = wordInfo(x.h); return '<tr><td class="hz">' + esc(x.h) + "</td><td>" + esc(w.pinyin) + "</td><td>" + esc(w.vi) + "</td><td>" + pill(x.wrong + "/" + x.seen, x.rate >= 50 ? "bad" : "warn") + "</td></tr>"; })) : '<p class="t-empty">Chưa có từ nào sai từ 3 lần trở lên.</p>';
    var hist = mine.slice().reverse().slice(0, 40).map(function (r) { return "<tr><td>" + fmt(r.ts) + "</td><td>" + lname(r.lesson) + "</td><td>" + esc(r.gameName || r.game) + "</td><td>" + r.score + "/" + r.total + "</td><td>" + pill(r.pct + "%", cls4(r.pct)) + "</td><td>" + secs(r.secs) + "</td><td>" + (r.assignmentId ? pill("Bài tập", "") : "") + "</td></tr>"; });
    return '<div class="t-detail"><section class="card t-card"><div class="t-sh"><div><h3 class="t-h" style="margin:0">' + esc(s.name) + "</h3><div class=\"t-sub\">" + esc(s.cls || "Chưa có lớp") + " · Mã " + esc(s.code) + " · Lần cuối: " + ago(lastOf(s.code)) + "</div></div></div>" + tiles + "</section>" +
      panel("Nhận xét tự động", "<ul class=\"ins\">" + insights(s, mine, all).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>") +
      '<div class="t-grid">' + panel("Xu hướng điểm (theo từng lượt)", spark(mine.map(function (r) { return r.pct; }))) + panel("Kỹ năng", hbars(sk)) + panel("Theo bài", hbars(lessons)) + panel("Từ hay sai", wsHtml) + "</div>" +
      panel("Lịch sử làm bài (40 lượt gần nhất)", table(["Thời gian", "Bài", "Game", "Đúng", "Điểm", "Thời gian làm", ""], hist)) + "</div>";
  }
  function tabStudents() {
    return '<div class="t-split"><aside class="card t-card t-side"><input class="t-input" id="s-search" type="search" placeholder="Tìm tên hoặc mã…" value="' + esc(T.search) + '" autocomplete="off"><div class="slist" id="s-list">' + studentList() + '</div></aside><div id="s-detail">' + studentDetail() + "</div></div>";
  }

  function targetsOf(a) { return T.data.students.filter(function (s) { return s.active !== false && (!a.cls || a.cls === "all" || a.cls === s.cls); }); }

  function classInfo(name) { return (T.data.classes || []).filter(function (c) { return c.name === name; })[0] || { name: name, note: "", url: "", level: 1 }; }
  function levelOf(name) { var l = Math.round(+classInfo(name).level); return l >= 1 && l <= 3 ? l : 1; }
  function lvOptions(sel) { return [1, 2, 3].map(function (n) { return '<option value="' + n + '"' + (+sel === n ? " selected" : "") + ">HSK " + n + "</option>"; }).join(""); }
  function lessonOpts(ls) {
    var lvs = {}; ls.forEach(function (l) { (lvs[l.level || 1] = lvs[l.level || 1] || []).push(l); });
    var ks = Object.keys(lvs), one = function (l) { return '<option value="' + l.id + '">Bài ' + (l.num || l.id) + (l.topic ? " · " + esc(l.topic) : "") + "</option>"; };
    return ks.length > 1 ? ks.map(function (k) { return '<optgroup label="HSK ' + k + '">' + lvs[k].map(one).join("") + "</optgroup>"; }).join("") : ls.map(one).join("");
  }
  function tabClasses() {
    var cl = classes(), td = today(), week = Date.now() - 7 * DAY, cut30 = Date.now() - 30 * DAY;
    var noClass = T.data.students.filter(function (s) { return s.active !== false && !s.cls; });
    var form = panel("Tạo lớp mới", '<div class="t-form"><label>Tên lớp<input class="t-input" id="c-name" maxlength="40" placeholder="Ví dụ: Lớp HSK1 tối 2-4-6"></label><label>Trình độ<select class="t-input" id="c-level">' + lvOptions(1) + '</select></label><label>Ghi chú (không bắt buộc)<input class="t-input" id="c-note" maxlength="80" placeholder="Ví dụ: học 19h30"></label><div class="full"><button class="btn" data-ta="addClass">Tạo lớp</button> <span class="t-sub" id="c-msg"></span></div></div>');
    var cards = cl.length ? '<div class="cgrid">' + cl.map(function (c) {
      var st = T.data.students.filter(function (s) { return s.cls === c && s.active !== false; }), codes = {}; st.forEach(function (s) { codes[s.code] = 1; });
      var rs = T.data.results.filter(function (r) { return codes[r.code] && r.ts >= cut30; }), idle = st.filter(function (s) { return !(lastOf(s.code) >= week); }).length;
      var as = T.data.assignments.filter(function (a) { return a.cls === c && (!a.due || a.due >= td); }), info = classInfo(c);
      var link = info.url ? '<a class="btn ghost small" href="' + esc(info.url) + '" target="_blank" rel="noopener">Mở file lớp</a><button class="btn ghost small" data-ta="exportClass" data-v="' + esc(c) + '">Cập nhật file</button>' : '<button class="btn ghost small" data-ta="exportClass" data-v="' + esc(c) + '">Tạo file quản lý riêng</button>';
      return '<section class="card t-card cc"><div class="cc-h"><h3 class="t-h" style="margin:0">' + esc(c) + '</h3><select class="t-input t-lv" data-ta="classLevel" data-v="' + esc(c) + '" aria-label="Trình độ lớp">' + lvOptions(levelOf(c)) + "</select>" + (info.note ? '<span class="t-sub">' + esc(info.note) + "</span>" : "") + '</div><div class="cc-stats"><div><b>' + st.length + "</b><span>học sinh</span></div><div><b>" + (rs.length ? r0(avg(rs.map(function (r) { return r.pct; }))) + "%" : "–") + "</b><span>điểm TB 30 ngày</span></div><div><b>" + as.length + "</b><span>bài tập đang mở</span></div><div><b>" + idle + "</b><span>chưa luyện 7 ngày</span></div></div>" +
        '<div class="cc-btns"><button class="btn small" data-ta="classView" data-v="' + esc(c) + '">Xem kết quả</button><button class="btn ghost small" data-ta="classAssign" data-v="' + esc(c) + '">Bài tập</button><button class="btn ghost small" data-ta="classAdd" data-v="' + esc(c) + '">Thêm học sinh</button>' + link + (st.length === 0 ? '<button class="btn ghost small" data-ta="delClass" data-v="' + esc(c) + '">' + (T.confirmCls === c ? "Bấm lần nữa để xóa" : "Xóa lớp") + "</button>" : "") + "</div></section>";
    }).join("") + "</div>" : '<p class="t-empty">Chưa có lớp nào. Tạo lớp đầu tiên ở trên.</p>';
    var warn = noClass.length ? '<div class="demo-banner">Có <b>' + noClass.length + " học sinh chưa có lớp</b> (" + noClass.slice(0, 4).map(function (s) { return esc(s.name); }).join(", ") + (noClass.length > 4 ? "…" : "") + '). Gán lớp ở tab <b>Tài khoản</b>.</div>' : "";
    return '<div class="t-grid one">' + warn + form + panel("Các lớp (" + cl.length + ")", '<p class="t-sub">Google Sheet gốc có tab <b>Các lớp</b> liệt kê mọi lớp; bấm vào link của lớp để mở file riêng (Tổng quan, từng bài, từng câu, từng bạn). File tự cập nhật mỗi ngày lúc 23 giờ.</p><div style="margin:8px 0 14px"><button class="btn small" data-ta="refreshAll">Cập nhật file của tất cả các lớp ngay</button></div>' + cards) + "</div>";
  }

  /* chi tiết bài làm của học sinh cho bài tập soạn sẵn: câu nào sai, trả lời gì, đáp án đúng là gì */
  function lastAttempt(a, code) {
    var m = T.data.results.filter(function (r) { return r.code === code && r.assignmentId === a.id; });
    return m.sort(function (x, y) { return y.ts - x.ts; })[0] || null;
  }
  function sheetRow(a, d, qinfo) {
    var r = lastAttempt(a, d.s.code), wr = r ? r.wrong : [], body;
    if (!r) body = "";
    else if (r.pct >= 100) body = '<p class="t-sub" style="margin:6px 0 0">Đúng hết các câu.</p>';
    else if (!wr.length) body = '<p class="t-sub" style="margin:6px 0 0">Bài nộp này chưa lưu chi tiết từng câu (nộp trước khi có tính năng xem chi tiết). Điểm: ' + r.score + "/" + r.total + ".</p>";
    else body = '<div class="sh-t">' + wr.map(function (w) {
      var m = /^Câu (\d+): ([\s\S]*)$/.exec(w), n = m ? +m[1] : 0, q = qinfo[n - 1];
      return '<div class="sh-tr"><b>Câu ' + n + "</b>" + (q ? ' <span class="hz">' + esc(q.q) + "</span>" : "") + '<div class="t-sub">Trả lời: <span class="bad-t">' + esc(m ? m[2] : w) + "</span>" + (q ? " · Đáp án: <b>" + esc(q.correct) + "</b>" : "") + "</div></div>";
    }).join("") + "</div>";
    return '<details class="asg-s"><summary class="asg-r"><span>' + esc(d.s.name) + "</span>" + pill((r ? r.score + "/" + r.total : d.best + "%") + " · " + d.n + " lượt", cls4(r ? r.pct : d.best)) + "</summary>" + (r ? '<p class="t-sub" style="margin:4px 0 0">Lượt gần nhất · ' + fmt(r.ts) + "</p>" : "") + body + "</details>";
  }
  function sheetSummary(a, done, qinfo) {
    var cnt = {}, tot = 0;
    done.forEach(function (d) { var r = lastAttempt(a, d.s.code); if (!r || !r.wrong.length) return; tot++; r.wrong.forEach(function (w) { var m = /^Câu (\d+):/.exec(w); if (m) cnt[m[1]] = (cnt[m[1]] || 0) + 1; }); });
    var top = Object.keys(cnt).sort(function (x, y) { return cnt[y] - cnt[x] || x - y; }).slice(0, 5);
    if (!top.length) return "";
    return '<div class="sh-sum"><div class="eyebrow">Câu nhiều bạn sai nhất (theo lượt làm gần nhất)</div>' + top.map(function (n) { var q = qinfo[n - 1]; return '<div class="asg-r"><span><b>Câu ' + n + "</b> " + (q ? '<span class="hz">' + esc(q.q) + "</span>" : "") + '</span>' + pill(cnt[n] + "/" + done.length + " bạn sai", cnt[n] / done.length >= 0.5 ? "bad" : "warn") + "</div>"; }).join("") + "</div>";
  }
  function asgDetails(a) {
    var tg = targetsOf(a), done = [], todo = [], td = today();
    tg.forEach(function (s) { var m = T.data.results.filter(function (r) { return r.code === s.code && r.assignmentId === a.id; }); if (m.length) done.push({ s: s, best: Math.max.apply(null, m.map(function (r) { return r.pct; })), n: m.length }); else todo.push(s); });
    var shx = a.game ? (H.SHEETS || []).filter(function (x) { return x.id === a.game; })[0] : null, qinfo = shx && window.HD_SHEET ? window.HD_SHEET.info(shx) : null;
    var late = a.due && a.due < td, g = a.game ? H.GAMES.concat(H.SHEETS || []).filter(function (x) { return x.id === a.game; })[0] : null, pctDone = tg.length ? r0(done.length / tg.length * 100) : 0;
    return '<details class="asg"' + (T.openAssign[a.id] ? " open" : "") + ' data-aid="' + esc(a.id) + '"><summary><span class="asg-t"><b>' + esc(a.title) + "</b><span>" + lname(a.lesson) + " · " + (g ? esc(g.name) : "Tự chọn game") + " · Hạn " + esc((a.due || "–").split("-").reverse().join("/")) + (late ? " (đã hết hạn)" : "") + '</span></span><span class="asg-p">' + pill(done.length + "/" + tg.length + " đã nộp", pctDone >= 80 ? "good" : late && pctDone < 100 ? "bad" : "warn") + "</span></summary>" +
      '<div class="asg-b"><div><div class="eyebrow">Đã làm (' + done.length + ")</div>" + (done.length ? done.map(function (d) { return qinfo ? sheetRow(a, d, qinfo) : '<div class="asg-r"><span>' + esc(d.s.name) + "</span>" + pill(d.best + "% · " + d.n + " lượt", cls4(d.best)) + "</div>"; }).join("") : '<p class="t-empty">Chưa có ai.</p>') + "</div>" +
      '<div><div class="eyebrow">Chưa làm (' + todo.length + ")</div>" + (todo.length ? todo.map(function (s) { return '<div class="asg-r"><span>' + esc(s.name) + '</span><span class="t-sub">' + esc(s.cls || "") + "</span></div>"; }).join("") : '<p class="t-empty">Cả lớp đã nộp.</p>') + "</div></div>" +
      (qinfo ? sheetSummary(a, done, qinfo) : "") + (a.note ? '<p class="t-sub">Ghi chú: ' + esc(a.note) + "</p>" : "") + (todo.length ? '<button class="btn small" data-ta="remind" data-id="' + esc(a.id) + '">Sao chép lời nhắc (' + todo.length + ' em chưa nộp)</button> ' : "") + '<button class="btn ghost small" data-ta="delAssign" data-id="' + esc(a.id) + '">' + (T.confirmDel === a.id ? "Bấm lần nữa để xóa" : "Xóa bài tập") + "</button></details>";
  }
  function tabAssign() {
    var ls = H.LESSONS.filter(function (l) { return l.words.length; }), cl = classes(), td = today();
    var rowsCls = cl.length ? cl.map(function (c) { return '<label class="ac-row"><input type="checkbox" class="ac-chk" value="' + esc(c) + '"' + (T.aCls === c ? " checked" : "") + "><span>" + esc(c) + ' <small class="t-sub">HSK ' + levelOf(c) + '</small></span><input class="t-input ac-due" type="date" data-for="' + esc(c) + '" value="' + plusDays(3) + '"></label>'; }).join("") : '<label class="ac-row"><input type="checkbox" class="ac-chk" value="all" checked><span>Tất cả học sinh</span><input class="t-input ac-due" type="date" data-for="all" value="' + plusDays(3) + '"></label>';
    var form = '<div class="t-form"><label>Tiêu đề<input class="t-input" id="a-title" placeholder="Ví dụ: Ôn nghe Bài 1" maxlength="80"></label>' +
      '<label>Bài<select class="t-input" id="a-lesson">' + lessonOpts(ls) + (ls.length > 1 ? '<option value="all">Tổng hợp tất cả bài</option>' : "") + "</select></label>" +
      '<label>Game<select class="t-input" id="a-game"><option value="">Học sinh tự chọn</option>' + H.GAMES.map(function (g) { return '<option value="' + g.id + '">' + esc(g.name) + "</option>"; }).join("") + ((H.SHEETS || []).length ? '<optgroup label="Bài tập soạn sẵn">' + H.SHEETS.map(function (s) { return '<option value="' + s.id + '">' + esc(s.title) + "</option>"; }).join("") + "</optgroup>" : "") + "</select></label>" +
      '<label class="full">Ghi chú cho học sinh (không bắt buộc)<input class="t-input" id="a-note" maxlength="140" placeholder="Ví dụ: làm ít nhất 2 lượt, đạt trên 80%"></label>' +
      '<div class="full"><div class="eyebrow" style="margin-bottom:6px">Giao cho lớp nào, hạn nộp ngày nào' + (cl.length > 1 ? ' <button class="linkb" data-ta="aAll" style="margin-left:8px">Chọn tất cả lớp</button>' : "") + '</div><div class="ac-list">' + rowsCls + '</div><p class="t-sub">Tick nhiều lớp để giao cùng lúc. Mỗi lớp có thể có hạn nộp riêng.</p></div>' +
      '<div class="full"><button class="btn" data-ta="saveAssign"' + (T.busy ? " disabled" : "") + '>Giao bài tập</button> <span class="t-sub" id="a-msg"></span></div></div>';
    var chipsC = '<div class="t-chips"><button class="t-chip' + (!T.aCls ? " on" : "") + '" data-ta="aCls" data-v="">Tất cả lớp</button>' + cl.map(function (c) { return '<button class="t-chip' + (T.aCls === c ? " on" : "") + '" data-ta="aCls" data-v="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + "</div>";
    var chipsS = '<div class="t-chips">' + [["open", "Đang mở"], ["closed", "Đã hết hạn"], ["all", "Tất cả"]].map(function (s) { return '<button class="t-chip' + (T.aStatus === s[0] ? " on" : "") + '" data-ta="aStatus" data-v="' + s[0] + '">' + s[1] + "</button>"; }).join("") + "</div>";
    var list = T.data.assignments.filter(function (a) {
      if (T.aCls && a.cls !== T.aCls && a.cls !== "all") return false;
      var closed = a.due && a.due < td; return T.aStatus === "all" || (T.aStatus === "open" ? !closed : closed);
    });
    var groups = {}; list.forEach(function (a) { var k = !a.cls || a.cls === "all" ? "Tất cả học sinh" : a.cls; (groups[k] = groups[k] || []).push(a); });
    var gh = Object.keys(groups).sort().map(function (k) {
      return '<div class="agroup"><div class="eyebrow">' + esc(k) + " · " + groups[k].length + " bài</div>" + groups[k].sort(function (a, b) { return T.aStatus === "closed" ? String(b.due).localeCompare(String(a.due)) : String(a.due).localeCompare(String(b.due)); }).map(asgDetails).join("") + "</div>";
    }).join("") || '<p class="t-empty">Không có bài tập nào ở bộ lọc này.</p>';
    return '<div class="t-grid one">' + panel("Giao bài tập mới", form) + panel("Các bài tập đã giao", chipsC + chipsS + gh) + "</div>";
  }

  function tabAccounts() {
    var cl = classes(), sel = T.addCls;
    var created = T.newCodes ? panel("Mã vừa tạo, hãy gửi cho học sinh", '<div class="t-sub">Mỗi học sinh chỉ dùng mã của mình.</div>' + table(["Họ tên", "Lớp", "Mã đăng nhập"], T.newCodes.map(function (c) { return "<tr><td>" + esc(c.name) + "</td><td>" + esc(c.cls || "") + '</td><td><b class="code">' + esc(c.code) + "</b></td></tr>"; })) + '<p><button class="btn ghost small" data-ta="copyNew">Sao chép danh sách</button></p>', "good-card") : "";
    var form = panel("Thêm học sinh", '<div class="t-form"><label>Vào lớp<select class="t-input" id="n-cls"><option value="">(chưa gán lớp)</option>' + cl.map(function (c) { return '<option value="' + esc(c) + '"' + (c === sel ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("") + '</select></label><div class="full"><p class="t-sub">Mỗi dòng một học sinh. Viết <b>Họ tên</b>, hoặc <b>Họ tên, Tên lớp</b> nếu muốn khác lớp đã chọn ở trên.</p><textarea class="t-input" id="n-list" rows="5" placeholder="Nguyễn Văn A&#10;Trần Thị B, Lớp khác"></textarea></div><div class="full"><button class="btn" data-ta="addStudents"' + (T.busy ? " disabled" : "") + '>Tạo mã đăng nhập</button> <span class="t-sub" id="n-msg"></span></div></div>');
    var rows = T.data.students.filter(function (s) { return !T.accCls || (T.accCls === "__none" ? !s.cls : s.cls === T.accCls); }).sort(function (a, b) { return (a.cls || "").localeCompare(b.cls || "", "vi") || a.name.localeCompare(b.name, "vi"); }).map(function (s) {
      var off = s.active === false, opts = '<option value="">(chưa có lớp)</option>' + cl.map(function (c) { return '<option value="' + esc(c) + '"' + (c === s.cls ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("");
      return "<tr" + (off ? ' class="off"' : "") + "><td>" + esc(s.name) + '</td><td><select class="t-input sm" data-ta="move" data-code="' + esc(s.code) + '" aria-label="Lớp của ' + esc(s.name) + '">' + opts + '</select></td><td><button class="linkb code" data-ta="copy" data-v="' + esc(s.code) + '">' + esc(s.code) + "</button></td><td>" + ago(lastOf(s.code)) + '</td><td><button class="btn ghost small" data-ta="toggle" data-code="' + esc(s.code) + '">' + (off ? "Mở lại" : "Khóa") + "</button></td></tr>";
    });
    var chips = '<div class="t-chips"><button class="t-chip' + (!T.accCls ? " on" : "") + '" data-ta="accCls" data-v="">Tất cả</button>' + cl.map(function (c) { return '<button class="t-chip' + (T.accCls === c ? " on" : "") + '" data-ta="accCls" data-v="' + esc(c) + '">' + esc(c) + "</button>"; }).join("") + '<button class="t-chip' + (T.accCls === "__none" ? " on" : "") + '" data-ta="accCls" data-v="__none">Chưa có lớp</button></div>';
    return '<div class="t-grid one">' + created + form + panel("Danh sách tài khoản (" + rows.length + "/" + T.data.students.length + ")", '<p class="t-sub">Đổi lớp bằng ô chọn. Bấm vào mã để sao chép. Khóa tài khoản để học sinh không đăng nhập được nữa, dữ liệu cũ vẫn giữ.</p>' + chips + table(["Họ tên", "Lớp", "Mã", "Lần cuối", ""], rows)) + "</div>";
  }

  function tabGuide() {
    var demo = H.api.demo;
    return '<div class="t-grid one">' + (demo ? panel("Bạn đang ở chế độ thử", '<p>Dữ liệu hiện tại là <b>dữ liệu mẫu</b> lưu trong trình duyệt, chưa kết nối Google Sheet. Làm theo các bước dưới để kết nối thật.</p><p><button class="btn ghost small" data-ta="resetDemo">Đặt lại dữ liệu mẫu</button></p>', "warn-card") : panel("Đã kết nối Google Sheet", "<p>Mọi kết quả đang được ghi vào Google Sheet của bạn. Mở Sheet để xem bảng thô, tab <b>TongHop</b> tự tính điểm trung bình theo học sinh và bài.</p>")) +
      panel("Kết nối Google Sheet (làm một lần)", '<ol class="guide"><li>Tạo một Google Sheet mới, đặt tên “Huyen Dieu - Kết quả”.</li><li>Vào <b>Tiện ích mở rộng → Apps Script</b>. Xóa code mẫu, dán toàn bộ nội dung file <code>apps-script/Code.gs</code>, bấm Lưu.</li><li>Chọn hàm <code>setup</code> rồi bấm <b>Chạy</b>, cấp quyền khi Google hỏi. Các tab HocSinh, KetQua, BaiTap, CaiDat, TongHop sẽ tự được tạo. Mã giáo viên nằm ở tab <b>CaiDat</b> ô B1, bạn có thể đổi.</li><li>Bấm <b>Triển khai → Tùy chọn triển khai mới → Ứng dụng web</b>. Chọn “Thực thi dưới tên: Tôi”, “Ai có quyền truy cập: Bất kỳ ai”. Bấm Triển khai và sao chép đường link kết thúc bằng <code>/exec</code>.</li><li>Mở file <code>config.js</code>, dán link vào <code>url: ""</code> rồi lưu.</li><li>Đưa thư mục web lên mạng (Netlify Drop, GitHub Pages hoặc Cloudflare Pages đều miễn phí) để có link chia sẻ cho học sinh.</li></ol>') +
      panel("Nâng cấp Apps Script khi có bản mới", '<ol class="guide"><li>Mở Apps Script, xóa code cũ và dán lại toàn bộ <code>Code.gs</code> mới, bấm Lưu.</li><li>Chọn hàm <code>setup</code> và bấm <b>Chạy</b>. Google sẽ hỏi thêm quyền (tạo file riêng cho từng lớp), hãy cho phép.</li><li><b>Triển khai → Quản lý bản triển khai → Sửa (biểu tượng bút) → Phiên bản: Phiên bản mới → Triển khai</b>. Link <code>/exec</code> giữ nguyên.</li></ol>') +
      panel("Lớp học và file quản lý riêng", '<ul class="guide"><li>Google Sheet gốc chỉ cần mở tab <b>Các lớp</b>: mỗi lớp một dòng, bấm <b>Mở file lớp</b> để vào file riêng. Trong file lớp có: <b>Tổng quan</b>, <b>Bài tập</b> (ai nộp, ai chưa), từng tab <b>Bài 1, Bài 2…</b> (điểm từng game của từng bạn), tab <b>CT …</b> (từng câu đúng/sai của bài tập soạn sẵn), <b>Xem từng bạn</b> (chọn tên để xem lịch sử) và <b>Kết quả</b> (nhật ký đầy đủ).</li><li>File lớp tự cập nhật lúc 23 giờ mỗi ngày. Muốn xem số liệu mới ngay, bấm <b>Cập nhật file của tất cả các lớp ngay</b> trong tab Lớp.</li><li>Giao bài tập cho nhiều lớp cùng lúc ở tab <b>Bài tập</b>, mỗi lớp một hạn nộp.</li></ul>') +
      panel("Dùng hằng ngày", '<ol class="guide"><li><b>Cấp tài khoản:</b> tab Tài khoản, nhập danh sách học sinh, bấm Tạo mã rồi gửi mã cho từng em.</li><li><b>Giao bài:</b> tab Bài tập, chọn bài, game, hạn nộp, lớp. Học sinh thấy bài ngay ở trang chủ.</li><li><b>Xem kết quả:</b> Tổng quan để nắm cả lớp; Theo bài để xem bài nào, từ nào khó; Theo học sinh để xem từng em, có nhận xét tự động; Bài tập để biết ai đã nộp.</li><li><b>Thêm bài mới:</b> mở <code>data.js</code>, thêm từ vào bài tương ứng, đưa file lên lại.</li></ol>') +
      panel("Lưu ý bảo mật", '<ul class="guide"><li>Mã đăng nhập hoạt động như mật khẩu, mỗi học sinh một mã, không dùng chung.</li><li>Giữ kín mã giáo viên và link Google Sheet.</li><li>Học sinh có mã bị lộ: khóa tài khoản ở tab Tài khoản và tạo mã mới.</li></ul>') + "</div>";
  }

  /* ---------- khung chính ---------- */
  function shell() {
    var cl = classes(), banner = H.api.demo ? '<div class="demo-banner"><b>Chế độ thử:</b> đây là dữ liệu mẫu trong trình duyệt, chưa kết nối Google Sheet. Xem tab Hướng dẫn để kết nối thật.</div>' : "";
    var filters = '<div class="t-filters"><label>Lớp<select class="t-input" id="f-cls"><option value="">Tất cả lớp</option>' + cl.map(function (c) { return '<option value="' + esc(c) + '"' + (c === T.cls ? " selected" : "") + ">" + esc(c) + "</option>"; }).join("") + '</select></label><label>Thời gian<select class="t-input" id="f-range">' + [[7, "7 ngày"], [30, "30 ngày"], [0, "Tất cả"]].map(function (o) { return '<option value="' + o[0] + '"' + (o[0] === T.range ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + '</select></label><button class="btn ghost small" data-ta="reload">Tải lại dữ liệu</button></div>';
    var tabs = '<div class="t-tabs" role="tablist">' + TABS.map(function (t) { return '<button role="tab" class="t-tab' + (t[0] === T.tab ? " on" : "") + '" data-ta="tab" data-v="' + t[0] + '">' + t[1] + "</button>"; }).join("") + "</div>";
    var body = ({ overview: tabOverview, classes: tabClasses, lessons: tabLessons, students: tabStudents, assign: tabAssign, accounts: tabAccounts, guide: tabGuide })[T.tab]();
    return banner + '<div class="t-head"><h1 class="h1">Bảng giáo viên</h1><p class="sub">Kết quả học tập của lớp, được ghi tự động vào Google Sheet.</p></div>' + tabs + (T.tab === "guide" || T.tab === "accounts" || T.tab === "assign" || T.tab === "classes" ? "" : filters) + '<div class="t-body">' + body + "</div>";
  }
  function paint() { H.app.innerHTML = shell(); }
  function load(force) {
    if (T.data && !force) return paint();
    H.app.innerHTML = '<div class="card t-card"><p class="t-empty">Đang tải dữ liệu…</p></div>';
    H.api.call("admin", { code: H.session.code, days: T.full ? 0 : 120 }).then(function (r) {
      if (!r || !r.ok) { H.app.innerHTML = '<div class="card t-card"><p class="t-empty">Không tải được dữ liệu (' + esc(r && r.error || "lỗi") + '). Kiểm tra kết nối rồi thử lại.</p><p><button class="btn" data-ta="reload">Thử lại</button></p></div>'; return; }
      T.data = prep(r); paint();
    });
  }
  function copyText(t, msg) {
    var fb = function () { H.toast("Không sao chép được, hãy bôi đen và copy thủ công."); };
    try { navigator.clipboard.writeText(t).then(function () { H.toast(msg || "Đã sao chép"); }, fb); } catch (e) { fb(); }
  }

  /* ---------- sự kiện ---------- */
  function onClick(e) {
    var b = e.target.closest("[data-ta]"); if (!b || H.view() !== "teacher") return;
    var a = b.dataset.ta;
    if (a === "tab") { T.tab = b.dataset.v; T.confirmDel = null; return paint(); }
    if (a === "reload") { T.data = null; return load(true); }
    if (a === "lesson") { T.lesson = b.dataset.v; return paint(); }
    if (a === "openStudent") { T.student = b.dataset.code; T.tab = "students"; paint(); var d = document.getElementById("s-detail"); if (d && window.innerWidth < 900) d.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    if (a === "copy") return copyText(b.dataset.v, "Đã sao chép mã " + b.dataset.v);
    if (a === "copyNew") return copyText(T.newCodes.map(function (c) { return c.name + "\t" + (c.cls || "") + "\t" + c.code; }).join("\n"), "Đã sao chép danh sách mã");
    if (a === "resetDemo") { H.api.call("resetDemo", { code: H.session.code }).then(function () { T.data = null; load(true); H.toast("Đã đặt lại dữ liệu mẫu"); }); return; }
    if (a === "toggle") {
      var s = T.data.students.filter(function (x) { return x.code === b.dataset.code; })[0]; if (!s) return;
      H.api.call("setActive", { code: H.session.code, studentCode: s.code, active: s.active === false }).then(function (r) { if (r && r.ok) { s.active = s.active === false; paint(); } else H.toast("Chưa cập nhật được, thử lại nhé."); }); return;
    }
    if (a === "addStudents") {
      var defCls = document.getElementById("n-cls").value;
      var lines = (document.getElementById("n-list").value || "").split(/\n/).map(function (l) { return l.trim(); }).filter(Boolean).map(function (l) { var p = l.split(/[,;\t]/); return { name: p[0].trim(), cls: (p[1] || "").trim() || defCls }; }).filter(function (x) { return x.name; });
      var msg = document.getElementById("n-msg"); if (!lines.length) { msg.textContent = "Hãy nhập ít nhất một học sinh."; return; }
      T.busy = true; b.disabled = true; msg.textContent = "Đang tạo…"; T.addCls = defCls;
      H.api.call("addStudents", { code: H.session.code, list: lines }).then(function (r) { T.busy = false; if (!r || !r.ok) { b.disabled = false; msg.textContent = "Chưa tạo được, thử lại nhé."; return; } T.newCodes = r.created; H.api.call("admin", { code: H.session.code }).then(function (d) { if (d && d.ok) { T.data = prep(d); paint(); } }); });
      return;
    }
    if (a === "addClass") {
      var nm = document.getElementById("c-name").value.trim(), cm = document.getElementById("c-msg"); if (!nm) { cm.textContent = "Hãy nhập tên lớp."; return; }
      b.disabled = true; cm.textContent = "Đang tạo…";
      H.api.call("addClass", { code: H.session.code, name: nm, note: document.getElementById("c-note").value.trim(), level: +document.getElementById("c-level").value }).then(function (r) {
        if (!r || !r.ok) { b.disabled = false; cm.textContent = r && r.error === "exists" ? "Tên lớp này đã có." : "Chưa tạo được, thử lại nhé."; return; }
        T.data.classes.push({ name: nm, note: document.getElementById("c-note").value.trim(), url: "", level: +document.getElementById("c-level").value }); H.toast("Đã tạo " + nm); paint();
      });
      return;
    }
    if (a === "delClass") {
      if (T.confirmCls !== b.dataset.v) { T.confirmCls = b.dataset.v; return paint(); }
      H.api.call("deleteClass", { code: H.session.code, name: b.dataset.v }).then(function (r) { T.confirmCls = null; if (r && r.ok) { T.data.classes = T.data.classes.filter(function (c) { return c.name !== b.dataset.v; }); paint(); } else H.toast("Chỉ xóa được lớp không còn học sinh."); });
      return;
    }
    if (a === "remind") {
      var as = T.data.assignments.filter(function (x) { return x.id === b.dataset.id; })[0]; if (!as) return;
      var late = targetsOf(as).filter(function (s) { return !T.data.results.some(function (r) { return r.code === s.code && r.assignmentId === as.id; }); });
      var dd = (as.due || "").split("-").reverse().join("/");
      return copyText("Nhắc các em chưa nộp bài tập “" + as.title + "” (" + lname(as.lesson) + (dd ? ", hạn " + dd : "") + "): " + late.map(function (s) { return s.name; }).join(", ") + ". Các em đăng nhập web Huyen Dieu, mở mục Bài tập và làm bài nhé!", "Đã sao chép lời nhắc, dán vào Zalo hoặc nhóm lớp");
    }
    if (a === "classView") { T.cls = b.dataset.v; T.tab = "overview"; return paint(); }
    if (a === "classAssign") { T.aCls = b.dataset.v; T.tab = "assign"; return paint(); }
    if (a === "classAdd") { T.addCls = b.dataset.v; T.tab = "accounts"; return paint(); }
    if (a === "aCls") { T.aCls = b.dataset.v; return paint(); }
    if (a === "aStatus") { T.aStatus = b.dataset.v; return paint(); }
    if (a === "accCls") { T.accCls = b.dataset.v; return paint(); }
    if (a === "aAll") { document.querySelectorAll(".ac-chk").forEach(function (c) { c.checked = true; }); return; }
    if (a === "refreshAll") {
      var old2 = b.textContent; b.disabled = true; b.textContent = "Đang cập nhật, chờ một lát…";
      H.api.call("refreshAll", { code: H.session.code }).then(function (r) {
        b.disabled = false; b.textContent = old2;
        if (!r || !r.ok) { H.toast("Chưa cập nhật được. Kiểm tra Apps Script đã dán code mới, chạy setup và triển khai phiên bản mới chưa."); return; }
        if (r.demo) { H.toast("Chế độ thử không tạo file thật. Khi kết nối Google Sheet sẽ có file riêng cho từng lớp."); return; }
        if (r.classes) T.data.classes = r.classes; H.toast("Đã cập nhật file của tất cả các lớp"); paint();
      });
      return;
    }
    if (a === "exportClass") {
      var cname = b.dataset.v, old = b.textContent; b.disabled = true; b.textContent = "Đang tạo file…";
      H.api.call("exportClass", { code: H.session.code, name: cname }).then(function (r) {
        if (!r || !r.ok) { b.disabled = false; b.textContent = old; H.toast("Chưa tạo được file. Kiểm tra Apps Script đã được cấp quyền mới chưa (xem tab Hướng dẫn)."); return; }
        if (r.demo || !r.url) { b.disabled = false; b.textContent = old; H.toast("Chế độ thử không tạo file thật. Khi kết nối Google Sheet sẽ có file riêng cho từng lớp."); return; }
        classInfo(cname).url = r.url; if (!T.data.classes.some(function (c) { return c.name === cname; })) T.data.classes.push({ name: cname, note: "", url: r.url }); H.toast("Đã cập nhật file quản lý lớp " + cname); paint();
      });
      return;
    }
    if (a === "saveAssign") {
      var title = document.getElementById("a-title").value.trim(), m = document.getElementById("a-msg");
      if (!title) { m.textContent = "Hãy nhập tiêu đề."; return; }
      var picks = [].slice.call(document.querySelectorAll(".ac-chk:checked")).map(function (c) { var due = c.closest(".ac-row").querySelector(".ac-due").value; return { cls: c.value, due: due }; });
      if (!picks.length) { m.textContent = "Hãy chọn ít nhất một lớp."; return; }
      if (picks.some(function (p) { return !p.due; })) { m.textContent = "Mỗi lớp được chọn cần có hạn nộp."; return; }
      var gsel = document.getElementById("a-game").value, shs = (H.SHEETS || []).filter(function (s) { return s.id === gsel; })[0];
      var base = { title: title, lesson: shs ? String(shs.lesson) : document.getElementById("a-lesson").value, game: gsel, note: document.getElementById("a-note").value.trim() };
      T.busy = true; b.disabled = true; m.textContent = "Đang lưu…";
      var chain = Promise.resolve(), made = 0, fail = 0;
      picks.forEach(function (p) {
        chain = chain.then(function () {
          var asg = { title: base.title, lesson: base.lesson, game: base.game, note: base.note, due: p.due, cls: p.cls };
          return H.api.call("saveAssignment", { code: H.session.code, a: asg }).then(function (r) { if (r && r.ok) { asg.id = r.id; T.data.assignments.push(asg); made++; } else fail++; });
        });
      });
      chain.then(function () { T.busy = false; H.toast(fail ? "Đã giao " + made + " lớp, " + fail + " lớp chưa lưu được." : "Đã giao bài tập cho " + made + " lớp"); if (made) { T.aStatus = "open"; } paint(); });
      return;
    }
    if (a === "delAssign") {
      if (T.confirmDel !== b.dataset.id) { T.confirmDel = b.dataset.id; var det = b.closest("details"); if (det) T.openAssign[det.dataset.aid] = true; return paint(); }
      H.api.call("deleteAssignment", { code: H.session.code, id: b.dataset.id }).then(function (r) { if (r && r.ok) { T.data.assignments = T.data.assignments.filter(function (x) { return x.id !== b.dataset.id; }); T.confirmDel = null; paint(); } });
    }
  }
  function onChange(e) {
    if (H.view() !== "teacher") return;
    if (e.target.dataset && e.target.dataset.ta === "classLevel") {
      var ls = e.target, cn = ls.dataset.v, lv = +ls.value;
      H.api.call("setClassLevel", { code: H.session.code, name: cn, level: lv }).then(function (r) {
        if (r && r.ok) { var ci = classInfo(cn); if (!(T.data.classes || []).some(function (c) { return c.name === cn; })) T.data.classes.push(ci); ci.level = lv; H.toast("Lớp " + cn + " chuyển sang HSK " + lv); paint(); }
        else { H.toast(r && r.error === "unknown" ? "Máy chủ chưa cập nhật: hãy dán Code.gs mới và Deploy phiên bản mới." : "Chưa đổi được trình độ, thử lại nhé."); paint(); }
      });
      return;
    }
    if (e.target.dataset && e.target.dataset.ta === "move") {
      var sel = e.target, s = T.data.students.filter(function (x) { return x.code === sel.dataset.code; })[0]; if (!s) return;
      H.api.call("moveStudent", { code: H.session.code, studentCode: s.code, cls: sel.value }).then(function (r) { if (r && r.ok) { s.cls = sel.value; H.toast("Đã chuyển " + s.name + (sel.value ? " sang " + sel.value : " ra khỏi lớp")); paint(); } else { sel.value = s.cls || ""; H.toast("Chưa chuyển được, thử lại nhé."); } });
    } else if (e.target.id === "f-cls") { T.cls = e.target.value; paint(); }
    else if (e.target.id === "a-game") { var sx = (H.SHEETS || []).filter(function (s) { return s.id === e.target.value; })[0]; if (sx) { var ti = document.getElementById("a-title"), ls = document.getElementById("a-lesson"); if (ti && !ti.value.trim()) ti.value = sx.title; if (ls) ls.value = String(sx.lesson); } }
    else if (e.target.id === "f-range") { T.range = +e.target.value; if (T.range === 0 && !T.full && T.data && T.data.partial) { T.full = true; T.data = null; load(true); } else paint(); }
  }
  function onInput(e) {
    if (H.view() !== "teacher" || e.target.id !== "s-search") return;
    T.search = e.target.value; var l = document.getElementById("s-list"); if (l) l.innerHTML = studentList();
  }
  function onToggle(e) { var d = e.target; if (d.tagName === "DETAILS" && d.dataset.aid) T.openAssign[d.dataset.aid] = d.open; }

  window.HD_TEACHER = {
    init: function (host) {
      H = host;
      H.app.addEventListener("click", onClick);
      H.app.addEventListener("change", onChange);
      H.app.addEventListener("input", onInput);
      H.app.addEventListener("toggle", onToggle, true);
    },
    render: function () { load(false); },
    reset: function () { T.data = null; T.student = ""; T.newCodes = null; }
  };
})();
