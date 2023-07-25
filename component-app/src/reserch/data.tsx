enum tableField {
    '货币资金' = 'huobizijin',
    '交易性金融资产' = 'jiaoyixingjinrongzichan',
    '衍生金融资产' = 'yanshengjinrongzichan',
    '应收票据' = 'yingshoupiju',
    '应收账款' = 'yingshouzhangkuan',
    '预付款项' = 'yufukuanxiang',
    '其他应收款' = 'qitayingshoukuan',
    '存货' = 'cunhuo',
    '一年内到期的非流动资产' = 'yinianneidaodaqidefeiliudongzichan',
    '其他流动资产' = 'qitaliudongzichan',
    '流动资产合计' = 'liudongzichanheji',

    '长期股权投资' = 'changqiguoquanzichan',
    '其他权益工具投资' = 'qitaquanyigongjuzichan',
    '其他非流动金融资产' = 'qitafeiliudongjinrongzichan',
    '投资性房地产' = 'touzixingfangdichan',
    '固定资产' = 'gudingzichan',
    '在建工程' = 'zaijiangongcheng',
    '生产性生物资产' = 'shengchanxingshengwuzichan',
    '使用权资产' = 'shiyongquanzichan',
    '无形资产' = 'wuxingzichan',
    '商誉' = 'shangyu',
    '长期待摊费用' = 'changqidaizhangfeiyong',
    '递延所得税资产' = 'diyansuodeshuizichan',
    '其他非流动资产' = 'qitafeiliudongzichan',
    '非流动资产合计' = 'feiliudongzichanheji',

    '资产总计' = 'zichanzongji',

    '短期借款' = 'duanqijiekuan',
    '交易性金融负债' = 'jiaoyixingjinrongfuzhai',
    '衍生金融负债' = 'yanshengjinrongfuzhai',
    '应付票据' = 'yingfupiju',
    '应付账款' = 'yingfuzhangkuan',
    '合同负债' = 'hetongfuzhai',
    '应付职工薪酬' = 'yingfuzhigongxincha',
    '应交税费' = 'yingjiaoshuifei',
    '其他应付款' = 'qitayingfukuan',
    '应付股利' = 'yingfuguli',
    '其中应付股利' = 'yingfuguli',
    '一年内到期的非流动负债' = 'yinanneidaodaqidefeiliudongfuzhai',
    '其他流动负债' = 'qitaliudongfuzhai',
    '流动负债合计' = 'liudongfuzhaiheji',

    '负债合计' = 'fuzhaiheji',



    '长期借款' = 'changqijiekuan',
    '应付债券' = 'yingfuzhaiquan',
    '租赁负债' = 'zulinfuzhai',
    '长期应付款' = 'changqiyingfukuan',
    '长期应付职工薪酬' = 'changqiyingfuzhigongxincha',
    '递延收益' = 'diyanshouyi',
    '递延所得税负债' = 'diyansuodeshuifuzhai',
    '其他非流动负债' = 'qitafeiliudongfuzhai',
    '非流动负债合计' = 'feiliudongfuzhaiheji',

    '实收资本(或股本)' = 'shishouzibenhuoguben',
    '实收资本' = 'shishouzibenhuoguben',
    '实收资本或股本' = 'shishouzibenhuoguben',
    '资本公积' = 'zibenongji',
    '减库存股' = 'jiankucungu',
    '其他综合收益' = 'qitazongheshouyi',
    '盈余公积' = 'yingyugongji',
    '未分配利润' = 'weifenpeilirun',

    '归属于母公司所有者权益合计' = 'guishumugongsisuoyouzhequanyi',
    '少数股东权益' = 'shaoshugudongquanyi',
    '股东权益合计' = 'gudongquanyiheji',


    '负债和所有者权益合计' = 'fuzhaihesuoyouzhequanyiheji',

}

const data = [
    {  // 2022
        [tableField.货币资金]: '33,853,332,020.30',   
        [tableField.交易性金融资产]: '30,150,175.79',
        [tableField.衍生金融资产]: '79,076,347.98',
        [tableField.应收票据]: '161,826,363.63',
        [tableField.应收账款]: '3,088,345,121.78',
        [tableField.预付款项]: '1,833,617,517.54',
        [tableField.其他应收款]: '200,020,169.99',
        [tableField.存货]: '14,836,164,803.32',
        [tableField.一年内到期的非流动资产]: '2,094,917,608.46',
        [tableField.其他流动资产]: '5,285,860,916.08',


        [tableField.长期股权投资]: '4,562,830,790.50',
        [tableField.其他权益工具投资]: '3,421,834,769.69',
        [tableField.其他非流动金融资产]: '1,004,495,650.73',
        [tableField.投资性房地产]: '611,689,774.19',
        [tableField.固定资产]: '33,735,140,315.80',
        [tableField.在建工程]: '3,442,742,449.82',
        [tableField.生产性生物资产]: '1,775,968,602.36',
        [tableField.使用权资产]: '770,495,004.38',
        [tableField.无形资产]: '4,648,007,395.89',
        [tableField.商誉]: '4,953,829,125.44',
        [tableField.长期待摊费用]: '281,033,357.68',
        [tableField.递延所得税资产]: '1,573,246,501.56',
        [tableField.其他非流动资产]: '8,720,677,516.31',
        [tableField.非流动资产合计]: '69,501,991,254.35',
        [tableField.资产总计]: '130,965,302,299.22',

        [tableField.短期借款]: '26,799,481,240.45',
        [tableField.衍生金融负债]: '56,313,653.68',
        [tableField.应付票据]: '880,817,234.63',
        [tableField.应付账款]: '15,925,801,104.29',
        [tableField.合同负债]: '8,912,550,921.83',
        [tableField.应付职工薪酬]: '3,642,263,720.39',
        [tableField.应交税费]: '819,428,389.29',
        [tableField.其他应付款]: '3,154,230,578.72',
        [tableField.其中应付股利]: '94,558,987.42',
        [tableField.一年内到期的非流动负债]: '982,669,875.43',
        [tableField.其他流动负债]: '995,970,486.64',
        [tableField.流动负债合计]: '62,169,527,205.35',
        [tableField.长期借款]: '9,298,211,409.85',
        [tableField.应付债券]: '3,482,300,000.00',
        [tableField.租赁负债]: '323,975,705.78',
        [tableField.长期应付款]: '34,890,000.00',
        [tableField.长期应付职工薪酬]: '4,985,711.49',
        [tableField.递延收益]: '504,355,565.37',
        [tableField.递延所得税负债]: '1,003,953,501.72',
        [tableField.非流动负债合计]: '14,652,671,894.21',
        [tableField.负债合计]: '76,822,199,099.56',

        [tableField.实收资本]: '6,399,345,318.00',
        [tableField.资本公积]: '14,235,222,819.41',
        [tableField.减库存股]: '1,074,391,877.44',
        [tableField.其他综合收益]: '-78,995,996.78',
        [tableField.盈余公积]: '3,200,065,459.00',
        [tableField.未分配利润]: '27,586,638,109.96',

        [tableField.归属于母公司所有者权益合计]: '50,267,883,832.15',
        [tableField.少数股东权益]: '3,875,219,367.51',
        [tableField.股东权益合计]: '54,143,103,199.66',
        [tableField.负债和所有者权益合计]: '130,965,302,299.22',
    },
    { // 2021

      }
]




