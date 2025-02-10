---
title: mini-zustand
tags:
  - Frontnd
categories: Frontnd
abbrlink: mini-zustand
date: 2025-02-10
thumbnail: "https://jhao413.oss-cn-beijing.aliyuncs.com/20250210123923.png"
cover: "https://jhao413.oss-cn-beijing.aliyuncs.com/20250210123923.png"
---

### 什么是 Zustand

[Zustand](https://zustand-demo.pmnd.rs/) 是一个轻量级的状态管理库，在写[Leaf Nest](https://leaf-nest.vercel.app/)时需要使用到状态管理库所以了解了一下，相比于 Redux，Zustand 更加轻量和简单，一个简单的 demo 就能立刻明白如何使用了。（官网做的也真好看呐）

Zustand 在近年来所有新兴的状态管理库中算是最流行的之一，目前 Github star 数已经超过了 50k，在 React 状态管理库中应该是仅次于 Redux（61k）。

所以花了点时间简单学习了一下 zustand，写了[ mini-zustand](https://github.com/jhao0413/mini-zustand) 实现核心功能。

### mini-zustand

在 zustand 中核心功能代码主要在两个文件中：

1. [vanilla.ts](https://github.com/pmndrs/zustand/blob/main/src/vanilla.ts)
   - createStoreImpl 的具体实现，包含了核心的状态管理逻辑，如：getState、setState、subscribe 等。
2. [react.ts](https://github.com/pmndrs/zustand/blob/main/src/react.ts)
   - 主要是 React 相关的逻辑，包含了 useStore 的具体实现。
   - 使用了 React 的 useSyncExternalStore 来订阅 store 的变化。
     > 这里扩展一下，[useSyncExternalStore](https://zh-hans.react.dev/reference/react/useSyncExternalStore) 是 [React 18 新增的一个 Hook](https://react.dev/blog/2022/03/29/react-v18#usesyncexternalstore)，用于订阅外部数据源的变化。它的主要作用是让我们可以在组件中订阅外部数据源（如：Redux、Zustand 等）的变化，并在数据源发生变化时自动更新组件。

#### vanilla.ts

```ts
const createStoreImpl = (createState) => {
  // 获取 createState 返回值类型
  type TState = ReturnType<typeof createState>;
  // 使用set存储监听器
  type Listener = (state: TState, prevState: TState) => void;
  let state: TState;
  const listeners: Set<Listener> = new Set();

  const setState: StoreApi<TState>["setState"] = (partial, replace) => {
    // 如果partial是一个函数，则先执行partial函数，然后再赋值给nextState
    const nextState = typeof partial === "function" ? partial(state) : partial;

    // 判断nextState和state是否是同一个对象，如果不是则更新state
    if (!Object.is(nextState, state)) {
      const prevState = state;

      state =
        // 如果replace为true，则直接赋值给nextState
        // 如果replace为false，则将nextState和state合并
        replace ?? (typeof nextState !== "object" || nextState === null)
          ? (nextState as TState)
          : Object.assign({}, state, nextState);

      // 遍历listeners，执行每个listener
      listeners.forEach((listener) => listener(state, prevState));
    }
  };

  const getState: StoreApi<TState>["getState"] = () => state;

  const subscribe: StoreApi<TState>["subscribe"] = (listener) => {
    // 添加监听器
    listeners.add(listener);

    // 返回取消订阅功能
    return () => listeners.delete(listener);
  };

  const getInitialState: StoreApi<TState>["getInitialState"] = () => initialState;

  const api = { setState, getState, subscribe, getInitialState };
  // 初始化state
  const initialState = (state = createState(setState, getState, api));
  return api;
};
```

#### react.ts

```ts
import React from "react";
import { createStore } from "./vanilla.ts";
import type { StoreApi } from "./vanilla.ts";

type ReadonlyStoreApi<T> = Pick<StoreApi<T>, "getState" | "getInitialState" | "subscribe">;

const identity = <T>(arg: T): T => arg;
export function useStore(api);
export function useStore(api, selector);
export function useStore<TState, StateSlice>(
  api: ReadonlyStoreApi<TState>,
  selector: (state: TState) => StateSlice = identity as any
) {
  /**
   * useSyncExternalStore 订阅外部 store 的 React Hook
   * useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot?)
   * subscribe：一个函数，接收一个单独的 callback 参数并把它订阅到 store 上。
   * getSnapshot：一个函数，返回组件需要的 store 中的数据快照。
   * 可选 getServerSnapshot：一个函数，返回 store 中数据的初始快照。
   * React 会用这些函数来保持组件订阅到 store 并在它改变时重新渲染
   * https://zh-hans.react.dev/reference/react/useSyncExternalStore
   */
  const slice = React.useSyncExternalStore(
    api.subscribe,
    () => selector(api.getState()),
    () => selector(api.getInitialState())
  );
  // 为自定义 Hook 添加调试信息，方便 React DevTools 显示
  React.useDebugValue(slice);
  return slice;
}

const createImpl = (createState) => {
  const api = createStore(createState);

  // 绑定 store api 到 useBoundStore
  const useBoundStore: any = (selector?: any) => useStore(api, selector);

  Object.assign(useBoundStore, api);

  return useBoundStore;
};
```

> 参考链接

- [Zustand](https://github.com/pmndrs/zustand)
- [zustand 使用和源码分析](https://www.shymean.com/article/zustand%E4%BD%BF%E7%94%A8%E5%92%8C%E6%BA%90%E7%A0%81%E5%88%86%E6%9E%90)
