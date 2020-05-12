const express = require("express"); //NO -> import express from "express";
const mongoose = require("mongoose"); //NO -> import mongoose from 'mongoose';
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config"); // import the dotenv package to use env variables

const app = express();

//Import Routes
const postsRoute = require("./routes/posts");

//Middlewares
app.use("/", bodyParser.json()); //Middleware for all routes
app.use("/", cors()); //all routes
app.use("/posts", postsRoute);

//app.use("/users", usersRoute)
/*app.use(auth)
app.use('/posts', () => {
    console.log('Hello from middleware')
}); */

//Routes
app.get("/", (req, res) => {
  res.send("This is home route");
});

/* - Moved to routes/post.js -
app.get("/posts", (req, res) => {
  res.send("This is the posts route");
}); */

//Connect to database
//use the env variable (process.env...)
mongoose.connect(
  process.env.DB_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to the database!");
  }
);

//Start listening to the server
const port = 3000; // maybe remove
app.listen(port);
console.log("----- Server started -----");

/* //////////////////////////////////////////
- npm init / git init..
- npm install express nodemon mongoose (--save-dev nodemon so not included in package to be sent)
- package.json - "scripts": {
    "start": "nodemon app.js"
  },
- mlab.com (trios /dbAdmin / tg)
- npm install dotenv (hide user/pass in enviromant variable)
- Add variable to (new).env file then require('...') and process.env....
- Seperate routes to routes folder
- Create Posts Schema model to structure data
- npm install body-parser
- Import / require body-parser
- Add body-parser middleware for all routes
- Test (both get and post) with postman
- Changed from promise to async/await
- Add GET specific post by Id using params.postId
- Add DELETE/ REMOVE post by Id using {_id: req.params.postId}
- TEST findById and delete/remove by _id with postman
- Add UPDATE / PATCH post. Test
- FIX CORS - can't connect to server from outside of localhost
  - npm install cors
  - Import cors and add middleware to app.js
  - Test on codepen.io (cross-origin)
    fetch('http://localhost:3000/posts')
      .then(result => {
        return result.json();
      })
      .then (data => {
        console.log(data);
      });

////////////////////////////////////////// */
