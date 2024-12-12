# ABCs of PWAS with Rails
# PWAs From The Ground Up + Rails

This article starts a series about Progressive Web Applications (PWAs) in Rails. In this series I will show you how to turn your Rails application into a native-like app that works offline, handles background operations, and push notifications.

With PWAs and HTML APIs you can build very powerful application that can be installed in the user's device. This is a killer feature for user engagement. Especially when talking about mobile devices.

You can deliver your app without those gatekeepers that block your app from being published because they want to force you to use their expensiver services like in-app purchases; or even deny your app because they don't like an image you used.

> Alpha filter is not allowed. I deny you

_They say._

PWAs bring freedom, power, and control back to the developers. And Rails is a great framework to build PWAs. In this article I will give you an introduction to PWAs and show you how to quickly setup a PWA in a Rails application.

## A Brand-New Rails Application

A new rails project created [since version 7.2][rails-72-changelog-default-pwa] comes with files that makes it easy to turn it into a PWA.

For this series you will need a Rails app. The unique pre-condition is to have your own views under some layout. The default Rails controller does not work with the PWA setup.

For this article I created a simple controller using `rails g controller home`. And defined the root route to point to `home#index`. The view content is just a simple `Hello, PWA!`.

![Rails app running with a "Hello, PWA"][base-app-running]

The most basic action to turn your application installable is enabling the `manifest.json`. You two steps you can do that:

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

![Install button][install-button]

Clicking to install will prompt the user to install the app.

![Install prompt][install-prompt]

The information in this dialog comes from the `manifest.json` file. You can customize it to show your app's name, icon, and other information.

https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json

Try changing some information.

In DevTools you should be able to see Manifest information under `Application` tab.

[screenshot showing the manifest information in devtools]

## Running the app

After installation you can open it as an standalone app. You can see it in the app drawer. You can even create multiple windows.

From now on you can do a bunch of cool things. Things I will bring in the next articles. One of these cool things is this badge that shows up in the app drawer.

[screenshot showing the app in the app drawer]

It's great to see a very smooth and nice integration with simple steps. Badge can be set using Badging API. The code looks like

```javascript
navigator.setAppBadge(12);
```

You must keep the server running otherwise you see a page like this:

[screenshot showing the app not working]

This application is a PWA but not yet a good one; it does not work offline.

## An offline-capable PWA

One of the main goals with PWAs is to have the application working offline at some level. For a better experience, even for that features that require internet connection, it's good to have some level of offline support. Instead of show a blank page or something like that we can let the user know that the app is offline. Depending on the feature we can show a cached version of the content.

### Service Worker

Roughly speaking, a Service Worker is a proxy. It exists between your application and the outside world. Every request and response goes through it. 

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

NOTE: No matter how many times you call `navigator.serviceWorker.register` it will only register the service worker once. [Subsequent calls are no-ops][sw-subsequent-visits].

[sw-subsequent-visits]: https://web.dev/articles/service-workers-registration#subsequent_visits

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

The `activate` event is triggered when the service worker is activated. At this point you can delete the old caches. The
code above simply walks through all caches and deletes the ones that are not the current version.

The `waitUntil` method is used to keep the service worker alive until the promise is resolved.

Add this to your service worker and notice that the only cache left is the current one.

### BONUS: Letting the user know the app is offline

This whole discovering on `fetch` started because we we realized that if the user got offline the app would show the browser's offline page. This is not a good experience.

It's not longer a problem now. The service worker you just created following this article caches pages. Even if the user is offline the app will show the cached page.

As a user it's good to know that the app is offline. We will add a simple banner to let the user know that the app is offline.

In `app/views/layouts/application.html.erb` add the following code:

```html
<header class="bg-zinc-500 hidden" data-controller="offline">
    <p class="text-white text-center py-2">You are offline - Content may be outdated</p>
</header>
```

In `app/javascript/controllers/offline_controller.js` add the following code:

```javascript
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    this.updateStatus()

    window.addEventListener('online', this.updateStatus.bind(this))
    window.addEventListener('offline', this.updateStatus.bind(this))
  }

  disconnect() {
    window.removeEventListener('online', this.updateStatus.bind(this))
    window.removeEventListener('offline', this.updateStatus.bind(this))
  }

  updateStatus() {
    this.element.classList.toggle('hidden', navigator.onLine)
  }
}
```

That's it. You have a Stimulus controller that will toggle the banner visibility based on the `online` and `offline` events.

Testing this is very simple. Just turn off your network and the banner will show uo. Turn it back on and the banner will disappear. You can also use DevTools to simulate offline mode.

[screenshot showing the offline banner]

Keep in mind that `navigator.onLine` is not a reliable way to check if the browser is connected to the internet. It only checks if the browser is connected to a local area network (LAN) or a router. You should develop additional means for checking the online status.


[2]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine

### Conclusion

We covered a lot of ground in this article. You learned how to quickly turn your Rails application into a PWA that works offline by handling caches and some service worker lifecycle events.

There's more to come. In the next articles I will show more great APIs that you can use to build a better PWA. Stay tuned!

### References

[rails-72-changelog-default-pwa]: https://guides.rubyonrails.org/7_2_release_notes.html#default-progressive-web-application-pwa-files

