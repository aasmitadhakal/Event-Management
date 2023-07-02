import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';

function ArtistUpadate() {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [ward, setWard] = useState('');
  const [photo, setPhoto] = useState(null);
  const [user, setUser] = useState('');
  const [id, setArtistID] = useState(0);
  const[description,setDescription]=useState('');
  const[performed_in,setPerformedIn]=useState('');
  const[type_of_the_performer,setTypeofPerformer]=useState('')
  const username = localStorage.getItem('emailinput');
  const userPassword = localStorage.getItem('passwordinput');
  const config = {
    headers: {
      'Authorization': `Basic ${btoa(`${username}:${userPassword}`)}`,
      'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
    },
  };

  const handleContact = (e) => {
    setContact(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleProvince = (e) => {
    setProvince(e.target.value);
  };

  const handleMunicipality = (e) => {
    setMunicipality(e.target.value);
  };

  const handleWard = (e) => {
    setWard(e.target.value);
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlePerformedIN = (e) => {
    setPerformedIn(e.target.value);
  };
  const handleTypeofPerformer = (e) => {
    setTypeofPerformer(e.target.value);
  };
  const handleUser = (e) => {
    setUser(e.target.value);
  };

  const handleAPI = (e) => {
    e.preventDefault();

    const formData = new FormData(); // Move the creation of formData here
    formData.append('contact', contact);
    formData.append('gender', gender);
    formData.append('province', province);
    formData.append('district', district);
    formData.append('municipality', municipality);
    formData.append('ward', ward);
    formData.append('user', user);
    formData.append('photo', photo);
    formData.append('description', description);
    formData.append('type_of_the_performer', type_of_the_performer);
    formData.append('performed_in', performed_in);

    axios
      .put(`/artist/update/${id}/`, formData, config)
      .then((result) => {
        console.log(result.data);
        notify('success', 'Data updated successfully');
        navigate('/listuser', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setArtistID(localStorage.getItem('artistid'));
    setContact(localStorage.getItem('artistcontact'));
    setGender(localStorage.getItem('artistgender'));
    setProvince(localStorage.getItem('artistprovince'));
    setDistrict(localStorage.getItem('artistdistrict'));
    setMunicipality(localStorage.getItem('artistmunicipality'));
    setWard(localStorage.getItem('artistward'));
    setPhoto(localStorage.getItem('artistphoto'));
    setUser(localStorage.getItem('artistuser'));
    setDescription(localStorage.getItem('artistdescription'));
    setPerformedIn(localStorage.getItem('artistperformed_in'));
    setTypeofPerformer(localStorage.getItem('artistPerformer'));
  }, []);

  return (
    <div className='mt-18 flex justify-center items-center p-12'>
      <form className='p-6 border bg-white shadow-md rounded'>
        <div className='mt-4 text-2xl mb-8 font-medium text-purple-400 flex justify-center items-center'>
          Update Artist Data
        </div>
        <div className='grid grid-cols-2'>
          <div>
          {/* Contact */}
            <div className='relative mb-8 mx-12'>
              <label htmlFor='email' className='absolute text-gray-600 cursor-text'>
                Contact
              </label>
              <input
                className='flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer'
                autoComplete='off'
                id='contact'
                type='text'
                name='contact'
                value={contact}
                onChange={handleContact}
              />
            </div>
            {/* Province */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='province' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Province
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='province'
                type='text'
                name='province'
                value={province}
                onChange={handleProvince}
              />
            </div>
             {/* performed in */}
             <div className='relative mb-4 mx-12'>
              <label htmlFor='district' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
             
              Performed_in
              </label>
          
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='performed_in'
                type='text'
                name='performed_in'
                value={performed_in}
                onChange={handlePerformedIN}
              />
            </div>
            {/* Gender */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='gender' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Gender
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='gender'
                type='text'
                name='gender'
                value={gender}
                onChange={handleGender}
              />
            </div>
            {/* Municipality */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='municipality' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Municipality
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='municipality'
                type='text'
                name='municipality'
                value={municipality}
                onChange={handleMunicipality}
              />
            </div>
              {/*type of performer */}
              <div className='relative mb-4 mx-12'>
              <label htmlFor='district' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
              Type_of_the_performer
              </label>
          
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='type_of_the_performer'
                type='text'
                name='type_of_the_performer'
                value={type_of_the_performer}
                onChange={handleTypeofPerformer}
              />
            </div>

          </div>
          {/* for half division */}
          <div>
            {/* Ward */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='ward' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Ward
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='ward'
                type='text'
                name='ward'
                value={ward}
                onChange={handleWard}
              />
            </div>
                {/* district */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='district' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                District
              </label>
          
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='district'
                type='text'
                name='district'
                value={district}
                onChange={handleDistrict}
              />
            </div>
            {/* for photo */}
            <div className='relative mx-10'>
              <label htmlFor='photo' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Photo
              </label>
              <input
                className='mb-8 pt-6 flex justify-center items-center py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                id='photo'
                type='file'
                name='photo'
                onChange={handlePhoto}
                accept='image/*'
              />
            </div>
            {/* for user */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='user' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                User
              </label>
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='user'
                type='text'
                name='user'
                value={user}
                readOnly
                onChange={handleUser}
              />
            </div>
            {/* for description */}
            <div className='relative mb-4 mx-12'>
              <label htmlFor='district' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
              Description
              </label>
          
              <input
                className='flex pt-6 justify-center items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors'
                autoComplete='off'
                id='description'
                type='text'
                name='description'
                value={description}
                onChange={handleDescription}
              />
            </div>
           
           
          </div>
        </div>
        <div>
          <button onClick={handleAPI} className='mx-64 bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4 px-20 py-2 rounded-2xl'>
            Update
          </button>
        </div>
        <ToastContainer />
      </form>
    </div>
  );
}

export default ArtistUpadate;