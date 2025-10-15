# React Conf 2025 Takeaways: Learn once. Write once.

From December 7-8, 2025, the React team hosted React Conf 2025, a two-day event filled with exciting announcements and updates about the React ecosystem. I had the opportunity to attend the conference, and I'm here to share some key takeaways and highlights from the event.

# Day 1

The first day of the conference focused on the core React library and its new features. With great announcements such as the React Foundation and the React Compiler reaching version 1.0, it was an exciting day for React developers. Here are some of the main highlights:

## [React Foundation Announcement](https://react.dev/blog/2025/10/07/introducing-the-react-foundation)

This is a significant step towards ensuring the long-term sustainability and growth of the React ecosystem. It's been 10 years since Facebook open-sourced React, and during this time, it has become the most popular JavaScript library for building user interfaces.

Many contributors outside of Meta have played a crucial role in its development, and the formation of the React Foundation aims to provide a more structured and community-driven approach to its governance.

Even though we didn't get many details about the foundation during the conference, I'm excited to see how it will shape the future of React and React Native and foster collaboration among developers and organizations.

### [React Compiler 1.0](https://react.dev/blog/2025/10/07/react-compiler-1)

The React Compiler reached version 1.0 and is now stable for production use. Thanks to early adopters and contributors, it has been improved significantly (and rewritten) since its initial release.

The React Compiler offers several benefits, including:

- automatic memoization of components and hooks;
- it's compatible with existing React 17, 18, and 19 codebases;
- no need to change your code to benefit from it.

With the [linter](https://react.dev/reference/eslint-plugin-react-hooks), the Compiler will teach you best practices and help you write better React code.

The official recommendation is that all new React apps use the Compiler and existing apps use the linter. As you get comfortable, you can incrementally [migrate to the Compiler](https://react.dev/learn/react-compiler/incremental-adoption).

The Meta Quest Store's numbers show **up to 2.5x faster interactions** and **12% faster initial load + navigations** with a neutral impact on memory usage.

## [What's New in React](https://react.dev/blog/2025/10/01/react-19-2)

A few days before the conference, React 19.2 was released, bringing several new features and improvements to the library. Some of the highlights include:

The React Compiler is now stable and ready for production use. It offers several benefits, including faster builds, smaller bundle sizes, and improved performance. The Compiler is designed to optimize React code during build, resulting in more efficient and performant applications.

### [`<Activity />`](https://react.dev/reference/react/Activity)

This new component allows you to easily break down your UI into smaller, more manageable pieces and define different "activities" within your application.

"`tsx
// Before
{isVisible && <Page />}

// After
<Activity mode={isVisible ? 'visible': 'hidden'}>
  <Page />
</Activity>
```

`Activity` supports `visible` and `hidden` modes. When set to `hidden`, effects are unmounted, and updates are deferred until React has nothing left to work on.

This means you can prerender and keep rendering hidden parts of the app without impacting the performance of anything visible on screen.

### [`useEffectEvent`](https://react.dev/reference/react/useEffectEvent)

"`tsx
function ChatRoom({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      showNotification('Connected!', theme);
    });
    connection.connect();
    return () => {
      connection.disconnect()
    };
  }, [roomId, theme]);
  // ...
