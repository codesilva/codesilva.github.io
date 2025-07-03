As the Last RailsConf approaches the nostalgic feeling gets stronger. It's the end of an era, a celebration of the
history of Ruby on Rails and its community. 

Taken by this feeling, we hade a series of posts about Ruby, Rails and the history of RailsConf. We went from the
history of Rails, the conventions that made it so special, to the state of Rails today in the AI era.

Check out the list of posts we published in this series:

    lista de posts aqui

I'm blessed to be part of the last RailsConf ever. In this post I share my expectations for conference as an spectator and as a speaker.

# The Last RailsConf

I watched a lot of talks from past RailsConfs and I got a nice feeling about the community. A wide range of topics, some
more specific to Rails, some more general, but all focusing on the empowerment of the developers and the community.

As mentioned in the first article of the series, we kinda had something similar to this in Brazil with RubyConf, despite
the name.

This is a characteristic I really love. Ruby on Rails is the main tool but there's the surrounding stuff that empowers
you as a professional. The community is open-minded and curious, always looking for the best tool for the job.

I always had this feeling about RailsConf but then DHH put it in words in the RailsWorld 2023 keynote:

> We should be the Renaissance Developers. [...] interested in all aspects of a problem, the design, the implementation, the deployment and the maintenance.

Rails community is composed of so smart and kind people. Being there in person is, for me, a great privilege. I hope to meet a lot of them and learn from their experiences.

I think this will be particularly easier due toe the structure of the conference. The second day is dedicated to Hacker
Spaces, where one can collaborate with other developers and open source maintainers. This is a great opportunity to
build something together with admirable people, those who created and still maintain many of the tools we use every day.

This year's schedule, as always, is very diverse and promising with talks/workshops around `Community Building` (of
course), `Career Reflections`, `Rails Internals`, and `Frontend, PWAs and Browser-Powered Rails`.

All of this related to the theme of the conference: `The Future of Rails, Ruby and You`.

## DHH Comes To a Fireside Chat

Closing the first day of the conference, DHH will be on stage for a Fireside Chat. After what happened previously, this
is a very special moment. DHH is the creator of Rails, the one who started it all. I thikn it's very important for
a great finale in RailsConf history to have him there, sharing his thoughts and experiences.

## The perfect closing keynote

The closing keynote will be given by Aaron Patterson, aka Tenderlove, one of the most beloved figures in the Rails
community.

I watched a lot of his talks. He's smart, funny and has a great way of explaining things, even the complex ones. There couldn't be a better person to close the last RailsConf ever.

Indeed, Tenderlove is right about everything. I'm looking forward to his talk, which promises to be a celebration of the Rails community and its history.

# The Future of PWAs on Rails

---

# Packing everything to RailsConf 2025

Next week will happen the RailsConf 2025! its is the last railsconf in the history.  i am amazed to be part of such
a milesone.

this post is just to revisit everything we've been covering these weeks around Ruby, Rails and Railsconf history, and to
set some expectations for the event.

# Ruby, Rails and The Renaissance Developers

i am not a ruby/raisl guy, precisely. i mostly worked with php and then i came to know node and ruby/rails at the same
time, here at codeminer42

It means i have almost four years of contact with ruby, rails and their comminities. I was amazed of how Ruby is such a nice language. If you come from another common-sense language you find Ruby a bit weird. But then they have great conventions that makes
everything very simple and clear.

It is so joyful to write Ruby code. Particularly, I love the convention of the bang and the question mark in the method
names.

```ruby
def sunday?
  DateTime.now.wday == 0
end

def action
  return 'Go to the beach' if sunday?

  'Go to work'
end

# we could also have the following

def action
  return 'Go to work' unless sunday?

  'Go to the beach'
end
```

Two great things here. First, it's very nice to read. It really looks like a text: 'Go to the work unless it is sunday'. Another good thing is that it already makes explicit the intention of the method. You look at a method an you already know it returns a boolean.

When talking about bang, it tells us that method might throw an exception

```ruby
class WelcomeMail
    def self.send!
        composed_email = ComposeMailService.call(
            to: 'somebody@somewhere.com',
            subject: 'Welcome to RailsConf',
            body: 'Looking forward to see you in Philly!'
        )
        MailSender.send!(composed_email)
    end
end
```

When calling `WelcomeMail.send!` you already expects this can throw. You then take the actions. That's not true for the `ComposeMailService.call` though. Ruby was made to allow happy programming. You code in Ruby, you don't feel overwhelmed. The cognitive load is reduced with all the consistency it brings to the party.

Sometimes i feel everythin in Ruby works as an enumerator lol

It turns out that Rails leverage all the flexibiliy provided by Ruby and extends the language in a way it makes thing even simpler for developers. I recall writing my first Rails code, in a real project, and it was bit scary.

When writing testes, these guys are the test maniacs, I didn't know exactly what to do. Many things seemed magical to me. I, personally, don't like it. But that's a mind shift to have when woeking with Rails. This is what allows you to write apps fast.

they have great toolin, they (can) test every single piece of the code. this is insane

Ruby is a toy. Everybody loves toys

# The Last RailsConf

This is the last rails conf. This is huge! I feel very blessed to be part of it. Specially because I'm not a very
experienced Ruby/Rails guy. I've been doing Rails for almost four years now. This was enough time to fall in love with Rails as tool and as a community.

As a tool, no doubt, [it was very distuptive][] and brought to life many of the [patterns we see in other frameworks][].
It has a well-defined philosophy, the happy programming, which drives the community around it.

