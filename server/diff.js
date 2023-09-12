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
    自由现金流＝息税前利润－税金 + 非付现成本（比如 折旧/摊销）－ 保全性资本支出
    净利润＝息税前利润－税金－利息
    股东盈余＝ 息税前利润－税金－利息 + 非付现成本（比如 折旧/摊销）－ 保全性资本支出 = 净利润 + 非付现成本（比如 折旧/摊销）－ 保全性资本支出

    自由现金流一般可以定义为：企业产生的、在满足了再投资需要之后剩余的现金流量，这部分现金流量是在不影响公司持续发展的前提下可供分配给企业资本供应者（也就是股东）的最大现金额。
    自由现金流不是一个固定的公式，而是一个准则。
    自由现金流的准则是，这部分现金流是可以分配给股东的，且这部分现金流即使立刻全部发放给股东，也不影响公司的持续发展



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

/* 
CF0 = 上年度自由现金流
r1 = 短期无风险利率 = 三年期国债利率
T = 3  我们只看未来三年的增长，留足安全边际
r = 2 * r1  折现率 = 无风险利率 + 风险溢价 = 取两倍无风险利率
g1 = 一阶段增速
g2  = 永续增速 =  10年期国债利率 

*/

// 风险溢价 参考 https://xueqiu.com/6625615158/208636671
// 一般取均值偏大一点 4%
/*
    g1 = 0.15
    g2 = 0.04
*/

// 整体市场合理的市盈率 = 1 / 无风险利率 = 1 / 0.02579 ～ 1 / 0.03 = 33 - 38 倍市盈率


// 自由现金估值函数
const DCF = ({
    CF0, // 上一年度自由现金流
    T = 3, // 一阶段 增长年限
    g1, // 一阶段增长速率
    g2, // 二阶段永续增长速率，一般取GDP的值
    r1, // 无风险利率，一般取10年期国债收益率 国债收益率走势网站查看：https://stock.finance.sina.com.cn/forex/globalbd/gcny10.html
    extRisk = 0.06 // 风险溢价   取沪深300股债利差 https://legulegu.com/stockdata/equity-bond-spread  平均值往上一点
}) => {
    const r = r1 + extRisk; // 折现率
    let LastNyearValue = 0;
    let TV = CF0 * Math.pow(1 + g1, T) * (1 + g2) / (r - g2); // 永续增长阶段的终值
    for (let t = 1; t <= T; t++) { // 未来T年内的现金流折现
        LastNyearValue = LastNyearValue + CF0 * Math.pow(1 + g1, t) / Math.pow(1 + r, t);
    }
    return LastNyearValue + TV; // 未来所有现金流折现
}


// const value = DCF({ //  中国中免 采取DCF二阶段增长模型
//     CF0: 50.32, // 2022年归属母公司净利润52.32亿。 预测2023 - 2025  62.784、75.3408、 90.40896
//     T: 3, // 未来三年稳定增长
//     g1: 0.3, // 一阶段，未来三年增长每30%的增长。这里受到2022年两次大范围疫情封控的影响，2022年三四季度利润极低。2023-2025 实际上只需要恢复性增长都可以达到25%的复合增长率。
//     g2: 0.055, // 二阶段，永续增长每年4%，这个和未来的的GDP增长相当，GDP增速预测每年放缓到4%。 官方是要保5%的，我们更保守给4%。
//     r1: 0.02579, // 无风险收益率，这里是十年期国债收益率 2.579%。 我们预测降息将是长期的。10年期国债收益率还会继续走低，这里取当下的值
//     extRisk: 0.06  // 风险溢价，按照过往经验，给6%  4.8平均风险溢价往上一点。  取沪深300股债利差 https://legulegu.com/stockdata/equity-bond-spread  平均值往上一点
// });
// const g1 = 1.3;
// console.log(`预测2023-2025 利润：${50.32 * g1}、${50.32 * Math.pow(g1, 2)}、${50.32 * Math.pow(g1, 3)}`)
// const totalStock = 20.69; // 总股本20.69亿股
// console.log(`自由现金流:${(value).toFixed(2)}亿元`, `每股实际价值:${ (value / totalStock).toFixed(2)}元`)


const value = DCF({ //  中国中免 采取DCF二阶段增长模型
    CF0: 61.98, // 2022年归属母公司净利润52.32亿。 预测2023 - 2025  62.784、75.3408、 90.40896
    T: 3, // 未来三年稳定增长
    g1: 0.1, 
    g2: 0.04, // 二阶段，永续增长每年4%，这个和未来的的GDP增长相当，GDP增速预测每年放缓到4%。 官方是要保5%的，我们更保守给4%。
    r1: 0.02579, // 无风险收益率，这里是十年期国债收益率 2.579%。 我们预测降息将是长期的。10年期国债收益率还会继续走低，这里取当下的值
    extRisk: 0.06  // 风险溢价，按照过往经验，给6%  4.8平均风险溢价往上一点。  取沪深300股债利差 https://legulegu.com/stockdata/equity-bond-spread  平均值往上一点
});
const totalStock = 55.61; // 总股本20.69亿股
console.log(`自由现金流:${(value).toFixed(2)}亿元`, `每股实际价值:${ (value / totalStock).toFixed(2)}元`)


