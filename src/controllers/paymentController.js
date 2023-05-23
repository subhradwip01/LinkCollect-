const { STRIPE_SECRET_KEY, STRIPE_SIGNING_SECRET } = require("../config");
const { User } = require("../models");

const Stripe = require("stripe")(STRIPE_SECRET_KEY)

const createCheckoutSession = async (req,res)=>{
    const {email, priceId} = req.body;
    const customer = await Stripe.customers.create({
        email,
        description: "New Stripe customer"
    })
    
    const session = await Stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        customer: customer.id,
        line_items: [
          {
            price: priceId,
            quantity: 1
          }
        ],
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/failed",
        metadata: {
          email: email,
          userId: req.userId
        }
      });
      
    res.send(session.id)
}

// This is to listen for payment successful events fired from stripe webhook and fulfill the order
const webhook = async (req, res)=>{
    try{
        // Generating a certificate for authentication of the stripe webhook
        const sign = req.headers["stripe-signature"];
        
        // Verifying the event came from stripe
        let event;
        event = Stripe.webhooks.constructEvent(req.body, sign, STRIPE_SIGNING_SECRET);

        // Handling the checkout.session.completed event
        if(event.type === "checkout.session.completed"){
          const session = event.data.object;
          fulfillTheOrder(session);
        }
        // This sends status code of 200 to acknowledge receipt of the event
        res.sendStatus(200)
    } catch(err){
      console.log("ERROR", err.message);
      res.status(400).send(`Webhook error: ${err.message}`);
    }
}

async function fulfillTheOrder(session){
  const user = await User.findOneAndUpdate({email: session.metadata.email}, {isPremium: true})
  console.log(user);
}

module.exports = {
    createCheckoutSession,
    webhook
}