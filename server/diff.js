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
    const data =  fs.readFileSync(`data/yili/${year}profile.txt`, 'utf8');
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

// const year_2021 = readData('2021');
// const year_2020 = readData('2020');
// testDifference(year_2021, [year_2020])


function containsChinese(str) {
    return /[\u4e00-\u9fa5]/.test(str);
}


const formatArr = (year, type) => {
    const data =  fs.readFileSync(`data/yili/${year}${type}.txt`, 'utf8');
    const list = data.split('\n');
    const profileData = [];
    while(list.length > 0) { // 第三列应该是数字，如果不是那就是分段的标题
        let item = [];
        if(containsChinese(list[2])) {
           const arr = list.splice(0,2);
            item = [arr[0].replace(/\s/g, "")];
        } else {
            const arr = list.splice(0,5);
            item = [arr[0].replace(/\s/g, ""), convertCommaSeparatedStringToNumber(arr[2]), convertCommaSeparatedStringToNumber(arr[3])];
        }
         profileData.push(item);
    }
    return profileData;
}


const diff = (target, source) => {
    const targetNames = target.map(t => t[0]);
    const diffName = [];
    source.forEach((s, index) => {
        s.forEach(item => {
            if (!targetNames.includes(item[0])) {
                diffName.push(item[0]);
            }
        })
    });
    if (diffName.length === 0) {
        console.log('多个年份字段对齐');
    } else {
        console.log('多个年份存在字段差异：')
        console.log(diffName);
    }
}

const combine = (source) => {
    const data = source[0];
    const left = source.slice(1);
    left.forEach(yearData => {
        data.forEach(d => {
            yearData.forEach(item => { // 遍历单个年份字段
                if (d[0] === item[0]) {
                    d.push(item[2]);
                }
            })
        })
    });
    console.log(data)
}


// 投资活动产生的现金流量净额
/* 
CF0 = 上年度自由现金流
r1 = 短期无风险利率 = 三年期国债利率
T = 3  我们只看未来三年的增长，留足安全边际
r = 2 * r1  折现率 = 无风险利率 + 风险溢价 = 取两倍无风险利率
g1 = 一阶段增速
g2  = 永续增速 =  10年期国债利率

*/

/*
    自由现金流一般可以定义为：企业产生的、在满足了再投资需要之后剩余的现金流量，这部分现金流量是在不影响公司持续发展的前提下可供分配给企业资本供应者（也就是股东）的最大现金额。
    自由现金流不是一个固定的公式，而是一个准则。
    自由现金流的准则是，这部分现金流是可以分配给股东的，且这部分现金流即使立刻全部发放给股东，也不影响公司的持续发展

    自由现金流＝息税前利润－税金 + 折旧与摊销－资本支出－营运资本追加
    股东盈余＝净利润 + 折旧与摊销－资本支出－营运资本追加
    净利润＝息税前利润－税金－利息


    1.营业利润：这是公司在支付利息和税项之前的收入，也被称为营业利润。它是公司在正常运营中产生的利润，不包括金融成本和税项。

    2.折旧和摊销: 这两项代表了公司的固定资产（例如机器、设备或建筑物）以及无形资产（例如专利或商誉）随着时间的推移失去的价值。
    这些损失会在公司的利润表上显示为费用，但实际上它们不涉及现金支出，因此在计算自由现金流时需要将其加回。

    3.税: 这是公司需要支付的税款。在计算自由现金流时，需要扣除税项，因为这是一项现金支出。

    4.资本支出: 这是公司用于购买、升级或维护长期资产（如物业、厂房或设备）的开支。资本支出是一项现金支出。
    资本支出 = 当前期末的固定资产（净额） - 上一期末的固定资产（净额） + 当期折旧（或折旧和摊销）
    最准确的资本支出数据应从公司的现金流量表中的投资活动部分获取。


    5.营运资本的变动: 营运资本是公司的流动资产（如现金、应收账款和存货）减去流动负债（如应付账款）。
    当公司的营运资本增加时，意味着现金被用于增加流动资产或减少流动负债，反之则意味着公司释放出现金。因此，净营运资本的变动需要考虑在内。
    净营运资本 = 流动运营资产（现金、应收账款、存货...） - 流动运营负债 (应付账款、预收款项、应付薪酬、应交税费...)
    营运资本的变动 = 本期的净营运资本 - 上一期的净营运资本


    流动资产（Current Assets）：流动资产是指公司在一年内或一个营业周期内可以转换为现金的资产。这通常包括现金、市场上可销售的证券、应收账款、存货等。

    流动负债（Current Liabilities）：流动负债是指公司在一年内或一个营业周期内需偿还的债务。这可能包括应付账款、短期借款、预收款项、一年内到期的长期债务等。
 */


const DCF = (CF0, T = 3, g1, g2, r1) => {
    const r = 2 * r1;
    let LastNyearValue = 0;
    let TV = CF0 * Math.pow(1 + g1, T) * (1 + g2) / (r - g2);
    for (let t = 1; t <= T; t++) {
        lastNyear = lastNyear + CF0 * Math.pow(1 + g1, t) / Math.pow(1 + r, t);
    }
    return LastNyearValue + TV;

}

const type = 'cash' // profile  cash
const data2022 = formatArr('2022', type);
const data2021 = formatArr('2021', type);
const data2020 = formatArr('2020', type);



// diff(data2020, [data2021, data2022])
combine([ data2022, data2021, data2020 ])