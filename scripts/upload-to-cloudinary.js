// scripts/upload-to-cloudinary.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadVideos = async () => {
  const videosDir = path.join(process.cwd(), 'public');
  // List of videos to upload
  const videoFiles = [
    '60m.mp4',
    'drake 4x4.mp4',
    'indoor open 4.mp4',
    'state 4x4 prelim.mp4'
  ];
  
  for (const file of videoFiles) {
    try {
      console.log(`Uploading ${file}...`);
      const filePath = path.join(videosDir, file);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        continue;
      }
      
      // Upload to Cloudinary with async processing for large videos
      // Using high quality settings (quality: 100, no compression)
      const result = await cloudinary.uploader.upload(
        filePath,
        { 
          resource_type: 'video',
          folder: 'jackwang-gallery',
          use_filename: true,
          unique_filename: false,
          overwrite: true,
          // Use eager async transformation with high quality
          eager: [
            { width: 1280, height: 720, crop: "limit", quality: 100 }
          ],
          eager_async: true,
          eager_notification_url: null,
        }
      );
      
      console.log(`Uploaded ${file} - URL: ${result.secure_url}`);
    } catch (error) {
      console.error(`Error uploading ${file}:`, error);
    }
  }
};

uploadVideos().then(() => {
  console.log('Upload complete!');
}).catch(err => {
  console.error('Upload failed:', err);
});
