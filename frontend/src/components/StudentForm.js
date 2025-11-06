import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudentForm({ onStudentAdded, editStudent, setEditStudent }) {
  const [form, setForm] = useState({ name: '', course: '', age: '', city: '' });

  useEffect(() => {
    if (editStudent) {
      setForm({
        name: editStudent.name || '',
        course: editStudent.course || '',
        age: editStudent.age || '',
        city: editStudent.city || ''
      });
    }
  }, [editStudent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.course.trim()) {
      alert('Name and Course are required!');
      return;
    }

    const studentData = {
      name: form.name.trim(),
      course: form.course.trim(),
      age: form.age ? Number(form.age) : undefined,
      city: form.city.trim() || undefined,
    };

    try {
      if (editStudent) {
        // Update existing student
        await axios.put(
          `http://localhost:5000/api/students/${editStudent._id}`,
          studentData
        );
        setEditStudent(null);
      } else {
        // Add new student
        await axios.post('http://localhost:5000/api/students', studentData);
      }

      setForm({ name: '', course: '', age: '', city: '' });
      onStudentAdded();
    } catch (err) {
      console.error('Error saving student:', err);
      alert('Error saving student!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        name="course"
        value={form.course}
        onChange={handleChange}
        placeholder="Course"
        required
      />
      <input
        name="age"
        type="number"
        value={form.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        name="city"
        value={form.city}
        onChange={handleChange}
        placeholder="City"
      />
      <button type="submit">{editStudent ? 'Update Student' : 'Add Student'}</button>
    </form>
  );
}

export default StudentForm;
