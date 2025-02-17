import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../css/SignIn.css';

interface Credentials {
  username: string;
  password: string;
}

interface SignInProps {
  onSignIn?: (credentials: Credentials) => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
}

const SignInComponent: React.FC<SignInProps> = ({
  onSignIn,
  onSignUp,
  onForgotPassword
}) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Call the provided onSignIn prop if it exists
    onSignIn?.(credentials);
    // Navigate to homepage after sign in
    navigate('/home');
  };

  const handleSignUp = (): void => {
    onSignUp?.();
    // Add navigation to sign up page if needed
    navigate('/signup');
  };

  const handleForgotPassword = (): void => {
    onForgotPassword?.();
    // Add navigation to forgot password page if needed
    navigate('/forgot-password');
  };

  return (
    <div className="signin-container">
      <div className="logo-circle">
        <img
          src={logo}
          alt="CarryBee Logo"
          className="logo-image"
        />
        <div className="slogan">BUZZING AROUND TO DELIVER YOUR NEEDS</div>
      </div>

      <form className="signin-form" onSubmit={handleSubmit}>
        <h2>SIGN IN</h2>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="Username"
            value={credentials.username}
            onChange={handleChange}
            autoComplete="username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="Password"
            value={credentials.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
        </div>

        <div
          className="forgot-password"
          onClick={handleForgotPassword}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleForgotPassword()}
        >
          forget password
        </div>

        <button type="submit" className="signin-btn">
          SIGN IN
        </button>

        <button
          type="button"
          className="signup-btn"
          onClick={handleSignUp}
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default SignInComponent;
