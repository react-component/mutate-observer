<div align="center">
  <h1>@rc-component/mutate-observer</h1>
  <p><sub>Part of the Ant Design ecosystem.</sub></p>
  <img alt="Ant Design" height="32" src="https://gw.alipayobjects.com/zos/bmw-prod/ae669a89-0c24-40ff-a91d-2b83497170f6.svg" />
  <p>👁️ React wrapper and hook for observing DOM mutations with a typed MutationObserver API.</p>
</div>


<div align="center">

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]
[![build status][github-actions-image]][github-actions-url]
[![Codecov][codecov-image]][codecov-url]
[![bundle size][bundlephobia-image]][bundlephobia-url]
[![dumi][dumi-image]][dumi-url]

</div>

<div align="center">
  <sub>
    Part of the <a href="https://ant.design">Ant Design</a> ecosystem
    <img
      alt="Ant Design"
      height="14"
      src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
    />
  </sub>
</div>

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

Run the examples locally:

```bash
npm install
npm start
```

Then open the dumi dev server in your browser.

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

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/mutate-observer is released under the [MIT](./LICENSE) license.

[npm-image]: https://img.shields.io/npm/v/@rc-component/mutate-observer.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@rc-component/mutate-observer
[github-actions-image]: https://github.com/react-component/mutate-observer/actions/workflows/react-component-ci.yml/badge.svg
[github-actions-url]: https://github.com/react-component/mutate-observer/actions/workflows/react-component-ci.yml
[codecov-image]: https://img.shields.io/codecov/c/github/react-component/mutate-observer/master.svg?style=flat-square
[codecov-url]: https://app.codecov.io/gh/react-component/mutate-observer
[download-image]: https://img.shields.io/npm/dm/@rc-component/mutate-observer.svg?style=flat-square
[download-url]: https://npmjs.org/package/@rc-component/mutate-observer
[bundlephobia-url]: https://bundlephobia.com/package/@rc-component/mutate-observer
[bundlephobia-image]: https://badgen.net/bundlephobia/minzip/@rc-component/mutate-observer
[dumi-url]: https://github.com/umijs/dumi
[dumi-image]: https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square
