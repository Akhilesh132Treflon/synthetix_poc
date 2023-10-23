import React from 'react';
import { ethers } from 'ethers';
import { formatUnits } from 'ethers';
import './accountview.css'; // Import your custom CSS stylesheet
import PositionOverview from './positionover';
import DelayedOrder from './delyedOrder';

function AccountOverview({positionData,delayedOrderData,pnl,freemargin}) {
  // Check for errors, and display an error message if there's an issue
  console.log("my data",freemargin)
console.log("dd",pnl)
  // Convert and format the margin and P&L data
//   const formattedMargin =   ethers.utils.formatUnits(freemargin, 18) 
  
//   const formattedPnl = pnl ? ethers.utils.formatUnits(pnl, 18) : '?'; // Assuming 18 decimal places

  return (
<div >

<div className='mine'>
<div class="account-overview">
  <h2>Account Overview</h2>
  <div class="free-margin">
    <h3>Free Margin</h3>
    <p class="amount">{(freemargin.toString()/1e18).toFixed(2)} SUSD</p>
  </div>
  <div class="profit-loss">
    <h3>Profit and Loss (P&L)</h3>
    <p class="amount">{pnl.toString()} SUSD</p>
  </div>


      
      </div>
      <PositionOverview  position={positionData}/>
</div>


      <DelayedOrder DelayedOrder={delayedOrderData}/>
    </div>
  );
}

export default AccountOverview;
