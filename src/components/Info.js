import React, { Component } from 'react'

class Info extends Component {
  constructor(props) {
    super(props)
  }

 
  render() {
    console.log(this.props)
    return (
      <div className="card border-0" style={{height: '500px'}}>
        <div className="row no-gutters">
          <ColumnRender data={this.props} />
        </div>
      </div>
           
    )

  }
}

 function ColumnRender(props){
    var propDat = props.data.data
    // console.log(propDat)
    var fdraArray = Object.keys(propDat)
    // console.log(propDat)
    // var color = 'rgba(255,193,7,0.6)'
    const cardData = fdraArray.map((curr, i) => {
      var color = propDat[curr]["cardColor"]
      // console.log('propDat', propDat[curr]["layerColor"])
      if(propDat[curr]){
        return <div className="col" key={i}>
                 <div className= {`card ${propDat[curr]["cardColor"]}`} style={{height: '500px'}}>
                   <div className="card-header" style={{backgroundColor: color}}>
                     <h5>{propDat[curr]["prettyName"]}</h5> 
                   </div>
                   <div className="card-body" style={{backgroundColor: "white"}}>
                     <h5 className="card-title">Fire Danger Level: {propDat[curr]["level"]}</h5>
                     <p className="card-text">Precautionary Actions: {propDat[curr]["precautions"]}</p>
                   </div>
                 </div>
               </div>

      }
      else{
        return <div className="col">
                 <div  style={{height: '500px'}}>
                   <div className="card-header">
                     <h5>FDRA N/A</h5> 
                   </div>
                   <div className="card-body">
                     <p className="card-text">No Data</p>
                   </div>
                 </div>
               </div>
      }
    })
    return cardData
  }

export default Info
//<div className="card bg-danger text-white" style={{height: '500px'}}>