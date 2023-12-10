
export function calculateTimeDiff (start:Date , end:Date , type:string){
    
    return (end.getFullYear() - start.getFullYear()) + ((end.getMonth() - start.getMonth()) / 12);
}