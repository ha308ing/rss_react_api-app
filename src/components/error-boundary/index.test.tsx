import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '.';
import userEvent from '@testing-library/user-event';

describe('ErrorBoundary', () => {
  test("should render 'app crashed' message if error inside", () => {
    const TroubleChild = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <TroubleChild />
      </ErrorBoundary>
    );

    const content = screen.getByText(/app crashed/i);

    expect(content).toBeInTheDocument();
  });

  test('should render child if its ok', () => {
    const Child = () => <h1>Hello</h1>;

    render(
      <ErrorBoundary>
        <Child />
      </ErrorBoundary>
    );

    const content = screen.getByText(/hello/i);

    expect(content).toBeInTheDocument();
  });

  describe('reload button', () => {
    test('should be rendered', () => {
      const TroubleChild = () => {
        throw new Error();
      };

      render(
        <ErrorBoundary>
          <TroubleChild />
        </ErrorBoundary>
      );

      const button = screen.getByText(/reload/i);

      expect(button).toBeInTheDocument();
    });

    test('should reload page', async () => {
      const user = userEvent.setup();
      const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({
        ...window.location,
        reload: vi.fn(),
      });

      const TroubleChild = () => {
        throw new Error();
      };

      render(
        <ErrorBoundary>
          <TroubleChild />
        </ErrorBoundary>
      );

      const button = screen.getByText(/reload/i);

      await user.click(button);

      expect(locationSpy).toBeCalled();
    });
  });
});
