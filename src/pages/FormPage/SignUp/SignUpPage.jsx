import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import FormTitle from '../FormTitle';
import styles from '../_editPage.module.scss';

import SignUpForm from './SignUpForm';

const SignUpPage = () => {
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  return (
    <div className={styles.userAuth}>
      <FormTitle title="Sign Up" />
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
