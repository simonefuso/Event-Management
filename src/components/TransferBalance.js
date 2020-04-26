import React, { Component } from 'react'

import parasite from '../Images/media/parasite.jpg'

class TransferBalance extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            this.props.transferBalance(1)
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
          >Trasferisci</button>
        </form>
    );
  }
}

export default TransferBalance;
