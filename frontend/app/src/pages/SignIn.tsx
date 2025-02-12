import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add your login logic here
      console.log('Login attempt with:', { email, password });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-gray-100 p-4">
        <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
      </nav>

      <main className="flex-grow flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md">
          <div id="flash-messages"></div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Login to Your Account</h2>
              <p className="text-gray-600">Please enter your credentials to login</p>
            </div>

            <div className="mb-4">
              <label 
                htmlFor="login-email" 
                className="block text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label 
                htmlFor="login-password" 
                className="block text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Log In
            </button>

            <div className="mt-4 text-center">
              Don't have an account?
              <Link to="/register" className="ml-2 text-blue-600 hover:text-blue-800">
                Register
              </Link>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto flex justify-between items-center">
          <p>&copy; 2024 HBNB Inc. All rights reserved.</p>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:opacity-75">
                <img src="/static/images/facebook.png" alt="Facebook" className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-75">
                <img src="/static/images/twitter.png" alt="Twitter" className="h-6 w-6" />
              </a>
            </li>
            <li>
              <a href="#" className="hover:opacity-75">
                <img src="/static/images/instagram.png" alt="Instagram" className="h-6 w-6" />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};
