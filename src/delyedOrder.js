import React from 'react';
import './DelayedOrder.css'; // Import your custom CSS stylesheet

function DelayedOrder({ DelayedOrder}) {
  // Check for errors, and display an error message if there's an issue
 

  return (
    <div className="delayed-order">
      <h2>Delayed Order</h2>
      <div className="data">
        <div className="data-item">
          <p className="label">Commit Deposit</p>
          <p className="value">{DelayedOrder?.commitDeposit.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Desired Fill Price</p>
          <p className="value">{DelayedOrder?.desiredFillPrice.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Executable At Time</p>
          <p className="value">{DelayedOrder?.executableAtTime.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Intention Time</p>
          <p className="value">{DelayedOrder?.intentionTime.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Is Offchain</p>
          <p className="value">{DelayedOrder?.isOffchain.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Keeper Deposit</p>
          <p className="value">{DelayedOrder?.keeperDeposit.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Size Delta</p>
          <p className="value">{DelayedOrder?.sizeDelta.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Target Round ID</p>
          <p className="value">{DelayedOrder?.targetRoundId.toString()}</p>
        </div>
        <div className="data-item">
          <p className="label">Tracking Code</p>
          <p className="value">{DelayedOrder?.trackingCode}</p>
        </div>
      </div>
    </div>
  );
}

export default DelayedOrder;
