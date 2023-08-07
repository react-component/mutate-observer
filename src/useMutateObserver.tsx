import canUseDom from 'rc-util/lib/Dom/canUseDom';
import * as React from 'react';

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

export default function useMutateObserver(
  getNode: () => HTMLElement,
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions,
) {
  React.useEffect(() => {
    if (!canUseDom()) {
      return;
    }

    let instance: MutationObserver;

    const currentElement = getNode();

    if (currentElement && 'MutationObserver' in window) {
      instance = new MutationObserver(callback);
      instance.observe(currentElement, options);
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
}
