import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from '.';

describe('pagination component', () => {
  describe('shoud use passed props', () => {
    test('page prop', () => {
      render(
        <Pagination page={3} nextHandler={() => {}} prevHandler={() => {}} />
      );

      const pageText = screen.getByText(3);

      expect(pageText).toBeInTheDocument();
    });

    test('prevHandler', async () => {
      const prevHandler = vi.fn();
      const user = userEvent.setup();

      render(
        <Pagination page={3} nextHandler={() => {}} prevHandler={prevHandler} />
      );

      const prevButton = screen.getByText(/prev/);

      await user.click(prevButton);

      expect(prevHandler).toBeCalled();
    });

    test('nextHandler', async () => {
      const nextHandler = vi.fn();
      const user = userEvent.setup();

      render(
        <Pagination page={3} nextHandler={nextHandler} prevHandler={() => {}} />
      );

      const nextButton = screen.getByText(/next/);

      await user.click(nextButton);

      expect(nextHandler).toBeCalled();
    });
  });
});
