I had everythin in place for my demo for Rails conf.

I didn't seem good thoug. I was using `importScripts` to import workbox in the service-worker file. But it is 2025 and I want to use ESM
modules.

In order to use it as an esm module I would need to install workbox as a dependency and then import it like this:

```javascript
import { precacheAndRoute } from 'workbox-precaching';
```

This cannot be done in Rails without installing a bundler.

Thank God! Rails ecosystem is great and there is a tool for that already. It looks like people highly recommend [esbuild][]
for this task. I found a few discussions on Reddit and StackOverflow that confirm this.

Even though i could easily install it and then install all the needed workbox packages

>```bash
> npm i workbox-core workbox-routing workbox-strategies workbox-precaching
>```

I have one more limitation though. My service worker is, in fact, an ERB file. I need to be able to use Rails helpers
for fingerprinting assets so I could cache them properly.

Looking into the docs i found the following [link](https://guides.rubyonrails.org/asset_pipeline.html#digested-assets-in-javascript).

There is a function to be used in JS. But i don't think this will work - i can test it a little bit more tho.

note: what if i use esbuild to generate service worker but without fingerprinting? I could then let the Rails asset
pipeline to handle the fingerprinting.

This seems great but, as also explained in the docs:

> If you’re using bundlers like Webpack or esbuild, you should let the bundlers handle the digesting process. If Propshaft detects that a file already has a digest in the filename (e.g., script-2169cbef.js), it will skip digesting the file again to avoid unnecessary reprocessing.

That's precisely my situation since i need to use esbuld to bundle my service worker file. As far as I could see, I have
to handle this with esbuild. I need to generate fingerprited filed for all these

```rb
// file: service-worker.js.erb

precacheAndRoute([
  {url: '/', revision: null},
  {url: '/student?group_id=1', revision: null},
  {url: '<%= asset_path('controllers/index.js') %>', revision: null},
  {url: '<%= asset_path('controllers/application.js') %>', revision: null},
  {url: '<%= asset_path('controllers/resource_controller.js') %>', revision: null},
  {url: '<%= asset_path('controllers/student_controller.js') %>', revision: null},
  {url: '<%= asset_path('controllers/coach_controller.js') %>', revision: null},
  {url: '<%= asset_path('application.js') %>', revision: null},
  {url: '<%= asset_path('application.css') %>', revision: null},
  {url: '<%= asset_path('application.tailwind.css') %>', revision: null},
]);
```

I TRIED TO 'VIBE CODE' ALL THE WAY THROUGH BUT I COULDN'T FIND A WAY TO DO IT. I had to go with this tool every humble
human has: the brain.

My plan is then use esbuild for everything.

> Very clever to ignore already fingerprinted files, btw.

[esbuild]: https://www.reddit.com/r/rails/comments/1ihjjzm/preferred_js_bundler_for_rails_8_apps/
https://stackoverflow.com/questions/76561004/image-imported-from-javascript-file-does-not-have-fingerprint-from-asset-precomp

https://esbuild.github.io/api/#asset-names

APanhei do esbuild aqui

Mas o vibe code funcionou bem no Claude. ChatGPT se perdeu todo. Minha primeira vez usanod Claude. Parece bom.

Eu estava usando asset-names onde deveria ser entry-names já que estou interessado em builder entrypoints e não assets.

```bash
npx esbuild app/views/pwa/service-worker.js \
  --bundle \
  --minify \
  --outdir=app/views/pwa/ \
  --entry-names="service-worker.[hash]" \
  --target=es2020
```

Codigo do claude que funcionou

This was not enough though. I still have the problem of service worker not being able to get the assets with the fingerprinted names to precache them.

Looks like i can use the [`define`][] for that.

I als have to skip imports already made using importmap. For that i used [`--external`][] option.

[--define]: https://esbuild.github.io/api/#define
[--external]: https://esbuild.github.io/api/#external

For now, my command looks like that


>```json
>{
>   "build": "esbuild app/javascript/*.* --external:@hotwired/turbo-rails --external:controllers --external:initializers --bundle --sourcemap --format=esm --outdir=app/assets/builds --public-path=/assets"
>}
>```

I thought we could use import maps. 

I tried adding entries from js jsdelivr but it didn't work.

https://www.jsdelivr.com/package/npm/workbox-core
https://guides.rubyonrails.org/asset_pipeline.html#how-importmap-rails-works


Import maps do not work in the context of service workers though. But they work with
ESM modules which we can import directly from jsdelivr.

```javascript
import { cacheNames } from 'https://cdn.jsdelivr.net/npm/workbox-core@7.3.0/+esm';
```

Importing from CDN is not a good idea for production, but it works for development. Even thoug the service-worker won't
be always retrieving the modules, evey single time the service worker is updated, it will download the modules again. If
CDN is down, the service worker will not be able to start.
