import axios from 'axios'
// ! REMEMBER TO MOVE THE UPLOAD PRESET AND CLOUD NAME TO .ENV FILE
export async function uploadSingleImgToCloudinary(img:File | null) : Promise<TCldRes|TError> {
    if(!img) return {error:img , message:'תמונה לא סופקה'};
    const upload_preset = "rdmfxhlj";
    const cloud_name = "dftounwvk";
    const formData = new FormData();
    formData.append("file",img);
    formData.append("upload_preset",upload_preset);

    const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData
    )

    if(!res.data)
        return {error:res , message:"העלאת התמונה לשרת cloudinary נכשלה" };

    return {public_id : res.data.public_id};
}
/*
    // Get the signed URL from the backend
    const response = await axios.get('/api/sign-upload-url');
    const { signedUrl } = response.data;
    // Use the signed URL for the direct upload
    const formData = new FormData();
    formData.append('file', selectedImage);
    
    const uploadResponse = await axios.post(signedUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
*/