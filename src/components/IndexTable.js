import React, { Component }  from 'react';
import { connect } from 'react-redux'


class IndexTable extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    var stnName  = ''
    var fcstErc = ''
    var fcstBi = ''
    var fcstDate = ''
    var obErc = ''
    var obBi = ''
    var obDate = ''
    if(Object.keys(this.props.forecastData).length>0 && this.props.stn && Object.keys(this.props.wimsData.fdraInfo).length>0){
  	  console.log('table this', this)
      var stnSelected = this.props.stn
      Object.keys(this.props.forecastData).map(curr => {
        var currStn = this.props.forecastData[curr].stations
        if(currStn.indexOf(parseInt(stnSelected)) >= 0){
          stnName = this.props.forecastData[curr].prettyName
          fcstErc = Math.round(this.props.forecastData[curr].ercFcst)
          fcstBi = Math.round(this.props.forecastData[curr].biFcst)
          // obDate = 'need to get'
          fcstDate = this.props.forecastData[curr].forecastDate
          // console.log(curr, 'xue4e', stnName, fcstErc, fcstBi, fcstDate)
        }
      })
      Object.keys(this.props.wimsData.fdraInfo).map(curr => {
        var currStn = this.props.wimsData.fdraInfo[curr].stations
        console.log('curr', curr, currStn, stnSelected)
        if(currStn.indexOf(parseInt(stnSelected)) >= 0){
          obErc = Math.round(this.props.wimsData.fdraInfo[curr].ercOb)
          obBi = Math.round(this.props.wimsData.fdraInfo[curr].biOb)
          // obDate = this.props.wimsData.fdraInfo[curr].forecastDate
          console.log(curr, 'xuee', stnName, obErc, obBi)
        }
        else{
          console.log('blah blah')
        }
      })


    }
    else{
        console.log('nope', this)
      }
    var width = this.props.divWidth ? this.props.divWidth : 700

            // <span style={{fontSize: '1.1em', fontFamily: 'Roboto, Arial'}}> <button type="button" class="btn btn-outline-dark" disabled>ERC: {fcstErc}</button><button type="button" class="btn btn-outline-dark" disabled>BI: {fcstBi}</button></span><br />
            // <span style={{fontSize: '1.1em', fontFamily: 'Roboto, Arial'}}> ERC: {fcstErc}       BI: {fcstBi}</span> <br />
            // <div class="list-group">
            //   <a href="#" class="list-group-item list-group-item-action list-group-item-info">ERC: {fcstErc}       BI: {fcstBi}</a>
            // </div>
  	return <div style={{
                // width: 200,
              // background: "#f8f9fa"
            }}>

             <table className="table table-sm table-bordered">
                <tbody>
                <tr>
                <td colspan='2'>
                Forecast ERC and BI for {fcstDate}
                </td>
                </tr>
                  <tr>
                    <td>ERC: {fcstErc}</td>
                    <td>BI: {fcstBi}</td>
                  </tr>
                </tbody>  
             </table>


              
          </div>  
  }
}


const mapStateToProps = reduxState => {
  const state = reduxState
  // console.log('this home state', state)
  return state
}
export default connect(mapStateToProps)(IndexTable)