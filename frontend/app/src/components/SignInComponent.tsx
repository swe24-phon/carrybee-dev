import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
// import logo from '../assets/logo.png';
import '../css/SignIn.css';
import API from "../api/loginApi";
import useParcelStore from '../store/parcelStore';

interface Credentials {
  email: string;
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

  const { setUserID } = useParcelStore();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const response = await API.post("/users/login", credentials);
      console.log("Full login response:", response.data); // Log full response
  
      const { token, user } = response.data;
      if (!user || !user.id) {
        throw new Error("User data is missing or invalid");
      }
  
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUserID(user.id);
      localStorage.setItem("userID", user.id);
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = (): void => {
    onSignUp?.();
    navigate('/signup');
  };

  const handleForgotPassword = (): void => {
    onForgotPassword?.();
    navigate('/forgot-password');
  };

  return (
    <div className="signin-container">
      <div className="logo-circle">
        {/* <img
          src={logo}
          alt="CarryBee Logo"
          className="logo-image"
        /> */}
        {/* <div className="slogan">BUZZING AROUND TO DELIVER YOUR NEEDS</div> */}
      </div>

      <form className="signin-form" onSubmit={handleSubmit}>
        {/* <h2>SIGN IN</h2> */}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"  // Changed from 'text' to 'email'
            name="email"
            value={credentials.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
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
