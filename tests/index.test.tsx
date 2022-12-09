import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import MutateObserver from '../src';

describe('MutateObserver', () => {
  it('support onMutate', () => {
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
});
