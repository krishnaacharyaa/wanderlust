import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import AddBlog from '@/pages/add-blog';
import DetailsPage from '@/pages/details-page';
import ScrollToTop from '@/components/scroll-to-top';
import Footer from './layouts/footer-layout';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="details-page/:title/:postId" element={<DetailsPage />} />
        </Route>
      </Routes>
    <Footer/>
    </>
    </BrowserRouter>
  );
}

export default App;
