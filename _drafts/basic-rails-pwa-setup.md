# ABCs of PWAS with Rails

This article starts a series about Progressive Web Applications (PWAs) in Rails. In this series I will show you how to
turn your Rails application into a native-like app that works offline, handles background operations, and push
notifications.

With PWAs and HTML APIs you can build very powerful application that can be installed in the user's device. This is
a killer feature for user engagement. Especially when talking about mobile devices.

You can deliver your app without those gatekeepers that block your app from being published because they want to force you to use their expensiver
services like in-app purchases; or even deny your app because they don't like an image you used.

> "Alpha filter is not allowed. I deny you"

_They say._

PWAs bring freedom, power, and control back to the developers. And Rails is a great framework to build PWAs. In this
article I will give you an introduction to PWAs and show you how to quickly setup a PWA in a Rails application.

## a brand new Rails application

A new rails project created since version 7.2 comes with files that makes it easy to turn it into a PWA. A PWA is web
applpication that can behave as it was a native app.

A pre-condition is to have your own views under application.html.erb. This does not work with the default Rails
controller.

For this article I created a simple controller using `rails g controller home`. And defined the root route to point to `home#index`. The view content is just a simple `Hello, PWA!`.

[screenshot showing the app running]

The most basic action to turn your application installable is enabling the `manifest.json`. You two steps you can do
that:

1. enable the routes for the manifest.json

```diff
Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
- # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
+ get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
```

2. add the manifest.json to the `application.html.erb` file

    ```diff
    -   <%# Enable PWA manifest for installable apps (make sure to enable in config/routes.rb too!) %>
    -   <%#= tag.link rel: "manifest", href: pwa_manifest_path(format: :json) %>
    +   <%= tag.link rel: "manifest", href: pwa_manifest_path(format: :json) %>
    ```

Voilà! Your application is now installable. Open it in the browser and you will see a button to install it.

[screenshot showing the install button]

Clicking to install will prompt the user to install the app.

[screenshot showing the install prompt]

The information in this dialog comes from the `manifest.json` file. You can customize it to show your app's name, icon,
and other information.

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json


Try changing some information.

In DevTools you should be able to see Manifest information under `Application` tab.

[screenshot showing the manifest information in devtools]

## Running the app

after installation you can open it as an standalone app. You can see it in the app drawer. You can even create multiple
windows.

From now on you can do a bunch of cool things. Things I will bring in the next articles. One of these cool things is
this badge that shows up in the app drawer.

[screenshot showing the app in the app drawer]

It's great to see a very smooth and nice integration with simple steps. Badge can be set using Badging API. The code
looks like

```javascript
navigator.setAppBadge(12);
```

You must keep the server running otherwise you see a page like this:

[screenshot showing the app not working]

Our application is a PWA but not yet a good one since it does not work offline.

## An offline-capable PWA

One of the main goals with PWAs is to have the application working offline at some level. For a better experience, even
for that features that require internet connection, it's good to have some level of offline support. Instead of show
a blank page or something like that we can let the user know that the app is offline. Depending on the feature we can
show a cached version of the content.

### Service Worker

Roughly speaking, a Service Worker is a proxy. It exists between your application and the outside world. Every request
and response goes through it. 

Your brand new Rails app has a service-worker.js file under `app/views/pwa/` folder. It's not functional yet.

First, it must be exposed in the routes - the same as you did for manifest.json.

```diff
- # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
+ get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker
```

NOTE: The file is commented out but we will handle that in a moment.

Service worker is almost operational. You just need to register it.

```javascript
// file: app/javascript/application.js
// Kept in application.js for simplicity. You can move it to a separate file if you want.
function registerServiceWorker() {
  console.log('Registering service worker...');

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service worker registered:', registration);
    }).catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}

if ('serviceWorker' in navigator) {
  registerServiceWorker();
}
```

If your browser supports service workers - and it probably does - you will see a message in the console saying that the
service worker was registered. You can also see it in the DevTools under `Application` tab.

[screenshot console]
[screenshot devtools]

NOTE: No matter how many times you call `navigator.serviceWorker.register` it will only register the service worker once. Subsequent calls are no-ops[1].

[1]: https://web.dev/articles/service-workers-registration#subsequent_visits

#### Intercepting Requests

To intercept requests and responses you can use the `fetch` event. Delete the commented out and add the following code to the service-worker.js file
and see what happens.

```javascript
// file: app/views/pwa/service-worker.js

self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);

  return fetch(event.request);
});
```

