const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
// public_users.get('/',function (req, res) {
//   //Write your code here,Use the JSON.stringify method for displaying the output neatly.
//   res.send(JSON.stringify(books,null,4));
// });
public_users.get('/', async function (req, res) {
  try {
    const getBooks = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(books);
        }, 10); // Simulate a delay
      });
    };

    const booksList = await getBooks();
    res.send(JSON.stringify(booksList, null, 4));
  } catch (error) {
    res.status(500).send('Error fetching books');
  }
});

// Get book details based on ISBN
// public_users.get('/isbn/:isbn',function (req, res) {
//   //Write your code here
//   const isbn = req.params.isbn;
//   const book = books[isbn];
//   if(book){
//     return res.status(200).json(book);
//   }else{
//     return res.status(404).json({message: "Book not found"});
//   }
//  });
public_users.get('/isbn/:isbn', async function (req, res) {
  try {
    // Simulate an asynchronous operation using Promise
    const getBookByISBN = (isbn) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const book = books[isbn];
          if (book) {
            resolve(book);
          } else {
            reject("Book not found");
          }
        }, 100); // Simulate a delay
      });
    };

    const isbn = req.params.isbn;
    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Get book details based on author
// public_users.get('/author/:author',function (req, res) {
//   //Write your code here
//   const author = req.params.author;

//   let book = {};
//   for(let i in books){
//     if(books[i].author === author){
//       book[i] = books[i];
//     }
//   }

//   if(book){
//     return res.status(200).json(book);
//   }else{
//     return res.status(404).json({message: "Book not found"});
//   }
// });
public_users.get('/author/:author', async function (req, res) {
  try {
    // Simulate an asynchronous operation using Promise
    const getBooksByAuthor = (author) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let booksByAuthor = {};
          for (let i in books) {
            if (books[i].author === author) {
              booksByAuthor[i] = books[i];
            }
          }
          if (Object.keys(booksByAuthor).length > 0) {
            resolve(booksByAuthor);
          } else {
            reject("Books not found");
          }
        }, 100); // Simulate a delay
      });
    };

    const author = req.params.author;
    const booksByAuthor = await getBooksByAuthor(author);
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

// Get all books based on title
// public_users.get('/title/:title',function (req, res) {
//   //Write your code here
//   const title = req.params.title;

//   let book = {};
//   for(let i in books){
//     if(books[i].title === title){
//       book[i] = books[i];
//     }
//   }

//   if(book){
//     return res.status(200).json(book);
//   }else{
//     return res.status(404).json({message: "Book not found"});
//   }
// });
public_users.get('/title/:title', async function (req, res) {
  try {
    // Simulate an asynchronous operation using Promise
    const getBooksByTitle = (title) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let booksByTitle = {};
          for (let i in books) {
            if (books[i].title === title) {
              booksByTitle[i] = books[i];
            }
          }
          if (Object.keys(booksByTitle).length > 0) {
            resolve(booksByTitle);
          } else {
            reject("Books not found");
          }
        }, 100); // Simulate a delay
      });
    };

    const title = req.params.title;
    const booksByTitle = await getBooksByTitle(title);
    return res.status(200).json(booksByTitle);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;