```

The code above has a problem: if the `theme` changes, the effect will re-run, and the user will see a "Connected!" notification again. This is not the intended behavior.

The `useEffectEvent` hook solves this problem by allowing you to split the event handler from the effect itself. This way, you can declare only the necessary dependencies for the effect, while the event handler can access the latest values of props and states.

"`tsx
function ChatRoom({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ All dependencies declared (Effect Events aren't dependencies)
  // ...
```

### [`Performance Tracks`](https://react.dev/reference/dev-tools/react-performance-tracks)

With the power of [extensibility APIs](https://developer.chrome.com/docs/devtools/performance/extension), the React team
brings React-specific insights directly into the Chrome DevTools Performance panel. Two tracks are available: Scheduler
and Components.

#### Scheduler

The Scheduler track shows what React is working on for different priorities, such as "blocking" for user interactions, or "transition" for updates inside startTransition. Inside each track, you will see the type of work being performed, such as the event that scheduled an update, and when the render for that update happened.

#### Components

The Components track shows the tree of components that React is working on either to render or run effects. Inside you'll see labels such as "Mount" for when children mount or effects are mounted, or "Blocked" for when rendering is blocked due to yielding to work outside React.

Only the `Scheduler` track is available by default. For `Components`, you need either the React Developer Tools Extension or wrap your app with the [`<Profiler />`](https://react.dev/reference/react/Profiler) component.

## React and AI

On this AI topic, James Swinton's talk [Building an MCP Server for a React component](https://www.youtube.com/live/zyVRg2QR6LA?si=DTCD6UiXPETNfr02&t=24182) was particularly interesting. They walked through the process of creating an MCP server for dealing with the 360k pieces of documentation they have for their products.

LLMs seemed a good fit for this task, but they had to overcome some challenges, such as the model's tendency to the average and version awareness. They solved these issues by using embeddings and Postgresql to store and query the documentation effectively.

# Day 2

The second day of the conference was dedicated to exploring React Native and its new features. Here are some of the key
takeaways:

## What's New in React Native

### [DOM Node APIs](https://reactnative.dev/blog/2025/10/08/react-native-0.82#dom-node-apis)

This release brings several DOM Node APIs to React Native, accessed through refs, making it easier to build cross-platform applications. The effort on _Learn once, write once_ is clear.

"`tsx
function MyComponent(props) {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;

    // New methods
    element.parentNode;
    element.parentElement;
    element.childNodes;
    element.children;
    const bounds = element.getBoundingClientRect();
    const doc = element.ownerDocument;
    const maybeElement = doc.getElementById('some-view');

    // Legacy methods are still available
    element.measure((x, y, width, height, pageX, pageY) => {
      /* ... */
    });
  }, []);

  return <View ref={ref} />;
}
```

### [React Strict DOM](https://facebook.github.io/react-strict-dom/)

React Strict DOM (RSD) defines a subset of React DOM and Web APIs that can render components on both web and native platforms, with the look and feel of the host platform. This reduces the friction of learning and using React Native, reducing development costs and time to market.

RSD has a [built-in way to create and use styles, variables, and themes](https://facebook.github.io/react-strict-dom/api/css). This is good. I firmly believe the framework should make some decisions to avoid fragmentation.

### [Hermes v1](https://reactnative.dev/blog/2025/10/08/react-native-0.82#experimental-hermes-v1)

Hermes is a JavaScript engine optimized for React Native and the React Native 0.82 brings Hermes v1 as an option. Some internal experiments showed up to 9% less bundle loading time and up to 7% less time Time to Interactive (TTI).

This version of Hermes supports modern JavaScript features such as ES6 classes, public and private fields, and async
functions.

### What else?

- [Expo Go is available on Horizon Store](https://www.meta.com/experiences/expo-go/25322546364000780/?srsltid=AfmBOoqdGRMld7y2ec0yxd8wIJpiYzEcQImSsK840J-jkI60EkG-zd59). You can start building VR apps using React Native and Expo.
- [<VirtualView />](https://reactnative.dev/docs/virtualview) enables you to benefit from main thread rendering while mitigating the disadvantages of dropped frames by rendering earlier before it is needed.

# Conclusion

React Conf 2025 was an exciting event showcasing the latest React ecosystem advancements. With the introduction of the React Foundation, the stabilization of the React Compiler, and new features in both React and React Native, developers have plenty to look forward to.

I look forward to exploring these new features and seeing how they can enhance my projects. If you missed the conference, check out the recorded sessions and blog posts to stay up-to-date with the latest in React development.

That's all, see you next time!

---

# Day 1 (https://www.youtube.com/watch?v=zyVRg2QR6LA)

- Sibling pre-waming (21:35)
- React Docs now has shows the way to get started with React (when framework is not a good fit) (23:54)
    - "Build a React app from scratch"
- React 19.1 (24:40)
    - captureOwnerStack()
- React 19.2 (29:44)
    - `Activity API`
    - `useEffectEvent`
    - Partial pre-rendering
    - Performance tracks
- @canary (39:54)
    - `ViewTransition` API
        - triggers: `startTransition`, `useDeferredValue`, `Suspense`
    - Fragment Refs (48:40)
- Research (54:10)
    - SuspenseList
    - Concurrent Store
    - Gesture Animations
- React Compiler 1.0 is now available (55:49)
- React Foundation (1:14:00)
- The Suspense Continues: <ViewTransition /> and <Activity />
    - okay, so we can use `startTransition` directly from React (if `pending` state is needed use the hook
        `useTransition`)
- Profiling with React Performance Tracks (2:18:38)
- In case you missed the memo (2:38:52)
- AI panel (5:12:46)
- Exploring React Performance (5:37:55)
- Building an MCP Server for a React component (6:43:03)

# Day 2 (https://www.youtube.com/watch?v=p9OcztRyDl0)

- State of React Native (42:40)
    - 0.82 available on npm (44:10) | 0.83 is coming by December 25
    - Expo Go in VR (57:40)
- New Capabilities (1:02:17)
    - Reanimated v4 by Software Mansion
    - Lists and Virtualization (1:04:27)
    - Aligned with the web using React Strict DOM (1:05:15)
    - DOM APIs (1:06:15)
    - Performance (1:10:50) - all below coming to 0.83
        - Web Performance APIs
        - Performance Panels (1:14:00)
        - Network Panel (1:16:22)
    - The new architecture is indeed the only architecture (1:21:47)
        - reduced bundle size; less build time
        - backwards compatibility with old architecture, but from 0.82 is opt-out removal; from 0.83 the legacy
            architecture is removed
        - Hermes v1 (1:27:37)
            - Modern JS features (1:29:00)
                - ES6 classes
                - public and private fields
                - async functions
- React Strict DOM (2:30:24)
- <VirtualView /> https://reactnative.dev/docs/virtualview
