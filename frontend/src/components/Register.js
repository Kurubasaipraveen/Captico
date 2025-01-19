import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration Successful!');
      localStorage.setItem('token', res.data.token); 
      navigate('/');
    } catch (error) {
      alert('Error: ' + error.response.data);
    }
  };
  
  
  
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
        <p>Already U have Account <a href='/'>Login</a></p>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
