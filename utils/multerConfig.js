const multer = require('multer');
const path = require('path');

// Set up storage with safe filenames
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${safeName}`);
  }
});

// Multer upload instance
const upload = multer({ storage });

module.exports = upload;
