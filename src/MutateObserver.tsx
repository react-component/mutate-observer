import useEvent from 'rc-util/lib/hooks/useEvent';
import useLayoutEffect from 'rc-util/lib/hooks/useLayoutEffect';
import { supportRef, useComposeRef } from 'rc-util/lib/ref';
import React from 'react';
import type { MutationObserverProps } from './interface';
import useMutateObserver from './useMutateObserver';
import DomWrapper from './wrapper';

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

  const [target, setTarget] = React.useState<HTMLElement>(null);

  useMutateObserver(target, callback, options);

  // =========================== Effect ===========================
  useLayoutEffect(() => {
    // Set target based on the refs
    if (canRef && elementRef.current) {
      setTarget(elementRef.current);
    } else if (wrapperRef.current) {
      setTarget(wrapperRef.current);
    }
  }, [canRef]);

  // =========================== Render ===========================
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
