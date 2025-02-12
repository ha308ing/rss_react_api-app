import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Page404 } from '.';

test("page404 should render '404'", () => {
  render(<Page404 />);

  const heading = screen.getByText(/404/);

  expect(heading).toBeInTheDocument();
});
