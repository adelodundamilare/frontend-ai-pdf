import React, {useEffect, useState} from 'react';
import '../../../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../config/baseUrl';
import toast from "react-hot-toast";
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Message from './Message';

import GooglePayButton from '@google-pay/button-react';
import ApplePay from './ApplePay';

import PaymentInfo from './PaymentInfo';


const PaymentPage = (props) => {
  const stripePromise = loadStripe('pk_test_51JeDolGB4JYTbuOR1quYyXWaa0060OlApbeYRRIhOeNBK8DyqDNggLNv9FS5YD6Q3FOsIGCbxfLAVd5izxiPb5HQ00kMW1xXlm');

    const nav = useNavigate()
    const location = useLocation();
    const { planId, duration, price } = location.state || {};
    // const {priceId} = props
    console.log( "price", planId)
    const handlePayPalClick = () => {
      // Add logic to handle PayPal payment
      console.log('Pay with PayPal clicked');
    };
  
    const handleApplePayClick = () => {
      // Add logic to handle Google Pay payment
      console.log('Pay with Google Pay clicked');
    };
  
    const convertCentsToDollars = (cents) => {
        return (cents / 100).toFixed(2); // Convert cents to dollars with two decimal places
      };




  const handleCheckout = async (subscriptionId) => {
    console.log("OK Cliked", 'subscriptionId', subscriptionId)
    try {
      const response = await axios.post(`${BASE_URL}/payment/create_checkout_session/${subscriptionId}/`, {
        pk: subscriptionId 
      });
  
      // Handle the checkout session ID received from the backend
      const sessionId = response.data.id;
      console.log('Checkout session ID:', sessionId);
  
      // Initialize Stripe with your public key
      const stripe = await loadStripe('pk_test_51JeDolGB4JYTbuOR1quYyXWaa0060OlApbeYRRIhOeNBK8DyqDNggLNv9FS5YD6Q3FOsIGCbxfLAVd5izxiPb5HQ00kMW1xXlm'); // Replace with your Stripe public key
  
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });
  
      if (error) {
        // Handle any redirection errors here
        console.error('Error redirecting to Checkout:', error);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
      // Handle error scenarios here
    }
  };

  const initialOptions = {
    "client-id": "AVGQqqoCWFOUSTTxe_MzwuKokUsIutWzD5qVzIx2azBj6sWPDEdLAoxI9a4fqcIW3P4MeHYPgpB2odkc",
    "enable-funding": "",
    "disable-funding": "paylater,venmo,card",
    "data-sdk-integration-source": "integrationbuilder_sc",
  };


  const [message, setMessage] = useState("");


  const convertedPrice = convertCentsToDollars(price);





  
    return (
     
    <div className='test'>
      <h1 className='text-center'>Select  Payment Method</h1>
       <PaymentInfo duration={duration} price={price} />
    <div>

      
   
    </div>
    
    <div className="payment-container">

    <p>Pay with</p> 


        {/* <Elements stripe={stripePromise}> */}
        <ApplePay  />
        {/* </Elements> */}
        <br>
        </br>

        <br>
        </br>
        <div className="payment-buttons-container">
         
      

        <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
           
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "1.00",
                  },
                  custom_id: JSON.stringify({
                    planName: planId,
                    userEmail: 'react@gmail.com',
                  }),
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then(function (details) {
              console.log('Capture successful. Details:', details); 
              toast.success('Payment completed. Thank you, ' + details.payer.name.given_name)
              // nav('/dashboard');
            });
          }}
          onCancel={() => toast(
            "You cancelled the payment. Try again by clicking the PayPal button", 
            {
              duration: 6000
            }
          )}
          onError={(err) => {
            toast.error("There was an error processing your payment. If this error please contact support.", { duration: 6000 });
          }}
          // createOrder={async () => {
          //   try {
          //     const response = await axios.post(`${BASE_URL}/payment/create_order/`, {
          //       method: "POST",
          //       headers: {
          //         "Content-Type": "application/json",
          //       },
          //       // use the "body" param to optionally pass additional order information
          //       // like product ids and quantities
          //       body: JSON.stringify({
          //         cart: [
          //           {
          //             id: planId,
          //             quantity: 1,
          //           },
          //         ],
          //       }),
          //     });

          //     console.log(response, 'response paypal')

          //     const orderData = await response.json();

          //     if (orderData.id) {
          //       return orderData.id;
          //     } else {
          //       const errorDetail = orderData?.details?.[0];
          //       const errorMessage = errorDetail
          //         ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          //         : JSON.stringify(orderData);

          //       throw new Error(errorMessage);
          //     }
          //   } catch (error) {
          //     console.error(error);
          //     setMessage(`Could not initiate PayPal Checkout...${error}`);
          //   }
          // }}
          // onApprove={async (data, actions) => {
          //   try {
          //     const response = await fetch(
              
          //       `${BASE_URL}/payment/capture_order/${data.orderID}/`,
          //       {
          //         method: "POST",
          //         headers: {
          //           "Content-Type": "application/json",
          //         },
          //       },
          //     );

          //     const orderData = await response.json();
          //     // Three cases to handle:
          //     //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //     //   (2) Other non-recoverable errors -> Show a failure message
          //     //   (3) Successful transaction -> Show confirmation or thank you message

          //     const errorDetail = orderData?.details?.[0];

          //     if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          //       // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //       // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          //       return actions.restart();
          //     } else if (errorDetail) {
          //       // (2) Other non-recoverable errors -> Show a failure message
          //       throw new Error(
          //         `${errorDetail.description} (${orderData.debug_id})`,
          //       );
          //     } else {
          //       // (3) Successful transaction -> Show confirmation or thank you message
          //       // Or go to another URL:  actions.redirect('thank_you.html');
          //       const transaction =
          //         orderData.purchase_units[0].payments.captures[0];
          //       setMessage(
          //         `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,
          //       );
          //       console.log(
          //         "Capture result",
          //         orderData,
          //         JSON.stringify(orderData, null, 2),
          //       );
          //     }
          //   } catch (error) {
          //     console.error(error);
          //     setMessage(
          //       `Sorry, your transaction could not be processed...${error}`,
          //     );
          //   }
          // }}
        />
      </PayPalScriptProvider>
      <Message content={message} />

      <div className="payment-buttons">



      
          
          {/* <button className="payment-button google-pay" onClick={handleApplePayClick}>
            <span className="button-text">Pay with Apple Pay</span>
            <span className="icon google-icon"></span>
          </button> */}
         

          {/* google pay */}
          <GooglePayButton
        
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'exampleGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '12345678901234567890',
            merchantName: 'Demo Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '1',
            currencyCode: 'USD',
            countryCode: 'US',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonColor='black'
        buttonType='Buy'
      />

</div>

      
        

</div>
<button className="payment-button credit-card" onClick={() => handleCheckout(planId)} >
                  <span className="button-text">Pay with Credit Card</span>
                  <span className="icon credit-card-icon"></span>
        </button>


        </div>
        
      </div>
    );
  };
  
  export default PaymentPage;