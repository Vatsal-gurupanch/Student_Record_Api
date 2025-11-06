import React from 'react';
import axios from 'axios';

function StudentList({ students, onDelete, setEditStudent }) {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      onDelete();
    } catch (err) {
      console.error('Error deleting student:', err);
      alert('Error deleting student!');
    }
  };

  const handleEdit = (student) => {
    setEditStudent(student);
  };

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            <div className="student-info">
              <strong>{s.name}</strong> ({s.course})<br />
              Age: {s.age || 'N/A'}, City: {s.city || 'N/A'}
            </div>
            <div className="student-actions">
              <button className="edit" onClick={() => handleEdit(s)}>Edit</button>
              <button onClick={() => handleDelete(s._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudentList;
