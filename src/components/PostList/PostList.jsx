import { Spin } from 'antd';

import './PostList.scss';
import Post from './Post';

const PostList = ({ articles, status, color, onEdit }) => {
  if (status === 'loading') {
    return <Spin className="spin" size="large" />;
  }

  return (
    <div className="post-list">
      {articles.length > 0 ? (
        articles.map((article) => <Post key={article.slug} article={article} color={color} onEdit={onEdit} />)
      ) : (
        <p>No articles found</p>
      )}
    </div>
  );
};

export default PostList;
