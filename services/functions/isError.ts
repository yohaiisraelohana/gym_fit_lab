
export const isError = (check : any) : check is TError => {
    return "error" in check;
}