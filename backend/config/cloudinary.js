const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer storage (stores file locally temporarily)
const upload = multer({ dest: 'temp/' });

// Function to upload to Cloudinary manually
const uploadToCloudinary = async (filePath, folder = 'ecommerce-products') => {
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }],
  });

  // Delete the local file after upload
  fs.unlinkSync(filePath);

  return result;
};

module.exports = { cloudinary, upload, uploadToCloudinary };
