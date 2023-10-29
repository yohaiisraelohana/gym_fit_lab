
type TApiFood = {
    carbohydrates : number;
    total_fat : number ;
    protein : number ; 
    shmmitzrach : string ;
    food_energy : number ; 
}

type TApiFoodAllDetails = TApiFood & {
    amount : number ;
    //סיבים
    total_dietary_fiber : number; // g
    //סידן
    calcium : number ; //mg
    //ברזל
    iron : number ; //mg
    //מגנזיום
    magnesium : number ;  //mg
    //זרחן
    phosphorus : number ; //mg
    //אשלגן
    potassium : number ; //mg
    //נתרן
    sodium : number ; //mg
    //אבץ
    zinc : number ; //mg
    //כולסטרול
    cholesterol : number ; // mg
    //שומן רווי
    saturated_fat : number ; // g
    //סך סוכרים
    total_sugars : number ; //g
    //שומן טראנס
    trans_fatty_acids : number ; // g 
}