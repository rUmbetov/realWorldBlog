import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

import { userAuth } from '../../../store/authSlice';
import FormTitle from '../FormTitle';
import styles from '../_editPage.module.scss';

import SignInForm from './SignInForm';

const SignInPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const apiError = useSelector((state) => state.auth.error);
  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  const handleLogin = (userData) => {
    dispatch(userAuth(userData));
  };

  return (
    <div className={styles.userAuth}>
      <FormTitle title="Sign In" />
      <SignInForm onSubmit={handleLogin} apiError={apiError} />
      <div className={styles.userHaveAccount}>
        Already have an account? <Link to="/">Sign In.</Link>
      </div>
    </div>
  );
};

export default SignInPage;
