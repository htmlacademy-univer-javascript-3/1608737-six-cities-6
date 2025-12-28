import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import Spinner from '../spinner';

describe('Spinner', () => {
  it('should render spinner', () => {
    const { container } = render(<Spinner />);
    
    const spinner = container.querySelector('div');
    expect(spinner).toBeInTheDocument();
  });

  it('should have correct styles', () => {
    const { container } = render(<Spinner />);
    
    const spinner = container.firstChild as HTMLElement;
    expect(spinner).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
    });
  });
});

