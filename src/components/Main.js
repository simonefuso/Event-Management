import React, { Component } from 'react'
import Register from './Register'
import CreateEvent from './CreateEvent'
import CheckIn from './CheckIn'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentForm: 'register'
    }
  }

  render() {
    let content
    if(this.state.currentForm === 'register') {
      content = <Register
        register={this.props.register}
      />
    } else if(this.state.currentForm === 'createEvent')  {
      content = <CreateEvent
        createEvent={this.props.createEvent}
      />
    } else {
        content = <CheckIn
        checkIn={this.props.checkIn}
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
