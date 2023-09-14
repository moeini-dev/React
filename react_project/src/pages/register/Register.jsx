import './register.css';
import { Navbar } from '../../components/Navbar/Navbar';
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Register() {

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const usernameRef = useRef();
  const passwordRef = useRef();
  const emailRef = useRef();

  let userProfileData = {};

  const handleSignUp = async (event) => {
    userProfileData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      email: emailRef.current.value
    }
    event.preventDefault();   //To prevent react from rerendering the page (refresh)
    console.log('User profile: ', userProfileData);

    try {
      const result = await axios.post('/user', userProfileData);
      setMessage(result.data.msg);
      setTimeout(() => { navigate('/login') }, 3000)
      console.log('==== success: ', result.data.msg)
    } catch (err) {
      setMessage(err.response.data.msg);
      console.log('==== failure: ', err.response.data.msg)
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
            <input type="text" name="username" placeholder="Username" ref={usernameRef} autoComplete="off" />
            <input type="text" name="email" placeholder="Email" ref={emailRef} autoComplete="off" />
            <input type="password" name="password" placeholder="Password" ref={passwordRef} autoComplete="off" />
            <button type="submit" name="submit" className="registerButton" onClick={handleSignUp}>SignUp</button>
          </form>
        </div>
        {message !== '' ?
          (message == 'User registerd successfully' ?
            <><div className="registerMessage" style={{ margin: '10px', color: 'rgba(29, 214, 60, 0.75)' }}>{message}</div> <div style={{ color: 'rgb(99,99,99)' }}>Redirecting to Login page ...</div></> :
            <div className="registerMessage" style={{ margin: '10px', color: 'rgba(255,0,0,0.5)' }}>{message}</div>) : <div ></div>}
      </div>
    </div>
  );
}