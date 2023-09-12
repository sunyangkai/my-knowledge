const { DCF } = require('./util');


const value = DCF({ //  中国中免 采取DCF二阶段增长模型
    CF0:  82 * 0.8,
    T: 3, // 未来三年稳定增长
    g1: 0.25, // 25%增速
    g2: 0.04, // 二阶段，永续增长每年5%，这个和未来的的GDP增长相当，GDP增速预测每年放缓到4%。 官方是要保5%的，我们更保守给4%。
    r1: 0.02579, // 无风险收益率，这里是十年期国债收益率 2.579%。 我们预测降息将是长期的。10年期国债收益率还会继续走低，这里取当下的值
    extRisk: 0.08  // 风险溢价，按照过往经验，给6%  4.8平均风险溢价往上一点。  取沪深300股债利差 https://legulegu.com/stockdata/equity-bond-spread  平均值往上一点
});
// 折现率 在 8% - 15%
const totalStock = 20.69; // 总股本20.69亿股
console.log(`自由现金流:${(value).toFixed(2)}亿元`, `每股实际价值:${ (value / totalStock).toFixed(2)}元`)

// 12.579  11.579  10.579
//  97.56元   110.82元  128.76元