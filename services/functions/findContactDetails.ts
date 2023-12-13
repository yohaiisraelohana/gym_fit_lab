export function findContactDetails(contact_options:string[]) : TTrainerContactDetails{
    let contact_founded : TTrainerContactDetails = {
        whatsapp:null,
        telegram:null,
        email:null,
        facebook:null,
    };
    contact_options.forEach(option => {
        let index = option.indexOf(':');
        let contact = option.substring(0, index) as keyof TTrainerContactDetails ;
        contact_founded[contact] = option.substring(index + 1);
    });
    return contact_founded;
}
export function createContactDetailsArray(contact_options:TTrainerContactDetails):string[]{
    let array : string[] = [];
    const { whatsapp , email , facebook , telegram } = contact_options;
    if(whatsapp)
        array.push(`whatsapp:${whatsapp}`);
    if(email)
        array.push(`email:${email}`);
    if(facebook)
        array.push(`facebook:${facebook}`);
    if(telegram)
        array.push(`telegram:${telegram}`);
    return array;
}