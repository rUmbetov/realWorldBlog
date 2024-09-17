import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { createArticle } from '../../../store/api';
import FormTitle from '../../FormPage/FormTitle';
import CreatePostForm from '../PostForm';

import style from './_createPage.module.scss';

const CreatePostPage = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const navigate = useNavigate();
  const [tags, setTags] = useState(['']);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (!isAuth) {
      Navigate('/sign-in');
    }
  }, [isAuth]);

  const handleSend = (data) => {
    dispatch(createArticle({ ...data, tags })).then((action) => {
      if (createArticle.fulfilled.match(action)) {
        //если все гуд то возвращаемся к статье
        navigate('/');
      }
    });
  };
  return (
    <>
      <div className={style.createPost}>
        <FormTitle title="Create new article" />
        <CreatePostForm
          register={register}
          handleSubmit={handleSubmit}
          handleSend={handleSend}
          errors={errors}
          tags={tags}
          setTags={setTags}
        />
      </div>
    </>
  );
};
export default CreatePostPage;
