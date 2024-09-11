import Markdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, Alert } from 'antd';

import Post from '../../../components/PostList/Post';

import './FullPostPage.scss';

const FullpostPage = () => {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { slug } = useParams();
  const username = JSON.parse(localStorage.getItem('user')).username;
  useEffect(() => {
    const fetchArticle = async (slug) => {
      //грузим статью по запросу slug из роутера
      try {
        setLoading(true);
        const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);
        const data = await response.json();
        if (response.ok) {
          setArticle(data.article);
        } else {
          throw new Error(data.message || 'Ошибка при загрузке статьи');
        }
      } catch (err) {
        setError('Не удалось загрузить статью. Попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticle(slug);
  }, []);
  return (
    <>
      <div className="fullPost">
        {loading ? (
          <Spin />
        ) : error ? (
          <Alert message="Ошибка" description={error} type="error" showIcon />
        ) : (
          <>
            <Post article={article} color={true} onEdit={true} username={username} />
            <div className="content">
              <Markdown>{article.body}</Markdown>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default FullpostPage;
