import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import FormTitle from '../FormTitle';
import styles from '../_editPage.module.scss';

import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const apiError = useSelector((state) => state.auth.error);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  return (
    <div className={styles.userAuth}>
      <FormTitle title="Sign Up" />
      <SignUpForm apiError={apiError} />
    </div>
  );
};

export default SignUpPage;
