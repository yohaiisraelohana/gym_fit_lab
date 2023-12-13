
export const isError = (check: any): check is TError => {
    return typeof check === 'object' && check !== null && "error" in check;
};