import './login.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useRef } from 'react';

export function Login() {

  const passwordRef = useRef();
  const emailRef = useRef();

  let userLoginData = {};

  function handleLogin() {
    userLoginData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
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
      </div>
    </div>
  );
}