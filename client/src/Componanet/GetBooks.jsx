import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const GetBooks = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sortQuery, setSortQuery] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  const getBooks = async () => {
    try {
      const response = await axios.get(`https://bookstrore-fkfv.onrender.com/getBooks?sortQuery=${sortQuery}&genre=${genreFilter}`, {
        params: { page: currentPage, pageSize },
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    getBooks();
  }, [sortQuery, currentPage, genreFilter]);

  const getSearchResults = async () => {
    try {
      const response = await axios.get(`https://bookstrore-fkfv.onrender.com/search?title=${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSearch = async () => {
    if (searchTerm.trim() !== '') {
      await getSearchResults();
    } else {
      await getBooks();
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`https://bookstrore-fkfv.onrender.com/deletebooks/${id}`);
      await getBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleRate = async (bookId) => {
    try {
      const userRating = prompt('Enter rating (1-5):');
      if (userRating && userRating >= 1 && userRating <= 5) {
        const userFeedback = prompt('Enter feedback:');

        await axios.post(`https://bookstrore-fkfv.onrender.com/books/${bookId}/rate`, {
          rating: parseInt(userRating, 10),
          feedback: userFeedback,
        });

        await getBooks();
      } else {
        alert('Please enter a valid rating between 1 and 5.');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-7 ">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <label>Select Genre:</label>
          <select className="form-control" onChange={(e) => setGenreFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Story">Story</option>
            <option value="dance">dance</option>
            <option value="motivation">motivation</option>
          </select>

          <select className="form-control" onChange={(e) => setSortQuery(e.target.value)}>
            <option value="">Sort:</option>
            <option value="price">Price</option>
            <option value="publishDate">Publish Date</option>
          </select>
        </div>
      </div>

      <h2>{searchTerm ? 'Search Results' : 'My Books'}</h2>
      <div className="row">
        {(searchTerm ? searchResults : books).map((book) => (
          <div key={book.id} className="col-md-4 mb-4">
            <div className="card m-2">
              <div className="card-body d-flex justify-content-between">
                <img
                  alt={`Cover for ${book.title}`}
                  style={{ height: '150px', width: '150px' }}
                  src={book.cover}
                />
                <div>
                  {!searchTerm && (
                    <NavLink className="btn btn-outline-success m-2" to={`/edit/${book._id}`}>
                      Update
                    </NavLink>
                  )}

                  <button
                    className="btn btn-danger"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-outline btn-lg m-1"
                    onClick={() => handleRate(book._id)}
                  >
                    Give Rating/feedback
                  </button>
                </div>
              </div>
              <p className="card-text m-3">
                <strong>Title: </strong> {book.title} <br />
                <strong>Genre:</strong> {book.genre} <br />
                <strong>Description:</strong> {book.description} <br />
                <strong>Publish Date:</strong> {book.publishDate} <br />
                <strong>Price:</strong> ${book.price} <br />
                <strong>Tags:</strong> {book.tags.join(', ')}
                {book.ratings.map((rating, index) => (
                  <div key={index}>
                    <strong>Rating:</strong> {rating.rating} <br />
                    <strong>Feedback:</strong> {rating.feedback} <br />
                  </div>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination sticky-footer d-flex justify-content-center">
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &larr; Previous Page
        </button>
        <span className="mx-3">Page {currentPage}</span>
        <button
          className="btn btn-primary"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next Page &rarr;
        </button>
      </div>
    </div>
  );
};

export default GetBooks;
