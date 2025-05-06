
# Headline

From Interrupts to Event Loops: A Journey through I/O

# Features and Benefits

| Features | Benefits |
| --- | --- |
| | |

# 4U's

- Urgency: Not that urgent. You are not obligated to fully understand io and interruptions. (1)
- Uniqueness: It's unique. I never saw a talk or post mentioning on this journey (4)
- Ultra-specific: mentions interruptions (3)
- Useful: very useful, understanding this is understanding i/o anywhere not only in nodejs (4)

# Showing a Need

# Satisfying the Need

---

# Abstract

# Pitch

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

----

## Active delivery & noticed

    - ideia de centralizar as notificações (https://evilmartians.com/chronicles/crafting-user-notifications-in-rails-with-active-delivery)
    - https://github.com/palkan/active_delivery
        - usa active support pra definir callback
    https://github.com/excid3/noticed
    https://izooto.com/blog/enable-safari-push-notifications-on-ios-step-by-step-guide
    https://www.braze.com/resources/articles/mobile-web-push-is-now-supported-on-safari

### Takeaways

#### Active Delivery

- Centralize notifications: there's a new layer between your app and the notification service
- Use Active Support to define callbacks
- Easy to use and configure

```ruby
class ApplicationDelivery < ActiveDelivery::Base
  self.abstract_class = true

  # For example, you can use a notifier line (see below) with a custom resolver
  # (the argument is the delivery class)
  register_line :sms, ActiveDelivery::Lines::Notifier,
    resolver: -> { _1.name.gsub(/Delivery$/, "SMSNotifier").safe_constantize } #=> PostDelivery -> PostSMSNotifier

  # Or you can use a name pattern to resolve notifier classes for delivery classes
  # Available placeholders are:
  #  - delivery_class — full delivery class name
  #  - delivery_name — full delivery class name without the "Delivery" suffix
  register_line :webhook, ActiveDelivery::Lines::Notifier,
    resolver_pattern: "%{delivery_name}WebhookNotifier" #=> PostDelivery -> PostWebhookNotifier

  register_line :cable, ActionCableDeliveryLine
  # and more
end

class PostsDelivery < ApplicationDelivery
end

PostsDelivery.notify(:published, user, post)

# Under the hood it calls
PostsMailer.published(user, post).deliver_later
PostsSMSNotifier.published(user, post).notify_later
# ...
```

#### Noticed

- Helpers 
- More configuration
- Generator e notificacoes no banco de dados
- É interessante porque dá pra mostras as notificacoes na página

A possivle comp

#### Possible combination of both

Gem Features
Notification Management (Noticed):

Allow defining notifications with flexible delivery options.
Support for database, email, Slack, SMS, and custom delivery methods.
Context-Aware Delivery (ActiveDelivery):

Dynamically determine which delivery methods to use based on the context.
Provide service isolation to abstract and encapsulate delivery logic.
Integration:

Provide seamless integration between notifications and delivery services.
Enable developers to define notifications and automatically use the correct delivery methods.


---

1️⃣ Introduction
Set the premise:
“Ever wondered what actually happens when your code ‘waits for a file’ or ‘gets a response from a server’? Let’s crack open the stack — from hardware to high-level abstractions.”

2️⃣ Low-level: Hardware & CPU Interruptions
Briefly explain:

CPU executes instructions sequentially.

I/O devices are way slower.

So devices signal the CPU via interrupts when ready.

Show your MIPS examples:

Polling I/O: program stuck checking a flag.

Interrupt-driven I/O: device triggers an interrupt, CPU jumps to ISR (Interrupt Service Routine), resumes after.

Bonus: quick demo of a MIPS handler printing a char when ready vs polling for a char.

Goal: Audience should get a feel for the latency issue and why we can’t just “wait around.”

3️⃣ Kernel Level: I/O APIs and Strategies
Introduce the problem:
“Modern OS kernels abstract device handling — but how do they let you know when your I/O is ready?”

Walk through:

Blocking I/O: thread waits.

Non-blocking I/O: check if it’s ready, maybe retry.

I/O Multiplexing: monitor multiple FDs.

Async I/O: submit work, get notified later.

Use clear diagrams to show process vs kernel interactions.

Optional: small C snippets of select(), epoll(), io_uring.

4️⃣ Userland: JavaScript & Node.js Event Loop
Connect it to JS:

Single-threaded model — can’t block.

Uses I/O Multiplexing under the hood (libuv).

All I/O is non-blocking → registered with epoll/kqueue.

Event loop monitors FDs.

Callback queue vs microtask queue.

Diagram idea:
Request → libuv → epoll → readiness → JS callback

Maybe show an example of a fs.readFile() call and break it down:

Added to epoll.

Event loop cycles.

Callback enqueued on readiness.

Executed when call stack is empty.

Highlight: “Node.js doesn’t have true Async I/O in the io_uring sense (yet, though people are working on it), it relies on I/O Multiplexing + non-blocking I/O + event loop.”

5️⃣ Closing Thoughts
Bring it full circle:
“From hardware interrupts on a 1990s MIPS CPU to the async abstractions in your modern JS stack — it’s all about letting your code sleep and wake up when it matters.”

Optional provocations:

How WebAssembly could play with this.

Node.js with io_uring projects.

Event loops in other languages (Go, Python’s asyncio, Nginx).

📌 Title ideas:
“When the CPU Listens: A Story of Interrupts and Async I/O”

“From MIPS Interrupts to JavaScript Event Loops”

“How I/O Actually Works: A Practical Walk from Hardware to JavaScript”

“Event Loops, Interrupts, and You”

