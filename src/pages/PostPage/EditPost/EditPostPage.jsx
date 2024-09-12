import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { updateArticle } from '../../../store/api';
import FormTitle from '../../FormPage/FormTitle';
import CreatePostForm from '../PostForm';
import style from '../CreatePost/_createPage.module.scss';

const EditPostPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const [tags, setTags] = useState(['']);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [navigate, isAuth]);

  useEffect(() => {
    //получаем с сервера статьи передаем в hookform и теги передаем в стейт
    const fetchArticle = async (slug) => {
      try {
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
        const data = await response.json();
        if (response.ok) {
          reset(data.article);
          setTags([...data.article.tagList]);
        } else {
          throw new Error(data.message || 'Ошибка при загрузке статьи');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchArticle(slug);
  }, []);

  const handleSend = (data) => {
    dispatch(updateArticle({ ...data, tagList: tags, slug })).then((action) => {
      if (updateArticle.fulfilled.match(action)) {
        //если все гуд то возвращаемся к статье
        navigate(`/articles/${slug}`);
      }
    });
  };
  return (
    <>
      <div className={style.createPost}>
        <FormTitle title="Create new article" />
        <CreatePostForm
          register={register}
          reset={reset}
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
export default EditPostPage;
