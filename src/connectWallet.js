import React, { useContext, useState } from 'react';
import { ethers } from 'ethers';
import { setstate } from './context';
import "./wall.css"
function ConnectWallet() {
   const {wallet,setWallet,setProvider} = useContext(setstate)
  // Function to connect the wallet
  async function connectWallet() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request access to the user's MetaMask wallet
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
        setProvider(provider)
        const signer = provider.getSigner();


        setWallet(signer);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      console.error('MetaMask is not installed');
    }
  }

  return (
    <div class="center-container">
      {wallet ? (
        <p>Connected Wallet Address: {wallet}</p>
      ) : (
        <button className="open-position-button center-button" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default ConnectWallet;
