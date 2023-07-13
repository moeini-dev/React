import './register.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useRef } from 'react';

export function Register() {

  const username = useRef();
  const password = useRef();
  const email = useRef();

  function handleSignUp() {
    console.log("Hey");
  }

  return (
    <div className="register">
      <div className="registerTop">
        <Navbar />
      </div>
      <div className="registerMain">
        <div className="registerContainer">
          <form className="registerForm">
            <input type="text" name="username" placeholder="Username" ref={username} />
            <input type="password" name="password" placeholder="Password" ref={password} />
            <input type="text" name="email" placeholder="Email" ref={email} />
            <button type="submit" name="submit" className="registerButton" onClick={handleSignUp}>SignUp</button>
          </form>
        </div>
      </div>
    </div>
  );
}