You may notice it won't work right away. You need to refresh the page to see the service worker in action. This happens
because we already have a service worker registered. This update we just made will be in a state called `waiting`.

[screenshot showing the service worker in the waiting state]

A service worker can have three states: `installing`, `waiting`, and `active`. The `installing` state is when the
service worker is being installed. The `waiting` state is when there is a new service worker waiting to be activated.
The `active` state is when the service worker is ready to intercept requests.

In order to get the service worker transitioning from `waiting` to `active` you can:

- close all tabs and reopen;
- go to DevTools, Application &gt; Service Workers, and click on `Skip waiting` - you can also `check` the `Update on
    reload` option;
- just wait, from time to time the browser will try update the service worker;
- or you can add a button to do that.

The last option is the most user-friendly. You can add a button to do that. This is a good practice because you can let
the user decide when to update the service worker. We will see how to do that in the next article.

Whatever option you choose, once the service worker with the 'fetch' event is active you can see the console log in the
DevTools.

[screenshot showing the fetch event in the console]

If you look into the `Network` tab you will see the requests being intercepted by the service worker.

[screenshot showing the fetch event in the network tab]

#### respondWith

The `fetch` event can be used to intercept requests and responses. You can use the `respondWith` method to respond with
a custom response. For example, you can respond with a cached version of the request.

```javascript
self.addEventListener('fetch', function(event) {
  console.log('Fetch event for ', event.request.url);

  event.respondWith(
    new Response('Hello, PWA!')
  );
});
```

Try it and see what happens.

#### Caching

Cache API provides a persistent storage for network requests. This key-value storage can be used to cache requests and responses.

##### Putting something in the cache

Caches live under a key. The following code creates a cache storage under 'my-cache' key. 

```javascript
caches.open('my-cache').then(async (cache) => {
  const request = new Request("https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2023/06/09093550/Codeminer42_VERTICAL-IMAGOTYPE_Negative.png");

  await cache.put(request.clone(), new Response('Hello, PWA!')); // Put in cache

  console.log('Cached!');

  const response = await cache.match(request); // Read from cache

  console.log('Response from cache:', response);
});
```

Execute the above code in the console to put a response in the cache.

[screenshot showing the cache in the console]

In the DevTools you can see the cache under `Application` tab.

[screenshot showing the cache in the devtools]

It has other methods for cache management like `add`, `addAll`, `delete`, `keys`, `match`, and `matchAll`. For this
article's purpose, we will use only `put`, `match`, and `delete`.

Deleting a cache is as simple as creating it.

```javascript
caches.delete('my-cache').then(() => {
  console.log('Cache deleted!');
});
```

##### Responding with a cached version

You can now combine the `fetch` event with the cache to respond with a cached version of the request. Of course, there
are a couple of ways to do that. I will show you tha cache-first strategy.

In cache-first strategy you first try to get the response from the cache. If it's not there you fetch it from the
network.

```javascript
const VERSION = 'v1'; // Version will be the key

async function cacheFirst(request) {
  const cache = await caches.open(VERSION);
  const cachedResponse = await caches.match(request);

  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const responseFromNetwork = await fetch(request.clone());

    cache.put(request, responseFromNetwork.clone());

    return responseFromNetwork;
  } catch (error) {
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}

self.addEventListener('fetch', function(event) {
    event.respondWith(cacheFirst(event.request))
});
```

This will cache every request in the `v1` cache. If the request is not in the cache it will fetch it from the network.
Run this once and you will see entries in the cache.

[screenshot showing the cache in the devtools]

If you examine the `Network` tab you will see the requests being intercepted by the service worker.

[screenshot showing cache served from the service worker]

This caching example was very simple. It aggregates all requests in a single cache. Of course, you can have multiple
caches; YouTube, for example, has a three caches holding assets.

#### Invalidating the cache

Bugs come, new features are requested, and you need to update your application. This application though is not good at
being updated. To confirm it, change the text in `app/views/home/index.html.erb` to something like `Hello, PWA! v2`.

No matter how much you refresh the page the service worker will still serve the old content. This is because the cache
is still holding the old content.

To fix this you must invalidate the cache. You can do that by changing the cache key in your service worker.

```javascript
const VERSION = 'v2'; // Version will be the key
```

Now the service worker will create a new cache and serve the new content. In DevTools you can see the new cache but also
the old cache.

If you want to delete the old cache you can do it in the service worker doing something like this:

