const express = require("express");
const app = express();
require("dotenv").config("./env");
const cors = require("cors");
// This is your test secret API key.
const stripe = require("stripe")(process.env.SECRET_KEY);

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  console.log("request", req.body);

  const { amount } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
    capture_method: "manual",
  });
  console.log({paymentIntent});
  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentIntent
  });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));
