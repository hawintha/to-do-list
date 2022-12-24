const date = (() => {
    let today = new Date();
    let yyyy = today.getFullYear();
    let mm = new Date().getMonth() + 1;
    let dd = today.getDate();

    let jan1 = new Date(yyyy, 0, 1);
    const findDayNum = (yyyy, mm, dd) => {
        let date = new Date(yyyy, mm - 1, dd);
        let daysSinceJan1 = Math.floor((date - jan1) / (24 * 60 * 60 * 1000));
        return daysSinceJan1;
    }
    const findWeekNum = (yyyy, mm, dd) => {
        return Math.ceil(findDayNum(yyyy, mm, dd) / 7);
    }

    return { today, yyyy, mm, dd, findDayNum, findWeekNum }
})();

export { date };