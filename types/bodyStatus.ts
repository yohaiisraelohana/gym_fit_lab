type TBodyStatus = {
    id? : string;
    profile_id? : string;
    created_at? : string;
    circumferences ? : string;
    target? : string ;
    activity? : number;
    height? : number;
    weight? : number;
    age? : number ;
    img_url? : string  | null;
}

type TBodycircumference = {
    created_at? : string ;
    id? : string ;
    neck ? : number ;
    shoulders ? : number ;
    chest ? : number ;
    right_arm ? : number ;
    left_arm ? : number ;
    waist ? : number ;
    right_leg ? : number ;
    left_leg ? : number ;
}