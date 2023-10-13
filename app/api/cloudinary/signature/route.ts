import {v2 as cloudinary} from 'cloudinary';
import { NextResponse } from 'next/server';



export async function GET() {
    cloudinary.config({
        cloud_name:"",
        api_key:"",
        api_secret:""
    })
    // Define Cloudinary upload options
    const uploadOptions = {
      folder: 'your-upload-folder', // Customize the folder where images are stored
      allowed_formats: ['jpg', 'png'], // Define allowed formats
      public_id: 'unique_image_id', // Set a unique image ID
      tags: ['user_uploaded'], // Add any tags as needed
    };
    const signedUrl = cloudinary.uploader.upload_url(uploadOptions);
    return NextResponse.json(signedUrl);
}