import React, { useState } from 'react';
import axios from '../api/axios';
import notify from '../utlis/notifier';
const UsersForm = () => {
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [ward, setWard] = useState('');
  const [user, setUser] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleContactChange = (event) => {
    setContact(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleMunicipalityChange = (event) => {
    setMunicipality(event.target.value);
  };

  const handleWardChange = (event) => {
    setWard(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData;
    console.log(photo);
    formData.append('contact', contact);
    formData.append('gender', gender);
    formData.append('province', province);
    formData.append('district', district);
    formData.append('municipality', municipality);
    formData.append('ward', ward);
    formData.append('user', user);
    formData.append('photo', photo);
    console.log(formData);

    axios
      .post('normal-user/create/', formData)
      .then((response) => {
        // Handle successful response
        console.log(response.data);
      })
      .catch((error) => {
        // Handle error
        console.error(error);
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = Object.values(error.response.data.errors).flat(); 
           errorMessages.forEach(errorMessage => {
           notify("error",errorMessage)
          });
        } else {
          console.log("Error:", error);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Contact:
        <input type="number" value={contact} onChange={handleContactChange} />
      </label>
      <br />
      <label>
        Gender:
        <input type="text" value={gender} onChange={handleGenderChange} />
      </label>
      <br />
      <label>
        Province:
        <input type="text" value={province} onChange={handleProvinceChange} />
      </label>
      <br />
      <label>
        District:
        <input type="text" value={district} onChange={handleDistrictChange} />
      </label>
      <br />
      <label>
        Municipality:
        <input type="text" value={municipality} onChange={handleMunicipalityChange} />
      </label>
      <br />
      <label>
        Ward:
        <input type="number" value={ward} onChange={handleWardChange} />
      </label>
      <br />
      <label>
        User:
        <input type="number" value={user} onChange={handleUserChange} />
      </label>
      <br />
      <label>
        Photo:
        <input type="file" onChange={handlePhotoChange}  accept="image/*" />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UsersForm