import React, { useEffect, useRef, isValidElement, cloneElement } from 'react';
import { composeRef, supportRef } from 'rc-util/lib/ref';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import DomWrapper from './wapper';

const INTERNAL_PREFIX_KEY = 'rc-mutation-observer-key';

interface MutationObserverProps {
  children: React.ReactElement;
  options?: MutationObserverInit;
  onMutate?: (mutations: MutationRecord[], observer: MutationObserver) => void;
}

const defOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class'],
};

const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { children, options = defOptions, onMutate } = props;

  const instance = useRef<MutationObserver>();
  const elementRef = useRef<Element>(null);
  const wrapperRef = useRef<DomWrapper>(null);

  const canRef = isValidElement(children) && supportRef(children);
  const originRef: React.Ref<Element> = canRef ? (children as any).ref : null;

  const mergedRef = React.useMemo<React.Ref<Element>>(
    () => composeRef<Element>(originRef, elementRef),
    [originRef, elementRef],
  );

  useEffect(() => {
    const currentElement =
      findDOMNode(elementRef.current!) || findDOMNode(wrapperRef.current!);

    if (currentElement && 'MutationObserver' in window) {
      instance.current = new MutationObserver(onMutate);
      instance.current.observe(currentElement, options);
    }
    return () => {
      instance.current?.takeRecords();
      instance.current?.disconnect();
    };
  }, [children, options, onMutate]);

  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }
    return null;
  }

  return (
    <DomWrapper key={INTERNAL_PREFIX_KEY} ref={wrapperRef}>
      {canRef ? cloneElement(children as any, { ref: mergedRef }) : children}
    </DomWrapper>
  );
};

export default MutateObserver;
