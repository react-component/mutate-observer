import React from 'react';
import { renderToString } from 'react-dom/server';
import MutateObserver from '../src';

describe('SSR', () => {
  const fn = jest.fn();
  it('No Render in SSR', () => {
    renderToString(
      <MutateObserver onMutate={fn}>
        <button>test</button>
      </MutateObserver>,
    );
  });
});
