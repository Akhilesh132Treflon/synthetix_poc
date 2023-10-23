import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers';
import './PositionOverview.css'; // Import your custom CSS stylesheet

function PositionOverview({ position }) {
  // Check for errors, and display an error message if there's an issue

const [liquidationPrice,setliquidationPrice] = useState()
  // Convert and format the data
  const formattedMargin = position?.margin ? ethers.utils.formatUnits(position?.margin, 18) : '?'; // Assuming 18 decimal places
  const formattedSize = position?.size ? ethers.utils.formatUnits(position?.size, 18) : '?'; // Assuming 18 decimal places
  const formattedLastPrice = position?.lastPrice ? ethers.utils.formatUnits(position?.lastPrice, 18) : '?'; // Assuming 18 decimal places
  const getPrice =async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);
   
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
    
            // Create a contract instance
const abi = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "liquidationPrice",
    "outputs": [
      {
        "name": "price",
        "type": "uint"
      },
      {
        "name": "invalid",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
const contracatAddress = "0x4443046fCb0EBA8237cc7e47847eCD1540942D47"
const SETH_ADDRESS = "0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c"
        const contract = new ethers.Contract("0xf2D9a9A2d79fFC36912bE87d504FA476A339E1Bb", abi, provider);
        const data = await contract.liquidationPrice(contracatAddress)
        setliquidationPrice(data.price/1e18)
        console.log("liqdation price ",data)
  }

  useEffect(()=>{
    getPrice()
  },[])
  return (


    <div className="position-overview">
      <h2>Position Overview</h2>
      <div class="margin">
          <h3>Margin</h3>
          <p className="amount">{formattedMargin} USD</p>
        </div>
        <div class="size">
    <h3>Size</h3>
          <p className="amount">{formattedSize} ETH</p>
        </div>
        <div class="last-price">
    <h3>Last Price</h3>
          <p className="amount">{formattedLastPrice} USD</p>
        </div>
        <div class="leverage">
    <h3>Leverage</h3>
          <p className="amount">{((formattedSize*formattedLastPrice)/formattedMargin)?.toFixed(2)} USD</p>
        </div>
        <div class="liquidation-price">
    <h3>Liquidation Price</h3>
          <p className="amount">{(liquidationPrice)?.toFixed(2) } USD</p>
        </div>
      </div>
    
  );
}

export default PositionOverview;