```javascript
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

The 'activate' event is triggered when the service worker is activated. At this point you can delete the old caches. The
code above simply walks through all caches and deletes the ones that are not the current version.

The `waitUntil` method is used to keep the service worker alive until the promise is resolved.

Add this to your service worker and notice that the only cache left is the current one.

### Conclusion

This article is the first of a series about PWAs in Rails. You learned how to quickly turn your Rails application into
a PWA that works offline by handling caches and some service worker lifecycle events.

<!-- # PWA on Rails: How to handle Service Worker upgrades -->

<!-- During Rails World 2024 DHH announced Rails 8. There were amazing changes in Rails 8 as you can see here. Among all -->
<!-- those updates there was as single goal: make it easier to deliver high-quality software. -->

<!-- You software solves peoples's problems. The more people use your software better. Having an engaging app is extremely -->
<!-- important. -->

<!-- PWAs are a good way to build engaging apps. You can deliver a native-like experience in both desktop and mobile devices -->
<!-- without needing the App Store or Google Play as gatekeepers. -->

<!-- A fresh new rails application already comes with the most basic components of a PWA: manifest.json and -->
<!-- a service-worker.js. In this article I will show you the lifecycle of a service worker and how to handle its upgrades. -->

<!-- ## Basic Setup -->

<!-- The `manifest.json` and `service-worker.js` can be found under `app/views/pwa/` folder. The files are there but not yet -->
<!-- enabled. -->

<!-- To get PWA stuff working you need two things: -->

<!-- - enable the routes for the manifest.json and service-worker.js -->
<!-- - add the manifest.json to the `application.html.erb` file -->
<!-- - register the service worker -->

<!-- ### Enabling the routes -->

<!-- In the `config/routes.rb` file you will find the commented lines that enable the routes for the manifest.json and the service-worker.js. -->

<!-- ```ruby -->
<!-- # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html -->
<!-- get '/manifest.json', to: 'pwa#manifest' -->
<!-- get '/service-worker.js', to: 'pwa#service_worker' -->
<!-- ``` -->

<!-- ### Enabling the manifest.json -->

<!-- In the `application.html.erb` file you will find a commented line that includes the manifest.json. Uncomment it. -->

<!-- ```erb -->
<!-- <%= tag :link, rel: "manifest", href: "/manifest.json" %> -->
<!-- ``` -->

<!-- ### Registering the service worker -->

<!-- In the `app/javascript/packs/application.js` file you will find a commented line that registers the service worker. Uncomment it. -->

<!-- ```javascript -->
<!-- if ('serviceWorker' in navigator) { -->
<!--   window.addEventListener('load', () => { -->
<!--     navigator.serviceWorker.register('/service-worker.js') -->
<!--       .then(registration => { -->
<!--         console.log('Service Worker registered! Scope: ', registration.scope); -->
<!--       }) -->
<!--       .catch(err => { -->
<!--         console.log('Service Worker registration failed: ', err); -->
<!--       }); -->
<!--   }); -->
<!-- } -->
<!-- ``` -->

<!-- After doing these steps you will have a PWA already. Get the app running and check open it in the browser. You will see, -->
<!-- on top right, a button to install the app. -->

<!-- In the dev tools, in `Application` tab, you will see the `Manifest` and `Service Workers` sections. -->

<!-- ## Service Worker Lifecycle -->

<!-- One of the most important features of a PWA is offline support. Service Workers and the Cache API are the key to this feature. -->

<!-- Having an application working offline is a great feature but it has its specific challenges. One of them is how to -->
<!-- upgrade your application. Since the service worker is a proxy between your application and the network it's crucial to -->
<!-- know the service worker lifecycle to provide a smooth experience to your users. -->

<!-- ### The First Service Worker -->

<!-- ### Updating the Service Worker -->

<!-- The Service Worker acts as a proxy between the browser and the network. It allows you to intercept requests and -->
<!-- responses. It's used to offer capabilities like offline support and background operations. -->

<!-- The content of the service-worker.js file is the following: -->

<!-- ```javascript -->
<!-- // Add a service worker for processing Web Push notifications: -->
<!-- // -->
<!-- // self.addEventListener("push", async (event) => { ... }) -->
<!-- // -->
<!-- // self.addEventListener("notificationclick", function(event) { ... }) -->
<!-- ``` -->

<!-- ## Handling Service Worker Upgrades -->

<!-- - button in hotwire (an updater stimulus controller) -->

<!-- https://web.dev/articles/service-worker-lifecycle -->
<!-- https://guides.rubyonrails.org/7_2_release_notes.html -->
