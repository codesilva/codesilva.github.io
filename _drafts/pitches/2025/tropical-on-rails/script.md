Good morning everyone. It's a great honor for me to be here. My name is edy, i am a father to a lovely daughter and
a husband to a wonderful wife.

i am also a software developer at codeminer42, a software boutique. you can find out more about us in our website.

this talk is about progressive web apps, aka PWAs. Straightforward, PWAs are a way to deliver native-like
experiences using the same codebase you have for you regular web app - just a few things more.

By native-like experience i mean:

- app is installable
- offline experience
- user engagement
- access to (some) native apis

this talk exists because mobile development can be painful sometimes.

[screenshot dhh being denied by apple]

if you haven't faced this on your own you might know someone who had, some friend in mobile development. Apple and
Google are the gatekeepers for native mobile applications and only them let you pass or not. Sometimes due to weird
reasons like the wrong alpha filter on an image.

This talk also exists because PWAs are a great fit to the Rails one-person framework philosophy. With pretty much the
same codebase you run it as web, mobile or desktop application. That highlights productivity and simplicity.

DHH himself said: "not native apps just the best pws you can build". And this movement is happening since Rails 7.2
where a fresh new rails application already comes with the two main components of a pwa:

- manifest.json
- service worker

with these files, Web APIs, and some stimulus (no joke meant) you can make a really engaging application. like this:

[demo fermat application]

this is very simple application, it's a student coaching app. the coach can publish materials to groups and the
students, as group members, can download them.

it has offline support. both student and coach will still be able to use the app. the coach can enqueue resource
publishing and the student can save files offline to read them later.

> **note**: this application is meant to be clear, not necessarily right. it means it might lack some levels of abstraction.
> the payout is that it will be easier for you to understand what's going on

There's path from regular rails app to an installed pwa with offline support and native capabilities. That's what we will see. What's in beteween `rails new` and an application like `fermat`.

Then we will walk through The Platform: the web apis.

## Agenda

## With Rails you are almost there already

[slide "rails new fermat"]

this will create a new rails application and under app/views/pwa there will be two files

- manifest.json.erb
- service-worker.js

The manifest is a JSON file that contains metadata about the app, like the name, the icon, main page, and so on.

That's enough to make your app installable on the user's device. Once you enable it in your Rails app, the user will see the install button in the browser's address bar.

Once you install it you will see the app in the app drawer and you can open it from there. Awesome!

The service worker is a JavaScript file that runs off the main thread and is intended to enable the creation of effective offline experiences.

That's important, because only adding a manifest.json file won't make you app to work offline. Accesing the installed PWA while offline will show you the Chrome dinassour.

[Slide Chrome dinassour]

This can be addressed with the service worker, which can act as a proxy between the app and the network, and the Cache API, which allows you to cache the assets and the data the app needs to work offline.

https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

----

## Offline experience

### Service Worker Registration

