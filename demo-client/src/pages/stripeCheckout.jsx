// Dependencies 
// @stripe/stripe-js

import {loadStripe} from "@stripe/stripe-js"
import { createStripeCheckoutSession } from "../api-services/stripeService"

// Will need to have it outside the rendering component otherwise it will load tons of stripe instances
const stripePromise = loadStripe("pk_test_51N1AajSH4lo03MLSYXRMRJKULBiqqGJZXPYBTXtBtvvKmvtQ4PVw68qAM7qcLEfUTk4xlK5QJvYfdHd8eZU3HY0K00wr5TEBhH")

const StripeCheckout = () => {

    const handleCreateCheckoutSession = async ()=>{
        const stripe = await stripePromise

        // Calling the servers to create a checkout session
        const {data: sessionId} = await createStripeCheckoutSession("satvikp508@gmail.com", "price_1N7zOWSH4lo03MLSrR2ZiC8X")
        
        const checkout = await stripe.redirectToCheckout({
            sessionId
        })

        if(checkout.error) alert(checkout.error.message)
    }

    return ( 
        <button onClick={handleCreateCheckoutSession} role="link">
            Checkout with Stripe
        </button>
     );
}
 
export default StripeCheckout;