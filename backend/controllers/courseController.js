const Course = require('../models/Course');

// Create a new course
const createCourse = async (req, res) => {
  try {
    const { name, description, instructor } = req.body;

    // Validate required fields
    if (!name || !description || !instructor) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new course
    const course = new Course({ name, description, instructor });
    await course.save();

    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    console.error('Error creating course:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all courses
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.status(200).json({
      message: 'Courses fetched successfully',
      courses,
    });
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a course by ID
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course fetched successfully',
      course,
    });
  } catch (error) {
    console.error('Error fetching course by ID:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a course by ID
const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findByIdAndUpdate(id, updates, {
      new: true, // Return the updated document
      runValidators: true, // Ensure updates adhere to schema validation
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course updated successfully',
      course,
    });
  } catch (error) {
    console.error('Error updating course:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
