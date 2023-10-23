import React, { useContext, useEffect, useState } from "react";
import "./PositionInputForm.css";
import { setstate } from "./context";
import { BigNumber, ethers } from "ethers";
import { alertClasses } from "@mui/material";
function PositionInputForm({ positionData , datamargin}) {
  const [priceInput, setPriceInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");
  const SETH_ADDRESS = "0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c";
  const { contract, wallet,setProvider,setContract, contracatAddress,abi} = useContext(setstate);
  console.log(positionData)
const [price,setprice] = useState(0)
const [levearge, setLeverage] = useState(0)
  // Handler for opening a position
  const onInputchange = (e)=>{
   setSizeInput(e.target.value)
   console.log("margin",datamargin.toString())
   
   
  }

  useEffect(()=>{
    if(datamargin> 0){
    
      const lev =  ( (sizeInput * priceInput) / (datamargin/1e18))
      setLeverage(lev)
    const requiredMargin =  ( sizeInput * priceInput /lev)
    if(requiredMargin > datamargin) {
      alert("leverage is too high")
      setLeverage(0)
      return
    }

    }
    else {
      alert("Not enough margin please deposti into contract ")
    }
   
  },[sizeInput])
  
  const handleOpenPosition = async () => {
if(datamargin  == 0) {
  alert("Not enough margin  to open position please deposti into contract ")

  return 
}

    try {
           // Validate input (e.g., ensure the price and size are valid)
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    setProvider(provider)
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    
            // Create a contract instance

        const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
        console.log("data--->",contract)
        let size 
      
        const data = await contract
        .connect(wallet)
        .perpsV2SubmitDelayedOrder(
          SETH_ADDRESS,
          ethers.utils.parseEther(sizeInput.toString()),
          ethers.utils.parseEther(priceInput.toString())
        ); // Replace with your contract function
        data.wait();
        // Location.reload()
      console.log(data)
      alert("Position submited will take some time to excute")
    } catch (error) {
        
    }
 

    
    // Perform the logic to open the position with the provided inputs
    // Example:
    // onOpenPosition(priceInput, sizeInput);
  };
  const getPrice =async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    setProvider(provider)
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
  
            // Create a contract instance

        const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
        const data = await contract.getAssetPrice(SETH_ADDRESS)
        setprice(data.price/1e18)
  }
useEffect(()=>{
    getPrice()
},[])
  const canacleDelyedOrder = async ()=>{
    
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
    setProvider(provider)
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    
            // Create a contract instance

        const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
        console.log("data--->",contract)
        
        const data = await contract.connect(wallet).perpsV2CancelDelayedOrder("0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c"); 
        data.wait();
        
      console.log(data)
  }
  const formattedSize = positionData?.size ? ethers.utils.formatUnits(positionData?.size, 18) : '?'; // Assuming 18 decimal places

  return (
    <div className="position-input-form">

      <h2>Open Position</h2>
      <div className="input-field">
        <label>Price:</label>
        <input
         className="input-field"
          type="number"
          placeholder="ETH Price (USD)"
          value={priceInput}
          onChange={(e) => setPriceInput(e.target.value)}
        />
      </div>
      <div className="input-field">
        <label>Size:</label>
        <input
         className="input-field"
          type="number"
          placeholder="Size (ETH)"
          value={sizeInput}
          onChange={onInputchange}
        />
      </div>
      <div class="market-info">
  <div class="info-row">
    <div class="info-label">Market Price:</div>
    <div class="info-value">{price}</div>
  </div>
  <div class="info-row">
    <div class="info-label">User SETH Margin:</div>
    <div class="info-value">{datamargin/1e18}</div>
  </div>
  <div class="info-row">
    <div class="info-label">Leverage:</div>
    <div class="info-value">{levearge}</div>
  </div>
  <div class="info-row">
    <div class="info-label">Cost:</div>
    <div class="info-value">{sizeInput * price}</div>
  </div>
</div>
      {
        sizeInput < 0 ?  <button className="red-button" onClick={handleOpenPosition}>
        Open short 
        </button> :
 <button className="open-position-button  " onClick={handleOpenPosition}>
 Open Long
 </button>

      }
     
    {/* <div>
    <button className="open-position-button" onClick={canacleDelyedOrder}>
      canacleDelyedOrder
      </button> */}
    {/* </div> */}
    </div>
  );
}

export default PositionInputForm;
