import { NextResponse } from 'next/server';
import cloudinary from '@/services/cloudinary/config';


export async function GET() {
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