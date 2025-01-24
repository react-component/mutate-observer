import canUseDom from '@rc-component/util/lib/Dom/canUseDom';
import React from 'react';

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

const useMutateObserver = (
  nodeOrList: HTMLElement | HTMLElement[] | SVGElement | SVGElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions,
) => {
  React.useEffect(() => {
    if (!canUseDom() || !nodeOrList) {
      return;
    }

    let instance: MutationObserver;

    const nodeList = Array.isArray(nodeOrList) ? nodeOrList : [nodeOrList];

    if ('MutationObserver' in window) {
      instance = new MutationObserver(callback);

      nodeList.forEach(element => {
        instance.observe(element, options);
      });
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
  }, [options, nodeOrList]);
};

export default useMutateObserver;
