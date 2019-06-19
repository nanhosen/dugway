import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'



class ButtonChart extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var trace1 = {
      x: [1, 2, 3, 4],
      y: [10, 15, 13, 17],
      mode: 'markers'
    };

    var trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 10],
      mode: 'lines'
    };

    var updatemenus=[
        {
            buttons: [   
                {
                    args: [{'visible': [true, false, false]}],
                    label: 'One',
                    method: 'update'
                },
                {
                    args: [{'visible': [false, true, false]}],
                    label:'Two',
                    method:'update'
                },
                {
                    args: [{'visible': [false, false, true]}],
                    label:'Three',
                    method:'update'
                },
                {
                    args: [{'visible': [true, true, true]}],
                    label:'All',
                    method:'update'
                }             
            ],
            direction: 'left',
            pad: {'r': 10, 't': 10},
            showactive: true,
            type: 'buttons',
            x: 0.15,
            xanchor: 'left',
            y: 1.1,
            yanchor: 'top' 
        }
    ]

    var trace3 = {
      x: [1, 2, 3, 4],
      y: [12, 9, 15, 12],
      mode: 'lines+markers'
    };

    var data = [ trace1, trace2, trace3 ];

    var layout = {
      updatemenus:updatemenus
    };
      return (
      <Plot
        data = { data }
        layout = { layout }
      />
    )
  }

}

function getBarColor(number){
  var numObj = {
    1: '#2cc74f', 
    2: '#faeb1e',
    3: '#e5a733',
    4: '#e32d19',
    5: '#cf19e3'
  }
  // console.log(numObj[number])
  return numObj[number]
}
const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(ButtonChart)