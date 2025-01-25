# How To Aces PWAS in Rails - Part II: Service Worker Upgrade

Hi there! Welcome to second part of the series "How To Aces PWAS in Rails". So far you have your Rails application working offline, that's great! If you don't have it yet, you can check the first part of the series.

- [Part I: Setup PWAs](pwa-service-worker-installation.md)
- [Part II: Service Worker Upgrade](pwa-service-worker-upgrade.md) &lt;-- You are here
- [Part III: Handling Push Notifications](pwa-service-worker-upgrade.md) coming soon


Either in the phone or computer, I don't remeber closing the browser application unless requested by the application. As
Google Chrome usually does:

![chrome](https://static.wixstatic.com/media/0235b9_30889c7f61414b59bb22666fcf9e3ce1~mv2.png/v1/fill/w_560,h_280,al_c,lg_1,q_95/0235b9_30889c7f61414b59bb22666fcf9e3ce1~mv2.webp)

Our application has a problem: it only changes cache when a new pwa comes in. which we need to do in the browser, dev
tools. we will fix this by adding a new event listener to the service worker. This event listener will listen to the
event `install` and will be responsible for updating the cache.

## Upgrade on multiple clients

https://web.dev/articles/service-worker-lifecycle
https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
https://developer.mozilla.org/en-US/docs/Web/API/Clients
https://developer.chrome.com/docs/workbox/caching-strategies-overview#stale-while-revalidate
