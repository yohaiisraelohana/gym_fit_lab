export default function getPublicId(url:string) : string{
    let lastSlash : number = 0 , lastDot : number = 0;
    for(let i = 0 ; i < url.length ; i ++){
        if(url[i] == "/")
            lastSlash = i;
        if(url[i] == ".")
            lastDot = i;
    };
    const public_id = url.substring(lastSlash + 1 , lastDot);
    return public_id;
}