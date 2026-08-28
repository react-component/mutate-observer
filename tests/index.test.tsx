import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import MutateObserver, { useMutateObserver } from '../src';

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

  it('MutateObserver should support onMutate', async () => {
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
      await waitFor(() => {
        expect(fn).toHaveBeenCalled();
      });
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

  it('should use the latest mutation callback', async () => {
    const target = document.createElement('div');
    const firstCallback = jest.fn();
    const latestCallback = jest.fn();
    const NativeMutationObserver = window.MutationObserver;
    const observerInstances: MutationObserver[] = [];
    const observerConstructor = jest
      .spyOn(window, 'MutationObserver')
      .mockImplementation(callback => {
        const instance = new NativeMutationObserver(callback);
        observerInstances.push(instance);
        return instance;
      });

    const Demo: React.FC<{ callback: MutationCallback }> = ({ callback }) => {
      useMutateObserver(target, callback);
      return null;
    };

    const { rerender, unmount } = render(<Demo callback={firstCallback} />);
    expect(observerConstructor).toHaveBeenCalledTimes(1);
    const disconnect = jest.spyOn(observerInstances[0], 'disconnect');

    rerender(<Demo callback={latestCallback} />);
    expect(observerConstructor).toHaveBeenCalledTimes(1);
    expect(disconnect).not.toHaveBeenCalled();
    target.className = 'updated';

    await waitFor(() => {
      expect(latestCallback).toHaveBeenCalledTimes(1);
    });
    expect(firstCallback).not.toHaveBeenCalled();

    unmount();
    expect(disconnect).toHaveBeenCalledTimes(1);
    observerConstructor.mockRestore();
  });
});
