type TUser = {
    name ? : string ;
    email ? : string ;
    gender ? : string ;
    profile_img? : string | null;
    is_trainer? : boolean;
    is_trainee? : boolean;
    created_at? : string;
} ;

type TUserStore = {
    error : TError | null ;
    user : TUser | null ;
    fetchUser : (id : string) => void ;
}

