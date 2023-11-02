type TUser = {
    name ? : string | null;
    email ? : string ;
    gender ? : string ;
    profile_img? : string | null;
    is_trainer? : boolean;
    is_trainee? : boolean;
    created_at? : string;
    id?:string;
} ;

type TUserStore = {
    error : TError | null ;
    user : TUser | null ;
    fetchUser : (id? : string) => Promise<any[]|TError> ;
    updateUser : (updatedUser : TUser ) => Promise<TError|string>;
}

