import React, { useEffect, useState } from 'react'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { message } from 'antd'
import axios from 'axios'

import DropdownMenu from './DropdownMenu'

import './App.css'

const App: React.FC = () => {
  const [state, setState] = useState()

  const devrel = [
    'Nathan Binding',
    'Lauri Cerneck',
    'Trey Cottingham',
    'Sonny Espinoza',
    'Frank Faustino',
    'Richelle Herrli',
    'Nicholas Ho',
    'Ram Kavasseri',
    'Emily Lucek',
    'Joel McIntyre',
    'Paul Petyo',
    'Brie Ruse',
    'Aditya Singh',
    'Michael Szekley',
    'Mike Tomko',
    'Ricardo Ventura'
  ]

  async function handleMenuClick({ key }: any) {
    try {
      message.info('Click on menu item.')
      console.log(devrel[key])
      const result = await axios.get(`http://localhost:8888/stats?name=${devrel[key]}`)
      console.log(result)
      setState(result.data)
    } catch (e) { console.error(e) }
  }

  useEffect(() => {
    am4core.useTheme(am4themes_animated)

    let chart = am4core.create('chartdiv', am4charts.XYChart)
    chart.hiddenState.properties.opacity = 0

    chart.paddingRight = 20

    // let data = []
    // let open = 100
    // let close = 250

    // const endDate = new Date()
    // for (let i = 1; i < 366; i++) {
    //   open += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 4)
    //   close = Math.round(open + Math.random() * 5 + i / 5 - (Math.random() < 0.5 ? 1 : -1) * Math.random() * 2)
    //   data.push({ date: new Date(2019, 0, i), open, close })
    // }

    chart.data = state

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.tooltip!.disabled = true

    let series = chart.series.push(new am4charts.LineSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.openValueY = 'open'
    series.dataFields.valueY = 'close'
    series.tooltipText = 'open: {openValueY.value} close: {valueY.value}'
    series.sequencedInterpolation = true
    series.fillOpacity = 0.3
    series.defaultState.transitionDuration = 1000
    series.tensionX = 0.8

    let series2 = chart.series.push(new am4charts.LineSeries())
    series2.dataFields.dateX = 'date'
    series2.dataFields.valueY = 'open'
    series2.sequencedInterpolation = true
    series2.defaultState.transitionDuration = 1500
    series2.stroke = chart.colors.getIndex(6)
    series2.tensionX = 0.8

    chart.cursor = new am4charts.XYCursor()
    chart.cursor.xAxis = dateAxis
    chart.scrollbarX = new am4core.Scrollbar()

    return () => {
      if (chart && chart.dispose) {
        chart.dispose()
      }
    }
  }, [state])

  return (
    <div>
      <DropdownMenu options={devrel} handleMenuClick={handleMenuClick} />
      <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
    </div>
  )
}

export default App
