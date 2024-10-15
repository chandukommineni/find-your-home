const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

const User = require('../models/users');


// // Signup route
// router.post('/signup', async (req, res) => {
//   try {
//     const { username, email, password, role, phone, whatsappNumber } = req.body;
//     console.log(req.body)
//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (user) {
//       return res.status(400).json({ message: 'User already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//      user = new User({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//       phone,
//       whatsappNumber
//     });

//     await user.save();

//     res.status(201).json({ message: 'User created successfully', Data: user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role, phone, whatsappNumber } = req.body;

    // Validate if all fields are provided
    if (!username || !email || !password || !role || !phone || !whatsappNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate the role
    const validRoles = ['landlord', 'customer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role. It must be either landlord or customer' });
    }

    // Validate if phone and WhatsApp numbers are strings
    if (typeof phone !== 'string' || typeof whatsappNumber !== 'string') {
      return res.status(400).json({ message: 'Phone and WhatsApp numbers must be strings' });
    }

    // Check if user already exists with the same email
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      phone,
      whatsappNumber
    });

    // Save the user
    await user.save();

    // Send success response
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Here you would typically create and send a JWT token
    // For simplicity, we're just sending a success message
    console.log(user)
    res.json({ message: 'Logged in successfully', user:user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/:id', async (req, res) => {

  try{
    const username = req.params.id

    // Check if user exists
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    User.deleteOne({username})
    console.log('User Deleted')

  }
  catch (error){
    console.error(error)
    res.status(500).json({ message: 'Server error'})
  }

})

module.exports = router;


