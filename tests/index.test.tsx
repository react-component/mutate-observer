import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import MutateObserver from '../src';

jest.mock('../src/useMutateObserver', () => {
  const origin = jest.requireActual('../src/useMutateObserver').default;
  return (...args) => {
    global.mutateTargetElement = args[0];
    return origin(...args);
  };
});

describe('MutateObserver', () => {
  beforeEach(() => {
    global.mutateTargetElement = null;
  });

  it('MutateObserver should support onMutate', () => {
    const fn = jest.fn();
    const Demo: React.FC = () => {
      const [flag, setFlag] = React.useState<boolean>(true);
      return (
        <MutateObserver onMutate={fn}>
          <button
            className={flag ? 'aaa' : 'bbb'}
            onClick={() => setFlag(!flag)}
          >
            click
          </button>
        </MutateObserver>
      );
    };
    const { container, unmount } = render(<Demo />);

    // Simulate a click event
    fireEvent.click(container.querySelector('button')!);

    // Check if the callback was triggered
    if ('MutationObserver' in window) {
      expect(fn).toHaveBeenCalled();
    } else {
      expect(fn).not.toHaveBeenCalled();
    }
    unmount();
  });

  it('MutateObserver should work without errors in React.StrictMode', () => {
    const fn = jest.fn();
    const buttonRef = React.createRef<HTMLButtonElement>();

    // Mock console.error to ensure no warnings are logged
    const warnSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const Demo = React.forwardRef<
      HTMLButtonElement,
      React.HTMLAttributes<HTMLButtonElement>
    >((props, ref) => {
      const [flag, setFlag] = React.useState<boolean>(true);
      return (
        <React.StrictMode>
          <MutateObserver onMutate={fn}>
            <button
              {...props}
              ref={ref}
              className={flag ? 'aaa' : 'bbb'}
              onClick={() => setFlag(!flag)}
            >
              click
            </button>
          </MutateObserver>
        </React.StrictMode>
      );
    });

    const { container } = render(<Demo ref={buttonRef} />);

    // Simulate a click event
    fireEvent.click(container.querySelector('button')!);

    // Ensure no warnings were logged
    expect(warnSpy).not.toHaveBeenCalled();

    // Restore original console.error
    warnSpy.mockRestore();
  });

  it('should support nativeElement', () => {
    const Demo = React.forwardRef<
      {
        nativeElement: HTMLElement;
      },
      object
    >((props, ref) => {
      const eleRef = React.useRef<HTMLDivElement>(null);
      React.useImperativeHandle(ref, () => ({
        nativeElement: eleRef.current,
      }));
      return <div ref={eleRef} className="bamboo" />;
    });

    const onMutate = jest.fn();

    const { container } = render(
      <MutateObserver onMutate={onMutate}>
        <Demo />
      </MutateObserver>,
    );

    expect(global.mutateTargetElement).toBe(container.querySelector('.bamboo'));
  });
});
