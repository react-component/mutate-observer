import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
    fireEvent.click(container.querySelector('button')!);
    if ('MutationObserver' in window) {
      expect(fn).toHaveBeenCalled();
    } else {
      expect(fn).not.toHaveBeenCalled();
    }
    unmount();
  });

  it('findDOMNode should not error in React.StrictMode', () => {
    const fn = jest.fn();
    const buttonRef = React.createRef<HTMLButtonElement>();
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
    fireEvent.click(container.querySelector('button')!);
    expect(warnSpy).not.toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});
