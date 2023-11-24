const express = require("express");
const router = express.Router();
const Books = require("../Schema/Addbook.jsx");
const crypto = require('crypto');

router.use(express.json());



router.use(express.json());

router.post("/Addbooks",  async (req, res) => {
 
  try {
    const { cover, title, description, genre, publishDate, price, tags } = req.body;
    const existingBook = await Books.findOne({ title });

    if (existingBook) {
      return res.status(400).json({ error: "Book already exists" });
    }

    const newBook = new Books({
      cover,
      title,
      description,
      genre,
      publishDate,
      price,
      tags,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/getBooks', async (req, res) => {
  const { page = 1, pageSize = 10, sortQuery } = req.query;
  // console.log(req.query);

  try {
    let sortby = {};
    if (sortQuery === 'price') {
      sortby = { price: 1 };
    } else if (sortQuery === 'publishDate') {
      sortby = { publishDate: -1 };
    }
    if(sortQuery === "genre"){
      sortby= Books.find({ genre })
    }
   
    const getbooks = await Books.find({})
      .sort(sortby)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();
  //  console.log(getbooks);
    res.status(200).json(getbooks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.get('/getBooks/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Books.findById(id);
    res.json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put('/update/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const updatedBook = await Books.findByIdAndUpdate(
      id,
      {
        cover: req.body.cover,
        title: req.body.title,
        description: req.body.description,
        genre: req.body.genre,
        publishDate: req.body.publishDate,
        price: req.body.price,
        tags: req.body.tags,
      },
      { new: true } 
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/deletebooks/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book successfully deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/search', async (req, res) => {
  const searchTerm = req.query.title;

  try {
    const results = await Books.find({ title: { $regex: new RegExp(searchTerm, 'i') } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




router.post('/books/:id/rate', async (req, res) => {
  const bookId = req.params.id;
  const { rating, feedback } = req.body;

  try {
    const book = await Books.findById(bookId);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    book.ratings.push({ rating, feedback });
    await book.save();

    return res.status(200).json({ message: 'Rating added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
