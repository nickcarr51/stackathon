import React from 'react';
import CanvasJSReact from './canvasjs.react';
import { truncateSong } from '../../utils';
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const SongTempo = ({ currPlaylist }) => {

  const options = {
    animationEnabled: true,
    axisY: {
      text: 'Tempo'
    },
    data: [{
      type: 'splineArea',
      xValueFormatString: "“#,##0.##”",
      dataPoints: currPlaylist.map((song, idx) => {
        const name = truncateSong(song.name);
        return {
          x: idx,
          y: (song.tempo),
          label: name
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

export default SongTempo;