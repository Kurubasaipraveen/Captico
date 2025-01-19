import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Addcourse.css';

const AddCourse = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      const newCourse = { name, description, instructor };
      await axios.post('http://localhost:5000/api/courses', newCourse, config);
      navigate('/courses');  
    } catch (error) {
      console.error('Error adding course', error);
    }
  };

  return (
    <div className="add-course-container">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Instructor" value={instructor} onChange={(e) => setInstructor(e.target.value)} required />
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
