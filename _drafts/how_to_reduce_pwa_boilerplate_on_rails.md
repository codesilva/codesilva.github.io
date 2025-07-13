---
title: How To Reduce The PWA Boilerplate Code Of Your Rails App
title: Using Workbox To Reduce The PWA Boilerplate Code
---

Continuing our series 'Everything you need to ace PWA in Rails', I'm going to show you how to reduce the service worker boilerplate in your Rails app.

I know I had promised an article on Push Notifications. I could have done this, of course, but somebody already did a great job at it. I will simply direct you to the article on [Joy of Rails (https://joyofrails.com/articles/web-push-notifications-from-rails).

I still plan to cover push notifications with ActionCable, but I will leave that for later. Before that, let's see how to reduce the boilerplate code of your PWA in Rails.

## The Problem

The PWA implementation is more about adding offline capabilities to your app. This means all your business logic will remain the same.

See the code below.

```javascript
self.addEventListener('fetch', async (event) => {
  if (event.request.method !== "GET") { return; }

  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      return cache.match(event.request, { ignoreVary: true }).then((response) => {
        const fetchPromise = fetch(event.request).then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });

        return response || fetchPromise;
      });
    })
  );
});
```

This is an implementation of caching with the stale-while-revalidate strategy. Notice how this will not change at all regardless of your application. Whether it is a to-do list or a finance app, you will probably have different conditions for caching or not, or will adopt a different strategy.

Changing the strategy above to a cache-first strategy, for example would look like this:

```diff
self.addEventListener('fetch', async (event) => {
  if (event.request.method !== "GET") { return; }

  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      return cache.match(event.request, { ignoreVary: true }).then((response) => {
+       if (response) {
+           return respose;
+       }
-       const fetchPromise = fetch(event.request).then((networkResponse) => {
-         cache.put(event.request, networkResponse.clone());
-         return networkResponse;
-       });
-       return response || fetchPromise;
+       return fetch(event.request).then((fetchedResponse) => {
+         cache.put(event.request, fetchedResponse.clone());
+          return fetchedResponse;
+       });
      });
    })
  );
});
```

You see? No impact on the business logic.

This is also true for syncing. Usually, a request failed, you added it to a queue, and you want to retry. Regardless of the request, you want to resend it when the connection is regained (maybe a finance app that needs to get currency exchange values).

## Workbox

Fortunately, the problem presented in the last section is quite easily solved by implementing the patterns and just reusing them. That's what Workbox does.

Workbox is a collection of libraries that handle patterns related to the offline capabilities of a PWA. It has a couple of different packages to address different problems. It has caching, precaching, background sync, and more.

Using, for example, the `registerRoute` function from the `workbox-routing` package and the class `StaleWhileRevalidate` from `workbox-strategies`, you can easily achieve the same result as the code from the last section, but with much less boilerplate.

```javascript
const matchCb = ({url, request, event}) => {
  return request.method === 'GET';
};

registerRoute(matchCb, new StaleWhileRevalidate({
  matchOptions: {
    ignoreVary: true
  }
}));
```

Check out the available packages on the [Workbox documentation](https://developer.chrome.com/docs/workbox/modules).

## Integrating Workbox with Rails

Rails is a framework; it's, in essence, a pattern. A pattern for solving the problem of creating web applications. 

> Good frameworks are extracted.

Rails components are also patterns. Solid queue, for example, was born as a solution to problems with HEY and Basecamp. It was validated there, then extracted and integrated into the framework.

To integrate Workbox, you have three main options.

### Method 1: Classic service worker with importScripts

In this method, with the serviceworker registered as _classic_ (the default mode), you can import the workbox-sw using the `importScripts` function.

#### From CDN

You use `importScripts` with the respective CDN link.

```javascript
importScripts('https://somecdnlinkhere.com'); // need to skip some content policy shit
```

You should be able to access the SW packages through the `workbox` global variable

```javascript
const { precacheAndRoute } = workbox.precaching;
const { StaleWhileRevalidate } = workbox.caching;
```

##### You can also vendor it.

You can get your copy of Workbox and vendor it on your application. You can use the workbox-cli for that. Just run the following command

```bash
npx workbox-cli copyLibraries /home/edy/somepath/workbox
```

Put that in your Rails application in such a way that you can import it from your service worker. In the example below, I put it in the `public` folder since I wanted to, but was unable to skip fingerprinting when putting it in another folder.

```javascript
importScripts('/workbox/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/workbox/'
});
```

With this approach, the workbox-sw module looks up for modules dynamically. This happens when you do something like

```javascript
const { precacheAndRoute } = workbox.precaching;
```

That's when vendorizing it, a `workbox.setConfig` call is needed. This tells the workbox-sw module where to look. In our case, it will also look under `/workbox/`.

### Method 2: Module (ESM) service worker with workbox packages

To have a module service worker, you need to register it with the `type: 'module' option.

```javascript
navigator.serviceWorker.register('/serviceworker.js', { type: 'module' });
```

To be able to import the workbox packages, you have to install them using npm or yarn. This means you need a bundler\*.

With all the setup, you can go ahead and install the needed packages

```bash
npm install workbox-routing workbox-strategies
```

Then you can import the packages in your service worker file like this:

```javascript
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
```

You can also import it directly from a CDN like jsDelivr

```javascript
import { registerRoute } from 'https://cdn.jsdelivr.net/npm/workbox-strategies@7.3.0/+esm';
import { StaleWhileRevalidate } from 'https://cdn.jsdelivr.net/npm/workbox-routing@7.3.0/+esm';
```

One could think about import maps here, but unfortunately, import maps are not supported in service workers.

## How to deal with asset fingerprinting?

Rails asset pipeline fingerprints assets. This means that the file name of an asset will change whenever the file content changes.

On the service worker, this can be tricky. Suppose you want to cache the `application.css` file. After fingerprinting,
the file name will change to something like `application-1234567890abcdef.css`. This is how it should be in the service worker:

```javascript
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  { url: 'application-1234567890abcdef.css', revision: null },
]);
```

The easiest way to handle this is to turn the `service-worker.js` into a `service-worker.js.erb` file and use the Rails asset helpers to generate the correct file name with the fingerprint.

```javascript
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute([
  { url: '<%= asset_path('application.css') %>', revision: null },
]);
```

# Conclusion

Browser APIs are great and allow you to deliver really powerful apps. Either they are PWAs or native apps using Hotwire Native.

You can see more about PWAs and Browser APIs that empower offline capabilities in my talk, available on YouTube.

<iframe width="560" height="315" src="https://www.youtube.com/embed/iG9ZOc103hk?si=Rv6M_qWlRpW-bLFn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
