export function validatePassword(pass:string) : TValidation {
    const minLength = 8 , maxLength = 32;
    if (pass.length < minLength)
        return  {valid:false , message:"הסיסמא חייבת להיות באורך של לפחות 8 תווים"};
    if (pass.length >= maxLength)
        return  {valid:false , message:"הסיסמא חייבת להיות פחות מ32 תווים"};
    const regexCapital = /[A-Z]/;
    if (!regexCapital.test(pass))
        return  {valid:false , message:"הסיסמא חייבת להכיל לפחות אות גדולה אחת באנגלית" };

    const regexNumber = /\d/;
    if(!regexNumber.test(pass))
        return {valid:false , message:"הסיסמא חייבת להכיל לפחות מספר אחד" };
    return {valid:true , message:"סיסמא תקינה"};
};

export function validateImageFile(file: File | null): TValidation {
    const allowedExtensions: string[] = ['.jpg', '.jpeg', '.png', '.gif'];
    const maxFileSizeMB: number = 5; 

    //check if exist
    if (!file || file === null) {
      return {valid:false , message:"קובץ לא הועלה"}; 
    }
    
  
    const fileExtension: string = file.name
      .slice(((file.name.lastIndexOf(".") - 1) >>> 0) + 2)
      .toLowerCase();
        
  
    //check if in the enabled size and with the right extension
    if (
      allowedExtensions.includes('.' + fileExtension) &&
      file.size <= maxFileSizeMB * 1024 * 1024
    ) {
      return {valid:true , message: "תמונה תקינה"}; 
    } else {
      return {valid: false , message: "סוג הקובץ לא נתמך ו/או התמונה שוקלת מעל 5 מגה בייט"}; 
    }
}