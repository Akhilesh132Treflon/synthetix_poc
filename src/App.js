
import { useEffect, useState } from 'react';
import './App.css';
import Web3, { eth } from 'web3';
import abi from './abi.json'
import ConnectWallet from './connectWallet.js';
import { setstate } from './context';
import { ethers } from 'ethers';
import CombinedOverview  from './accountoverview';
import PositionInputForm from './openposition';
import FundsManagement from './depsoit';
import ButtonAppBar from './nav';
import IndiaLogo from './dex';



function App() {
  const contracatAddress = "0x4443046fCb0EBA8237cc7e47847eCD1540942D47"
  const SETH_ADDRESS = "0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c"
const [wallet,setWallet] = useState(null)
const [provider,setProvider] = useState(null)
const [contract,setContract] = useState(null)
const[delayedOrderData,setDelyedOrderData] =  useState(null)
const[positionData,setpositionData] =  useState(null)
const[pnl,setPNL] =  useState(0)
const[freemargin,setfreemargin] =  useState(0)
useEffect(() => {
  connectContract();
}, [wallet]);
async function connectContract() {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    // await provider.send("eth_requestAccounts", []);
    // setProvider(provider)
    // const signer = provider.getSigner();
    // console.log("Account:", await signer.getAddress());
          // Create a contract instance
    const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
          // const singer = contract.connect(window.ethereum);
          setContract(contract);
  } catch (error) {
    console.log(error)
  }

     
  
}

async function fetchContractData() {
  // connectContract()
  if (contract) {
    // try {
      // const signer = provider.getSigner();

      // Call a function on the contract to retrieve data
       let data = await contract.getPosition("0x7345544850455250000000000000000000000000000000000000000000000000")
      //  console.log(data)
       setpositionData(data)
        data = await contract.getDelayedOrder("0x7345544850455250000000000000000000000000000000000000000000000000")
      //  console.log(data);
       setDelyedOrderData(data)
        data = await contract.PNL(SETH_ADDRESS)
        console.log(data)
        setPNL(data)
        data = await contract.freeMargin()
        console.log(data)
        setfreemargin(data)
      //  data = await contract.connect(signer).perpsV2SubmitDelayedOrder(SETH_ADDRESS,ethers.utils.parseUnits('-0.04', 18)
      // ,ethers.utils.parseEther("1590")); // Replace with your contract function
      // console.log(data);
    // } catch (error) {
    //   console.error('Error fetching contract data:', error);
    // }
  }
}

// Use useEffect to fetch contract data when the component mounts
useEffect(() => {
 
  fetchContractData()
}, [contract,provider]); // Trigger this effect when the 'contract' variable changes


// fetchContractData()






  return (
    <setstate.Provider value={{ wallet,setWallet,setProvider,setContract,abi, provider,contracatAddress}}> 

    <div className="App">
    <IndiaLogo/>
    {/* <ButtonAppBar/> */}
 {
  wallet ? <div>
    <div className='test'>
    <FundsManagement/>
    <PositionInputForm  datamargin={positionData?.margin} positionData={positionData}/>
    </div>

    <CombinedOverview pnl={pnl} freemargin={freemargin}  positionData={positionData} delayedOrderData={delayedOrderData}/>

  </div>: <ConnectWallet/>
 }
    </div>
    </setstate.Provider>
  );
}

export default App;
