import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import echarts from 'echarts'
import cityMap from '../map/china-main-city-map'
import axios from 'axios'

const noInfoList = ["南海诸岛"]

export default class Map extends PureComponent {

  static propTypes = {
    option: PropTypes.object
  }

  step = 1
  mapCache = null
  chart = null
  reachEnd = false

  componentDidMount() {
    this.init()
  }

  async init() {
    if (this.chart) {
      this.restore()
    }

    this.step = 1
    this.reachEnd = false

    const res = await axios.get('http://47.110.151.199/map-server/china')
    const CHINAJSON = res.data.data

    echarts.registerMap('china', CHINAJSON)
    const chart = echarts.init(ReactDOM.findDOMNode(this))
    chart.setOption(this.props.option)

    if (!this.chart) {
      chart.on('click', params => {
        if (!noInfoList.includes(params.name)) {
          this.showChildMap(params)
        }
      })
      chart.on('dblclick', params => {
        if (this.step > 1) {
          this.init()
        }
      })
    }
    this.chart = chart
  }

  restore() {
    this.chart.dispatchAction({
      type: 'restore'
    })
  }

  async showChildMap(params) {
    const cityName = cityMap[params.name]

    if (this.reachEnd) {
      return 
    }
    this.restore()
    this.step++
    if (this.step > 2 && !cityName) {

      const sMap = this.mapCache.features.filter(item => item.properties.name === params.name)

      echarts.registerMap(params.name, {
        "type":"FeatureCollection",
        "features":sMap
      })

      this.reachEnd = true

      this.chart.setOption({
        title: this.props.option.title,
        geo: {
          map: params.name
        }
      })
    } else {

      const obj = {
        2: `map-server/province/${params.name}`,
        3: `map-server/city/${cityName}`
      }

      const url = obj[this.step]
      const res = await axios.get(`http://47.110.151.199/${url}`)
      const data = res.data.data

      this.mapCache = JSON.parse(data)

      echarts.registerMap(params.name, data)

      this.chart.setOption({
        title: this.props.option.title,
        geo: {
          map: params.name
        }
      })
    }
  }

  render() {
    return (
      <div style={{ width: '100%', height: '600px' }}>

      </div>
    )
  }
}