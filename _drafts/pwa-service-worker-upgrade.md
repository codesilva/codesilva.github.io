# How To Aces PWAS in Rails - Part II: Service Worker Upgrade

Hi there! Welcome to the second part of the series "How To Aces PWAS in Rails". So far you have your Rails application working offline, that's great! If you don't have it yet, you can check the first part of the series.

- [Part I: Setup PWAs](https://blog.codeminer42.com/everything-you-need-to-ace-pwas/)
- [Part II: Service Worker Upgrade](pwa-service-worker-upgrade.md) &lt;-- You are here
- Part III: Handling Push Notifications **coming soon**

Our application is good enough to deal with offline mode. It caches assets whenever a new service worker gets activated. The problem is that to activate a new service worker, a manual intervention is needed. We need to close all the clients (tabs or windows) or go to the browser dev tools and force the service worker to update.

That's not good, even for a demo application like ours. Updating the service worker is something that you will be doing from time to time and you want to make it as smooth as possible.

In many real-world applications, it would be a nightmare to ask users to close all tabs or windows to get the latest version of the application. Even when needed, it would be better to have a way to notify the user that a new version is available and let them decide when to update. Like Google Chrome does:

![chrome](https://static.wixstatic.com/media/0235b9_30889c7f61414b59bb22666fcf9e3ce1~mv2.png/v1/fill/w_560,h_280,al_c,lg_1,q_95/0235b9_30889c7f61414b59bb22666fcf9e3ce1~mv2.webp)

In this part of the series, we will manage to update the service worker in a way that the user will be notified when a new version is available and will be able to update it whenever they want.

## Before you start

In this article, you will need to change the code in both the client and the service worker. The client JavaScript code is being cached though. To make it simpler to follow the article, I suggest you disable the cache so it will be easier to see the changes.

In the service worker, replace the `cacheFirst` with a simple `fetch` call.

-- imagem do diff

## Service Worker Lifecycle

The service worker lifecycle might seem a bit complex, but if we break it down into steps, it becomes easier to understand. The first distinction we need to make is whether it's the first time the service worker is being installed or if it's an upgrade.

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
  //The rest of the code is omitted for brevity
});
```

To perform a proper installation, unregister the service worker (in the DevTools) and reload the page. This will trigger the installation of the service worker as if it were the first time.

-- image showing the unregister button

If everything goes well, you should see the following messages in the console:

![imagem aqui]()

### An Upgrade

The upgrading process happens similarly to the first-time installation. There's only one difference: the new service worker won't be activated right away.

The steps are:

1. The new service worker is downloaded.
2. The new service worker is installed.
3. The new service worker waits until it is manually activated (e.g. skip waiting button click) or the clients are closed.
4. The new service worker is activated.

Chance something in the service worker file and reload the page. You should see the install event logging message in the console but not the activate event.

This happens because the new service worker is waiting to be activated. You can see it in the browser dev tools as you
learned in the first part of the series.

### States of a Service Worker

A service worker can be in one of the following states:

- `parsed`: The initial state of the service worker. The browser downloads the service worker file and confirms that it is runnable.
- `installing`: The service worker is installing. That's the state when the `install` event is triggered.
- `installed`: The service worker has been installed.
- `activating`: The service worker is activating. That's the state when the `activate` event is triggered.
- `activated`: The service worker has been activated.
- `redundant`: The service worker is redundant. That's the state when the service worker is being replaced by a new one.

As you can see, there's no `waiting` state. A waiting service worker is an `installed` service worker waiting to be activated. A waiting service worker can become redundant if a new service worker is installed.

[add a diagram here]

Let's simulate slow install and activate events to see the state of the service worker.

[code here]

## Skip Waiting Programmatically

So far, we've been skipping the waiting service worker manually through the DevTools. But as stated at the beginning of this article, we can control the service worker lifecycle programmatically. We can know when a new service worker is waiting and we can skip it programatically.

### The skipWaiting method

This method is straightforward. It allows that service worker to bypass the waiting phase. Just call `self.skipWaiting()` in the service worker file.

It's easy to see that this method must be called before the activation to be effective. For a simple implementation, you can call `self.skipWaiting()` in the `install` event.

```javascript
self.addEventListener('install', event => {
  console.log('Service worker install event', { event })
  self.skipWaiting();
});
```

Do this and every new service worker will be activated right away.

NOTE: The method returns a promise that resolver after the attempt to activate the new service worker. This promise always resolves to `undefined`. You don't need to wait for it.

## The Client and the Service Worker communication

Great! You no longer need to go to DevTools to skip the waiting service worker. I haven't fulfilled my promise yet though. We need to notify the user that a new version is available and let them decide when to update. To do this, I need to show you some more tools.

### The updatefound event

Our first move to achieve this is to listen to the `updatefound` event. This is an event attached to the `registration` object that is fired whenever the registration object acquires a new service worker that will be at the `installing` property.

In the `application.js` file, we can listen to this event and log a message to the console.

```javascript
navigator.serviceWorker.register('/service-worker.js').then(registration => {
  registration.addEventListener('updatefound', () => {
    console.log('a new service worker is being installed')
  });
});
```

With this listener, we can know when a new service worker is being installed and trigger the skipWaiting. But how? skipWaiting is supposed to be called in the service worker file, not in the client file. 

The answer is: send a message!

### Message Passing

The client and the service worker can communicate through messages using the `postMessage` method and a listener to the `message` event.

In the `service-worker.js` file, we can listen to the `message` event and call `skipWaiting` when a message with a specific content is received.

```javascript
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
```

In the `application.js` file, we can send a message to the service worker when the `updatefound` event is triggered.

```javascript
navigator.serviceWorker.register('/service-worker.js').then(registration => {
  registration.addEventListener('updatefound', () => {
    // Ask the user if they want to update
    if (confirm('A new version is available. Do you want to update?')) {
     // Recall: this event is triggered when a new service worker is being installed i.e. there is an "installing"
     // property in the registration object.
      registration.installing.postMessage({ type: 'SKIP_WAITING' });
    }
  });
});
```

With this code, when a new service worker is being installed, the user will be asked if they want to update. If they do, a message with the content `{ type: 'SKIP_WAITING' }` will be sent to the service worker, it will skip the waiting state and become active.

NOTE: The message `{ type: 'SKIP_WAITING' }` is arbitrary. You can use any message you want.

### skipWaiting when the service worker is waiting

If everything was properly set up in the last section, you should be able to see a prompt asking if you want to update whenever a new service worker is being installed. If you click "ok", the service worker will be activated.

Otherwise, the service worker does not activate and no matter how many times you reload the page, the prompt will not appear.

This is because the service worker is `waiting` to be activated and the `updatefound` event is not triggered again. This needs to be handled.

Since the `service worker` is waiting, you can easily get it by calling `registration.waiting`. With this object, you can send the message to skip the waiting state. As shown below.

```javascript
// file: application.js
function showConfirmationPrompt(sw) {
  const userChoice = Boolean(confirm('A new version is available. Do you want to update?'));

  if (userChoice && sw) {
    sw.postMessage({ type: 'SKIP_WAITING' });
  }

  return userChoice;
}

