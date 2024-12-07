# PWA on Rails: How to handle Service Worker upgrades

During Rails World 2024 DHH announced Rails 8. There were amazing changes in Rails 8 as you can see here. Among all
those updates there was as single goal: make it easier to deliver high-quality software.

You software solves peoples's problems. The more people use your software better. Having an engaging app is extremely
important.

PWAs are a good way to build engaging apps. You can deliver a native-like experience in both desktop and mobile devices
without needing the App Store or Google Play as gatekeepers.

A fresh new rails application already comes with the most basic components of a PWA: manifest.json and
a service-worker.js. In this article I will show you the lifecycle of a service worker and how to handle its upgrades.

## Basic Setup

The `manifest.json` and `service-worker.js` can be found under `app/views/pwa/` folder. The files are there but not yet
enabled.

To get PWA stuff working you need two things:

- enable the routes for the manifest.json and service-worker.js
- add the manifest.json to the `application.html.erb` file
- register the service worker

### Enabling the routes

In the `config/routes.rb` file you will find the commented lines that enable the routes for the manifest.json and the service-worker.js.

```ruby
# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
get '/manifest.json', to: 'pwa#manifest'
get '/service-worker.js', to: 'pwa#service_worker'
```

### Enabling the manifest.json

In the `application.html.erb` file you will find a commented line that includes the manifest.json. Uncomment it.

```erb
<%= tag :link, rel: "manifest", href: "/manifest.json" %>
```

### Registering the service worker

In the `app/javascript/packs/application.js` file you will find a commented line that registers the service worker. Uncomment it.

```javascript
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered! Scope: ', registration.scope);
      })
      .catch(err => {
        console.log('Service Worker registration failed: ', err);
      });
  });
}
```

After doing these steps you will have a PWA already. Get the app running and check open it in the browser. You will see,
on top right, a button to install the app.

In the dev tools, in `Application` tab, you will see the `Manifest` and `Service Workers` sections.

## Service Worker Lifecycle

One of the most important features of a PWA is offline support. Service Workers and the Cache API are the key to this feature.

Having an application working offline is a great feature but it has its specific challenges. One of them is how to
upgrade your application. Since the service worker is a proxy between your application and the network it's crucial to
know the service worker lifecycle to provide a smooth experience to your users.

### The First Service Worker

### Updating the Service Worker

The Service Worker acts as a proxy between the browser and the network. It allows you to intercept requests and
responses. It's used to offer capabilities like offline support and background operations.

The content of the service-worker.js file is the following:

```javascript
// Add a service worker for processing Web Push notifications:
//
// self.addEventListener("push", async (event) => { ... })
//
// self.addEventListener("notificationclick", function(event) { ... })
```

## Handling Service Worker Upgrades

- button in hotwire (an updater stimulus controller)

https://web.dev/articles/service-worker-lifecycle
https://guides.rubyonrails.org/7_2_release_notes.html
