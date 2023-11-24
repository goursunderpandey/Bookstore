import { useState } from "react";
import { NavLink } from "react-router-dom";
import React from 'react';
import axios from "axios";

const AddBooks = () => {
  const [book, setBook] = useState({
    cover: '',
    title: '',
    description: '',
    genre: '',
    publishDate: '',
    price: 0,
    tags: [],
  });

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://bookstrore-fkfv.onrender.com/Addbooks', book);
      console.log('Book added:', response.data);
      alert("Books added sucessfully ") ; 
    } catch (error) {
      console.error('Error adding book:', error.message);
      alert(error)
    }
  };

  return (
    <div className="container mt-5">
      <h1>Add Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cover Name :</label>
          <input type="text" className="form-control" name="cover" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" className="form-control" name="title" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea className="form-control" name="description" onChange={handleChange}></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Genre:</label>
          <input type="text" className="form-control" name="genre" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Publish Date:</label>
          <input type="date" className="form-control" name="publishDate" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Price:</label>
          <input type="number" className="form-control" name="price" onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Tags (comma-separated):</label>
          <input type="text" className="form-control" name="tags" onChange={(e) => setBook({ ...book, tags: e.target.value.split(',') })} />
        </div>

        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}

export default AddBooks;
