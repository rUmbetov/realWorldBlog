import { Popconfirm, Button, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { useState } from 'react';

import { deleteArticle } from '../../store/api';
import { isEdit, formatDate } from '../../utils/postUtils';
import logo from '../../assets/user_logo.png';

const Post = ({ article, color, onEdit, fullpost }) => {
  const [favorited, setFavorited] = useState(article.favorited);
  const [favoritedCount, setFavoritedCount] = useState(article.favoritesCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  let username = null;
  if (isAuth) {
    username = JSON.parse(localStorage.getItem('user')).username;
  }

  const handleNetworkRequest = (url, method) => {
    const token = localStorage.getItem('token');
    return fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not okay');
      }
      return response.json();
    });
  };

  const confirm = () => {
    dispatch(deleteArticle(article.slug)).then((action) => {
      if (deleteArticle.fulfilled.match(action)) {
        navigate('/');
      }
    });
  };

  const fetchNoFavorited = () => {
    handleNetworkRequest(`https://blog.kata.academy/api/articles/${article.slug}/favorite`, 'DELETE')
      .then(() => {
        setFavorited(false);
        setFavoritedCount((prevCount) => prevCount - 1);
      })
      .catch((error) => {
        console.error('There was a problem with the unfavorite operation:', error);
      });
  };

  const fetchOnFavorited = () => {
    handleNetworkRequest(`https://blog.kata.academy/api/articles/${article.slug}/favorite`, 'POST')
      .then(() => {
        setFavorited(true);
        setFavoritedCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error('There was a problem with the favorite operation:', error);
      });
  };

  const handleFavorite = () => {
    if (favorited) {
      fetchNoFavorited();
    } else {
      fetchOnFavorited();
    }
  };
  return (
    <div className="post">
      <div className="post__header">
        <div className="left">
          <div className="tit">
            {fullpost ? (
              <div className="title">{article.title}</div>
            ) : (
              <Link to={`/articles/${article.slug}`} className="title">
                {article.title}
              </Link>
            )}
            <div>
              {favorited ? (
                <Button type="link" icon={<HeartFilled style={{ color: '#FF0707' }} />} onClick={handleFavorite} />
              ) : (
                <Button type="link" icon={<HeartOutlined />} onClick={handleFavorite} />
              )}
              {favoritedCount}
            </div>
          </div>
          <div className="post__tags">
            {article.tagList && article.tagList.map((tag, index) => <Tag key={index}>{tag}</Tag>)}
          </div>
          <div className="post__content" style={color ? { color: '#00000080' } : null}>
            {article.description}
          </div>
        </div>
        <div className="user">
          <div style={{ display: 'flex' }}>
            <div className="user__data">
              <div className="name">{article.author.username}</div>
              <div className="date">{formatDate(article.createdAt)}</div>
            </div>
            <div className="pic">
              <img className="picture" src={article.author.image ? article.author.image : logo} alt="User Avatar" />
            </div>
          </div>
          {isAuth && onEdit && isEdit(username, article.author.username) && (
            <div className="auth-buttons">
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Link to={`/articles/${article.slug}/edit-post/`}>
                <Button type="primary">Edit</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
