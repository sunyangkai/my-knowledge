import React, { useEffect, useState } from 'react'

import { LineChart, LabelList, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts'
import { request } from 'src/util'
import { ignoreBalanceItem, focusProfileItem, colors } from './data'

const unit = 10000 * 10000
const format = (num) => parseFloat((num / unit).toFixed(2))

const focusData = (data) => {
  const assets = []
  const liabilities = []
  let isAssets = true
  let isOwn = false
  Object.keys(data).forEach((key) => {
    const maxNum = Math.max(...data[key])
    if (!isOwn) {
      isAssets ? assets.push({ key, value: maxNum }) : liabilities.push({ key, value: maxNum })
    }
    if (key === '资产总计') {
      isAssets = false
    }
    if (key === '负债合计') {
      isOwn = true
    }
  })
  const res = {
    assets: assets.filter((i) => !ignoreBalanceItem.includes(i.key)).sort((a, b) => b.value - a.value),
    liabilities: liabilities.filter((i) => !ignoreBalanceItem.includes(i.key)).sort((a, b) => b.value - a.value),
  }
  return res
}

export const Research = () => {
  const years = ['2022', '2021', '2020', '2019']
  const [tableData, setTableData] = useState(years.map((year) => ({ name: year })))
  const [liabilitiesData, setLiabilitiesData] = useState(years.map((year) => ({ name: year })))
  const [profileData, setProfileData] = useState(years.map((year) => ({ name: year })))
  const [analyseData, setAnalyseData] = useState(years.map((year) => ({ name: year })))

  const [assets, setAssets] = useState([])
  const [liabilities, setLiabilities] = useState([])
  useEffect(() => {
    Promise.all([
      request.get('analyse', { path: '/cdfr/balance' }),
      request.get('analyse', { path: '/cdfr/profile' }),
      request.get('analyse', { path: '/cdfr/cash' }),
      request.get('analyse', { path: '/cdfr/fixcash' }),
    ]).then(([balance, profile, cash, fixcash]) => {
      const { assets, liabilities } = focusData(balance)
      tableData.forEach((d, index) => {
        // d['营业收入'] = format(profile['一、营业总收入'][index]) // 净利润（净亏损以“－”号填列）
        d['净利润'] = format(profile[`五、净利润（净亏损以“－”号填列）`][index])
        assets.forEach((item) => {
          d[item.key] = format(balance[item.key][index])
        })
      })

      liabilitiesData.forEach((d, index) => {
        d['净利润'] = format(profile[`五、净利润（净亏损以“－”号填列）`][index])
        liabilities.forEach((item) => {
          d[item.key] = format(balance[item.key][index])
        })
      })

      profileData.forEach((d, index) => {
        d['经营活动产生的现金流量净额'] = format(fixcash['经营活动产生的现金流量净额'][index])
        focusProfileItem.forEach((key) => {
          try {
            d[key] = format(profile[key][index])
          } catch (e) {
            console.log('error')
            console.log(key)
          }
        })
      })
      analyseData.forEach((d, index) => {
        d['毛利率'] = +(((profile['其中：营业收入'][index] - profile['其中：营业成本'][index]) / profile['其中：营业收入'][index]) * 100).toFixed(2)
        d['费用率'] = +(
          ((profile['销售费用'][index] + profile['管理费用'][index] + (profile['财务费用'][index] > 0 ? profile['财务费用'][index] : 0)) /
            profile['其中：营业收入'][index]) *
          100
        ).toFixed(2)
        d['研发费用率'] = +((profile['研发费用'][index] / profile['其中：营业收入'][index]) * 100).toFixed(2)
        d['费用毛利占比'] = +(
          ((profile['销售费用'][index] + profile['管理费用'][index] + (profile['财务费用'][index] > 0 ? profile['财务费用'][index] : 0)) /
            (profile['其中：营业收入'][index] - profile['其中：营业成本'][index])) *
          100
        ).toFixed(2)
        d['营业利润率'] = +(((profile['三、营业利润（亏损以“－”号填列）'][index]) / profile['其中：营业收入'][index]) * 100).toFixed(2)

      })

      setAnalyseData([...analyseData.reverse()])
      setProfileData([...profileData.reverse()])
      setLiabilitiesData([...liabilitiesData.reverse()])
      setAssets(assets)
      setLiabilities(liabilities)
      setTableData([...tableData.reverse()])
    })
  }, [])
  return (
    <div className="flex f-warp">
      <div style={{ width: '600px', marginTop: '50px' }}>
        <ResponsiveContainer width="100%" height={800}>
          <LineChart data={tableData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis>
              <Label value="亿元" position="insideBottom" offset={30} angle={0} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line key={'净利润'} type="monotone" dataKey={'净利润'} stroke={colors[colors.length - 1]} name={'净利润'}>
              <LabelList dataKey={'净利润'} position="top" />
            </Line>
            {assets.map((line, index) => (
              <Line key={line.key} type="monotone" dataKey={line.key} stroke={colors[index]} name={line.key}>
                {index < 5 && <LabelList dataKey={line.key} position="top" />}
              </Line>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '600px', marginTop: '50px' }}>
        <ResponsiveContainer width="100%" height={800}>
          <LineChart data={liabilitiesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis>
              <Label value="亿元" position="insideBottom" offset={30} angle={0} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line key={'净利润'} type="monotone" dataKey={'净利润'} stroke={colors[colors.length - 1]} name={'净利润'}>
              <LabelList dataKey={'净利润'} position="top" />
            </Line>
            {liabilities.map((line, index) => (
              <Line key={line.key} type="monotone" dataKey={line.key} stroke={colors[index]} name={line.key}>
                {index < 5 && <LabelList dataKey={line.key} position="top" />}
              </Line>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '600px', marginTop: '50px' }}>
        <ResponsiveContainer width="100%" height={800}>
          <LineChart data={profileData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis>
              <Label value="亿元" position="insideBottom" offset={30} angle={0} />
            </YAxis>
            <Tooltip />
            <Legend />
            <Line
              key={'经营活动产生的现金流量净额'}
              type="monotone"
              dataKey={'经营活动产生的现金流量净额'}
              stroke={'#099f3b'}
              name={'经营活动产生的现金流量净额'}
            >
              <LabelList dataKey={'经营活动产生的现金流量净额'} position="top" />
            </Line>
            {focusProfileItem.map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} name={key}>
                {index < 5 && <LabelList dataKey={key} position="top" />}
              </Line>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: '600px', marginTop: '50px' }}>
        <ResponsiveContainer width="100%" height={800}>
          <LineChart data={analyseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
            <YAxis>
              <Label value="百分点" position="insideBottom" offset={30} angle={0} />
            </YAxis>
            <Tooltip />
            <Legend />
            {['营业利润率','毛利率', '费用率', '研发费用率', '费用毛利占比'].map((key, index) => (
              <Line key={key} type="monotone" dataKey={key} stroke={colors[index]} name={key}>
                {index < 5 && <LabelList dataKey={key} position="top" />}
              </Line>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
