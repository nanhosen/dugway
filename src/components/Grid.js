import React, { Component } from 'react'

class Grid extends Component {
  constructor(props) {
    super(props)
  }

 
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col">Column</div>
          <div class="col">Column</div>
          <div class="w-100"></div>
          <div class="col">Column</div>
          <div class="col">Column</div>
        </div>
      </div>
           
    )

  }
}

export default Grid