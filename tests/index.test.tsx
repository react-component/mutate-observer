import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import MutateObserver from '../src';

describe('MutateObserver', () => {
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
});
