export async function convertImageExt(image: File , extension:string): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = new Image();
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
  
          const ctx = canvas.getContext('2d');
          if(!ctx)
            return 
          ctx.drawImage(img, 0, 0);
  
          // Convert the canvas content to a JPEG Blob
          canvas.toBlob((blob) => {
            if (blob) {
              // Create a File object from the Blob
              const convertedFile = new File([blob], `${image.name.replace(/\.[^.]+$/, '')}.${extension}`, { type: `image/${extension}` });
              resolve(convertedFile); // Resolve the Promise with the File object
            } else {
              reject(new Error('Unable to convert to' + extension)); // Reject if conversion fails
            }
          }, `image/${extension}`);
        };
  
        img.src = event.target?.result as string;
      };
  
      reader.readAsDataURL(image);
    });
}
  
//   // Example usage:
//   const uploadedFile = /* Replace this with your uploaded file object of type File */;
//   convertToJPEG(uploadedFile)
//     .then((jpegBlob) => {
//       // Use the converted JPEG Blob here
//       console.log('Converted to JPEG Blob:', jpegBlob);
//     })
//     .catch((error) => {
//       console.error('Conversion error:', error);
//     });
  