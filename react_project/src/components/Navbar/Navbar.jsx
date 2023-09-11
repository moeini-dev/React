import './navbar.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { Link } from 'react-router-dom';

export function Navbar() {

  const { user } = useContext(AuthContext);
  console.log('Navbar: ', user)
  return (
    <>
      <div className="top">
        <div className="logo">logo</div>
        <SearchForm />
      </div>

      <div className="bottom">
        {user?.user?.username ? <div className="userStuff">{user.user.username} Profile</div> : <div className="authNavigation"><Link to="/login" className="loginLink">Login</Link><Link to="/register" className="signInLink">Sign in</Link></div>}
        <div className="category">category</div>
      </div>
    </>
  );
}


