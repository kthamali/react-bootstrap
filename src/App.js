import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { Button, Form, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const calculateAverage = (grades) => {
const sum = grades.reduce((total, grade) => total + parseFloat(grade), 0);
return (sum / grades.length).toFixed(3);
};


const App = () => {
const [students, setStudents] = useState([]);
const [filteredStudents, setFilteredStudents] = useState([]);


useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.hatchways.io/assessment/students');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

function handleStudents(event) {
    const searchText = event.target.value.toLowerCase();
    const filteredStudents = students.filter((student) => {
      const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      return fullName.includes(searchText);
    });
    setFilteredStudents(filteredStudents);
  }

return (
<div>
    <h1>Student List</h1>

    <div>
    <Form>
      <FormControl type='text' placeholder='Search by name' onChange={handleStudents}></FormControl>
    </Form>
    </div>

    <br></br>

    <div>
    
      {(filteredStudents.length > 0 ? filteredStudents : students).map((student) => (

        <div col='12'>

          <p key={student.id}>

          <div 
          style={{
            marginLeft: '3%',
            textAlign: 'left',
            float:'left',
            width:'20%',
            height: '100px'
            
          }}

          >
          <img 
          style={{
            border: '1px solid gray',
            borderRadius: '50%',
            overflow: 'hidden',
            width: 100,
            height: 100
            
          
          }}
          src={student.pic} alt={`${student.firstName} ${student.lastName}`} id='stuImg' 
          /><br/>
          </div>

          <div
          

          
          >
            <b 
            style={{
              textTransform:'uppercase',
              textSize: '30'
            }}
            >{student.firstName} {student.lastName}</b><br/>
            Email: {student.email}<br/>
            Company: {student.company}<br/>
            Skill: {student.skill}<br/>
            Average: {calculateAverage(student.grades)}%<br/>
          </div>

          </p>

          <p> <hr/> </p>

        </div>

      ))}
    </div>

    
  </div>
);
};

export default App;
