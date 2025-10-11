---
layout: post
title: Playing (songs) with ReactConf Keyboard
date: 2023-06-19
lang: pt-BR
tags: ["intermediario", "javascript", "jest", "testes", "test runner", "spy"]
category: ["javascript", "testes", "TDD"]
excerpt: O que é memory leak afinal?
---

Last week, I attended ReactConf 2025. It was a great conference; I met many people and learned a lot.

The kit they gave us included a small keyboard. Well, I am not a hardware guy. I have only had two computers in my life, all of which used to work, so I had no time and no guts to play with them. Breaking things would be a disaster for me.

![Picture of the ReactConf keyboard](./assets/reactconf-keyboard.jpg)

At first, I thought it was just a keyboard model, but then my friend told me it was a real keyboard and mentioned an interesting use case: playing songs with it. Some streamers have equipment that plays sounds when they press some keys.

After coming back home, I looked into the keyboard and found the manual.

![Picture of manual](./assets/reactconf-keyboard.jpg)

It had predefined functions, such as opening React docs and VSCode. To accomplish my goal, I needed to override those functions.

Even though I'm not like people who build their own computers and keyboards, I know a few things about programming. I knew that there should be a firmware that could be changed.

This was how my journey started.

# Looking for the firmware

To discover the firmware, I looked into the USB details of the keyboard. It has some information, but the only useful information was the manufacturer: "dztech".

![Picutre of USB details](./assets/reactconf-keyboard.jpg)

I searched for "dztech keyboard firmware" and found a few results. A [gitlab
repo](https://gitlab.gnugen.ch/fvessaz/qmk_firmware/-/tree/c5515858d6ec3e5052b3f9851560f63a2ae5de83/keyboards/dztech/dz65rgb) with some C code looked promising. It had some references to "QMK", a popular open source firmware for keyboards.

This was likely the firmware I sought, but I needed to be sure. I then asked ChatGPT if it knew anything about my keyboard, mentioning that it was a gift from ReactConf and was manufactured by "dztech".

> If this keyboard is from dztech, it’s very likely running QMK firmware (or VIA, a GUI layer on top of QMK).

It confirmed my suspicion, mentioned "VIA" and pointed me to [usevia.app](https://usevia.app/), a web application that allows one to configure keyboards running QMK and supporting VIA.

On the website, I connected my keyboard and it worked! I could see the keyboard's layout and change each key's functions.

[another image here]

Awesome! My keyboard was indeed running QMK and supporting VIA. I could even see its model: "winry315." With that information, I could search for more specific information about my keyboard and found a [firmware](https://gitlab.gnugen.ch/fvessaz/qmk_firmware/-/tree/master/keyboards/winry/winry315?ref_type=heads) for it.

Knowing that is important if you want to customize the keyboard beyond what VIA allows. That's not my case, though.

# VIA makes it easy

From the layout, I could see that keys were mapped to macros that opened apps and websites. The macro M0, for example, would open the React docs. It was done using macOS's Spotlight search.

It pressed `Cmd + Space` to open the search and then typed "https://www.react.dev" followed by `Enter` to open the docs.

VIA app displays the macro graphically, but it's indeed a QMK macro using its [keycodes](https://docs.qmk.fm/keycodes_basic#commands): `{KC_LGUI,KC_SPC}https://www.react.dev{KC_ENT}`.

Very neat! I could create my own macros to play songs.

# Playing songs from Terminal on MacOS

The simplest way to play songs that fit my needs was to use `afplay`. I planned to create an executable that could be executed from the Spotlight search.

I found out macOS has a tool called Automator that allows one to create simple applications. I created a simple application that runs a shell script and plays a song using `afplay`.

[image of Automator]

With this app called PlaySong, I could play songs from the Spotlight search. I just had to type "PlaySong" and hit `Enter.`

The last step was to create a macro in VIA that would open the Spotlight search, type "PlaySong," and hit `Enter.` It's pretty simple, just like the React docs macro, but replacing the URL with "PlaySong."

The final macro looks like `{KC_LGUI,KC_SPC}PlaySong{KC_ENT}`.

Mapping it to a key and pressing it, the song started playing. Mission accomplished!

# Skipping the Spotlight search

It works, but I don't like the way it works. Looking for something cleaner, I again used the Automator to create a `Quick Action.` The difference is that a Quick Action can be executed using a keyboard shortcut.

It does the same as the app I created: runs a shell script that plays a song using `afplay`. I saved it as "PlaySongShortcut".

In macOS's `Keyboard > Shortcuts > Services` settings, I could see the `PlaySongShortcut` under the `General` section.

[image of the shortcut settings]

The final step is to redefine the macro in VIA to:

```
{+KC_LGUI}{+KC_LALT}{+KC_LCTL}p{-KC_LCTL}{-KC_LALT}{-KC_LGUI}
```

It's done! Now my keyboard plays a song without needing to open the Spotlight search.

[demo video]

# Conclusion

That was fun! I hope you, like me, have learned a few things reading this article. I know I did while doing this. There are some challenges yet. For example, I would like to play different songs using different keys, but without needing to create different Quick Actions for each song.

Can I fulfill this using only Automator input parameters? I don't know. If you have any idea, please let me know. I would love to hear your thoughts. Tha

That's it for now. See you next time!
