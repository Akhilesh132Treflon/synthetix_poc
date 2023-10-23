import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import "./FundsManagement.css"; // Import the component's CSS stylesheet
import { setstate } from "./context";

// Initialize your contracts here (replace with actual contract instances)
// const sethContract = new ethers.Contract(sethContractAddress, sethContractAbi, signer);
// const dexpoenentContract = new ethers.Contract(dexpoenentContractAddress, dexpoenentContractAbi, signer);

function FundsManagement() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmountSeth, setWithdrawAmountSeth] = useState("");
  const [withdrawAmountDexpoenent, setWithdrawAmountDexpoenent] = useState("");
  const { contract, wallet, setProvider, setContract, contracatAddress, abi } =
    useContext(setstate);
  const SETH_ADDRESS = "0x111BAbcdd66b1B60A20152a2D3D06d36F8B5703c";
  const handleDeposit = async () => {
try {
        // Validate input (e.g., ensure the price and size are valid)
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
    
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
    
        // Create a contract instance
    
        const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
    
        //    Replace with your contract function
    
        let data = await contract
          .connect(wallet)
          .modifyAccountMargin(ethers.utils.parseEther(depositAmount.toString())); // Replace with your contract function
        data.wait();
       alert("funds deposit into dexponenet contract ")
} catch (error) {
    console.log(error)
}

    // Perform the logic to open the position with the provided inputs
    // Example:
    // onOpenPosition(priceInput, sizeInput);
  };
  const depositAmountINtoSETH = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
    
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
    
        // Create a contract instance
    
        const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
        let data = await contract
          .connect(wallet)
          .perpsV2ModifyMargin(
            SETH_ADDRESS,
            ethers.utils.parseEther(depositAmount.toString())
          );
        data.wait();
        // Location.reload()
        console.log(data);
        alert("funds deposit into SETH contract ")
    } catch (error) {
        console.log(error)
    }
  
  };

  const withdrawFromSETH = async () => {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        // Prompt user for account connections
        await provider.send("eth_requestAccounts", []);
    
        const signer = provider.getSigner();
        console.log("Account:", await signer.getAddress());
    
        // Create a contract instance
    
        const contract = new ethers.Contract(contracatAddress, abi.abi, provider);
    
        let data = await contract
          .connect(wallet)
          .perpsV2WithdrawAllMargin(SETH_ADDRESS); // Replace with your contract function
        data.wait();
        alert("funds withdrawal from SETH contract ")
    } catch (error) {
        console.log(error)
    }
 
  };
  const handleWithdrawSUSD = async () => {
try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Prompt user for account connections
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    // Create a contract instance

    const contract = new ethers.Contract(contracatAddress, abi.abi, provider);

    let data = await contract
      .connect(wallet)
      .modifyAccountMargin(
        ethers.utils.parseEther(withdrawAmountSeth.toString())
      ); // Replace with your contract function
    data.wait();
    alert("funds withdrawal from Dexponent contract ")
} catch (error) {
    console.log(error)
}

    // Location.reload()
    //   console.log(data)
  };

  const handleWithdrawDexpoenent = async () => {
    // if (withdrawAmountDexpoenent === '') return; // Handle empty input
    // const tx = await dexpoenentContract.withdraw(ethers.utils.parseUnits(withdrawAmountDexpoenent, 18));
    // await tx.wait();
    // setWithdrawAmountDexpoenent('');
  };

  return (
    <div className="funds-management">
      <h1>Funds Management</h1>
      <div className="section">
        <p>Deposit Funds</p>
        <div className="input-field">
        <label>Amount:</label>
        <input
          className="input-field"
          type="text"
          placeholder="Amount (SUSD)"
        
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />
          </div>
       
        <div className="btn">
          <button className="button" onClick={handleDeposit}>
             dexponent 
          </button>
          <button className="button" onClick={depositAmountINtoSETH}>
             Synthetix 
          </button>
        </div>
      </div>
      <div className="section">

        <p>Withdraw Funds (SUSD)</p>
        <div className="input-field">
        <label>Amount:</label>
        <input
          className="input-field"
          type="text"
          placeholder="Amount (SUSD)"
          value={withdrawAmountSeth}
          onChange={(e) => setWithdrawAmountSeth(e.target.value)}
        /></div>
        <div className="btn" >
        <button className="button" onClick={handleWithdrawSUSD}>
              dexponent 
          </button>
          <button className="button" onClick={withdrawFromSETH}>
            Senthetix  
          </button>
    
        </div>
      </div>
      {/* <div className="section">
        <h2>Withdraw Funds (DEXPOENENT)</h2>
        <input
          className="input-field"
          type="text"
          placeholder="Amount (DEXPOENENT)"
          value={withdrawAmountDexpoenent}
          onChange={(e) => setWithdrawAmountDexpoenent(e.target.value)}
        />
        <button className="button" onClick={handleWithdrawDexpoenent}>Withdraw from Dexpoenent Contract</button>
      </div> */}
    </div>
  );
}

export default FundsManagement;