function handleUpgrade(registration) {
  if (!registration) return;
  let promptShown = false;
  let shouldSkipWaiting = false;
  const sw = registration.waiting;

  if (sw && sw?.state !== 'redundant') {
    shouldSkipWaiting = showConfirmationPrompt(sw);
    promptShown = true;
  }

  registration.addEventListener('updatefound', () => {
    const newWorker = registration.installing;

    if (!promptShown) {
      return showConfirmationPrompt(newWorker);
    }

    if (shouldSkipWaiting) {
      // at this point, the prompt was shown and if the user chose to update, the message was sent to the service worker
      newWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  });
}

navigator.serviceWorker.register('/service-worker.js')
    .then(handleUpgrade)
    .catch((error) => {
        console.error('Service worker registration failed:', error);
    });
```

Let's break down the code above:

1. The `handleUpgrade` function is called when the service worker is registered. It checks if the registration object is valid and if the waiting service worker is not redundant. It also adds an event listener to the `updatefound` event as in the last section
2. The `showConfirmationPrompt` function is called when the user is asked if they want to update. If the user chooses to update, the message is sent to the service worker.
3. The flags `promptShown` and `shouldSkipWaiting` are used to control the flow of the upgrade process. These flags are important to avoid showing the prompt and/or sending the message more than once.

A situation like that can happen when a waiting service worker is already present and a new update is found.

I tried to keep the code as simple as possible. There are better ways to handle this.

## Multiple Clients and the Claim Method

Everything you learned in this article works for all clients. Activating a new service worker will affect all clients using the service worker. But there's a catch.

When a new service worker is activated, the open clients will not be affected. They will still be using the old service worker. The new service worker will only affect new clients.

To make the new service worker affect all clients, you need to call the `claim` method in the service worker. This method will make the new service worker take control of all clients.

```javascript
self.addEventListener('activate', event => {
  // ...

  // this will make the new service worker take control of all clients
  // the event "controllerchange" will be triggered in all clients
  event.waitUntil(self.clients.claim());
});
```

## [BONUS] A banner to update the service worker

In the last article's bonus section, I showed you how to add a banner to inform the user whether the application is offline. Since this article is about updating the service worker, I'll show you how to add a banner to inform the user that a new version is available using Stimulus.

At this point, you know everything about the service worker lifecycle. To have a banner that informs the user that a new version is available you can use the same code implemented in the function `handleUpgrade` with a few changes.

Rename the `offline_controller.js` to `banner_controller.js` and add the following code:

```javascript
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ['offline', 'upgrade'];

  connect() {
    navigator.serviceWorker.getRegistration().then(this.handleUpgrade.bind(this));
    navigator.serviceWorker.addEventListener('controllerchange', this.onControllerChange.bind(this));

    this.updateStatus();
    window.addEventListener('online', this.updateStatus.bind(this))
    window.addEventListener('offline', this.updateStatus.bind(this))
  }

  disconnect() {
    navigator.serviceWorker.removeEventListener('controllerchange', this.onControllerChange.bind(this));

    window.removeEventListener('online', this.updateStatus.bind(this))
    window.removeEventListener('offline', this.updateStatus.bind(this))
  }

  serviceWorkerUpgrade() {
    navigator.serviceWorker.getRegistration().then(registration => {
      const newWorker = registration.installing || registration.waiting;
      newWorker?.postMessage({ type: 'SKIP_WAITING' });
    });
  }

  updateStatus() {
    this.offlineTarget.classList.toggle('hidden', navigator.onLine)
  }

  onControllerChange() {
    this.upgradeTarget.classList.add('hidden');
  }

  handleUpgrade(registration) {
    if (!registration) return;
    let promptShown = false;
    let shouldSkipWaiting = false;
    const sw = registration.waiting;

    if (sw && sw?.state !== 'redundant') {
      this.upgradeTarget.classList.remove('hidden');
      promptShown = true;
    }

    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;

      if (!promptShown) {
        this.upgradeTarget.classList.remove('hidden');
      }

      if (shouldSkipWaiting) {
        newWorker.postMessage({ type: 'SKIP_WAITING' });
      }
    });
  }
}
```

A few changes were made to the code:

1. Two targets were added. It means that the `application.html.erb` file needs to be updated to include the new targets.
2. The `handleUpgrade` changed only in the part it shows a `confirm` dialog. Now it only shows the banner.
3. The `SKIP_WAITING` message is sent when the user clicks the button in the banner.
4. A new listener was added to the `controllerchange` event to hide the banner when the new service worker is activated so the banner can be hidden.
5. The code for offline status was kept. The only change was that it now toggles class on `offlineTarget` instead of `this.element`.

NOTE: you can remove the code for the service worker upgrade from the `application.js` file. The `banner_controller.js` file
is taking care of it.

That's how the banner element looks like on `application.html.erb` file:

```html
<header data-controller="banner">
    <div data-banner-target="offline" class="container bg-zinc-500 mx-auto px-5 py-2 flex justify-between items-center hidden">
        <p class="text-white text-center py-2">You are offline - Content may be outdated</p>
    </div>

    <div data-banner-target="upgrade" class="container bg-indigo-500 mx-auto px-5 py-2 flex justify-between items-center hidden">
        <p class="text-white text-center py-2">New version available!</p>
        <button data-action="click->banner#serviceWorkerUpgrade" class="bg-indigo-600 text-white px-4 py-2 rounded">Upgrade</button>
    </div>
</header>
```

## Conclusion

Phew! That was a lot of information. But now you know how to upgrade the service worker in a way that the user will be notified when a new version is available and will be able to update it whenever they want.

This article should be read and re-read as many times as needed. The service worker lifecycle is not too complex but has many tiny details that can be easily missed. Take this, do your experiments and you will be able to master the service worker lifecycle.

In the next article, we will learn how to handle push notifications. Stay tuned!


----

https://web.dev/articles/service-worker-lifecycle
https://developer.mozilla.org/en-US/docs/Web/API/InstallEvent
https://developer.mozilla.org/en-US/docs/Web/API/Client/postMessage
https://developer.mozilla.org/en-US/docs/Web/API/Clients
https://developer.chrome.com/docs/workbox/caching-strategies-overview#stale-while-revalidate
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorker/state
https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting
https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
