export const mToKm = (m: number) => {
    if (m === null) {
        return 0;
    }
    return Math.floor(m/1000).toString();
}