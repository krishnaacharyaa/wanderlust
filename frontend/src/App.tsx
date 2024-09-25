import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import AddBlog from '@/pages/add-blog';
import DetailsPage from '@/pages/details-page';
import ScrollToTop from '@/components/scroll-to-top';
import Footer from '@/layouts/footer-layout';
import SignIn from '@/pages/signin-page';
import SignUp from '@/pages/signup-page';
import AdminUsers from '@/pages/admin-users';
import AdminBlogs from '@/pages/admin-blogs';
import NotFound from '@/pages/not-found';
import UnprotectedRoute from './components/unprotected-route';
import { useLayoutEffect } from 'react';
import RequireAuth from './components/require-auth-blog';
import RequireAuthBlog from './components/require-auth-blog';
import useThemeClass from './utils/theme-changer';
import AdminContainer from './components/admin-container';
import { Role } from './types/role-type.tsx';
import EditBlog from './pages/edit-blog.tsx';

function App() {
  useLayoutEffect(() => {
    useThemeClass();
  }, []);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Routes>
          <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="details-page/:title/:postId" element={<DetailsPage />} />
            <Route element={<UnprotectedRoute />}>
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
            </Route>
            <Route element={<RequireAuthBlog allowedRole={[Role.Admin, Role.User]} />}>
              <Route path="add-blog" element={<AddBlog />} />
              <Route path="edit-blog/:postId" element={<EditBlog />} />
            </Route>
            <Route path="admin" element={<RequireAuth allowedRole={[Role.Admin]} />}>
              <Route element={<AdminContainer />}>
                <Route path="users" element={<AdminUsers />} />
                <Route path="blogs" element={<AdminBlogs />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
