import { getDOM } from '@rc-component/util/lib/Dom/findDOMNode';
import useEvent from '@rc-component/util/lib/hooks/useEvent';
import useLayoutEffect from '@rc-component/util/lib/hooks/useLayoutEffect';
import {
  getNodeRef,
  supportNodeRef,
  useComposeRef,
} from '@rc-component/util/lib/ref';
import React from 'react';
import type { MutationObserverProps } from './interface';
import useMutateObserver from './useMutateObserver';

const MutateObserver: React.FC<MutationObserverProps> = props => {
  const { children, options, onMutate = () => {} } = props;

  const callback = useEvent(onMutate);

  const elementRef = React.useRef<HTMLElement | SVGElement>(null);

  const canRef = supportNodeRef(children);

  const mergedRef = useComposeRef(elementRef, getNodeRef(children));

  const [target, setTarget] = React.useState<HTMLElement | SVGElement>(null);

  useMutateObserver(target, callback, options);

  // =========================== Effect ===========================
  useLayoutEffect(() => {
    // Set target based on the refs
    if (canRef && elementRef.current) {
      setTarget(getDOM(elementRef.current));
    }
  }, [canRef]);

  // =========================== Render ===========================
  if (!children) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('MutationObserver need children props');
    }
    return null;
  }

  return canRef
    ? React.cloneElement<any>(children, { ref: mergedRef })
    : children;
};

export default MutateObserver;
