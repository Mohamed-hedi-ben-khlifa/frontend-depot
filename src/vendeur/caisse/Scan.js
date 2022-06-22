import React, { Component } from 'react'
import BarcodeReader from 'react-barcode-reader'
 
export default class Scan extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: 'No result',
    }
 
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
    this.props.setId(data)
    console.log(this.props.id);
    
  }
  handleError(err){
    console.error(err)
  }
  render(){
 
    return(
      <div>
        <BarcodeReader
          onError={this.handleError}
          onScan={this.handleScan}
          
          />

      </div>
    )
  }
}