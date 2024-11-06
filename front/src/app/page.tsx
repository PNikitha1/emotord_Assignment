"use client";
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin, faDiscord } from '@fortawesome/free-brands-svg-icons';
import './Login.css';

const clientId = "148731754095-4acnf9s3tnkakpu08sb3sdarogru6g7b.apps.googleusercontent.com";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      setSuccess('Login successful!');
      setError('');
      router.push('/dashboard');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    }
  };

  const onGoogleLoginSuccess = async (response) => {
    try {
      const result = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: response.credential,
      });
      setSuccess('Google login successful!');
      setError('');
      router.push('/dashboard');
    } catch (error) {
      setError('Google login failed. Please try again.');
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="login-container">
        <div className="left-panel">
          <div className="logo"></div>
          <h1>BASE</h1>
          <div className="social-icons">
            <a href="https://github.com/login"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://x.com/i/flow/login?input_flow_data=%7B%22requested_variant%22%3A%22eyJteCI6IjIifQ%3D%3D%22%7D"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="https://www.linkedin.com/login"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://discord.com/"><FontAwesomeIcon icon={faDiscord} /></a>
          </div>
        </div>
        <div className="right-panel">
          <h2>Sign In</h2>
          <p>Sign in to your account</p>
          <div id="signInButton">
            <GoogleLogin
              onSuccess={onGoogleLoginSuccess}
              onError={() => setError('Google login failed')}
            />
          </div>
          <form onSubmit={handleLogin}>
            <label>Email address</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <a href="#" className="forgot-password">Forgot password?</a>
            <button type="submit" className="sign-in-button">Sign In</button>
            {error && <p className="error-text">{error}</p>}
            {success && <p className="success-text">{success}</p>}
          </form>
          <p className="register-text">Don't have an account? <a href="/signup">Register here</a></p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
