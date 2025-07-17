import React from 'react';
import './Student.css';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';


const Student = ({ _id, name, email, enrollnumber, removeStudent }) => (
  <tr>
    <td>{ name }</td>
    <td>{ email }</td>
    <td>{ enrollnumber }</td>
    <td>
      <button onClick={() => removeStudent(_id)}>Delete</button>
      <Link to={{ pathname: '/edit', search: _id }}>
        <button className="Action-Button fa fa-pencil"></button>
      </Link>
    </td>
  </tr>
);

export default Student;
