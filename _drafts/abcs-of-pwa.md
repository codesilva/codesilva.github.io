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
