<div align="center">
  <h1>@rc-component/mutate-observer</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Part of the Ant Design ecosystem.</sub></p>
  <p>👁️ React wrapper and hook for observing DOM mutations with a typed MutationObserver API.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/mutate-observer"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/mutate-observer.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/mutate-observer"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/mutate-observer.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/mutate-observer/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/mutate-observer/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/mutate-observer"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/mutate-observer/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/mutate-observer"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/mutate-observer?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>

## Highlights

- Component and hook APIs for observing changes to a rendered DOM node.
- Passes `MutationRecord[]` and the native `MutationObserver` instance to `onMutate`.
- Supports the full native `MutationObserverInit` options object.
- TypeScript definitions for component props and hook usage.
- Used by Ant Design as a small DOM observation primitive.

## Install

```bash
npm install @rc-component/mutate-observer
```

## Usage

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

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

### MutateObserver

| Property | Type                                                                | Default | Description                                                               |
| -------- | ------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------- |
| children | `React.ReactNode`                                                   | -       | Node to render and observe.                                               |
| options  | `MutationObserverInit`                                              | -       | Native observer options such as `attributes`, `childList`, and `subtree`. |
| onMutate | `(mutations: MutationRecord[], observer: MutationObserver) => void` | -       | Triggered when observed mutations are reported.                           |

### useMutateObserver

```ts
useMutateObserver(target, callback, options);
```

The hook observes the provided target element or element array with the same callback and native `MutationObserverInit` options used by the component.

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/mutate-observer is released under the [MIT](./LICENSE) license.
