export function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

export function roundNumber(num) {
    return Math.round(parseInt(num)).toString();
}