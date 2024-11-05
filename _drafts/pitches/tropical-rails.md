# Headline

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
- https://www.notifyvisitors.com/blog/web-push-notifications-stats/
- https://www.w3.org/TR/appmanifest/#shortcut-items
- https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- https://github.com/rails/rails/blob/7-2-stable/railties/CHANGELOG.md

---

# Abstract

Every software is made to be useful and to solve people's prolems. The more people benefited by your software better.

With Rails, we, developers, are very productive and can deliver high-quality software prety fast. Not only regular Rails
apps but now Progressive Web Apps (PWAs).

Offering a native-like app experience, PWAs are a good way to build more engaging apps without needing App Store or
Google Play as gatekeepers.

This talk is for anyone who wants to build more efficient, smooth, and engaging applications using Rails, Hotwire and just a bit of
JavaScript.

# Pitch

pontos: a maioria dos aplicativos requerem funcionalidades simples

I worked with mobile app development for a couple of years - hybrid and native. In my memories, I remeber struggling with stores (Google and
Apple Stores) due to peculiar issues. Sometimes my images didn't have the correct alpha filter. Sometime it was worse.
We needed to do some workarounds to make the app to perform differently based on the platform.

Even worse: sometimes your are force to use their (expensive) services.

As software developers you want consistency. Write a code once and run anywhere is a good way to achive that. As an
enterpreneur you don't want to spend money on services you don't want to use.

PWAs bring simplicity, flexibility and freedom - just like Rails. Indeed, the average applications we build are simple.
Based on a CRUD with not much variations.

For most applications PWAs are suitable. They join the capabilities of a regular web application with the native-like
plus. Using the right APIs you can build something really powerful.

<!-- As a software developer you don't want to need to make workarounds, hide features in certain platform or anything like -->
<!-- that. And as product owner you don't want to spend much money with integrations or services that you are not interested -->
<!-- in. -->

## Outcomes

After attending this talk, audience should know:

1. How Web Push works and how they can add this to their app (while ActionNotifier is not here)
2. Know HTML APIs that provide more interaction and smooth apps (e.g. Vibration API and View Transitions API)
3. Use APIs to make apps more effficient (e.g. Background Fetch API)

## Outline

### Intro

- manifest.json and service-worker.js (Rails does that for you, but it's good to know)
- Show some companies using PWAs (like Reddit, Pinterest, etc.)
- Web APIs are more powerful than you remember: let's see what a PWA can do today and compare with native apps.

### Getting started

- rails new: let's create a simple app
- the minimal configuration needed 

### Making it smooth and efficient

- Hotwire + View Transitions API
- Background Fetching

### Engagement

- Context menu
- Vibration API
- Some statistics
- Push Notifications
