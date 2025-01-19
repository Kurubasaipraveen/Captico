import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import '../styles/Courses.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      try {
        const response = await axios.get('https://captico.onrender.com/api/courses', config);
        console.log('Response Data:', response.data);
        if (Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          setError('Invalid data format: expected an array of courses.');
        }
        
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);
  const navigate=useNavigate()
  const Logout=()=>{
    navigate('/')
  }
  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    const config = { headers: { 'Authorization': `Bearer ${token}` } };
    try {
      await axios.delete(`https://captico.onrender.com/api/courses/${id}`, config);
      setCourses(courses.filter(course => course._id !== id));
    } catch (error) {
      setError('Failed to delete course');
    }
  };

  if (loading) return <p>Loading courses...</p>;

  return (
    <div className="courses-container">
      <h2>Courses</h2>
      <Link to="/courses/add"><button>Add Course</button></Link>
      <button onClick={Logout} className='LogoutBtn'>Logout</button>
      {error && <div>{error}</div>}
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map(course => (
          <div key={course._id} className="course-item">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p><strong>Instructor:</strong> {course.instructor}</p>
            <div className="actions">
              <Link to={`/courses/edit/${course._id}`}><button>Edit</button></Link>
              <button onClick={() => handleDelete(course._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CourseList;
