import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import CourseList from './components/CourseList';
import AddCourse from './components/AddCourse';
import EditCourse from './components/EditCourse';

const App = () => {
  return (
    <Routes> 
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses" element={<CourseList />} />
      <Route path="/courses/add" element={<AddCourse />} />
      <Route path="/courses/edit/:id" element={<EditCourse />} />
    </Routes>
  );
};

export default App;
