import { formattedPrice } from "./utils/pricing.js";
import { getdeliveryTime, getOrder, getOrderTime } from "../data/orders.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/product-lists.js";
import { updateCartQuantity } from "../data/cart.js";

renderOrderPage();

async function renderOrderPage() {
    await loadProductsFetch();
    updateCartQuantity();

    let orderCollectionHtml = '';
    
    orders.forEach((orderItems) => {
        let orderId = orderItems.id;
        let matchingOrder = getOrder(orderId);
        console.log(matchingOrder);
        const orderTime = getOrderTime(matchingOrder);
        const products = matchingOrder.products;

        let productsHtml = ''; 

        products.forEach((product) => {
            let deliveryTime = getdeliveryTime(product);
            let productId = product.productId;
            let matchingItem = getProduct(productId);

            productsHtml += `
                <div class="order-details-grid">
                    <div class="product-image-container">
                        <img src="${matchingItem.image}">
                    </div>

                    <div class="product-details">
                        <div class="product-name">${matchingItem.name}</div>
                        <div class="product-delivery-date">Arriving on: ${deliveryTime}</div>
                        <div class="product-quantity">Quantity: ${product.quantity}</div>
                        <button class="buy-again-button button-primary">
                            <img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>
                        </button>
                    </div>

                    <div class="product-actions">
                        <a href="tracking.html">
                            <button class="track-package-button button-secondary">Track package</button>
                        </a>
                    </div>
                </div>
            `;
        });

        orderCollectionHtml += `
            <div class="order-container">
                <div class="order-header">
                    <div class="order-header-left-section">
                        <div class="order-date">
                            <div class="order-header-label">Order Placed:</div>
                            <div>${orderTime}</div>
                        </div>
                        <div class="order-total">
                            <div class="order-header-label">Total:</div>
                            <div>Rs. ${formattedPrice(matchingOrder.totalCostCents)}</div>
                        </div>
                    </div>
                    <div class="order-header-right-section">
                        <div class="order-header-label">Order ID:</div>
                        <div>${matchingOrder.id}</div>
                    </div>
                </div>
                ${productsHtml} <!-- Insert all products for this order here -->
            </div>
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderCollectionHtml;
}
