# Headline

Hotwire meets The Platform™: a new way to build PWAs relying on native HTML APIs

What you need to know about PWAs before ActionNotifier is released
PWA on Rails: Cool features to use before ActionNotifier is released
What can your PWA do?
Hotwire meets HTML APIs: A new way to build Progressive Web Apps

# Features and Benefits

| Features | Benefits |
| --- | --- |
| More Rails; Just a bit of JavaScript | You already have all tools you need. Just Rails and Hotwire are enough |
| Offline-capable application | Much more engaging since your app can be used even without internet |
| Engaging with Vibration api and push notifications | Engage your customer |
| Beautiful and smooh pages with View Transition | You will have an application that people will prefer to use |
| Stop struggling with App Store and Play Store | Gain productivity. Deployments are straightforward. No Apple or Google deying you |
| Efficient application (Background Fetch API) | Improve user experience. Don't make your customer wait |

# 4U's

- Urgency: Not that urgent. You are not obligated to use PWAs. (1)
- Uniqueness: PWA talks are not unique. But in the context of Rails this is unique. There were two talks on PWA recently but they focused on the basic part. The setup. This talk is about what it can do (3)
- Ultra-specific: very specific on PWA capabilities in a Rails app (3)
- Useful: very useful since that's a rails direction. PWA files are default and there's [ActionNotifier](https://github.com/rails/rails/issues/50454) going on (3)

# Showing a Need

A software is written to be useful. You can have a high-quality software but if your customers can't use it, it's useless.

With Rails and Hotwire you can productively build very good apps. But you want more. You want engaging and smoothness.

# Satisfying the Need

The union PWA + HTML APIs will get you there! Get in touch with what's new with Vibration, View Transition, and Push
APIs and build apps that engage 120% more!

# Links

- [Retenção de notificações push](https://www.mobiloud.com/blog/push-notification-statistics#push-notification-retention-statistics)
- [Rails push notifications](https://joyofrails.com/articles/web-push-notifications-from-rails)
- [Chrome Web Push](https://developer.chrome.com/docs/extensions/how-to/integrate/web-push)
- https://web.dev/learn/pwa/update
- https://web.dev/articles/service-worker-lifecycle#the_intent
- https://joyofrails.com/articles/add-your-rails-app-to-the-home-screen
- https://developer.chrome.com/docs/capabilities/pwa-manifest-id
- https://www.notifyvisitors.com/blog/web-push-notifications-stats/
- https://www.w3.org/TR/appmanifest/#shortcut-items
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- https://github.com/rails/rails/blob/7-2-stable/railties/CHANGELOG.md
- https://github.com/rails/rails/issues/50454
- https://wisernotify.com/blog/push-notification-stats/#:~:text=Push%20notifications%20have%20high%20open,agree%20to%20receive%20push%20notifications.

---

# Abstract

Every software is made to solve people's problems. The more people benefit from your software better.

With Rails, developers are very productive and can deliver high-quality software pretty fast. This includes not only regular Rails apps but now Progressive Web Apps (PWAs).

Offering a native-like app experience, PWAs are a good way to build more engaging apps without needing the App Store or Google Play as gatekeepers.

This talk is for anyone who wants to build more efficient, smooth, and engaging applications using Rails, Hotwire, and - just a bit of - JavaScript.

# Pitch

If you have never had issues with Apple or the Play Store, you probably know someone who has. Sometimes, they are weird but simple to solve, like an incorrect alpha filter on the image.

Sometimes, the issue is hard to solve, like forcing you to use their expensive payment methods. You end up implementing a feature you didn't want to, making your team less productive on what matters.

Most apps you work on, while delivering much value, are simple in their mechanisms. That's why you use Rails. It makes things very simple.

As Rails, PWAs are simple yet powerful. You write once and run anywhere as regular web pages or as a native-like app. It gets better when you find out how powerful HTML APIs are today.

I will show you how to leverage all those benefits while building an engaging and efficient app using Rails and Hotwire.

## Outcomes

After attending this talk, the audience should know:

1. How Web Push works and how they can add this to their app (while ActionNotifier is not here)
2. Use APIs to make apps more efficient (e.g. Background Fetch API and Background Sync)
3. Know HTML APIs that provide more interaction and smooth apps (e.g. Vibration API)
4. What can we expect to be even better once ActionNotifier is released

## Outline

### Intro

- Understand manifest.json and service-worker.js (Rails does that for you, but it's good to know)
- Show some companies using PWAs (like Reddit, Pinterest, etc.)
- Web APIs are more powerful than you remember: let's see what a PWA can do today and compare to native apps.

### Getting started

- How to quickly turn your Rails app into a PWA
- An application for demoinstrating PWA capabilities

    Let's create a simple study coaching app where the teacher can publish materials and the students can download them

    NOTE:There will be no true live coding, the application will be ready to show and I will show the code snippets.

### Delivering an offline-capable application

- Cache API for enabling offline usage
- Background Sync for publishing materials efficiently and offline-tolerant
- Background Fetching to efficiently download materials

### PWA Engagement features

- Some statistics
    Having push notifications you can get the user's attention even when they are not using your app. I show some
    statistics about push notifications to show how they can be powerful.
- Implement Push Notifications

### Other engagement features

- Use `share_target` to allow our app to be a target for sharing materials
- Use `shortcuts` to allow the user to quickly access the app's sections
- Mention other APIs that can be used to engage users and deliver native-like experiences

### Demo and Expectations

- Quick demo of the app
- Discuss expectations with ActionNotifier based on the mentioned gems: `active_delivery` and `noticed`.

---




# Tropical on Rails

## Elevator Pitch (300 characters)

Most apps are simple yet valuable — that's why we love Rails. PWAs share this spirit: build once, run anywhere.

You'll learn how to build engaging and offline-capable apps. With most of the knowledge you already have you will ace PWAs and get prepared for the future of Rails.

## Notes

I've been a software developer for 10 years now. I worked with a variety of web frameworks in different programming languages. In the last three years, I've been working with and writing about Ruby and Rails. Both became my favorite technologies. I even led a workshop where we made a Database from scratch in plain Ruby and as an open-source enthusiast, I've been contributing to projects using Ruby on Rails.

My background in mobile and JavaScript development makes me a good fit because I have the perspective of someone who worked with native and hybrid implementations and I can speak confidently that most of the apps can be easily achieved with PWAs. HTML APIs (The Platform) are powerful today allowing us to access file systems, bluetooth devices, geocoding, and much more!

Talk attendees just need to know Rails and a bit o JavaScript. That's good enough to absorb all the outcomes.
