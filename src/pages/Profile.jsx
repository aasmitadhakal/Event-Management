import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
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
        .get('https://ayushkandel.pythonanywhere.com/user-profile/',config)
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

  if (!apiData) {
    return <div>Loading...</div>;
  }
 

  return (
    <div>
    <h2>API Data:</h2>
    <table>
      <thead>
        <tr>
          <th>Contact</th>
          <th>photo</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{apiData.artist.contact}</td>
          <td><img src={apiData.artist.photo} alt="Artist Photo"></img></td>
          <td>{apiData.artist.user.name}</td>
        </tr>
        <tr>
          <td>{apiData.normaluser.contact}</td>
          <td>
            <img src={apiData.normaluser.photo} alt="Normal User Photo" />
          </td>
          <td>{apiData.normaluser.gender}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default Profile