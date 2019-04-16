import React, { Component } from 'react'

class Info extends Component {
  constructor(props) {
    super(props)
  }

 
  render() {
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
    var fdraArray = Object.keys(propDat)
    console.log(propDat)
    const cardData = fdraArray.map( (curr, i) => {
      console.log('cardData', cardData)
      if(propDat[curr]){
        return <div className="col" key={i}>
                 <div className= {`card ${propDat[curr]["cardColor"]}`} style={{height: '500px'}}>
                   <div className="card-header">
                     <h5>{propDat[curr]["prettyName"]}</h5> 
                   </div>
                   <div className="card-body">
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