import { Button, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

import { clearError, clearUsernameError, clearEmailError } from '../../../store/authSlice';
import { fetchNewUser } from '../../../store/api';
import ValidError from '../../../components/ValidError/ValidError';
import styles from '../_form.module.scss';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const apiError = useSelector((state) => state.auth.error);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({ mode: 'onChange' });
  const password = watch('password');
  const username = watch('username');
  const email = watch('email');

  useEffect(() => {
    dispatch(clearError());
  }, []);

  useEffect(() => {
    if (apiError?.username && username) {
      dispatch(clearUsernameError());
    }
  }, [username, dispatch]);

  useEffect(() => {
    if (apiError?.email && email) {
      dispatch(clearEmailError());
    }
  }, [email, dispatch]);

  const handleCreate = (data) => {
    dispatch(fetchNewUser(data));
  };

  return (
    <form className={styles.userForm} onSubmit={handleSubmit(handleCreate)}>
      <label className={styles.userLabel}>
        Username
        <input
          className={styles.userInput}
          placeholder="Username"
          {...register('username', {
            required: 'Это поле обязательно',
            pattern: {
              value: /^[a-z][a-z0-9]*$/,
              message: 'Вы можете использовать только строчные английские буквы и цифры.',
            },
            minLength: {
              value: 3,
              message: 'username должен быть от 3 до 20 символов (включительно)',
            },
          })}
        ></input>
        {errors.username && <ValidError message={errors.username.message} />}
        {apiError && apiError.username && <ValidError message="Уже занято" />}
      </label>
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
        {apiError && apiError.email && <ValidError message="Уже занято" />}
      </label>
      <label className={styles.userLabel}>
        Password
        <input
          className={styles.userInput}
          type="password"
          placeholder="Password"
          {...register('password', {
            required: 'Это поле обязательно',
            minLength: {
              value: 6,
              message: 'Минимальная длина пароля 6 символов',
            },
            maxLength: {
              value: 40,
              message: 'Максимальная длина пароля 40 символов',
            },
          })}
        />
        {errors.password && <ValidError message={errors.password.message} />}
      </label>
      <label className={styles.userLabel}>
        Repeat Password
        <input
          className={styles.userInput}
          type="password"
          placeholder="Repeat Password"
          {...register('repeatPassword', {
            validate: (value) => value === password || 'Пароли не совпадают',
          })}
        />
        {errors.repeatPassword && <ValidError message={errors.repeatPassword.message} />}
      </label>
      <Controller
        name="agreement"
        control={control}
        rules={{ required: 'Вы должны согласиться с условиями' }}
        render={({ field }) => (
          <Checkbox {...field} checked={field.value} className={styles.checkbox}>
            I agree to the processing of my personal information
          </Checkbox>
        )}
      />
      {errors.agreement && <ValidError message={errors.agreement.message} />}
      <Button htmlType="submit" type="primary" className={styles.userButton} style={{ marginBottom: '50px' }}>
        Create
      </Button>
    </form>
  );
};

export default SignUpForm;
