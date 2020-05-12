import React, { Component } from 'react'

import images from '../Images/images.jpg'

class Register extends Component {
      
  

  render() {
    return(
        <>{ this.props.events.map((event, key) => {
          let event_id= event._id
          let amount=event._amount
          return (
              <form  >
                <div Nameclass="col-lg-4 col-md-6 mb-4" >
                  <div className="card h-100"></div>
                    <h5>{event._nameEvent} Ether: {window.web3.utils.fromWei(event._amount.toString(), 'Ether')} Id: {event._id}</h5>
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <img src={images} alt="images" />
                      </div>
                    </div>
                  <button 
                    className="btn btn-primary btn-block btn-lg"
                    name={event._id}
                    onClick={(event) =>{
                      this.props.register(event_id,amount)
                    }}
                    style={{ maxWidth: '225px' }} 
                    >Registrati</button>
                    <p>&nbsp;</p>
                  </div>
                </form>
          )
        })}</>
    );
  }
}

export default Register;
