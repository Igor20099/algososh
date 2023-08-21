export const getRandomNumber = (minValue: number = 0, maxValue: number = 99) => {
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};
