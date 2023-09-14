import './navbar.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Navbar() {

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  console.log('Navbar: ', user)

  const handleLogout = async () => {
    localStorage.removeItem('user');
    try {
      const result = await axios.get('/auth/logout')
      console.log('====== success logout: ', result)
    } catch (err) { console.log('====== Error logout: ', err) }
    navigate('/');
    window.location.reload();
  }


  return (
    <>
      <div className="top">
        <div className="logo">logo</div>
        <SearchForm />
      </div>

      <div className="bottom">
        {user?.user?.username ? <div className="userStuff">{user.user.username} Profile</div> : <div className="authNavigation"><Link to="/login" className="loginLink">Login</Link><Link to="/register" className="signInLink">Sign in</Link></div>}
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {user?.user?.username && user?.user?.isAdmin == false ? <Link to={`/user/${user?.user?.uuid}/books`} className="userBooks">Your Books</Link> : <div></div>}
          {user?.user?.username ? <button className="logout" onClick={handleLogout}>Logout</button> : <div></div>}
        </div>

      </div>
    </>
  );
}


