import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [editStudent, setEditStudent] = useState(null); // For editing

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Record App</h1>
      <StudentForm
        onStudentAdded={fetchStudents}
        editStudent={editStudent}
        setEditStudent={setEditStudent}
      />
      <StudentList
        students={students}
        onDelete={fetchStudents}
        setEditStudent={setEditStudent}
      />
    </div>
  );
}

export default App;