// const value = DCF({ //  中国中免 采取DCF二阶段增长模型
//     CF0: 12.64, // 2022年归属母公司净利润52.32亿。 预测2023 - 2025  62.784、75.3408、 90.40896
//     T: 3, // 未来三年稳定增长
//     g1: 0.08, // 一阶段，未来三年增长每30%的增长。这里受到2022年两次大范围疫情封控的影响，2022年三四季度利润极低。2023-2025 实际上只需要恢复性增长都可以达到25%的复合增长率。
//     g2: 0.04, // 二阶段，永续增长每年4%，这个和未来的的GDP增长相当，GDP增速预测每年放缓到4%。 官方是要保5%的，我们更保守给4%。
//     r1: 0.02579, // 无风险收益率，这里是十年期国债收益率 2.579%。 我们预测降息将是长期的。10年期国债收益率还会继续走低，这里取当下的值
//     extRisk: 0.06  // 风险溢价，按照过往经验，给6%  4.8平均风险溢价往上一点。  取沪深300股债利差 https://legulegu.com/stockdata/equity-bond-spread  平均值往上一点
// });
// const g1 = 1.08;
// console.log(`预测2023-2025 利润：${50.32 * g1}、${50.32 * Math.pow(g1, 2)}、${50.32 * Math.pow(g1, 3)}`)
// const totalStock = 4.84; // 总股本20.69亿股
// console.log(`自由现金流:${(value).toFixed(2)}亿元`, `每股实际价值:${ (value / totalStock).toFixed(2)}元`)


// const value = DCF({ //  中国中免 采取DCF二阶段增长模型
//     CF0: 266.9, // 2022年归属母公司净利润52.32亿。 预测2023 - 2025  62.784、75.3408、 90.40896
//     T: 3, // 未来三年稳定增长
//     g1: 0.10, // 一阶段，未来三年增长每30%的增长。这里受到2022年两次大范围疫情封控的影响，2022年三四季度利润极低。2023-2025 实际上只需要恢复性增长都可以达到25%的复合增长率。
//     g2: 0.04, // 二阶段，永续增长每年4%，这个和未来的的GDP增长相当，GDP增速预测每年放缓到4%。 官方是要保5%的，我们更保守给4%。
//     r1: 0.02579, // 无风险收益率，这里是十年期国债收益率 2.579%。 我们预测降息将是长期的。10年期国债收益率还会继续走低，这里取当下的值
//     extRisk: 0.06  // 风险溢价，按照过往经验，给6%  4.8平均风险溢价往上一点。  取沪深300股债利差 https://legulegu.com/stockdata/equity-bond-spread  平均值往上一点
// });
// const g1 = 1.1;
// console.log(`预测2023-2025 利润：${50.32 * g1}、${50.32 * Math.pow(g1, 2)}、${50.32 * Math.pow(g1, 3)}`)
// const totalStock = 38.82; // 总股本20.69亿股
// console.log(`自由现金流:${(value).toFixed(2)}亿元`, `每股实际价值:${ (value / totalStock).toFixed(2)}元`)

// const type = 'cash' // profile  cash
// const data2022 = formatArr('2022', type);
// const data2021 = formatArr('2021', type);
// const data2020 = formatArr('2020', type);



// diff(data2020, [data2021, data2022])
// combine([ data2022, data2021, data2020 ])

// 自由现金流＝息税前利润－税金 + 非付现成本（比如 折旧/摊销）－ 保全性资本支出
// 净利润＝息税前利润－税金－利息
// 股东盈余＝ 息税前利润－税金－利息 + 非付现成本（比如 折旧/摊销）－ 保全性资本支出 = 净利润 + 非付现成本（比如 折旧/摊销）－ 保全性资本支出


// 公司价值=金融资产价值+长期股权投资价值+经营资产价值
// 股权价值=公司价值-公司债务
// 上市公司股票价值=股权资本价值-少数股东权益价值 = 股权资本价值×（1-少数股东权益比例）
// 少数股东权益比例=少数股东权益/股权资本

// 经营资产自由现金流量 = 经营活动现金流量净额 - 保全性资本支出
// 股权自由现金流量 = 经营资产自由现金流量-利息支出

// 股权预期回报率=无风险利率+贝塔系数×股权风险溢价


// 公司价值 = 金融资产价值 + 长期股权投资价值 + 经营资产价值
 

// 上市公司股票价值 = 股权资本价值-少数股东权益价值 = 股权资本价值×（1-少数股东权益比例）

// 这种简化的计算在多数情况下应该是合理的。
// 但是需要注意的是，在子公司亏损甚至即将关闭的情况下，这种计算有可能会低估上市公司股东股票价值——亏损的子公司可能没有什么价值，
// 上市公司以其出资为限承担有限责任，因此子公司的少数股东不能分享上市公司除该子公司外其他经营业务的价值，但简化计算则忽略了这一点。
// 概言之，在存在巨额亏损的子公司的情况下，上述简化计算应该谨慎使用。


const DCF0 =  8328824733.00 - 1459932441.98