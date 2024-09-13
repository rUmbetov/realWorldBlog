import { Button } from 'antd';
import { useForm } from 'react-hook-form';

import ValidError from '../../../components/ValidError/ValidError';
import styles from '../_form.module.scss';

const SignInForm = ({ onSubmit, apiError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  
  return (
    <form className={styles.userForm} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.userLabel}>
        Email address
        <input
          className={styles.userInput}
          placeholder="Email address"
          {...register('email', {
            required: 'Это поле обязательно',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Неправильный email адрес',
            },
          })}
        />
        {errors.email && <ValidError message={errors.email.message} />}
      </label>
      <label className={styles.userLabel}>
        Password
        <input
          className={styles.userInput}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Это поле обязательно',
          })}
        />
        {errors.password && <ValidError message={errors.password.message} />}
      </label>
      {apiError && <ValidError message="Адрес электронной почты или пароль неверный"/>}
      <Button htmlType="submit" type="primary" className={styles.userButton}>
        Login
      </Button>
    </form>
  );
};

export default SignInForm;
