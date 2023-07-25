```js
const data = [];
function handleResponse(resolve) {
  if (data.length === 3) {
    resolve(data);
  }
};

function delayedResponse() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
}

async function time(label, fn) {
  const start = new Date();
  await fn();
  console.log(
    (new Date() - start) / 1000, `seconds to load ${label}`
  );
}

time("sequential", async () => {
  await delayedResponse();
  await delayedResponse();
  await delayedResponse();
});

time("parallel 2", async () => {
  return new Promise((resolve) => {
    delayedResponse().then(() => {
      data.push(new Date());
      handleResponse(resolve);
    });

    delayedResponse().then(() => {
      data.push(new Date());
      handleResponse(resolve);
    });

    delayedResponse().then(() => {
      data.push(new Date());
      handleResponse(resolve);
    });
  });
});

time("parallel", async () => {
  await Promise.all([
    delayedResponse(),
    delayedResponse(),
    delayedResponse()
  ]);
});
```

Referencia

- https://dev.to/dperrymorrow/speed-up-your-code-with-promiseall-3d4i
