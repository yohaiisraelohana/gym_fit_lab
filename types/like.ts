type TLike = {
    id?:string;
    item_id?:number;
    profile_id?:string;
}

type TLikeUser = TLike & {
    name? : string;
    profile_img? : string; 
}