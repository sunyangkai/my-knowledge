var fs = require('fs');
var express = require('express');
var app = express();


function convertCommaSeparatedStringToNumber(str) {
    let isNegative = false;
    // 判断字符串是否表示负数
    if (!str[0]) {
        console.log(str)
    }
    if (str[0] === '-') {
      isNegative = true;
      str = str.substring(1);
    }
    // 移除所有的逗号
    str = str.replace(/,/g, '');
    // 将字符串转换为一个数字
    let num = Number(str);
    // 如果字符串表示负数，则返回负数
    return isNegative ? -num : num;
  }
  


const readData =  (year) => {
    const data =  fs.readFileSync(`data/yili/${year}.txt`, 'utf8');
    const list = data.split('\n');
    const tableField = [];
    while(list.length > 0) {
        const head = list[0];
        if (head.slice(-1) !== '：') {
            const removed = list.splice(0, 5);
            tableField.push([removed[0], convertCommaSeparatedStringToNumber(removed[2]), convertCommaSeparatedStringToNumber(removed[3])]);
        } else {
            const removed = list.splice(0, 2)
            tableField.push([removed[0]]);
        }
    }
    return tableField;
}
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // 设置允许所有源的访问
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');  // 设置允许的 HTTP 方法
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,X-Custom-Header');  // 设置允许的 HTTP 头部
    if ('OPTIONS' == req.method) {  // 对预检请求进行特殊处理
        res.sendStatus(200);
    } else {
        next();
    }
});

const testDifference = (target, data) => {
    const diff = [];
    target.forEach(t => {
        if (t[0].slice(-1) !== '：') {
            data.forEach((yearItem, index) => {
                let match = false;
                for (let i = 0; i < yearItem.length; i++) {
                    if (yearItem[i][0] === t[0]) {
                        t.push(yearItem[i][2]);
                        match = true;
                        break;
                    } 
                }
                if (!match) {
                    diff.push(t[0] );
                }
            });
        }
    })
   
    if (diff.length === 0) {
        console.log('字段对齐');
    } else {
        console.log('差异字段:')
        console.log(diff);
    }
    return target;
}
app.get('/yili', async (req, res) => {
    const year_2022 = readData('2022');
    const year_2021 = readData('2021');
    const year_2020 = readData('2020');
    const res1 = testDifference(year_2022, [year_2021, year_2020])
    res.send(res1);
});

app.listen(3020);



// 统计局 https://data.stats.gov.cn/easyquery.htm?cn=C01

// 中华人民共和国文化旅游部 网站：https://zwgk.mct.gov.cn/zfxxgkml/447/465/index_3081.html
/*
    2023年上半年，国内旅游总人次23.84亿， 城镇居民国内旅游人次18.59亿， 农村居民国内旅游人次5.25亿，
        一季度，国内旅游总人次12.16亿， 
        二季度，国内旅游总人次11.68亿。
    2023年上半年，国内旅游收入(旅游总花费)2.30万亿元， 城镇居民出游花费1.98万亿元， 农村居民出游花费0.32万亿元

    2022年，国内旅游总人次25.30亿。城镇居民国内旅游人次19.28亿，农村居民国内旅游人次6.01亿。
    一季度国内旅游人次8.30亿
    二季度国内旅游人次6.25亿
    三季度国内旅游人次6.39亿
    四季度国内旅游人次4.36亿

    2022年，国内旅游收入(旅游总消费)2.04万亿元
    城镇居民出游消费1.69万亿元
    农村居民出游消费0.36万亿元

    2021年
    2021年，国内旅游总人次32.46亿， 城镇居民23.42亿人次，农村居民9.04亿人次
    国内旅游收入（旅游总消费）2.92万亿元， 城镇居民旅游消费2.36万亿元，农村居民旅游消费0.55万亿元

    一季度国内旅游总人次10.24亿
    二季度国内旅游总人次8.47亿
    三季度国内旅游总人次8.18亿
    四季度国内旅游总人次5.57亿

    2020年
        年度国内旅游人数28.79亿人次， 城镇居民出游20.65亿人次， 农村居民出游8.14亿人次
        一季度国内旅游人数2.95亿人次
        二季度国内旅游人数6.37亿人次
        三季度国内旅游人数10.01亿人次
        四季度国内旅游人数9.46亿人次
    国内旅游收入2.23万亿元 城镇居民出游花费1.80万亿元 农村居民出游花费0.43万亿元


    2019年
        60.06 亿人次
    2018年
        55.39
    2017年
        50.01
    2016年
        44.35


*/