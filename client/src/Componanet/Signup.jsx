import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "reader",
  });

  const { username, password, role } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://bookstrore-fkfv.onrender.com/signup", {
        username,
        password,
        role,
      });
      console.log("Registration successful", res.data);
      alert("Registration successful");

      // Navigate to the login route after successful registration
      navigate("/login");

    } catch (error) {
      console.error("Registration failed", error.response.data);
      // Handle registration error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username:
        </label>
        <input
          type="text"
          className="form-control"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="role" className="form-label">
          Role:
        </label>
        <select
          className="form-select"
          id="role"
          name="role"
          value={role}
          onChange={handleChange}
        >
          <option value="reader">Reader</option>
          <option value="author">Author</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Register
      </button>

      
    </form>
  );
};

export default Signup;
