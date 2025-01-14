import { updateCartQuantity } from "../data/cart.js";
import { getdeliveryTime, getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/product-lists.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const url = new URL(window.location.href)
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

renderTrackingPage();

async function renderTrackingPage(){
    updateCartQuantity();
    await loadProductsFetch();

    const matchingOrder = getOrder(orderId);
    const matchingItem = getProduct(productId);
    const deliveryTime = dayjs(getdeliveryTime(matchingOrder)).format('dddd, MMMM D');
    console.log(deliveryTime);


    function productInTrack(productId){
        let productInOrder;
        matchingOrder.products.forEach((product) => {
            if(productId === product.productId){
                productInOrder = product;
            }
        });
        return productInOrder;
    }

    const productQuantity = productInTrack(productId).quantity;

    const trackingPageHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
            View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${deliveryTime}
            </div>

            <div class="product-info">
            ${matchingItem.name}
            </div>

            <div class="product-info">
            Quantity: ${productQuantity}
            </div>

            <img class="product-image" src="${matchingItem.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>
    `;

    document.querySelector('.js-track-page')
    .innerHTML = trackingPageHTML;
}