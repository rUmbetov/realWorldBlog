import './App.css';
import { Routes, Route } from 'react-router-dom';

import StickyHeader from './components/Header/StickyHeader';
import HomePage from './pages/HomePage/HomePage';
import FullpostPage from './pages/PostPage/FullPost/FullpostPage';
import SignInPage from './pages/FormPage/SignIn/SignInPage';
import SignUpPage from './pages/FormPage/SignUp/SignUpPage';
import EditProfilePage from './pages/FormPage/EditProfile/EditProfilePage';
import EditPostPage from './pages/PostPage/EditPost/EditPostPage';
import CreatePostPage from './pages/PostPage/CreatePost/CreatePostPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StickyHeader />}>
          <Route index element={<HomePage />} />
          <Route path="/articles/:slug" element={<FullpostPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/articles/:slug/edit-post" element={<EditPostPage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/add-post" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
