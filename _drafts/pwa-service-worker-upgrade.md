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

In this part of the series, we will manage to update the service worker in a way that the user will be notified when a new version is available and will be able to update it whenever they want.

## Service Worker Lifecycle

The service worker lifecycle might seem a bit complex at first, but if we break it down into steps, it becomes easier to understand. The first distinction we need to make is wether it's the first time the service worker is being installed or if it's an upgrade.

### A first-time installation

When the service worker is being installed for the first time, the following steps are taken:

1. The service worker is downloaded: The browser downloads the service worker file.
2. The service worker is installed: The browser installs the service worker.
3. The service worker is activated: The browser activates the service worker.

Our service worker already has the `activate`. We can add the `install` event, and in both cases, we can log a message
to the console to see what's happening.


```javascript
self.addEventListener('install', event => {
  console.log('Service worker install event', { event })
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event', { event })
  // rest of the code ommited for brevity
});
```

To perform a proper installation, we need to unregister the service worker and reload the page. This will trigger the installation of the service worker as if it were the first time.

If everything goes well, you should see the following messages in the console:

![imagem aqui]()

### An Upgrade

The upgrading process happens similarly to the first-time installation. There's only one difference: the new service
worker won't be activated right away. The steps are:

1. The new service worker is downloaded.
2. The new service worker is installed.
3. The new service worker is waits until it is either manually activated (e.g. skip waiting button click) or the clients are closed.
4. The new service worker is activated.

Chance something in the service worker file and reload the page. You should see the install event logging message in the
console but not the activate event.

![imagem aqui]()

This happens because the new service worker is waiting to be activated. You can see it in the browser dev tools as you
learned in the first part of the series.

### States of a Service Worker

A service worker can be in one of the following states:

- `parsed`: The initial state of the service worker. The browser downloades the service worker file and confirmed that it is runnable.
- `installing`: The service worker is installing. That's the state when the `install` event is triggered.
- `installed`: The service worker has been installed.
- `activating`: The service worker is activating. That's the state when the `activate` event is triggered.
- `activated`: The service worker has been activated.
- `redundant`: The service worker is redundant. That's the state when the service worker is being replaced by a new one.

As you can see, there's no `waiting` state. A waiting service worker is indeed an `installed` service worker that is waiting to be activated. A waiting service worker can become redundant if a new service worker is installed.

[add a diagram here]

Let's simulate slow install and activate events to see the states of the service worker.

[code here]

## Skip Waiting Programmatically

## The Client and the Service Worker communication

----

## [BONUS] Upgrade on multiple clients

https://web.dev/articles/service-worker-lifecycle
https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
https://developer.mozilla.org/en-US/docs/Web/API/Clients
https://developer.chrome.com/docs/workbox/caching-strategies-overview#stale-while-revalidate
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
