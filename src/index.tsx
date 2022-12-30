import React, { useEffect, useRef } from 'react';
import { supportRef } from 'rc-util/lib/ref';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import DomWrapper from './wapper';
import type { MutationObserverProps } from './interface';

const defOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { children, options = defOptions, onMutate = () => {} } = props;

  const wrapperRef = useRef<DomWrapper>(null);

  const canRef = React.isValidElement(children) && supportRef(children);

  const originRef: React.RefObject<HTMLElement> = canRef
    ? (children as any)?.ref
    : null;

  useEffect(() => {
    if (!canUseDom()) {
      return;
    }

    let instance: MutationObserver;

    const currentElement = findDOMNode(
      originRef?.current || wrapperRef?.current,
    );

    if (currentElement && 'MutationObserver' in window) {
      instance = new MutationObserver(onMutate);
      instance.observe(currentElement, options);
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
  }, [options, originRef, onMutate]);

  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }
    return null;
  }

  return (
    <DomWrapper ref={wrapperRef}>
      {canRef
        ? React.cloneElement(children as any, { ref: (children as any).ref })
        : children}
    </DomWrapper>
  );
};

export default MutateObserver;
