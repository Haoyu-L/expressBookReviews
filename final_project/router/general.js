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
//   res.send(JSON.stringify(books,null,4));
// });

public_users.get('/', function (req, res) {
  // Send JSON response with formatted books data
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      res.send(JSON.stringify(books, null, 4));
      resolve("Success!");
    }, 100)
  })

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
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

public_users.get('/isbn/:isbn', function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const book = books[isbn];
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      res.send(book);
      resolve("Success!");
    }, 100)
  })

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
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

public_users.get('/author/:author', function (req, res) {
  //Write your code here
  const author = req.params.author;
  let book = {};
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i in books) {
        if (books[i].author === author) {
          book[i] = books[i];
        }
      }
      res.send(book);
      resolve("Success!");
    }, 100)
  })

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
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

public_users.get('/title/:title', function (req, res) {
  //Write your code here
  const title = req.params.title;

  let book = {};
  let myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      for (let i in books) {
        if (books[i].title === title) {
          book[i] = books[i];
        }
      }
      res.send(book);
      resolve("Success!");
    }, 100)
  })

  myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })
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
