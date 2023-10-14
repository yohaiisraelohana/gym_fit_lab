'use client'

import { validateImageFile } from '@/services/validations/validateInputs';
import { CldImage } from 'next-cloudinary';
import React, { useState } from 'react';

export default function ProfileImageInput(
    {currentProfileImage , setNewProfileImage }:
    {currentProfileImage:string|null , setNewProfileImage: (img:File|null)=>void})
  {
  const [imageURL, setImageURL] = useState<string | undefined>();
  const [error, setError] = useState<TError | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    const validImage : TValidation = validateImageFile(file);

    if (!validImage.valid) 
      //TODO: put the error in the input
      return setError({error:null,message:validImage.message});
    
    const imageUrl = URL.createObjectURL(file!);
    setImageURL(imageUrl);
    setNewProfileImage(file);
  };

  return (
      <label className="w-[200px] h-[200px] border border-white rounded-full overflow-hidden relative cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
            className="hidden"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center">
          {imageURL ? (
            <img src={imageURL} alt="Selected Image" className="w-full h-full object-cover" />
          ) : (
            error ? 
            <p>{error.message}</p>
            : currentProfileImage && 
            <CldImage 
              src={currentProfileImage} 
              alt="Selected Image" 
              height={200}
              width={200}
              style={{borderRadius:"100%",objectFit:'cover'}} />
          )}
          
        </div>
      </label>
  );
};


/*
// components/ImageUploadButton.js
import { useState } from 'react';

const ImageUploadButton = () => {
  const [image, setImage] = useState(null);

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValidImage = await validateImage(file); // Assume you have implemented this function
      if (isValidImage) {
        // Request the signature from the backend
        try {
          const response = await fetch('/api/upload/image/route.ts');
          if (response.ok) {
            const { signature } = await response.json();
            // Upload the image to Cloudinary using the signature
            await uploadToCloudinary(file, signature); // Implement this function
          } else {
            console.error('Failed to fetch signature from the server.');
          }
        } catch (error) {
          console.error('Error while uploading the image:', error);
        }
      } else {
        console.error('Invalid image format or size.');
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileInputChange} />
    </div>
  );
};

export default ImageUploadButton;

*/

