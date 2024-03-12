import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import notify from "../utlis/notifier";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function SponserCreate() {
  const navigate = useNavigate();
  const [sponser_type, setSponserType] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleSponser = (e) => {
    setSponserType(e.target.value);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleAPi = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sponser_type", sponser_type);
    formData.append("name", name);
    formData.append("amount", amount);
    formData.append("photo", photo);

    axios
      .post(`/sponser/create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log(result.data);
        notify("success", "Data created successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mt-18 flex justify-center items-center p-12">
      <form
        onSubmit={handleAPi}
        className="p-6 border bg-white shadow-md rounded "
      >
       
        <div className="mt-4 text-xl mb-8 font-bold text-purple-400 pl-12">
          Add Sponsor
        </div>
        <div className="mx-auto">
        {/* Dropdown for sponsor type */}
        <div className="relative mb-8 mx-12 ">
          <label className="absolute text-gray-600 cursor-text">Sponsor Type</label>
          <select
            className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64"
            value={sponser_type}
            onChange={handleSponser}
          >
            <option value="">Select Sponsor Type</option>
            <option value="Gold">Gold</option>
            <option value="Platinum">Platinum</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
            <option value="Title Sponsor">Title Sponsor</option>
          </select>
        </div>
        {/* for name */}
        <div className="relative mb-8 mx-12">
          <label className="absolute text-gray-600 cursor-text ">Name</label>
          <input
            className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64"
            autoComplete="off"
            type="text"
            name="name"
            value={name}
            onChange={handleName}
          />
        </div>
        {/* for amount */}
        <div className="relative mb-8 mx-12">
          <label className="absolute text-gray-600 cursor-text">Amount</label>
          <input
            className="flex justify-center pt-4 items-center border-b py-1 focus:outline-none focus:border-purple-600 focus:border-b-2 transition-colors peer w-64"
            autoComplete="off"
            type="text"
            name="amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
        {/* for photo */}
        <div className="relative mb-8 mx-12">
         
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        {/* for button */}
        <div>
          <button className="bg-gradient-to-r hover:text-white hover:to-blue-400 from-blue-300 to-purple-600 text-white mt-4 mb-4 px-8 mx-10 py-2 rounded-2xl">
            Submit
          </button>
        </div>
        <ToastContainer />
        </div>
      </form>
    </div>
  );
}

export default SponserCreate;