type TTrainer = {
    trainer_img? : string ;
    bio? : string | null ;
    training_since? : string | null;
    trainees_count? : number ;
    specializes_at? : string[] | null; 
    created_at? : string;
    id?:string;
    profile? : {
        name: string ;
    }
} ;