By interacting with Rails developers you find out they are head to write good and very tested code as well as they spend
time working on tools for improving their jobs, and they are good at it!

There's virtuous cycle in it. They build a rich ecossystem which allows them to write better software quickly, so they
have free time to work on more tools.

This should be the norm. All the communities have much to learn from Rails'. On this, there's something I always liked
in RailsConf. Take a look at the past conferences and you notice how it is diverse bringing more than technical Rails-centric talks.
Rails is amazing but there's some surrounding stuff to empower you as a professional and RailsConf always had something
about it in its schedule.

This is a RailsConf characteristic I've been observing to be spreading out. More than ever I look at Rails people as the
true _Reinaissance Developers_, being curious and open-minded; picking, or creating, the best tool for that problem.

Many problems we face as web devs can be solved with Rails. As a subset of these problems, some
other need some other tools like JavaScript. Fortunately, we have stuff like Stimulus. Some other problems claim some
[Golang code][]. That's totally fine and I'm very happy to see this happening.

~~This is a trait of RailsConf: the organizers are open-minded. There's space for everybody. Just like we used to do in
Brazil with RubyConf (which was indeed much [more aligned with RailsConf][] idea).~~

I'm going to the RailsConf, this diverse conference, to talk about PWAs. If you have no idea what it is you can checkout
the series `Everything You Need To Ace PWAs in Rails` to get more details.

I have good expectations for the talk. This is a theme I think there are gaps to cover. As the browsers get more
powerful I expecet to see them more often, specially because they are almost frictionless to get the most basic features
(like making the web app installable).

I hope to show the value of PWAs, how to integrate them with Rails using tools out there but not as closed thought but
as opening a new route. So the community can do what it does better: make the action of programming, PWAs in this case, joyful.

As an expectator I have even greater expectation that will highlight here.

this is just my plan, of course. things might change. in between a talk and another I will try to talk to people and genuinely know them. If you find me around, come to say hi. It will be a pleasure.

## Day 1

First day, the whole thing starts. A lot of amazing people and a great opening with the talk `365 Days Later: Moving from Java to RoR and how it changed everything` by John Dewsnap.
I love this kinde of talk. They are for real. We did 'X' and these are the results.

Next stop is `Derailing Our Application: How and Why We Are Decoupling Our Code from Rails` by Fito von Zastrow and Alan Ridlehoover.
Honestly, this very bold headline got me. They will discuss how decoupled an 800,000 lines of Ruby code from Rails to
scale the team but _without losing_ Rails benefits.

To finish the morning, I'm really excited to see what Svyatoslav Kryukov will bring with their talk `Rails Frontend Evolution: It Was a Setup All Along`.

The afternoon looks promising. I plan to attend both `Understanding Ruby Web Server Internals: Puma, Falcon, and Pitchfork Compared` and `Ruby Internals: A Guide For Rails Developers` by 
Manu Janardhanan and Matheus Richard. It is very fun to see what is under the hood.

Last talk in my roadmap is `Ruby People Are the Best People (And Here's How to Actually Meet Them)`. I like meeting
people, that's actually part of my job too. I genuinely expect to meet great people at this conference.

Afterwards, everybody will certanly be at the main stage for the `Fireside Chat with DHH`, the man who started all this.

## Day 2

I really love that the second day of the conference is dedicated to `Hacker Spaces`. They explain what it is:

> Hack Spaces (previously called “Hack Day”) is a new event at RailsConf 2025 designed to bring Rails developers and open source maintainers together for a day of hands-on collaboration.

Such a great opportunity to build something with admirable people. Those who created and still maintain many of the tools we use every day.

With the goal of making genuine connection I plan to attend to `What can we do together? A facilitated community-building workshop` in the morning.

On the afternoon, the `Ruby Podcast Panel` seems very interesting discussion with Rails podcasters. The afternoon
regular schedule comes to an end the `The Past, Present and Future of Background Jobs` with really great people, including Rosa who implemented
the Solid Queue.

The day finished with Lightning Talks. It will be very fun.

## Day 3

In the last day of the last RailsConf ever, after attending to the keynote, `How 10 years of RailsConfs can inform the next 10 years of your career` by 
Kevin Murphy seems a very good moment to reflect about the conference and how it impacted lives and what is to come.

Continuing the day, `The future of Rails begins in the browser` by Vladimir Dementyev and Albert Pazderin, got me.
Seems like we can make it even simpler to experiment with Rails directly into the browser leveraging WebAssembly.

With all the excitement, I will come to the stage to talk about `The Future Of: PWAs on Rails`. Join me to see what PWAs
are, which problema they solve, how they solve and how this fits to the Rails philosofy.

While I'm not sure which talk to go next I'm sure I will attend to `The Modern View Layer Rails Deserves: A Vision for 2025 and Beyond` by
Marco Roth. Marco is doing such an amazing work with Herb and I wanna hear more about it.

## Tenderlove is right about everything

This seems a very good closing to me. A great closing keynote by Aaron Patteron as a celebration of such an amazing history!

The conference then comes to an end, lights turned off. The jobs is done, eveybody can go home. Hopefully, feeling
nostalgic, pleasured and looking forward for what is to come.

[much more aligned with RailsConf]: https://blog.codeminer42.com/what-it-takes-to-foster-a-community-around-rails/
[it was very distuptive]: https://blog.codeminer42.com/the-history-of-ruby-on-rails-code-convention-and-a-little-rebellion/
[patterns we see in other frameworks]: https://blog.codeminer42.com/ruby-on-rails-the-open-source-blueprint/
[Golang code]: https://github.com/basecamp/thruster

# PWAs and the future
