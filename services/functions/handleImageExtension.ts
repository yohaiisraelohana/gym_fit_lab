import { convertImageExt } from "./convertImageExt";

export const handleImageExtension = async (image:File) : Promise<File> => {

    let file_extension = image.name.split('.').pop();

    if(file_extension !== "jpeg"){
        image = await convertImageExt(image , "jpeg");
    }

    return image;

}