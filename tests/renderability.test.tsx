import React from 'react';
import { render } from '@testing-library/react';
import MutateObserver from '../src';

it('preserves a zero child without reporting a missing child', () => {
  const error = jest.spyOn(console, 'error').mockImplementation(() => {});
  try {
    const { container } = render(<MutateObserver>{0}</MutateObserver>);
    expect(container.textContent).toBe('0');
    expect(error).not.toHaveBeenCalled();
  } finally {
    error.mockRestore();
  }
});
