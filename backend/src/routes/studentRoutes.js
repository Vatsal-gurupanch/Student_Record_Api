const express = require('express');
const Student = require('../models/student');
const router = express.Router();

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add a new student
router.post('/', async (req, res) => {
  const { name, course, age, city } = req.body;

  if (!name || !course) {
    return res.status(400).json({ message: 'Name and course are required' });
  }

  const newStudent = new Student({ name, course, age, city });

  try {
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update a student by ID
router.put('/:id', async (req, res) => {
  const { name, course, age, city } = req.body;

  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    if (name) student.name = name;
    if (course) student.course = course;
    if (age !== undefined) student.age = age;
    if (city) student.city = city;

    await student.save();
    res.json({ message: 'Student updated successfully', student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a student by ID
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
