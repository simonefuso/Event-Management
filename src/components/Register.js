import React, { Component } from 'react'

import parasite from '../Images/media/parasite.jpg'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            let amount,Id=1
            amount = window.web3.utils.toWei('2', 'Ether')
            this.props.register(Id,amount)
            event.preventDefault()
          }}>
          <div >
            <h5>Parasite 2 ETH</h5>
            <div className="input-group-append">
              <div className="input-group-text">
                <img src={parasite} alt="parasite" />
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg"
          style={{ maxWidth: '250px' }} 
          >Registrati</button>
        </form>
    );
  }
}

export default Register;
