import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { userUpdate } from '../../../store/api';
import ValidError from '../../../components/ValidError/ValidError';
import styles from '../_form.module.scss';
const EditProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    reset(user);
  }, [reset]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  const handleSave = (data) => {
    dispatch(userUpdate(data)).then((action) => {
      if (userUpdate.fulfilled.match(action)) {
        navigate('/');
      }
    });
  };

  return (
    <form className={styles.userForm} onSubmit={handleSubmit(handleSave)}>
      <label className={styles.userLabel}>
        Username
        <input className={styles.userInput} placeholder="Username" {...register('username', {})}></input>
      </label>
      <label className={styles.userLabel}>
        Email address
        <input
          className={styles.userInput}
          placeholder="Email address"
          {...register('email', {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Неправильный email адрес',
            },
          })}
        />
        {errors.email && <ValidError message={errors.email.message} />}
      </label>
      <label className={styles.userLabel}>
        New password
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
        Avatar image (url)
        <input
          className={styles.userInput}
          placeholder="Avatar image (url)"
          {...register('image', {
            pattern: {
              value: /^(https?:\/\/[^\s/$.?#].[^\s]*)$/,
              message: 'Введите корректный URL',
            },
          })}
        />
        {errors.image && <ValidError message={errors.image.message} />}
      </label>
      <Button htmlType="submit" type="primary" className={styles.userButton} style={{ marginBottom: '50px' }}>
        Save
      </Button>
    </form>
  );
};

export default EditProfileForm;
