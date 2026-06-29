<div align="center">
  <h1>@rc-component/mutate-observer</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Ant Design 生态的一部分。</sub></p>
  <p>👁️ 轻量 React DOM 变更观察组件。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/mutate-observer"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/mutate-observer.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/mutate-observer"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/mutate-observer.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/mutate-observer/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/mutate-observer/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/mutate-observer"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/mutate-observer/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/mutate-observer"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/mutate-observer?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

## 特性

- 用于观察渲染的 DOM 节点变化的组件和钩子 API。
- 将 `MutationRecord[]` 和本机 `MutationObserver` 实例传递给 `onMutate`。
- 支持完整的本机 `MutationObserverInit` 选项对象。
- 组件 props 和 hook 用法的 TypeScript 定义。
- 被 Ant Design 用作小型 DOM 观察原语。

## 安装

```bash
npm install @rc-component/mutate-observer
```

## 使用

```tsx | pure
import MutateObserver from '@rc-component/mutate-observer';
export default () => (
  <MutateObserver
    options={{ attributes: true, childList: true, subtree: true }}
    onMutate={(mutations, observer) => {
      console.log(mutations);
      console.log(observer);
    }}
  >
    <div>Observed content</div>
  </MutateObserver>
);
```

```tsx | pure
import { useMutateObserver } from '@rc-component/mutate-observer';

export default ({ target }: { target: HTMLDivElement | null }) => {
  useMutateObserver(target, mutations => {
    console.log(mutations);
  });

  return <div>Observed content</div>;
};
```

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

### MutateObserver

| 参数 | 类型                                                                | 默认值 | 说明                                                               |
| -------- | ------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| children | `React.ReactNode` | - | 要渲染和观察的节点。 |
| options | `MutationObserverInit` | - | 本机观察者选项，例如 `attributes`、`childList` 和 `subtree`。 |
| onMutate | `(mutations: MutationRecord[], observer: MutationObserver) => void` | -       | 当报告观察到的突变时触发。                           |

### useMutateObserver

```ts
useMutateObserver(target, callback, options);
```

该 Hook 会用与组件相同的回调和原生 `MutationObserverInit` 配置监听目标元素或元素数组。

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

dumi 站点默认运行在 `http://localhost:8000`。

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/mutate-observer 基于 [MIT](./LICENSE) 许可证发布。
