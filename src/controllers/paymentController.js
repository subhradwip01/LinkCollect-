const { STRIPE_SECRET_KEY } = require("../config")

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

module.exports = {
    createCheckoutSession
}