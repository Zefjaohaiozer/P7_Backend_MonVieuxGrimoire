const { all } = require('../app');
const Router = require('express');
const Book = require('../models/Book');

exports.addNewBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book);
  console.log(req.body);
  const book = new Book({
    ...bookObject,

    imageUrl: `${req.protocol}://${req.get('host')}/files/${req.file.filename}`,
  });

  book
    .save()
    .then(() => res.status(201).json({ message: 'Objet enregistré' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};
exports.findBook = (req, res, next) => {
  const url = req.url;

  const urlId = url.split('/')[1];

  Book.findOne({ _id: urlId })
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.updateBook = (req, res, next) => {
  const url = req.url;
  const urlId = url.split('/')[1];
  const bookFilter = { _id: urlId };
  let updatedData;
  const checkData = () => {
    if (typeof req.body.book !== 'string') {
      console.log(typeof req.body.book);
      updatedData = req.body;
      return updatedData;
    } else {
      console.log(typeof req.body.book);
      updatedData = JSON.parse(req.body.book);
      updatedData.imageUrl = `${req.protocol}://${req.get('host')}/files/${
        req.file.filename
      }`;
      return updatedData;
    }
  };

  checkData();

  const updatedBook = Book.findOneAndUpdate(bookFilter, updatedData, {
    new: true,
  })
    .then((books) => res.status(201).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
  const url = req.url;
  const urlId = url.split('/')[1];
  const bookFilter = { _id: urlId };
  const deletedBook = Book.findOneAndDelete(bookFilter, {
    new: true,
  })
    .then((books) => res.status(201).json(books))
    .catch((error) => res.status(400).json({ error }));
};

exports.bookBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: 'desc' })
    .then((books) => res.status(200).json(books.splice(0, 3)))
    .catch((error) => res.status(400).json({ error }));
};

exports.rateBook = (req, res, next) => {
  const url = req.url;
  const urlId = url.split('/')[1];
  const bookFilter = { _id: urlId };
  const updatedUserId = req.body.userId;
  const updatedGrade = req.body.rating;
  console.log(req.body);
  const updatedData = {
    userId: updatedUserId,
    grade: updatedGrade,
  };

  Book.findOneAndUpdate(
    bookFilter,
    { $push: { ratings: updatedData } },
    { new: true }
  )
    .then((updatedBook) => {
      const totalRatings = updatedBook.ratings.length;
      const ratingsSum = updatedBook.ratings.reduce(
        (acc, rating) => acc + rating.grade,
        0
      );
      updatedBook.averageRating = ratingsSum / totalRatings;

      return updatedBook.save();
    })
    .then((book) => {
      res.status(200).json(book);
    })
    .catch((error) => res.status(400).json({ error }));
};
