import React, { Component } from 'react'

class Grid extends Component {
  constructor(props) {
    super(props)
  }


 
  render() {
    // renderTable(5,5)
    // return (
    //   <div className="container">
    //     <div className="row">
    //       <div className="col">
    //         1 of 2
    //       </div>
    //       <div className="col">
    //         2 of 2
    //       </div>
    //       <div className="col">
    //         3 of 3
    //       </div>
    //     </div>
    //     <div className="row">
    //       <div className="col">
    //         1 of 3
    //       </div>
    //       <div className="col">
    //         2 of 3
    //       </div>
    //       <div className="col">
    //         3 of 3
    //       </div>
    //     </div>
    //   </div>
    // )

    return (
      <div className="container">
        <RenderTable data={[5,5]}/>
      </div>
           
    )

  }
}

function RenderTable(props){
  // var widInit = 0
  // var heightInit = 0
  // while(heightInit < height){
  //   console.log(heightInit)
  //   height ++
  console.log(props)
  var result = 0;
  var hgt = 0;
  var wid = 0;
  var arrayH = []
  var arrayW = []

  do {
    result = result + hgt;
    hgt = hgt + 1;
    console.log(hgt)
    arrayH.push(hgt)
  } while (hgt < 5);

  // do {
  //   result = result + wid;
  //   wid = wid + 1;
  //   arrayW.push(wid)
  // } while (wid < height);
  console.log(arrayH)
  const gridData = arrayH.map(currH => {
    console.log(currH)
    return <div className="row"> {giveWidth()}</div>
  })
  console.log(gridData)
  return gridData



  }

function giveWidth(){
  var result = 0;
  var hgt = 0;
  var wid = 0;
  var arrayH = []
  var arrayW = []

  do {
    result = result + hgt;
    hgt = hgt + 1;
    console.log(hgt)
    arrayH.push(hgt)
  } while (hgt < 5);
  const gridData1 = arrayH.map((currH, i) => {
    console.log(currH)
    return  <div className="col">
            {`card ${i} of ${arrayH.length}`}
          </div>
          
  })
  console.log(gridData1)
  return gridData1

}

export default Grid