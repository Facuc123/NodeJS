/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

const {validatePost, validateGetName, validateGetAuthor, validateGetId, validatePut} = require('../validationSchemas/booksValidation.js');
const bookController = require('../controllers/bookController');
const express = require('express');
const validator = require('express-joi-validation').createValidator();

const routes = (Book) => {
  const bookRouter = express.Router();

  const {getBooks, postBooks, putBook, deleteBook, getBookByName, getBookByAuthor} = bookController(Book);

  bookRouter.route('/books')
    .get(validator.query(validateGetId),getBooks)
    .post(validator.body(validatePost), postBooks);

  bookRouter.route('/books/search')
    .get(validator.query(validateGetName),getBookByName)
    .get(validator.query(validateGetAuthor),getBookByAuthor)

  bookRouter
    .route('/books/:bookId')
    .put(validator.body(validatePut),putBook)
    .delete(deleteBook);

  return bookRouter;
};
module.exports = routes;

