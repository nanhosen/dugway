import React, { useState } from 'react'

export function Info(props){
  const [color, setColor] = useState('red')
  console.log(props) 
  if(!props.data){
    console.log('no data yet', props)
    var textPrec = 'no data'
    var textLevel = 'no data'
    var color1 = 'bg-warning'
    var d
  }
  else{
    console.log('now there is data', props)
    var textPrec = props.data.fdra1.text.precautions
    var textLevel = props.data.fdra1.text.level
    var color1 = props.data.fdra1.text.cardColor
    var color2 = props.data.fdra2.text.cardColor
    var color3 = props.data.fdra3.text.cardColor
  }
  return (
    <div className="card border-0" style={{height: '500px'}}>
      <div className="row no-gutters">
        <div className="col">
          <div className= "card bg-warning" style={{height: '500px'}}>
            <div className="card-header">
              <h5>FDRA 1</h5> 
            </div>
            <div className="card-body">
              <h5 className="card-title">Fire Danger Level: {textLevel}</h5>
              <p className="card-text">Precautionary Actions: {textPrec}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className= {`card ${color2}`} style={{height: '500px'}}>
            <div className="card-header">
              <h5>FDRA 2</h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">Fire Danger Level: text</h5>
              <p className="card-text">Precautionary Actions: text</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className= "card bg-warning" style={{height: '500px'}}>
            <div className="card-header">
              <h5>FDRA 3</h5>
            </div>
            <div className="card-body">
              <h5 className="card-title">Fire Danger Level: text</h5>
              <p className="card-text">Precautionary Actions: text </p>
            </div>
          </div>
        </div>  
      </div>  

    </div>        
  )
}
