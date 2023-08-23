import './login.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useRef, useState } from 'react';
import axios from 'axios';

export function Login() {
  const passwordRef = useRef();
  const emailRef = useRef();

  let userLoginData = {};
  let [loginError, setLoginError] = useState();

  async function handleLogin(event) {
    userLoginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    event.preventDefault();

    await axios.post('/auth/login',
      userLoginData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then(result => console.log(result.data.msg))
      .catch(err => {
        setLoginError(err.response.data.msg)
        setTimeout(function () { setLoginError('') }, 3000)
      })
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
        {loginError && <div style={{ margin: '10px', color: 'rgba(255,0,0,0.5)' }}>{loginError}</div>}
      </div>
    </div>
  );
}