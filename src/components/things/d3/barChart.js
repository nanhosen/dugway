import * as d3 from "d3"


    
  const drawChart = (props) =>{
    console.log('drawChartprops', props)
    const data = [12, 5, 6, 35, 60, 30];
    const arMax = Math.max(...data)
    const firstTwo = [172, 362, [24, 144]]
    var hMult = 10
    var w = props.width
    // var w = 1110
    // var h = 30*10 + 20
    var h = (arMax/3) * hMult + 20

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
      .attr("x", (d, i) => i * props.daySpace)
      .attr("y", (d, i) => h - hMult * (d/3))
      .attr("width", 50)
      .attr("height", (d, i) => d * hMult)
      .attr("fill", "#ff8c68")
    svg.selectAll("text")  
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d, i) => (i * props.daySpace) + 2)
      .attr("y", (d, i) => h - hMult * (d/3) - 4)
      .text((d) => {return d + " mph"})
      .attr("font-size", "13px")
      .attr("font-family", "Roboto, Arial")
      .attr("fill", "#666")
  }
        
var myScale = d3.scaleLinear()
  .domain([0, 10])
  .range([0, 600]);
    
export default drawChart;

