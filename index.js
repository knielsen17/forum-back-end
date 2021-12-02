const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/forum', {
  useNewUrlParser: true
});

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
const postSchema = new mongoose.Schema({
  userId: String,
  name: String,
  content: String,
  time: String,
});
const Post = mongoose.model('Post', postSchema);

app.get('/api/posts', async (req, res) => {
  try {
    let posts = await Post.find();
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    let posts = await Post.find({
      userId: req.params.id,
    });
    res.send(posts);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/user/login', async (req, res) => {
  try {
    let user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/user', async (req, res) => {
  const user = new User({
    username: req.body.username,
    name: req.body.name,
    password: req.body.password,
  });
  try {
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/post', async (req, res) => {
  const post = new Post({
    userId: req.body.userId,
    name: req.body.name,
    content: req.body.content,
    time: req.body.time,
  });
  try {
    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/user/:id', async (req, res) => {
  try {
    let user = await User.findOne({
      _id: req.params.id
    });
    user.name = req.body.name;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/post/:id', async (req, res) => {
  try {
    let post = await User.findOne({
      _id: req.params.id
    });
    post.content = req.body.content;
    await post.save();
    res.send(post);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/user/:id', async (req, res) => {
  try {
    await User.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/post/:id', async (req, res) => {
  try {
    await Post.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
