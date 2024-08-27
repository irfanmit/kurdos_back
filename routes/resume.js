const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const User = require('../models/User')

const router = express.Router();

// Ensure the 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Created uploads directory');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Destination folder:', uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    console.log('Original file name:', file.originalname);
    console.log('Generating new file name');
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post('/', upload.single('resume'), async(req, res) => {
  console.log('Received request to upload resume');
  const email = req.body.email;
  console.log('Received email:', email);
  try {
    if (req.file) {
        const user = await User.findOneAndUpdate(
            { email: email },
            { resume: req.file.path },
            { new: true }
          );
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          else{
                console.log(user)
                
              console.log('File uploaded successfully');
              console.log('File path:', req.file.path);
              res.status(201).json({ filePath: req.file.path });
            }
    } else {
      console.log('No file uploaded');
      res.status(400).json({ message: 'No file uploaded' });
    }
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
