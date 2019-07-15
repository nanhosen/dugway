import React, { Component }  from 'react';
import Plot from 'react-plotly.js';
import { connect } from 'react-redux'

class BarChartPlotly extends Component {
  constructor(props) {
    super(props)
  }
  render() {
  	
  	// if(this.props.props.current){
  	// 	// console.log('thisBar', this.props.props.current.offsetWidth)
  	// }
  	var dataLength = Object.keys(this.props.nwsForecast).length

    // if(dataLength!==0 && this.props.props.current){
    if(dataLength!==0){
    	if(this.props.props){
    		// console.log('im here!!!!!!!', this)
    	}
    	else{
    		// console.log('not here', this, this.props.props)
    	}
    	var x = []
    	var y = []
    	var text = []
    	var windSpeedArray = this.props.nwsForecast.map((curr, i)=>{
    		if(i<6){
    			x.push(i)
    			y.push(curr.windSpeed)
    			text.push(curr.windSpeed + ' mph')
    			return curr.windSpeed
    		}
    	// console.log('test', text)
    	})
    	var data = [
    			{
    				x,
    				y,
    				type: 'bar',
    				text: text,
    				textposition: 'inside',
    				width: 0.3,
    				marker: {
    					color: '#ff8c68'
    				}	
    			}
    		]
    	var layout = {
			  width: this.props.props,
			  // width: 950,
			  height: 100,
 				hovermode: false,
			  margin: {
			    l: 0,
			    r: 0,
			    b: 5,
			    t: 3,
			    pad: 1000
			  },
			  showlegend: false,
			  yaxis: {
	          title: '',
	          autorange: true,
	          showgrid: false,
	          zeroline: false,
	          showline: false,
	          autotick: true,
	          ticks: '',
	          showticklabels: false
	      },
			  paper_bgcolor: 'rgba(0,0,0,0)',
        plot_bgcolor: 'rgba(0,0,0,0)',
        line:{
        	width: 0.5,
        	color: 'green'
        }

			}
			var options = {
				displayModeBar: false
			}	
    	// console.log('windSpeedArray', y, x)
    	return (
        <Plot
          data = { data }
          layout = { layout }
          options = { options }
        />
      )
    //   if(this.props.divWidth){
    //     var autosize = false
    //     var width = this.props.divWidth
    //   }
    //   else{
    //     // console.log(this.props)
    //     var autosize = true
    //     var width = 'auto'
    //   }
    //   // console.log(autosize, width)
    //   var dateArray = Object.keys(allData)

      
      
      

      
      
    

    //   return (
    //     <Plot
    //       data = { chartData }
    //       layout={ layout }
    //     />
    //   )
    }
    else{
      console.log('wait......', dataLength, this.props.props, this)
      if(this.props.props.current){
      	console.log('here now!!!')
      }
      return <div>Loading</div>
    } 
  }
}


const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(BarChartPlotly)