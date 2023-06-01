import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const PasswordReset2 = () => {
    const[uid,token]=useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    const data = {
      errors: {
        password: ["This field is required."],
        password2: ["This field is required."],
      },
    };

    try {
      await axios.post(
        `https://ayushkandel.pythonanywhere.com/reset-password/${uid}/${token}`,
        data
      );

      // Reset form fields and error state
      setPassword("");
      setPassword2("");
      setError(null);

      // Show success message to the user
      alert("Password reset request submitted successfully.");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password2">Confirm Password:</label>
        <input
          type="password"
          id="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>
      {error && (
        <div>
          <p>Error:</p>
          <ul>
            {Object.keys(error.errors).map((field) =>
              error.errors[field].map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))
            )}
          </ul>
        </div>
      )}
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default PasswordReset2;