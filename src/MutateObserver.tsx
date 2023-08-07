import React from 'react';
import { supportRef, useComposeRef } from 'rc-util/lib/ref';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import useEvent from 'rc-util/lib/hooks/useEvent';
import DomWrapper from './wrapper';
import type { MutationObserverProps } from './interface';
import useMutateObserver from './useMutateObserver';

const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { children, options, onMutate = () => {} } = props;

  const callback = useEvent(onMutate);

  const wrapperRef = React.useRef<DomWrapper>(null);

  const elementRef = React.useRef<HTMLElement>(null);

  const canRef = React.isValidElement(children) && supportRef(children);

  const mergedRef = useComposeRef(
    elementRef,
    canRef ? (children as any).ref : null,
  );

  useMutateObserver(
    () => findDOMNode(elementRef.current) || findDOMNode(wrapperRef.current),
    callback,
    options,
  );

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
