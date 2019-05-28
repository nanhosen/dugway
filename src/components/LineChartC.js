import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

import './line-chart.css';

class LineChart extends Component {

  constructor(props){
    super(props);

      let {elementWidth, elementHeight} = props;
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};

      this.x = d3.scaleTime().range([0, elementWidth - this.margin.left - this.margin.right]);
      this.y = d3.scaleLinear().range([elementHeight - this.margin.top - this.margin.bottom, 0]);
      this.elementWidth = elementWidth;
      this.elementHeight = elementHeight;

      this.state = {
          data: null
      };

  }

  componentWillMount(){
      this.dataFromTSV();
  }

  get xAxis(){
      return d3.axisBottom(this.x).ticks(5);
  }

  get yAxis(){
      return d3.axisLeft(this.y).ticks(5);
  }

  drawXAxis(){
      d3.select(this.refs.x).call(this.xAxis);
  }

  drawYAxis(){
      d3.select(this.refs.y).call(this.yAxis);
  }

  get line(){
      return d3.line()
          .x((d)=> (this.x(d.date)))
          .y((d)=> (this.y(d.close)));
  }

  path(){
     return (<path className="line" d={this.line(this.state.data)}/>);
  }

  dataFromTSV(path){

    path = path || 'data.tsv';

    d3.tsv(path, (err, data)=>{

        data = data.map((d)=>({close: +d.close,
                               date: d3.timeParse("%d-%b-%y")(d.date)
                              }));
        
        this.x.domain(d3.extent(data, (d)=> d.date) );
        this.y.domain([0, d3.max(data, (d)=> (d.close) )]);
        this.setState({data: data});
        
    });

  }


  render() {
    return (
      <svg width={this.elementWidth} height={this.elementHeight}>

          <g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
                  {this.state.data ? this.path() : null}

              <g ref="x" className="x axis" transform={`translate(0, ${this.elementHeight - this.margin.top - this.margin.bottom})`}>
                  {this.state.data ? this.drawXAxis() : null}
              </g>

              <g ref='y' className="y axis">
                  {this.state.data ? this.drawYAxis() : null}
              </g>
              
          </g>

      </svg>
    );
  }
}


LineChart.propTypes = {
  elementWidth: PropTypes.number.isRequired,
  elementHeight: PropTypes.number.isRequired
};

export default LineChart;