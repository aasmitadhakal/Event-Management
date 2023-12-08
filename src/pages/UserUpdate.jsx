import { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import notify from '../utlis/notifier';
import { ToastContainer } from 'react-toastify';

function UserUpadate() {
  const navigate = useNavigate();
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [municipality, setMunicipality] = useState('');
  const [ward, setWard] = useState('');

  const[photo,setPhoto]=useState([])
  const [user, setUser] = useState('');
  const [id, setNormalUserID] = useState(0);
  // const username = localStorage.getItem('emailinput');
  // const userPassword = localStorage.getItem('passwordinput');
  
  const token = localStorage.getItem('accessToken'); // Retrieve the Bearer token from local storage

  const config = {
    headers: {
        'Authorization': `Bearer ${token}`, // Use the Bearer token here
        'Content-Type': 'application/json'
    }
}

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
  const handleUser = (e) => {
    setUser(e.target.value);
  };
  const handlePhoto =(e)=>{
    setPhoto(e.target.files[0])
}

  const handleAPI = (e) => {
    e.preventDefault();
   
    const formData = new FormData();
    formData.append('contact', contact);
    formData.append('gender', gender);
    formData.append('province', province);
    formData.append('district', district);
    formData.append('municipality', municipality);
    formData.append('ward', ward);
    formData.append('user', user);
    formData.append('photo', photo);

    axios
      .put(`/normal-user/update/${id}/`, formData, config)
      .then((result) => {
        console.log(result.data);
        console.log(e.target.file)
        notify('success', 'Data updated successfully');
        navigate('/listuser', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setNormalUserID(localStorage.getItem('normaluserid'));
    setContact(localStorage.getItem('normalusercontact'));
    setGender(localStorage.getItem('normalusergender'));
    setProvince(localStorage.getItem('normaluserprovince'));
    setDistrict(localStorage.getItem('normaluserdistrict'));
    setMunicipality(localStorage.getItem('normalusermunicipality'));
    setWard(localStorage.getItem('normaluserward'));
    // setSelectedPhoto(localStorage.getItem('normaluserphoto'))
    setUser(localStorage.getItem('normaluseruser'));
  }, []);

  return (
    <div className='mt-18 flex justify-center items-center p-12'>
      <form className='p-6 border bg-white shadow-md rounded '  >
        <div className='mt-4 text-2xl mb-8 font-medium text-purple-400 flex justify-center items-center'>
          Update Normal User
        </div>
        <div className='grid grid-cols-2'>
          <div>
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
          </div>
          <div>
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
            <div className='relative mx-10'>
              {/* <label htmlFor='photo' className='flex justify-center items-center absolute left-0 top-1 text-gray-600 cursor-text'>
                Photo
              </label> */}
              <input
                  className="mt-1 sm:text-sm border-gray-300 rounded-md mb-4 pt-6 flex justify-center items-center py-1 transition-colors"
                  id="photo"
                  type="file"
                  name="photo"
                  onChange={handlePhoto}
                  accept="image/*"
                />
            </div>
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

export default UserUpadate;