'use client'

import { validateImageFile } from '@/services/validations/validateInputs';
import Image from 'next/image';
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
            <Image 
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



