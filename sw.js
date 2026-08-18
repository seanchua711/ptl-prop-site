// 刻意不做任何快取。
//
// 存在的唯一理由：Android Chrome 要有一个带 fetch 处理器的 service worker
// 才肯把网站当成可安装的 App。
//
// 为什么不快取：这个站之前吃过亏 —— 旧的 service worker 把版本锁在使用者装置上，
// 改了程式却怎么样都不生效，得手动 unregister 才救得回来。首页只有 26 KB，
// 图片和字体本来就有 HTTP 快取，没有离线需求，不值得为此再冒一次风险。
//
// 下面的 fetch 监听器故意不呼叫 respondWith()，浏览器会照原本的方式去拿资源。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => { /* 交给浏览器，不介入 */ });
