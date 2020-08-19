import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { truncateSong } from '../../utils';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SongEnergy = ({ currPlaylist }) => {

  const options = {
    animationEnabled: true,
    axisY: {
      text: 'Energy Level'
    },
    data: [{
      type: 'splineArea',
      xValueFormatString: "“#,##0.##”",
      dataPoints: currPlaylist.map((song, idx) => {
        const name = truncateSong(song.name);
        return {
          // x: idx,
          x: idx,
          y: (song.energy * 100),
          label: name,
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