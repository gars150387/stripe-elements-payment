import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";
import { useState } from "react";
import "../style/style.css";

export const CheckFormPaymentMethod = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [number, setNumber] = useState("");
  const [exp_month, setExp_month] = useState("");
  const [exp_year, setExp_year] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("")

  const cardInfo = {
    number,
    exp_month,
    exp_year,
    cvv,
    zip
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(cardInfo),
    });

    if (!error) {
      console.log({ paymentMethod });
    } else {
        console.log({error})
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column"}}>
      <label>
        Card number
        <input
          value={number}
          name="number"
          onChange={(event) => setNumber(event.target.value)}
          type="number"
        />
      </label>
      <label>
        Card Exp Month
        <input
          value={exp_month}
          name="exp_month"
          onChange={(event) => setExp_month(event.target.value)}
          type="number"
        />
      </label>
      <label>
        Card Exp Year
        <input
          value={exp_year}
          name="exp_year"
          onChange={(event) => setExp_year(event.target.value)}
          type="number"
        />
      </label>
      <label>
        Card Cvv
        <input
          value={cvv}
          name="cvv"
          onChange={(event) => setCvv(event.target.value)}
          type="number"
        />
      </label>
      <label>
        Zip code
        <input
          value={zip}
          name="zip"
          onChange={(event) => setZip(event.target.value)}
          type="text"
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};
