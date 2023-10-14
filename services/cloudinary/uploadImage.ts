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
