type TTrainer = {
    trainer_img? : string | null ;
    bio? : string | null ;
    training_since? : string | null;
    trainees_count? : number ;
    specializes_at? : string[] | null; 
    created_at? : string;
    total_rate? : number ;
    total_raters? : number ;
    contact_options? : string[];
    id?:string;
    profile? : {
        name: string ;
    }
} ;

type TTrainerContactDetails = {
    whatsapp : string | null ;
    facebook : string | null;
    email : string | null ;
    telegram : string | null;
}