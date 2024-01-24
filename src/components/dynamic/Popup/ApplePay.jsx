import React, {useState, useEffect} from 'react';
import {PaymentRequestButtonElement, useStripe} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ApplePay = () => {
  const stripePromise = loadStripe('pk_test_51JeDolGB4JYTbuOR1quYyXWaa0060OlApbeYRRIhOeNBK8DyqDNggLNv9FS5YD6Q3FOsIGCbxfLAVd5izxiPb5HQ00kMW1xXlm');
  const stripe = useStripe();
  console.log(stripe, 'stripe')
  const [paymentRequest, setPaymentRequest] = useState(null);

  console.log(paymentRequest, 'paymentRequest')

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Demo total',
          amount: 1099,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      

      // Check the availability of the Payment Request API.
      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, []);

  if (paymentRequest) {
    return <>
    {/* <PaymentRequestButtonElement options={{ paymentRequest }} /> */}
   
    <PaymentRequestButtonElement className="stripe-wallet-button" options={{ paymentRequest }} />
  
    </> 
  }

  // Use a traditional checkout form.
  return 'Insert your form or button component here.';
}

export default ApplePay