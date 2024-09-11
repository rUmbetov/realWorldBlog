import { Pagination, Spin } from 'antd';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGloballyArticles, setOffset, setLimit } from '../../store/arcticles';
import PostList from '../../components/PostList/PostList';

export function HomePage() {
  const dispatch = useDispatch();
  const { articles, articleCount, offset, limit, status, error } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(fetchGloballyArticles({ offset, limit }));
  }, [dispatch, offset, limit]);

  const handlePageChange = (newPage) => {
    dispatch(setOffset((newPage - 1) * limit));
  };

  const handlePageSizeChange = (current, newLimit) => {
    dispatch(setLimit(newLimit));
    dispatch(setOffset(0));
  };

  return (
    <>
      <div className="wrapper">
        {status === 'loading' && <Spin className="spin" size="large" />}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && (
          <>
            <PostList articles={articles} />
            <Pagination
              style={{ marginTop: '30px auto' }}
              current={Math.floor(offset / limit) + 1}
              pageSize={limit}
              total={articleCount}
              onChange={handlePageChange}
              onShowSizeChange={(current, size) => handlePageSizeChange(current, size)}
              showSizeChanger
            />
          </>
        )}
      </div>
    </>
  );
}

export default HomePage;
