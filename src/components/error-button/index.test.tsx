import { describe, expect, test } from 'vitest';
import { ErrorButton } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('error button', () => {
  test("should render with 'Throw Error' text", () => {
    render(<ErrorButton />);

    const button = screen.getByText(/throw error/i);

    expect(button).toBeInTheDocument();
  });

  test('should throw error on click', async () => {
    const user = userEvent.setup();

    render(<ErrorButton />);

    const button = screen.getByText(/throw error/i);

    expect(user.click(button)).rejects.toThrowError(/trigger error button/i);
  });
});
