const puzzleSchedule = []


export const getPuzzleForDay = (date => {
    const zeroDay = 1734672930823;//Thu Dec 19 2024 22:35:30 GMT-0700 (Mountain Standard Time)
    const milliSecondsSinceZeroDay = date - zeroDay;
    const daysSinceZeroDay = Math.floor(milliSecondsSinceZeroDay / 86400000);
    return daysSinceZeroDay;
});


