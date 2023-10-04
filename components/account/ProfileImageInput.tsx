'use client'

import React, { useState } from 'react';

export default function ProfileImageInput(){
  const [imageURL, setImageURL] = useState<string | undefined>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageURL(imageUrl);
    }
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
          {imageURL && (
            <img src={imageURL} alt="Selected Image" className="w-full h-full object-cover" />
          )}
        </div>
      </label>
  );
};

