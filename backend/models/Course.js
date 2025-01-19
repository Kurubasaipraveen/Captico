const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Course name is required'], 
      trim: true 
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'], 
      trim: true 
    },
    instructor: { 
      type: String, 
      required: [true, 'Instructor name is required'], 
      trim: true 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Export the Course model
module.exports = mongoose.model('Course', courseSchema);
