function sortByDay(newDays, cleanData) {
    let intervalTime = 1000 * 60 * 60 * 24 * newDays;

    let todayDate = new Date();
    let todayTime = todayDate.getTime();

    let readyData = cleanData.filter((item) => {
        let newDate = new Date(item.Order_Date);
        let itemTime = newDate.getTime();

        let difference = todayTime - itemTime;

        if (difference < intervalTime) {
            return item;
        }
    });

    readyData.sort((a, b) => a.Order_Date - b.Order_Date);

    return readyData;
}

export default sortByDay