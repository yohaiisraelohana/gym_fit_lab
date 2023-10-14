import { v2 as cloudinary } from "cloudinary";
import dot from 'dotenv';
dot.config();
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export default cloudinary;

