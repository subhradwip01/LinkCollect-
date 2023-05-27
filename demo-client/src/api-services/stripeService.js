import http from "./httpService";
import api from "./apiConfig.json";

const apiEndpoint = api.baseUrl + "/payments";


export function createStripeCheckoutSession(email, priceId) {
    console.log(apiEndpoint)
    return http.post(`${apiEndpoint}/create-checkout-session`, {email, priceId});
}