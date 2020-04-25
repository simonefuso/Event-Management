import React, { Component } from 'react'

import parasite from '../Images/media/parasite.jpg'

class CheckIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            this.props.checkIn(1)
          }}>
          <div >
              <h5>Parasite 2 ETH</h5>
          <div className="input-group-append">
              <div className="input-group-text">
                <img src={parasite} />
              </div>
            </div>
            </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg"
          style={{ maxWidth: '250px' }}
          >Check-in</button>
        </form>
    );
  }
}

export default CheckIn;
