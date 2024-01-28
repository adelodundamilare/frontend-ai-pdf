// PaymentInfo.jsx
import React from 'react';
import '../../../App.css';

const PaymentInfo = ({ duration, price }) => {
  const convertCentsToDollars = (cents) => {
    return (cents / 100).toFixed(2);
  };

  const convertedPrice = convertCentsToDollars(price);

  return (
    <div className="payment-details-container">
      <div className="payment-details">
        {/* <h1>Payment method</h1> */}
        <div className='New-design'>
  <div className="line">
    <h4 className="price">Total billed today </h4>
    <h4>${convertedPrice} USD</h4>
  </div>
  
  <div className="line">
    <h4 className="duration">Duration: </h4>
    <h4>{duration}</h4>
  </div>
</div>
        
        
      </div>
    </div>
  );
};

export default PaymentInfo;
