const date = (() => {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = ("0" + (new Date().getMonth() + 1)).slice(-2); //slice to get 2 digit format ex. 01
    let dd = ("0" + today.getDate()).slice(-2);

    let jan1 = new Date(yyyy, 0, 1);
    const findDayNum = (yyyy, mm, dd) => {
        let date = new Date(yyyy, mm - 1, dd);
        let daysSinceJan1 = Math.floor((date - jan1) / (24 * 60 * 60 * 1000));
        return daysSinceJan1;
    }
    const findWeekNum = (yyyy, mm, dd) => {
        return Math.ceil(findDayNum(yyyy, mm, dd) / 7);
    }

    const findNextDay = (n) => {
        let nextDay = new Date()
        nextDay.setDate(nextDay.getDate() + n);
        return (nextDay.getFullYear() + "-" + ("0" + (nextDay.getMonth() + 1)).slice(-2) + "-" + ("0" + nextDay.getDate()).slice(-2));
    }

    return { today, yyyy, mm, dd, findDayNum, findWeekNum, findNextDay }
})();

export { date };