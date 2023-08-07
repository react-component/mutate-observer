import React, { useEffect, useRef } from 'react';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import canUseDom from 'rc-util/lib/Dom/canUseDom';
import useEvent from 'rc-util/lib/hooks/useEvent';
import DomWrapper from './wrapper';
import type { MutationObserverProps } from './interface';

const defOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { children, options = defOptions, onMutate = () => {} } = props;

  const callback = useEvent(onMutate);

  const wrapperRef = useRef<DomWrapper>(null);

  const elementRef = React.useRef<HTMLElement>(null);

  const canRef = React.isValidElement(children) && supportRef(children);

  const originRef: React.Ref<Element> = canRef ? (children as any)?.ref : null;

  const mergedRef = React.useMemo<React.Ref<Element>>(
    () => composeRef<Element>(originRef, elementRef),
    [originRef, elementRef],
  );

  useEffect(() => {
    if (!canUseDom()) {
      return;
    }

    let instance: MutationObserver;

    const currentElement =
      findDOMNode((originRef as any)?.current) ||
      findDOMNode(wrapperRef?.current);

    if (currentElement && 'MutationObserver' in window) {
      instance = new MutationObserver(callback);
      instance.observe(currentElement, options);
    }
    return () => {
      instance?.takeRecords();
      instance?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, originRef]);

  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }
    return null;
  }

  return (
    <DomWrapper ref={wrapperRef}>
      {canRef
        ? React.cloneElement(children as any, { ref: mergedRef })
        : children}
    </DomWrapper>
  );
};

export default MutateObserver;
