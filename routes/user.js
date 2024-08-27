const express = require('express');
const bcrypt = require('bcrypt'); 
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('Received request to create a new user');
  
  try {
    console.log('Request body:', req.body);

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      qualifications: req.body.qualifications,
      password: hashedPassword, // Save the hashed password
    });

    console.log('Saving new user:', newUser);
    await newUser.save();

    console.log('User saved successfully');
    res.status(201).json({
      message: 'success',
      user: newUser,
    });
      
  } catch (error) {
    console.error('Error saving user:', error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
