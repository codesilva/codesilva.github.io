Hello, eveyone! I'm very glad to be here at the Tropical on Rails stage.
My name is Edy, I'm 'a father of to a cute daughter, a husband of a wonderful
wife and a software developer at codeminer42.

I'm here to talk about Hotwire and the Platform. You'll probably know what Hotwire is, but you might be wondering what
the Platform is.

What I'm calling The Platform here is: the Web. The web and all its APIs, that can do amazing things

[show a slide with some of cool APIs e.g. offline support, notifications, geolocation, bluetooth, etc]

The thing is... all these APIs are just JavaScript. So, the platform, that is the web, is just JavaScript.

(hmmm, you had a nice reaction, though! I was expecting some tomatoes being thrown at me)

Just kidding, folks. My intention here is to show you can leverage the web platform, using the APIs, to build amazing things. And of
course, you can use hotwire to do that and have a nice developer experience.

## Agenda

- Why you need PWAs?
    - DHH's tweet mentioning the importance of PWAs
- How to quickly turn your Rails app into a PWA
- The sample app
- Offline experience
- Enganging users with push notifications
- Cool stuff you can do with PWAs
- Demo and Expectations

## Why do you need pwas?

PWAs ara a good alternative to native apps. They are simple in a sense that you don't need two codebases to maintain or
learn a new tool (including programming language) to build them. You can use the same tools you already know and love to 
build them.

Also, they bring freedom to developers. You can build your app the way you want, without the restrictions of the app
stores.

[slide com tweet do DHH]

They won't block a feature or a bug fix you want to push due to a weird and inconsistent review process.

[tweet dhh com motivo de bloqueio de app]

Great players in the market are already using PWAs. Twitter, Pinterest, and Starbucks are some examples.

## How to quickly turn your Rails app into a PWA

There are two main components around a PWA: the manifest and the service worker. Since Rails 7.2 both files are present
in a new Rails app.

The manifest is a JSON file that contains metadata about the app, like the name, the icon, the theme color, etc.

That's enough to make your app installable on the user's device. Once you enable it in your Rails app, the user will see
the install button in the browser's address bar.

User will be able to install the app but it won't deliver a good experience if the user is offline. When you are using
a native app either in mobile or desktop, you expect it to work offline. At least, for features the really need internet
connection, you want to receive a message saying that you need to be online to use that feature, not this ugly Chrome
dinassour.

[slide com imagem do Chrome dinassour]

To address that issue, we need a way to cache the assets and the data the app needs to work offline. To cache things, we
need some component in the middle that will intercept the requests and decide if it should go to the network or to the
cache.

That component is the service worker. This is a JavaScript file but it is a simple one. It runs off the main thread and
just has a bunch of event listeners.

In this default file provided by Rails, we have a few listeners related to push notifications. But to act as a proxy, we
need the fetch event listener. This with the Cache API will allow us to cache the assets and the data.

## The sample app

That's how we start our sample app for this talk. This app is named `fermat`. It's a very simple app for students and
coachs to manage their studies and classes.

Students can download the materials (and report issues with the content) and coaches can upload them.

[video showing the app features in action]

The app is a Rails app with Hotwire and Tailwind CSS.
That's a regular Rails app. But with what we've seen so far we can turn it into a PWA.

[show a demo where the app says it does not have internet connection]

It doesn't deliver a whole package of offline features but showing a message is a good start.

## Offline experience

Materials can large file. To make it efficient we can use another api for downloading files: the background fetch
api.

The coach might have multiple files to upload and they might want to dispatch them all either the app has internet or
not.

## Enganging users with push notifications

One of the great advantages of PWAs is to get closer to your users. You are with them even when they don't have
connection to the internet. You can also be with them when they are not using your app.

Push notifications are a great way to engage your users. 60% of users say that push nottifications make them to use the
app more often and almost 50% say that push notifications are less intrusive than email and SMS.

In our app, we will add notifications to inform the students when a new material is available.

Do you remember the fresh new Rails app? It came with code for push notifications in the service worker. We just need to 
add the code to send the notifications.

https://www.mobiloud.com/blog/push-notification-statistics

## Cool stuff you can do with PWAs

TBD

## Demo and Expectations

That looks like a lot of ~~work~~ JavaScript, right? I know this feeling. But I don't think this will be like that for
you. Rails provides a lot of tools to generate the code for you, and if you look closer you will see that most of what
we did are patterns. The great thing about patterns is that you can extract them and reuse them.

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
