export function getCurrentShortTime(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Adding 1 as month index starts from 0
    const day = ('0' + currentDate.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
}