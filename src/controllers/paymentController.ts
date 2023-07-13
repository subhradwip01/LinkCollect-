// import { STRIPE_SECRET_KEY, STRIPE_SIGNING_SECRET } from "../config";
import User, { IUser } from "../models/user";
import Stripe from "stripe";

import env from "../config/index";

const STRIPE_SIGNING_SECRET: string = env.STRIPE_SIGNING_SECRET!; // Make sure STRIPE_SIGNING_SECRET has a value
const STRIPE_SECRET_KEY: string = env.STRIPE_SECRET_KEY!; // Make sure STRIPE_SIGNING_SECRET has a value

const config: Stripe.StripeConfig = {
  apiVersion: "2022-11-15", // Specify the appropriate API version here
};
const stripe = new Stripe(STRIPE_SECRET_KEY, config);

const createCheckoutSession = async (req, res) => {
  const { email, priceId } = req.body;
  const customer = await stripe.customers.create({
    email,
    description: "New Stripe customer",
  });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: customer.id,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/failed",
    metadata: {
      email: email,
      userId: req.userId,
    },
  });

  res.send(session.id);
};

const webhook = async (req, res) => {
  try {
    const sign = req.headers["stripe-signature"];
    let event;
    event = stripe.webhooks.constructEvent(
      req.body,
      sign,
      STRIPE_SIGNING_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      await fulfillTheOrder(session);
    }

    res.sendStatus(200);
  } catch (err: any) {
    console.log("ERROR", err.message);
    res.status(400).send(`Webhook error: ${err.message}`);
  }
};

async function fulfillTheOrder(session) {
  const user = await User.findOneAndUpdate(
    { email: session.metadata.email },
    { isPremium: true }
  );
  console.log(user);
}

const paymentController = { createCheckoutSession, webhook };

export default paymentController;
