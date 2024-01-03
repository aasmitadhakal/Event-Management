import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

function UserProfile() {
  const [apiData, setApiData] = useState(null);
  
  const username = localStorage.getItem('emailinput') 
    const userPassword = localStorage.getItem('passwordinput');
    const config = {
      headers: {
        'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
        'Content-Type': 'application/json'
      }
    };
  useEffect(() => {
    const fetchData = () => {
      axios
        .get('user-profile/',config)
        .then((response) => {
          console.log(response.data); // Do something with the response data
          setApiData(response.data)
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchData();
  }, []);

  return (
    <div>
    <h2>API Data:</h2>
    <table>
      <thead>
        <tr>
          <th>Contact</th>
          <th>photo</th>
          <th>province</th>
          <th>district</th>
          <th>municipality</th>
          <th>ward</th>
          <th>email</th>
          <th>name</th>
          <th>username</th>
        </tr>
      </thead>
      <tbody>
       
        <tr>
          <td>{apiData.normaluser.contact}</td>
          <td>
            <img src={apiData.normaluser.photo} alt=''  />
          </td>
          <td>{apiData.normaluser.province}</td>
          <td>{apiData.normaluser.district}</td>
          <td>{apiData.normaluser.municipality}</td>
          <td>{apiData.normaluser.ward}</td>
          <td>{apiData.normaluser.user.email}</td>
          <td>{apiData.normaluser.user.name}</td>
          <td>{apiData.normaluser.user.username}</td>

        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default UserProfile