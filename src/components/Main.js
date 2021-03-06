import React, { Component } from 'react'
import Register from './Register'
import CreateEvent from './CreateEvent'
import CheckIn from './CheckIn'
import TransferBalance from './TransferBalance'


class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'createEvent'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'register') {
      content = <Register
        register={this.props.register}
        events={this.props.events}
      />
    } else if(this.state.currentForm === 'createEvent')  {
      content = <CreateEvent
        createEvent={this.props.createEvent}
      />
    } else if(this.state.currentForm === 'checkIn'){
        content = <CheckIn
        checkIn={this.props.checkIn}
        events={this.props.events}
      />
    } else {
        content = <TransferBalance
        transferBalance={this.props.transferBalance}
        events={this.props.events}
      />
    }


    return (
      <div id="content" className="mt-3">

        <div className="d-flex justify-content-between mb-3">
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'register' })
              }}
            >
            Registrati
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'createEvent' })
              }}
            >
            Crea Evento
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'checkIn' })
              }}
            >
            Check-in
          </button>
          <span className="text-muted">&lt; &nbsp; &gt;</span>
          <button
              className="btn btn-light"
              onClick={(event) => {
                this.setState({ currentForm: 'transferBalance' })
              }}
            >
            Owner
          </button>
        </div>

        <div className="card mb-4" >

          <div className="card-body">

            {content}

          </div>

        </div>

      </div>
    );
  }
}

export default Main;
