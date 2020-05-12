const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

//----- GETS all of the posts -----
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find(); //returns ALL Post(s) from model using (empty) Can add .limit etc
    res.json(posts);
  } catch (err) {
    res.json({ message: err }); //the message of error
  }
});

//Before async/await
/* router.get("/", (req, res) => {
  res.send("We are on the posts page");
}); */
//---------------------------------------------

//----- Sends to DB ----- //added async after
router.post("/", async (req, res) => {
  //console.log("req body: ", req.body); //check request to server /post
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  //Save post to the DB, returns a promise
  //can also do res.status(200) codes
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }

  //Before changing to async/await-try/catch
  /* post
    .save()
    .then((data) => {
      res.json(data); //displays the data on the screen through response
    })
    .catch((err) => {
      console.log("error! ", err);
      res.json({ message: err });
    }); */
});
//---------------------------------------------

//----- GET a specific post (ex. /posts/specific) -----
//postId is dynamic - anything after .../posts/ is the params object
//.<postID> to extract from the object

router.get("/:postId", async (req, res) => {
  //console.log('postId: ', req.params.postId); //check the response using postman GET.../posts/test
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
    //res.send("Specific post");
  } catch (err) {
    res.json({ message: err });
  }
});
//---------------------------------------------

//----- DELETE a post -----
router.delete("/:postId", async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId });
    res.json(removedPost);
  } catch (err) {
    res.json({ message: err });
  }
});
//---------------------------------------------

//----- UPDATE / PATCH a post -----
router.patch("/:postId", async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId }, //update this post
      { $set: { title: req.body.title } } //set title coming from here
    );
    res.json(updatedPost); // can save to a variable
  } catch (err) {
    res.json({ message: err });
  }
});
//---------------------------------------------

module.exports = router;

//can do the same for users/todd
