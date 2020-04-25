import React, { Component } from 'react'

class CreateEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      amount:'',
      timeCheckIn:''
    }
  }
 
  handleChange = (event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
          event.preventDefault()
          let amount=this.state.amount
          amount =window.web3.utils.toWei(amount,'Ether')
          this.props.createEvent(this.state.name, amount,this.state.timeCheckIn)
        }}>

        <div>
          <label className="float-left"><b>Nome</b></label>
        </div>
        <div className="input-group mb-4">
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="Pippo"
            required />
          <div className="input-group-append">
          </div>
        </div>
        
        <div>
          <label className="float-left"><b>Quantità</b></label>
        </div>
        <div className="input-group mb-4">
          <input
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleChange}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
          </div>
        </div>

        <div>
          <label className="float-left"><b>Tempo check-in in secondi</b></label>
        </div>
        <div className="input-group mb-4">
          <input
            type="number"
            name="timeCheckIn"
            value={this.state.timeCheckIn}
            onChange={this.handleChange}
            ref={(input) => { this.input = input }}
            className="form-control form-control-lg"
            placeholder="0"
            required />
          <div className="input-group-append">
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block btn-lg">Crea Evento</button>
      </form>
    );
  }
}

export default CreateEvent;