To be able to use the service worker, we need to register it. We can do that in the `application.js` file.

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
```

### Fetch & Cache

In the SW file, we have a few listeners related to push notifications. But to act as a proxy, we need the fetch event listener.

```js
self.addEventListener('fetch', (event) => {
  return fetch(event.request)
    .catch((error) => {
      return new Response('You are offline', {
        headers: { 'Content-Type': 'text/html' }
      });
    });
});
```

https://developer.chrome.com/docs/workbox/caching-strategies-overview#stale-while-revalidate

Cache API allows you to store request/response pairs. It's a good way to cache the assets and the data the app needs to work offline.

You have all the control. You decide which strategy to use, you decide when to update the cache and you decide when to delete the cache.

For this app, I decide to use the strategy Stale while revalidate (without workbox).

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open('fermat').then((cache) => {
      return cache.match(event.request).then((response) => {
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

#### Pre-cache

`install` event listener

### Offline support is different than offline first

### IndexedDB & Background Sync API

With this, the app "kinda" works offline. I mean, it displays the pages and the user can navigate through them but
neither the coach nor the student can upload or view materials.

To address the coach side's issue, we can leverage two more apis: IndexedDB API and the Background Sync API.

IndexedBD is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.

We will change our stimulus controller to use the IndexedDB to store the materials. It will store and:

- when online, and when the upload is successful, it will remove the material from the IndexedDB
- when offline, it will store the material in the IndexedDB and schedule a background sync to upload the material

Background Sync is an API that allows you to defer actions until the user has stable connectivity.

Think of this like Background jobs you are used to in Solid Queue.

https://developer.chrome.com/blog/background-sync#what_could_i_use_background_sync_for

### Background Fetch API

In order to see the materials when offline, we need to download them. Implement a feature like Google Drive, where you can download the files to view them offline.

To efficiently download the files, we can use one more API: the Background Fetch API. It allows you to download files in
the background and monitor the progress.

To store offline files, we can use the IndexedDB again.

## Enganging users with push notifications

One of the great advantages of PWAs is to get closer to your users. You are with them even when they don't have
connection to the internet. You can also be with them when they are not using your app.

Push notifications are a great way to engage your users. 60% of users say that push nottifications make them to use the
app more often and almost 50% say that push notifications are less intrusive than email and SMS.

In our app, we will add notifications to inform the students when a new material is available or when a material is
available offline

Do you remember the fresh new Rails app? It came with code for push notifications in the service worker. That code does
two things:

- listen to the push event and show a notification so the user can see it even when the app is closed
- listen to the notificationclick event and open the app when the user clicks on the notification

Whenever a push request comes in, the 'push' event will be triggered. To simplify push notifications work like thaT:

your server sends a push -> fcm/firefox/safari receives -> sends to the browser

there are two things to do in js side:

- to request notification permissions to be able to display notifications so the `showNotification` method will work properly.

    [js code asking for permission]

- to create a subscription

    [js for creating a subscription]

your server sends a push based on a `subscription` and will use vapid keys to encrypt the message. For that we can use
a gem that already solves it, because that's too much to do by hand.

using a job we can schedule the notification sending right after creating the resource.

[job with notification sending implementation]

now we can use this same thing to displa notification when a file is available offline. or, to let the coach know when
the sync-queue was processed.

[slide with an image of those implementations]

https://www.mobiloud.com/blog/push-notification-statistics
https://joyofrails.com/articles/web-push-notifications-from-rails

`npx web-push generate-vapid-keys`

## The secret super powers (juice it or lose it)

so, in your pocket you have a handful of apis that you can use to deliver offline capabilities - that's enough to handle
offline-first too.

there's some juice too with background fetch for saving the file.

there are some more powers u can use to juice it even more. 

For example, our app deals with file sharing. We can make it a share_target and it will appear as an option when the
user tries to share a PDF, for example.

we can have shortcuts that will point user right away to a direction.

there is a lot of native apis that are adopted on major browsers too that can empower your pwa:

- geolocation
- wake lock
- device orientation

by far google chroms the browser that has more apis available.

<!-- - share_target -->
<!-- - shortcuts -->

<!-- - Web USB API (use by moonlander keyboard) -->
<!-- - Wake Lock API -->
<!-- - Geolocation API -->
<!-- - Device Orientation API -->
<!-- - Bluetooth API -->
<!-- - Web Share API -->
<!-- - Web Speech API -->
<!-- - URL Protocol Handlers -->

## Where do we go from here?

Workbox - https://developer.chrome.com/docs/workbox/modules/workbox-strategies

That looks like a lot of ~~work~~ JavaScript, right? I know this feeling. But I don't think this will be like that for
you. Rails provides a lot of tools to generate the code for you, and if you look closer you will see that most of what
we did are patterns. The great thing about patterns is that you can extract and reuse them.

The ActionNotifier gem, for example, will have some inspiration from `gem1` and `gem2`. Both of them are gems that help
you to send push notifications to your users.

I expect to see more gems like that for `caching`, `background fetch`, `background sync`, etc.

# References

- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#adding_retrieving_and_removing_data
- https://business.adobe.com/blog/basics/progressive-web-app-examples

- On background sync:
    - https://bugs.webkit.org/show_bug.cgi?id=182565
    - https://x.com/jeffposnick/status/969049287408701441
    - https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API#browser_compatibility

---

Performance notes:

- service worker executes off the main thread
- mobile devices have limited resources like CPU, memory, and battery
- mobile devices have limited network bandwidth
