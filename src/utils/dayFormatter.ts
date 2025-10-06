export const dateFormatter = (dateString: string) => {
    const dateObject: Date = new Date(dateString);
    const day = String(dateObject.getUTCDate()).padStart(2, '0');
    const month = String(dateObject.getUTCMonth() + 1).padStart(2, '0');
    const year = String(dateObject.getUTCFullYear()).slice(-2); // get last 2 digits
    return `${day}.${month}.${year}`;
}