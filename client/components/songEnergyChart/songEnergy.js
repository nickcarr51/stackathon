import React from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SongEnergy = ({ currPlaylist }) => {

  const options = {
    animationEnabled: true,
    title: {
      text: 'Energy',
      fontFamily: 'tahoma'
    },
    axisY: {
      text: 'Energy Level'
    },
    data: [{
      type: 'splineArea',
      xValueFormatString: "#,##0.0#\"%\"",
      dataPoints: currPlaylist.map((song, idx) => {
        return {
          x: idx,
          y: (song.energy * 100)
        }
      })
    }]
  }
  return (
    <div style={{ display: 'flex', flexGrow: 1, marginTop: '20px'}}>
      <CanvasJSChart options={options} />
    </div>
  )
}

// const mapStateToProps = state => {
//   return {
//     currPlaylist: state.currPlaylist
//   }
// }

export default SongEnergy