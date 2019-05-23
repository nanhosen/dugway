import * as d3 from "d3"
import data from './data.csv'


    
  const drawChart = (props) =>{
    console.log('drawChartprops', props, data)
     var margin = {
            top: 30,
            right: 20,
            bottom: 30,
            left: 50
        };
        var width = 600 - margin.left - margin.right;
        var height = 270 - margin.top - margin.bottom;


      var x = d3.scaleLinear().range([0, width]);
      var y = d3.scaleLinear().range([height, 0]);

      // var xAxis = d3.svg.axis().scale(x)
      //     .orient("bottom").ticks(5);

      // var yAxis = d3.svg.axis().scale(y)
      //     .orient("left").ticks(5);

      var valueline = d3.line()
          .x(function (d) {
              console.log('dx',d.xVal)
              return x(d.xVal);
          })
          .y(function (d) {
              console.log('dy',d.yVal)

              return y(d.yVal);
          });
          

          console.log('valueline', valueline)

      var svg = d3.select("viz")
          .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // Get the data
      var data = [{
          xVal: 1,
          yVal: 6
      }, {
          xVal: 2,
          yVal: 7
      }, {
          xVal: 3,
          yVal: 8
      }, {
          xVal: 4,
          yVal: 9
      }, {
          xVal: 5,
          yVal: 3
      }];


      console.log('dataa', data)
      // Scale the range of the data
      x.domain(d3.extent(data, function (d) {
          return d.xVal;
      }));
      y.domain([0, d3.max(data, function (d) {
          return d.yVal;
      })]);

      svg.append("path") // Add the valueline path.
      .attr("d", valueline(data));

      svg.append("g") // Add the X Axis
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      svg.append("g") // Add the Y Axis
        .call(d3.axisLeft(y));




  }
        

    
export default drawChart;