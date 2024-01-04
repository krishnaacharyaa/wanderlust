import HomePage from '@/pages/home-page';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

const mockedUseNavigate = jest.fn();
const featuredPost = {
  authorName: 'Ella Davis',
  title: 'Serenity in Nature: Finding Peace Amidst Scenic Beauty',
  imageLink: 'https://i.ibb.co/d0g42nr/FPO-BOR-100-800x600.webp',
  categories: ['Nature', 'Scenic', 'Tranquil'],
  description:
    "Find solace and serenity in the heart of nature's most scenic landscapes. This journey takes you to tranquil forests, serene lakes, and picturesque countryside. Immerse yourself in the beauty of the natural world and experience true peace.",
  isFeaturedPost: true,
};

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as Record<string, any>),
  useNavigate: () => mockedUseNavigate,
}));

afterEach(() => mockedUseNavigate.mockRestore());

/**
 * INFO:
  - Using localbackend to run and pass test cases, not mocking for somemoretime.
  -To not use hardcoded numbers, we have to mock api or use testing endpoints
 */
describe('Integration Test: Home Route', () => {
  test('renders home page', async () => {
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
  test('calls the mockedUseNavigate function', async () => {
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
  test.skip('renders home page with BlogFeed', async () => {
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
      name: featuredPost.categories[0],
    });
    expect(natureCategoryPill).toBeInTheDocument();
    expect(featuredPostCard).not.toHaveLength(3);
    await userEvent.click(natureCategoryPill);
    expect(
      await screen.findByText(`Posts related to "${featuredPost.categories[0]}"`)
    ).toBeInTheDocument();
    expect(await screen.findAllByTestId('featuredPostCard')).toHaveLength(3);
  });
  test('on featured post click navigates to /details-page/:title/:id page', async () => {
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
  // TODO: below test can only be tested either by e2e broken api or mocking api
  test.skip('failed to display home page with BlogFeed', () => {});
  test('renders home page with all post', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    //ACT
    //ASSERT
    expect(await screen.findAllByTestId('postcard')).toHaveLength(10);
  });
  test('on all-post post click navigates to /details-page/:title/:id page', async () => {
    //ARRANGE
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    //ACT
    //ASSERT
    const allPostCard = await screen.findAllByTestId('postcard');
    expect(allPostCard).toHaveLength(10);
    /**
     * INFO:
     * - Read following artilce if you have confusion why target-element is
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
  // TODO: below test can only be tested either by e2e broken api or mocking api
  test.skip('failed to display home page with all post', () => {});
});
