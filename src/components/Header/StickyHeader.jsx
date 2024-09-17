import { Link, Outlet } from 'react-router-dom';
import { AppBar, Toolbar } from '@mui/material';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../store/authSlice';

import './StickyHeader.scss';

const StickyHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const handleLogOut = () => {
    dispatch(logout());
  };
  return (
    <>
      <AppBar position="static" sx={{ bgcolor: '#FFF' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logoLink">
            RealWorld Blog
          </Link>
          <div className="blockBtn">
            {isAuth ? (
              <>
                <Link to="/add-post" className="signUpb">
                  Create article
                </Link>
                <Link to="/edit-profile" style={{ color: 'black', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div className="name">{user.username}</div>
                  <div className="pic">
                    <img
                      className="picture"
                      src={user.image ? user.image : 'https://static.productionready.io/images/smiley-cyrus.jpg'}
                      alt="User Avatar"
                    />
                  </div>
                </Link>
                <Button onClick={handleLogOut}>Log Out</Button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="signIn">
                  Sign In
                </Link>
                <Link to="/sign-up" className="signUpb">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default StickyHeader;
