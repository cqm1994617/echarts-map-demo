import React, {Component} from 'react';
import './App.css';
import MapView from './components/Map'

class App extends Component {

  state = {
    option: {
      title: {
        text: "中国地图",
        left: "center",
        textStyle: {
          color: "#FFFFFF",
          fontSize: 25
        }
      },
      backgroundColor: "#404a59",
      animationDuration: 1000,
      animationEasing: "cubicOut",
      animationDurationUpdate: 1000,
      geo: {
        map: "china",
        roam: true,
        label: {
          emphasis: {
            textStyle: {color: "#eee"}
          }
        },
        top: "middle",
        left: "center",
        itemStyle: {
          position: "center",
          normal: {
            areaColor: "#323c48",
            borderColor: "#111"
          },
          emphasis: {
            areaColor: "#2a333d",
            textStyle: {
              color: "#fff"
            }
          }
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <MapView
          option={this.state.option}
        >
        </MapView>
      </div>
    );
  }
}

export default App;
