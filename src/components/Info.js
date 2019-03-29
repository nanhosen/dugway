import React, { Component } from 'react'
import { connect } from 'react-redux'


class Info extends Component {
  constructor(props) {
    super(props)
    // console.log('props: ',props)
    this.state = { 
     precautions: null,
     level: null,
     fdraData: {
      fdra1: {
        level: null,
        precautions: null, 
        cardColor: null,
        layerColor:null
      },
      fdra2: {
        level: null,
        precautions: null, 
        cardColor: null,
        layerColor:null
      },
      fdra3: {
        level: null,
        precautions: null, 
        cardColor: null,
        layerColor:null
      },
     }
   }
  }
  getHeight = target => {
    if (target !== null) {
      // console.log(target[Object.keys(target)[0]])
      const name = `${target[Object.keys(target)[0]].id}`
      // const name = `${target[Object.keys(target)[0]]._currentElement.props.id}`
      const height = target.offsetHeight
      // console.log(this.state[name])
      if (this.state[name] !== height) {
        // console.log(this)
        // console.log({[name]: height})
        // this.setState({ [name]: height })
      }
      return
    }
    return    
  }

  // cardColor = level => {
  //   if(level == 'Low'){
  //     return 'bg-warning'
  //   }
  //   else if(level == 'Moderate'){
  //     return 'bg-success text-white'
  //   }
  //   else if (level == 'Extreme'){
  //     return 'bg-danger text-white'
  //   }
  //   else{
  //     return 'bg-warning '
  //   }
  // } 

  componentDidUpdate(prevProps, prevState, snapshot){
    // console.log('infothis', this.props, 'prevp', prevProps, 'prevState', prevState, 'snapshot', snapshot)
    // console.log(prevProps)
    var stateData = this.props.wimsData.stateObj
    var newStateObj = {}
    for (var key in stateData){
      // console.log(stateData[key]["text"], key, 'state', this["state"]["fdraData"][key])
      newStateObj[key] = {
        level: stateData[key]["text"]["level"],
        precautions: stateData[key]["text"]["precautions"], 
        color: stateData[key]["text"]["cardColor"]
      }
    }
    // console.log(newStateObj, 'newStateObj')
    if(prevProps.wimsData.stateObj == undefined){
      // console.log(this.state, 'newState', newStateObj, 'newStateObj')
      this.setState({fdraData: newStateObj})
      // console.log(this.state, 'newState', newStateObj, 'newStateObj')
    }
    // console.log(this.state)
    // console.log(stateData)
  }


  render() {
    // var wimsData1 = this.props.wimsData[0][20107]['erc']
    // console.log(Object.keys(this.props.wimsData), this, 'inrender')
    if(this.props.wimsData.text === undefined){
      // console.log('undef')
      var levelText = 'loading'
      // var precautionText = 'precations'

     // getStuff["260110"]["text"]
      // var fdra2Text =  getStuff["260111"]["text"]
      // var fdra3Text =  get
    }
    else{
      // console.log(this.props.wimsData.valObj, 'this this')
      var getStuff = this.props.wimsData.valObj
      // console.log(getStuff[this.state.fdraStns.fdra1].text.level, 'getStuff1')
      // console.log(this.state.fdraStns.fdra1, 'state')
      // var fdra1Text = {
      //   level: getStuff["fdra1"]["text"]["level"],
      //   precauts: getStuff["fdra1"]["text"]["precautions"]
      // }
      // console.log('fdra1Text', fdra1Text)
      // levelText = getStuff[this.state.fdraStns.fdra1].text.level
      // var precauti onText = this.props.wimsData.text.precautions
      // var precautionText1 = fdra1Text["precautions"]
      // var color = this.props.wimsData.text.color
    }
    
    return (
      <div className="card border-0" style={{height: '500px'}}>
        <div className="row no-gutters">
          <div className="col">
            <div className={`card ${this.state.fdraData.fdra1.color}`} style={{height: '500px'}}>
              <div className="card-header">
                <h5>FDRA 1</h5> 
              </div>
              <div className="card-body">
                <h5 className="card-title">Fire Danger Level: {this.state.fdraData.fdra1.level}</h5>
                <p className="card-text">Precautionary Actions: {this.state.fdraData.fdra1.precautions}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={`card ${this.state.fdraData.fdra2.color}`} style={{height: '500px'}}>
              <div className="card-header">
                <h5>FDRA 2</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title">Fire Danger Level: {this.state.fdraData.fdra2.level}</h5>
                <p className="card-text">Precautionary Actions: {this.state.fdraData.fdra2.precautions}</p>
              </div>
            </div>
          </div>
          <div className="col">
            <div className={`card ${this.state.fdraData.fdra3.color}`} style={{height: '500px'}}>
              <div className="card-header">
                <h5>FDRA 3</h5>
              </div>
              <div className="card-body">
                <h5 className="card-title">Fire Danger Level: {this.state.fdraData.fdra3.level}</h5>
                <p className="card-text">Precautionary Actions: {this.state.fdraData.fdra3.precautions} </p>
              </div>
            </div>
          </div>  
        </div>  

      </div>        
    )
  }
}

const mapStateToProps = state => {
  const { wimsData } = state
  // console.log(wimsData, 'wimsData')
  return { wimsData }
}
export default connect(mapStateToProps, null)(Info)
//<div className="card bg-danger text-white" style={{height: '500px'}}>