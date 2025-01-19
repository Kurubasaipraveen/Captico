import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/editcourse.css';

const EditCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState({ name: '', description: '', instructor: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      try {
        const response = await axios.get(`https://captico.onrender.com/api/courses/${id}`, config);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course', error);
      }
    };
    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      await axios.put(`https://captico.onrender.com/api/courses/${id}`, course, config);
      navigate('/courses');
    } catch (error) {
      console.error('Error editing course', error);
    }
  };

  return (
    <div className="edit-course-container">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Course Name"
          value={course.name}
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={course.description}
          onChange={(e) => setCourse({ ...course, description: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Instructor"
          value={course.instructor}
          onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
          required
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditCourse;
