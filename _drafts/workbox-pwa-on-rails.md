Download workbox

```
npx workbox-cli copyLibraries ~/projects/personal/workbox
```

Move this to `public/workbox` in your Rails app.

For now i just made a link

```bash
ln -s ~/projects/personal/workbox/public/workbox public/workbox
```

then i changed the service worker file


```javascript
importScripts('/workbox/workbox-sw.js');

workbox.setConfig({
  modulePathPrefix: '/workbox/'
});
```
