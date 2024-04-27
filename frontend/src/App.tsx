import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import AddBlog from '@/pages/add-blog';
import DetailsPage from '@/pages/details-page';
import ScrollToTop from '@/components/scroll-to-top';
import Footer from '@/layouts/footer-layout';
import SignIn from '@/pages/signin-page';
import SignUp from '@/pages/signup-page';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="add-blog" element={<AddBlog />} />
            <Route path="details-page/:title/:postId" element={<DetailsPage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
