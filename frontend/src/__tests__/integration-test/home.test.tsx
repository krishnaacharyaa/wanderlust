import HomePage from '@/pages/home-page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Record<string, typeof import('react-router-dom')>),
  useNavigate: () => mockedUseNavigate,
}));

afterEach(() => mockedUseNavigate.mockRestore());

/**
 * To pass/clear test, backend must be running locally.
 */
describe('Integration Test: Home Route', () => {
  test('Home Route: Renders home page', async () => {
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
  test('Home Route: Verify navigation on create post button click', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    const createPost = screen.getByRole('button', {
      name: /Create post/i,
    });

    //ASSERT
    expect(mockedUseNavigate).toHaveBeenCalledTimes(0);

    //ACT
    await userEvent.click(createPost);

    //ASSERT
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });
  test('Home Route: Verify filtered posts render on category button click', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    //ACT

    //ASSERT
    expect(screen.queryByTestId('featuredPostCard')).not.toBeInTheDocument();
    const featuredPostCard = await screen.findAllByTestId('featuredPostCard');
    expect(featuredPostCard).toHaveLength(5);
    const natureCategoryPill = screen.getByRole('button', {
      name: 'Nature',
    });
    expect(natureCategoryPill).toBeInTheDocument();
    await userEvent.click(natureCategoryPill);
    expect(await screen.findByText('Posts related to "Nature"')).toBeInTheDocument();
    // Strange test got passed api response is 3 over local backend
    expect(await screen.findAllByTestId('featuredPostCard')).toHaveLength(5);
  });
  test('Home Route: Verify navigation on post card click under Featured Posts section', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    //ACT
    //ASSERT
    const featuredPostCard = await screen.findAllByTestId('featuredPostCard');
    expect(featuredPostCard).toHaveLength(5);
    await userEvent.click(featuredPostCard[0]);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });
  test('Home Route: Verify render of post card under All Post section', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    //ACT
    //ASSERT
    expect(await screen.findAllByTestId('postcard'));
  });
  test('Home Route: Verify navigation on post card click under All Posts section', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    //ACT
    //ASSERT
    const allPostCard = await screen.findAllByTestId('postcard');
    /**
     * INFO:
     * - Read following article if you have confusion why target-element is
     * inner-div or img-element inside the inner-div.
     * - REF: https://javascript.info/bubbling-and-capturing
     *
     * - The outer div didn't had any click handlers so it failed to
     *  capture event on it.
     */
    const img = allPostCard[0].getElementsByTagName('img')[0];
    await userEvent.click(img);
    expect(mockedUseNavigate).toHaveBeenCalledTimes(1);
  });
});
