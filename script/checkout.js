import { cart } from "../data/cart.js";
import { products } from "../data/product-lists.js";

let cartCollectionHTML = '';
cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    let matchingItem;

    products.forEach((product) => {
        if (productId === product.id) {
            matchingItem = product;
        }
    });
    let formattedPrice = matchingItem.price.toLocaleString('en-IN');
    cartCollectionHTML += `
    <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: Tuesday, July 23
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingItem.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingItem.name}
            </div>
            <div class="product-price">
              ${formattedPrice}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Tuesday, July 23
                </div>
                <div class="delivery-option-price">
                  FREE Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Friday, July 19
                </div>
                <div class="delivery-option-price">
                  Rs. 199 - Shipping
                </div>
              </div>
            </div>
            <div class="delivery-option">
              <input type="radio"
                class="delivery-option-input"
                name="delivery-option-1">
              <div>
                <div class="delivery-option-date">
                  Monday, July 15
                </div>
                <div class="delivery-option-price">
                  Rs. 299 - Shipping
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
});


document.querySelector('.js-order-summary')
    .innerHTML = cartCollectionHTML;