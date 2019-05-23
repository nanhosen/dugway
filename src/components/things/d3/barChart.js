import * as d3 from "d3"


    
  const drawChart = (props) =>{
    console.log('drawChartprops', props)
    const data = [12, 5, 6, 4, 9, 30];
    const firstTwo = [172, 362]
    // var w = props
    var w = 1110
    var h = 500
    console.log(w/data.length/2, w - w/data.length/2)

    var x = d3.scaleLinear()
      .domain([0, 12])
      .range([w/data.length/2, 1110])
    
    const svg = d3.select(".viz")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .style("margin-left", 50);
                  
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      // .attr("x", function (d) { return (x(d) - w / data.length / 2) + 1; })
      .attr("x", (d, i) => i * 189)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 50)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
      .text("hi")
    svg.selectAll("text")  
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => i * 189)
      .attr("y", (d, i) => d + 1)
      .text((d) => {return d})

  }
        
var myScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);
    
export default drawChart;