import { Popconfirm, Button, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { deleteArticle } from '../../store/arcticles';
import { isEdit, formatDate } from '../../utils/postUtils';
import logo from '../../assets/user_logo.png';

const Post = ({ article, color, onEdit, username }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const confirm = () => {
    dispatch(deleteArticle(article.slug)).then((action) => {
      if (deleteArticle.fulfilled.match(action)) {
        navigate('/');
      }
    });
  };
  return (
    <div className="post">
      <div className="post__header">
        <div className="left">
          <Link to={`/articles/${article.slug}`} className="title">
            {article.title}
          </Link>
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
          <div>
            {isAuth && onEdit && isEdit(username, article.author.username) && (
              <div className="auth-buttons">
                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={() => confirm()}
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
    </div>
  );
};

export default Post;
