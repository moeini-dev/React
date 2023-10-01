import './login.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useRef, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from './../../authContext/AuthContext';
import { login } from './../../authContext/apiCall';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Login() {
  const passwordRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  let userLoginData = {};
  let [loginError, setLoginError] = useState();

  const { user, error, dispatch } = useContext(AuthContext);

  useEffect(() => {
    setLoginError(error);
    console.log('Error from useEffect: ', error)
  }, [error])

  useEffect(() => {
    if (user !== undefined && user !== null) {
      navigate('/')
    }
  }, [user])

  async function handleLogin(event) {
    userLoginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    event.preventDefault();

    const email = userLoginData.email;
    const password = userLoginData.password;

    login({ email, password }, dispatch);
  }

  return (
    <div className="login">
      <div className="loginTop">
        <Navbar />
      </div>
      <div className="loginMain">

        <div className="loginContainer">
          <form className="loginForm">
            <input type="text" name="email" placeholder="Email" ref={emailRef} />
            <input type="password" name="password" placeholder="Password" ref={passwordRef} />
            <button type="submit" name="submit" className="loginButton" onClick={handleLogin}>Login</button>
          </form>
        </div>

        {/* <div>{JSON.stringify(error)}</div> */}

        {loginError && <div style={{ margin: '10px', color: 'rgba(255,0,0,0.5)' }}>{loginError}</div>}
      </div>
    </div>
  );
}