/* HUYEN DIEU · service worker: ưu tiên mạng, lưu bản sao để mở lại khi mạng yếu. */
var CACHE = "huyen-dieu-v2";
self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(caches.keys().then(function (ks) { return Promise.all(ks.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); })); }).then(function () { return self.clients.claim(); })); });
self.addEventListener("fetch", function (e) {
  var req = e.request, url = new URL(req.url);
  if (req.method !== "GET" || url.origin !== location.origin || req.headers.has("range")) return;
  e.respondWith(fetch(req, { cache: "no-cache" }).then(function (res) {
    if (res && res.status === 200) { var copy = res.clone(); caches.open(CACHE).then(function (c) { c.put(req, copy); }); }
    return res;
  }).catch(function () { return caches.match(req).then(function (m) { return m || caches.match("index.html"); }); }));
});
