const Student = require('../models/student');
const mongoose = require('mongoose');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.send({ students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a specific student
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send({ message: 'Student not found!' });
    res.send({ student });
  } catch (err) {
    res.status(404).send({ message: 'Student not found!' });
  }
};

// Create a student
exports.createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create({
      name: req.body.name,
      email: req.body.email,
      enrollnumber: req.body.enrollnumber
    });
    res.send({ newStudent });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.send({ message: 'The student was updated' });
  } catch (err) {
    res.status(400).send({ error: err });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Delete request for ID:', id);

    // Validate ObjectId
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ error: 'Invalid student ID' });
    }

    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).send({ message: 'Student not found!' });
    }
    res.send({ message: 'The student was removed' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send({ error: err.message });
  }
};