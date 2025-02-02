const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => { //returns boolean
  //write code to check is the username is valid
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return false;
  } else {
    return true;
  }
}

const authenticatedUser = (username, password) => { //returns boolean
  //write code to check if username and password match the one we have in records.
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
}

// Register a new user
regd_users.post("/register", (req, res) => {
  //console.log("Request received at /register");
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (isValid(username)) {
    users.push({ username, password });
    return res.status(200).json({ message: "User registered successfully" });
  } else {
    return res.status(400).json({ message: "Username already exists" });
  }
});

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  //console.log("Request received at /login");
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign({
      username: username,
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token and username in session
    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //console.log("Request received at /auth/review/:isbn");
  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];

    // Verify JWT token
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        const isbn = req.params.isbn;
        const review = req.query.review;
        const username = req.session.authorization['username'];

        if (!review) {
          return res.status(400).json({ message: "Review is required" });
        }

        if (books[isbn]) {
          if (books[isbn].reviews[username]) {
            books[isbn].reviews[username] = review;
            return res.status(200).json({ message: "Review updated successfully" });
          } else {
            books[isbn].reviews[username] = review;
            return res.status(200).json({ message: "Review added successfully" });
          }
        } else {
          return res.status(404).json({ message: "Book not found" });
        }
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }

});

regd_users.delete("/auth/review/:isbn", (req, res) => {

  if (req.session.authorization) {
    let token = req.session.authorization['accessToken'];

    // Verify JWT token
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        const isbn = req.params.isbn;
        const username = req.session.authorization['username'];

        if (books[isbn]) {
          if (books[isbn].reviews[username]) {
            delete books[isbn].reviews[username];
            return res.status(200).json({ message: "Review deleted successfully" });
          } else {
            return res.status(404).json({ message: "Review not found" });
          }
        } else {
          return res.status(404).json({ message: "Book not found" });
        }
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
