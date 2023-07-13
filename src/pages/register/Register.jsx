import './register.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useRef } from 'react';

export function Register() {

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  let userProfileData = {};

  function handleSignUp() {
    userProfileData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value
    }
  }

  return (
    <div className="register">
      <div className="registerTop">
        <Navbar />
      </div>
      <div className="registerMain">
        <div className="registerContainer">
          <form className="registerForm">
            <input type="text" name="username" placeholder="Username" ref={usernameRef} />
            <input type="password" name="password" placeholder="Password" ref={passwordRef} />
            <input type="text" name="email" placeholder="Email" ref={emailRef} />
            <button type="submit" name="submit" className="registerButton" onClick={handleSignUp}>SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}