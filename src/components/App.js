import React, { Component } from 'react'
import Web3 from 'web3'
import ContrattoA from '../abis/ContrattoA.json'
import ContrattoB from '../abis/ContrattoB.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ 
      account: accounts[0]
    })

    // Load ContrattoA
    const networkId =  await web3.eth.net.getId()
    const contrattoAData = ContrattoA.networks[networkId]
    if(contrattoAData) {
      const contrattoa = new web3.eth.Contract(ContrattoA.abi, contrattoAData.address)
      this.setState({ contrattoa })
      const eventCount = await contrattoa.methods.eventCount().call()
      this.setState({ eventCount })
      // Load Posts
      for (var i = 1; i <= eventCount; i++) {
        const event = await contrattoa.methods.events(i).call()
        this.setState({
          events: [...this.state.events, event]
        })
      }
    } else {
      window.alert('ContrattoA contract not deployed to detected network.')
    }

    // Load contrattoB
    const contrattoBData = ContrattoB.networks[networkId]
    if(contrattoBData) {
      const contrattob = new web3.eth.Contract(ContrattoB.abi, contrattoBData.address)
      this.setState({ contrattob })
    } else {
      window.alert('ContrattoB contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  createEvent = (name,amount,timeCheckIn) => {
    this.setState({ loading: true })
    this.state.contrattoa.methods.createEvent(name,amount,timeCheckIn).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
    })
  }
  
  register = (Id,amount) => {
    this.setState({ loading: true })
      this.state.contrattoa.methods.register(Id).send({ value:amount  , from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
    })
  }

  checkIn = (Id) => {
    this.setState({ loading: true })
      this.state.contrattob.methods.checkIn(Id).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
    })
  }

  transferBalance = (Id) => {
    this.setState({ loading: true })
      this.state.contrattob.methods.transferBalance(Id).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({ loading: false })
    })
  }
  
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contrattob: {},
      contrattoa: {},
      eventCount: 0,
      events: [],
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        createEvent={this.createEvent}
        register={this.register}
        checkIn={this.checkIn}
        transferBalance={this.transferBalance}
        events={this.state.events}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '900px' }}>
              <div className="content mr-auto ml-auto">
                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
