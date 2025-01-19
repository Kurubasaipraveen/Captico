const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to get all courses
router.route('/').get(getCourses);

// Protected routes for creating, updating, and deleting courses
router.route('/')
  .post(protect, createCourse); // Protect the create course route

router.route('/:id')
  .get(getCourseById) // Public route to get a course by ID
  .put(protect, updateCourse) // Protect the update route
  .delete(protect, deleteCourse); // Protect the delete route

module.exports = router;
