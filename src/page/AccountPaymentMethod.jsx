import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements } from "@stripe/react-stripe-js";
// import CheckoutForm from '../component/CheckoutForm'
import { useStytchSession } from "@stytch/stytch-react";
import { CheckFormPaymentMethod } from "../component/CheckFormPaymentMethod";
// import Stripe from "stripe";

const stripePromise = loadStripe(
  "pk_test_51LOVwRD3lviUp8QG0eobzZIG6nFdoGVVmy7oJnqqIqkle5r1doJnfdLKDd2F2HRWYwhYt554rdNWYdGhu5UtAtiH00wbYftlUi"
);

export const AccountPaymentMethod = () => {
    
  const [clientSecret, setClientSecret] = useState("");
  const session = useStytchSession();
  const [device, setDevice] = useState(1);

  const handleAdd = () => {
    return setDevice(device + 1);
  };

  const handleReduce = () => {
    return setDevice(device - 1);
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: `${device * 200}` }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [device]);

  const appearance = {
    theme: "flat",
    labels: "floating",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <div>
        <button onClick={handleAdd}>Add</button>
        <button onClick={handleReduce}>Reduce</button>
        <strong>{device}</strong>
      </div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckFormPaymentMethod />
        </Elements>
      )}
    </>
  );
};
/**
  * 
  *       <Elements>
        <form>
          <label>Card name</label>
          <div id="cardName"></div>
          <label>Card number</label>
          <div id="cardNumber"></div>
          <label>Expiration</label>
          <div id="cardExpiry"></div>
        <label>Expiration year</label>
        <div id='expYy'></div> 
        <label>CVC</label>
        <div id="cardCvc"></div>
        <label>Zip code</label>
        <div id="zip"></div>
        <label>Country</label>
        <div id="country"></div>
        <CardElement />
      </form>
    </Elements>

  * 
  * 
  */
