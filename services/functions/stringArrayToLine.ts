export function stringArrayToLine(array:string[]){
    return array.map((item,ind)=> item +( ind + 1 < array.length ? " , " : "" ));
}