[base-app-running]: https://media.discordapp.net/attachments/1316410115989180487/1316410140832043038/image.png?ex=675af1fb&is=6759a07b&hm=9368f5c472a6e628dbaad04dbc328f378cd7a0c86dca954ebf57ee514be9e299&=&format=webp&quality=lossless&width=2268&height=428
[install-button]: https://media.discordapp.net/attachments/1316410115989180487/1316410598107643944/image.png?ex=675af268&is=6759a0e8&hm=08fa28f7d042a8fec3d04f5625d3bd8a0c87855d23a9fd624a8820d68a636143&=&format=webp&quality=lossless&width=2268&height=420
[install-prompt]: https://media.discordapp.net/attachments/1316410115989180487/1316410659075919894/image.png?ex=675af276&is=6759a0f6&hm=be31e86e41d375799a8ccfdc4c268de5bf6a2ff32be5dfa2edf77ba29b07ef89&=&format=webp&quality=lossless&width=904&height=354
[manifest-in-dev-tools]: https://media.discordapp.net/attachments/1316410115989180487/1316411403489513533/image.png?ex=675af328&is=6759a1a8&hm=f8aa223c421f392fa9d17d95be36a706beb008326b191268eaa943ccdf9d8206&=&format=webp&quality=lossless&width=2268&height=390
[pwa-installed]: https://media.discordapp.net/attachments/1316410115989180487/1316412538535153754/image.png?ex=675af436&is=6759a2b6&hm=cc5d8568f0073b20b8cbce61ef57d0c96766f89c76f959e863789f5b07b6b87d&=&format=webp&quality=lossless&width=1864&height=1228
[app-offline-crash]: https://media.discordapp.net/attachments/1316410115989180487/1316412868878663680/image.png?ex=675af485&is=6759a305&hm=eaab3dcfb39a904826d70cb9573b5b7038f93075e9a25b95d9e8c3d4288dc6c4&=&format=webp&quality=lossless&width=1472&height=1228
[badge-sample]: https://cdn.discordapp.com/attachments/1316410115989180487/1316414372813471744/image.png?ex=675af5ec&is=6759a46c&hm=c4ce818f34440685733a4b8d70c4e2d407b489c2082a8e1b44e4830a54678d15& 
[service-worker-in-dev-tools]: https://media.discordapp.net/attachments/1316410115989180487/1316443759394820186/image.png?ex=675b114a&is=6759bfca&hm=dde3ff0c2535d2789e9eeecb00b7f7e11777ad2a4a6fbbcbc1462360186b336b&=&format=webp&quality=lossless&width=2268&height=792
[service-worker-registration-console]: https://media.discordapp.net/attachments/1316410115989180487/1316443853653413949/image.png?ex=675b1161&is=6759bfe1&hm=b729dbf1404b3ac6f0d3de7edf2a457cfffca6a4eeb1b58943bfecbf086d0bc3&=&format=webp&quality=lossless&width=2268&height=562
[service-worker-skip-waiting]: https://media.discordapp.net/attachments/1316410115989180487/1316446761128296478/image.png?ex=675b1416&is=6759c296&hm=4a4235c675a9dfed8e8d6d93d9b8c902c38eb39fe193f788729f551a5db74741&=&format=webp&quality=lossless&width=1500&height=342
[service-worker-fetch-event-console]: https://media.discordapp.net/attachments/1316410115989180487/1316450983563497623/image.png?ex=675b1804&is=6759c684&hm=a5ae89895ba74d0f1515d9acac0e386e106b5dec10f06a22e873ddf1d7734e13&=&format=webp&quality=lossless&width=2268&height=640
[service-worker-network-interception]: https://media.discordapp.net/attachments/1316410115989180487/1316451183845703790/image.png?ex=675b1834&is=6759c6b4&hm=bb4ae2f74c61821113f227a1363632fc89a61fb0d1cc02595cc5e3c6e6cc2414&=&format=webp&quality=lossless&width=2268&height=758
[cache-demo]: https://media.discordapp.net/attachments/1316410115989180487/1316456956621225994/image.png?ex=675b1d95&is=6759cc15&hm=f7cf099857eb92647ca9115d036fbd0af1acd286c49aff8ad828b55ba62a4ac6&=&format=webp&quality=lossless&width=2268&height=572
[cache-in-dev-tools]: https://media.discordapp.net/attachments/1316410115989180487/1316458041939464213/image.png?ex=675b1e97&is=6759cd17&hm=428cf246477b0095e9b122c4d497c37dfb5362b6af5f69c3f3f97037819af6f2&=&format=webp&quality=lossless&width=2268&height=434
[cache-serving-from-service-worker]: https://media.discordapp.net/attachments/1316410115989180487/1316465964782456942/image.png?ex=675b25f8&is=6759d478&hm=1f9764996b1ad0c79fd88ce2e251130366d8e0b750ecf41df2b06d216763fed9&=&format=webp&quality=lossless&width=2268&height=508
[banner]: https://media.discordapp.net/attachments/1316410115989180487/1316480593537667072/image.png?ex=675b3398&is=6759e218&hm=50ab6ff51e7ce49cc64dedbf4c0402a91730d3a6ba1fb9d303650726ddf32f01&=&format=webp&quality=lossless&width=2268&height=656
