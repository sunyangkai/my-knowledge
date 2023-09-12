const fs = require('fs');
const { resolve } = require('path');

const readTextFile = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
        
            const lines = data.split('\n').filter(li => li.length > 0);
            if (lines[lines.length - 1] === '') {
              lines.pop();
            }
            resolve(lines)
          });
    })
  }



const writeTextFile = async ({ fileName, data }) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, 'utf8', (err) => {
      if (err) {
        reject('写入失败' + err.message);
      } else {
        resolve()
      }
    });
  })
}

const generateDataText =  ({ path, data }) => {
  writeTextFile({ fileName: `${path}/data.txt`, data: JSON.stringify(data)})
  const newObj = {};
  Object.keys(data).forEach(key => {
    newObj[key] = data[key].map(num => (+num / (10000*10000)).toFixed(4))
  });
  writeTextFile({ fileName: `${path}/read.txt`, data:  Object.keys(newObj).map((key) => `${key}: ${newObj[key]}`).join('\n') })
}

  
  
  const dealData = async ({ year, path, table }) => {
    const lines  = await readTextFile(`./${path}/${year}.txt`);
    const needRpairData = [];
    const data = lines.map((li) => {
      const lineData = li.split(' ');
      const item = lineData.filter((str, index) => str.indexOf('、') === -1 || index === 0); // 过滤掉非第一位但包含、的项，就是附注项。
      if (item.length === 1) {
        item.push("0")
        item.push("0")
      }
      if (item.length === 2) {
        needRpairData.push(item);
      }
      if (item.length === 3) {
        item[1]  = +item[1].replace(/,/g, '');
        item[2]  =  +item[2].replace(/,/g, '');
      }
      const fieldName = item[0];
      if (needRpairData.length === 0) {
        if (!table[fieldName]) {
          table[fieldName] = [item[1], item[2]]
        } else {
          table[fieldName].push(item[2])
        }
      }
      return item;
    });
    if (needRpairData.length > 0) {
      console.log(`${year}年度, 以下数据需要手动修复:`)
      console.log(needRpairData);
    }
    return data;
  }
  
  
  const fomatAllYearData = async ({ years, unit = '元', path }) => {
    const table = {}
    for (const year of years) {
      await dealData({ year, path, table });
    }
  
    const newField = [];
    Object.keys(table).forEach(key => {
      if (unit === '亿元') {
        table[key] = table[key].map(num => +(num / (10000 * 10000)).toFixed(4))
      }
      if (table[key].length !== (years.length + 1)) {
        newField.push(key);
      }
      if (table[key].every(num => num === 0) && (key[key.length - 1] !== '：')) {
        delete table[key];
      }
    })
    if (newField.length > 0) {
      console.log('检测到不同年份之间存在新增字段变化，建议手动修复数据')
      console.log('新增字段如下:')
      console.log(newField);
    }
    return table;
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

module.exports = {
    readTextFile,
    fomatAllYearData,
    DCF,
    generateDataText
};
