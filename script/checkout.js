import { loadProducts } from "../data/product-lists.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

new Promise((resolve) => {
    console.log('promise');
})

loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

