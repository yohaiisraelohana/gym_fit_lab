export function validatePassword(pass:string) : TValidation {
    if (pass.length < 8)
        return  {valid:false , message:"הסיסמא חייבת להיות באורך של לפחות 8 תווים"};

    const regexCapital = /[A-Z]/;
    if (!regexCapital.test(pass))
        return  {valid:false , message:"הסיסמא חייבת להכיל לפחות אות גדולה אחת באנגלית" };

    const regexNumber = /\d/;
    if(!regexNumber.test(pass))
        return {valid:false , message:"הסיסמא חייבת להכיל לפחות מספר אחד" };
    return {valid:true , message:"סיסמא תקינה"};
};