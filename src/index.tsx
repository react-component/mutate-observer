import React, { useEffect, useRef, isValidElement, cloneElement } from 'react';
import { supportRef } from 'rc-util/lib/ref';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import DomWrapper from './wapper';

interface MutationObserverProps {
  children: React.ReactNode;
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
}

const defOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { children, options = defOptions, onMutate = () => {} } = props;

  const wrapperRef = useRef<DomWrapper>(null);

  const canRef = isValidElement(children) && supportRef(children);

  useEffect(() => {
    if (!canUseDom()) {
      return;
    }
    let instance: MutationObserver;
    const currentElement = findDOMNode(wrapperRef.current!);
    if (currentElement && 'MutationObserver' in window) {
      instance = new MutationObserver(onMutate);
      instance.observe(currentElement, options);
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
  }, [options, onMutate]);

  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }
    return null;
  }

  return (
    <DomWrapper ref={wrapperRef}>
      {canRef
        ? cloneElement(children as any, { ref: (children as any).ref })
        : children}
    </DomWrapper>
  );
};

export default MutateObserver;
