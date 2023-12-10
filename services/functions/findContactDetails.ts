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