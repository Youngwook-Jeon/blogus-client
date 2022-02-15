import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../../utils/TypeScript';
// import { logout } from '../../redux/actions/authAction';

// TODO: logout
const Menu = () => {
  const { auth } = useSelector((state: RootStore) => state);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const bfLoginLinks = [
    { label: '로그인', path: '/login' },
    { label: '회원가입', path: '/register' }
  ];

  const afLoginLinks = [
    { label: '홈', path: '/' },
    { label: '블로그만들기', path: '/create_blog' }
  ];

  const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

  const isActive = (pn: string) => {
    if (pn === pathname) return 'active';
  };

  // const handleLogout = () => {
  //   if (!auth.access_token) return;

  //   dispatch(logout(auth.access_token));
  // }
  
  return (
    <ul className="navbar-nav ms-auto">
      {
        navLinks.map((link, index) => (
          <li key={index} className={`nav-item ${isActive(link.path)}`}>
            <Link className="nav-link" to={link.path}>{link.label}</Link>
          </li>
        ))
      }

      {
        auth.user?.role === 'admin' && 
        <li className={`nav-item ${isActive("/category")}`}>
          <Link to="/category" className="nav-link">Category</Link>
        </li>
      }

      {
        auth.user && 
        <li className="nav-item dropdown">
          <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <img className="avatar" src={auth.user.avatar} alt="avatar" />
          </span>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link className="dropdown-item" to={`/profile/${auth.user._id}`}>프로필</Link></li>
            <li><hr className="dropdown-divider" /></li>
            {/* <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Logout</Link></li> */}
            <li><Link className="dropdown-item" to="/" onClick={() => {}}>로그아웃</Link></li>
          </ul>
        </li>
      }

    </ul>
  );
};

export default Menu;
