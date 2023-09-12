const { fomatAllYearData, generateDataText } = require('./util');

const main = async () => {
    // const balanceData = await fomatAllYearData({
    //     path: 'cdfr/balance', // profile balance cash
    //     years: [2022,2021,2020],
    //     unit: '亿元'
    // });
    // const profileData = await fomatAllYearData({
    //     path: 'cdfr/profile', // profile balance cash
    //     years: [2022,2021,2020],
    //     unit: '亿元'
    // });
    // const cash = await fomatAllYearData({
    //     path: 'cdfr/cash', // profile balance cash
    //     years: [2022,2021,2020],
    //     unit: '亿元'
    // });
    formatData()
}

const formatData = () => {
    const years = [2022,2021,2020];
    const name = 'cdfr';
    Promise.all([
        fomatAllYearData({
            path: `./${name}/balance`,
            years,
        }),
        fomatAllYearData({
            path: `./${name}/profile`,
            years,
        }),
        fomatAllYearData({
            path: `./${name}/cash`,
            years,
        }),
        fomatAllYearData({
            path: `./${name}/fixcash`,
            years,
        }),
    ]).then(([ balanceData, profileData, cashData, fixcashData ]) => {
        generateDataText({ path: `./${name}/balance`, data: balanceData });
        generateDataText({ path: `./${name}/profile`, data: profileData });
        generateDataText({ path: `./${name}/cash`, data: cashData });
        generateDataText({ path: `./${name}/fixcash`, data: fixcashData });
    });
}
main();

// 将净利润调节为经营活动现金流量