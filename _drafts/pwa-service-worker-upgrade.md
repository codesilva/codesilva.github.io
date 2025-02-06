# How To Aces PWAS in Rails - Part II: Service Worker Upgrade

Hi there! Welcome to second part of the series "How To Aces PWAS in Rails". So far you have your Rails application working offline, that's great! If you don't have it yet, you can check the first part of the series.

- [Part I: Setup PWAs](pwa-service-worker-installation.md)
- [Part II: Service Worker Upgrade](pwa-service-worker-upgrade.md) &lt;-- You are here
- [Part III: Handling Push Notifications](pwa-service-worker-upgrade.md) coming soon

Our application is good enough dealing with offline mode. It is caching assets and whenever a new service worker gets activated. The problem is that to activate a new service worker, a manual intervention is needed.
We need either to close all the clients (tabs or windows) or to go to the browser dev tools and force the service worker
to update.

That's not good, even for a demo application like ours. Updating the service worker is something that you will be doing
from time to time and you want to make it as smooth as possible.

In many real-world applications, it would be a nightmare to ask users to close all tabs or windows to get the latest version of the application. Even when needed, it would be better to have a way to notify the user that a new version is available and let them decide when to update. Like 
Google Chrome does:

![chrome](https://static.wixstatic.com/media/0235b9_30889c7f61414b59bb22666fcf9e3ce1~mv2.png/v1/fill/w_560,h_280,al_c,lg_1,q_95/0235b9_30889c7f61414b59bb22666fcf9e3ce1~mv2.webp)

In this part of the series, we will managed to update the service worker in a way that the user will be notified when
a new version is available and will be able to update it whenever they want.

## Service Worker Lifecycle

A service worker might be in one of the following states (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state):

- **Installing**: The service worker is installing. This is the perfect time to cache assets.
- **Installed**: The service worker has been installed. This is the time to cache assets.
- **Activating**: The service worker is activating. This is the time to clean up old caches.
- **Activated**: The service worker has been activated. This is the time to notify the user that a new version is
    available.
- **Redundant**: The service worker is redundant.

## The Client and the Service Worker communication

----

## Upgrade on multiple clients

https://web.dev/articles/service-worker-lifecycle
https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
https://developer.mozilla.org/en-US/docs/Web/API/Clients
https://developer.chrome.com/docs/workbox/caching-strategies-overview#stale-while-revalidate
