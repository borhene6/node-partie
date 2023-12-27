const express = require('express');
const mongoose = require('mongoose');
const User = require('./User');
const Announcements = require('./Announcments');

mongoose.connect(
"mongodb+srv://borhene:borhene@cluster0.6iqukf4.mongodb.net/"
, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
const port = 3000;
const cors = require('cors'); // Import the cors middleware



// Enable CORS
app.use(cors());
app.use(express.json()); 
// Register a new user
app.post('/adduser', async (req, res) => {
    try {
       
      const { username, password } = req.body;
  
      // Check if the username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user
      const newUser = new User({ username, password });
      await newUser.save();
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  app.post('/addann', async (req, res) => {
    try {
       
      
  
      const announcements = new Announcements(req.body);
      await announcements.save();
      res.status(201).json({ message: 'ann registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
app.get('/getuser/:username/:password', async (req, res) => {
    console.log('lalalallala :>> ', req.params.password);
 const post = await User.findOne({username:req.params.username,password:req.params.password});
 console.log('icicicici :>> ', post);
 res.json(post);
});

app.get('/useran/:id', async (req, res) => {
 
 const post = await Announcements.find({user:req.params.id});
   
 res.json(post);
});
app.get('/allann', async (req, res) => {
 
    const post = await Announcements.find({});
      
    res.json(post);
   });
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});