import React from 'react';
import CanvasJSReact from './canvasjs.react';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SongDanceability = ({ currPlaylist }) => {

  const options = {
    animationEnabled: true,
    title: {
      text: 'Danceability',
      fontFamily: 'tahoma'
    },
    axisY: {
      text: 'Danceability'
    },
    data: [{
      type: 'splineArea',
      xValueFormatString: "#,##0.0#\"%\"",
      dataPoints: currPlaylist.map((song, idx) => {
        return {
          x: idx,
          y: (song.danceability * 100)
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

export default SongDanceability