
import Cryptostate from '../abis/CryptoState.json'
import Web3 from 'web3'


 const loadWeb3 = async () => {
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
  let scan;

  const loadBlockchain = async () => {
    const web3 = window.web3;
    //Load account 
    const accounts = await web3.eth.getAccounts();

    console.log(accounts)
    // Network ID
    const networkId = await web3.eth.net.getId()
    console.log(Cryptostate)
    
    const networkData =  Cryptostate.networks[networkId]
    console.log(Cryptostate.networks)
    if (networkData) {
      scan = new web3.eth.Contract( Cryptostate.abi, networkData.address)
       console.log(scan)
      console.log("successfully get contract")
      return scan

    }

  }
  export {loadBlockchain,loadWeb3}