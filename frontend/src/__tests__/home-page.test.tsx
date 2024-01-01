import HomePage from '@/pages/home-page';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Record<string, any>),
  useNavigate: () => mockedUseNavigate,
}));

describe('Integration Test: Home Route', () => {
  test.only('renders home page', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    //ACT

    //ASSERT
    expect(screen.getByText(/WanderLust/)).toBeInTheDocument();
    expect(
      screen.getByRole('button', {
        name: /Create post/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Featured Posts/)).toBeInTheDocument();
    expect(screen.getAllByTestId('featurepostcardskeleton')).toHaveLength(5);
    expect(screen.getAllByTestId('latestpostcardskeleton')).toHaveLength(5);
    expect(screen.getByText(/All Posts/)).toBeInTheDocument();
    expect(screen.getAllByTestId('postcardskeleton')).toHaveLength(8);
  });
  test('calls the mockedUseNavigate function', () => {});
  test('renders home page with BlogFeed', () => {});
  test('on featured post click navigates to /details-page/:title/:id page', () => {});
  test('failed to display home page with BlogFeed', () => {});
  test('renders home page with all post', () => {});
  test('on all-post post click navigates to /details-page/:title/:id page', () => {});
  test('failed to display home page with all post', () => {});
});
