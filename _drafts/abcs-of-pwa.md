# The ABCs of PWAs

## The heart of a PWA: Service Worker

Service Worker is a web worker. It is a script that runs in the background of your browser. It can intercept requests
and responses, cache them, and much more.

Service Worker is a proxy. It exists between your application and the outside world. It can intercept your requests,
cache them, and much more.

### Proxy and Cache API

### Service Worker Lifecycle

- how do you upgrade a service worker?
- clients.claim()

https://developer.chrome.com/docs/workbox/handling-service-worker-updates

### Background Operations

- Sync Event
- Background Fetch
- Background Sync

### Push Notifications

## PWA Cool features

- Trigger installation (in Chrome)
- URL Shortcuts (https://web.dev/articles/app-shortcuts)
- Protocol Handling
- File System
- Web Share API
- Document Picture-in-Picture API

---

# Everything you must know about PWAs and Service Workers

> Service worker is a web worker

> A five dollar term for a twenty five cents concept

A pwa is just an app you can install and this can be easily done by adding a manifest.json to the &lt;head&gt; element.

<link rel="manifest" href="manifest.json" />

A service worker is a proxy. it exists between your application and the outside world. it can intercept your requests,
cache it and much more.

there are specialized APIs to allow it to work better like Cache and Background Sync.

in this article I will show you how to quickly setup PWA + Service Worker to handle caches, Service Worker upgrades, and
cache strategies.

this article is divided in two parts. First I discuss the PWA. Its capabilities, how to set it up and such. In the
second part I show how it can work on Rails.

## Service Worker lifecycle

## Fetch (the proxy)

service worker act as this proxy which allows you to intercept requests and responses. It can be used to cache

## Sync event

Sync is about to registering a unit of work to be processed whe the app is connected again

### Background Fetch for longer operations

Background sync is not suitable for long operations - if it takes long the browser drops your SW. For longer operations
you can use Background Fetch API.

## Caching

## PWAs on Rails

A fresh new rails application already comes with manifest.json and a service-worker.js files under
`app/views/pwa/` folder.

in the application.html.erb the linke to add the manifest needs to be uncommented. In routes, those specific routes for
manifest.json and service-worker.js must be enabled.

There you go. You have a PWA already.

### Rails generators

what if we have a generator to handle this boilerplate for us?

https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation
https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Caching
https://guides.rubyonrails.org/generators.html
https://alicia-paz.medium.com/make-your-rails-app-work-offline-part-3-crud-actions-with-indexeddb-and-stimulus-ad669fe0141c

---

# PWA on Rails: How to handle Service Worker upgrades

[pwa-on-rails-handle-service-worker-upgrades.md](./pwa-on-rails-handle-service-worker-upgrades.md)

Since version X Rails fresh new applications come with a manifest.json and a service-worker.js file under
`app/views/pwa/` folder. This is for a good reason.

The Rails team is pushing for PWAs. And they are right. PWAs are a good way to build more engaging apps without needing
the App Store or Google Play as gatekeepers.

In this article I will show you how to quickly setup PWA + Service Worker to handle caches and Service Worker upgrades.

# PWA on Rails: Offline and Background Operation

background sync, background fetch, indexedDB, cache, service worker

# PWA on Rails: Push Notifications

# PWA on Rails: Stimulus meets The Platform

- IndexDB
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API
- Bluetooth API - that's how moonlander keyboard works
- https://developer.mozilla.org/en-US/docs/Web/API/Contact_Picker_API
- https://developer.mozilla.org/en-US/docs/Web/API/File_System_API
- https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API
- https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
- https://developer.mozilla.org/en-US/docs/Web/API/Idle_Detection_API
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API
https://developer.mozilla.org/en-US/docs/Web/API/Keyboard_API
https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API
https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
https://developer.mozilla.org/en-US/docs/Web/API/Sensor_APIs

https://developer.mozilla.org/en-US/docs/Web/API
