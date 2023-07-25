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
// const year_2022 = readData('2022');
// console.log(year_2022)
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

