type TChange = {
    id?: number ;
    trainer_id?: string [] ;
    trainee_id?: string ;
    before_id?: string ;
    after_id ? : string;
}

type TCommentUser = TComment & {
    profile_img? : string ;
    name?: string ; 
}