import {
  calculateCartQuantity,
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption
} from "../../data/cart.js";
import { getProduct } from "../../data/product-lists.js";
import { formattedPrice } from "../utils/pricing.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary(){

  renderCheckoutHeader();

  let cartCollectionHTML = '';
  cart.forEach((cartItem) => {
    let productId = cartItem.productId;

    const matchingItem = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);

    cartCollectionHTML += `
      <div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingItem.id}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingItem.image}">

            <div class="cart-item-details">
              <div class="product-name js-product-name-${matchingItem.id}">
                ${matchingItem.name}
              </div>
              <div class="product-price js-product-price-${matchingItem.id}">
                Rs. ${formattedPrice(matchingItem.price)}
              </div>
              <div class="product-quantity js-product-quantity-${matchingItem.id}">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary 
                js-update-quantity-link" data-product-id = "${matchingItem.id}">
                  Update
                </span>
                <input class = "quantity-input js-input-quantity js-quantity-input-${matchingItem.id}" data-product-id = "${matchingItem.id}">
                <span class = "save-quantity-link link-primary 
                js-save-quantity-link" data-product-id = "${matchingItem.id}">Save</span>
                <span class="delete-quantity-link link-primary 
                js-delete-quantity-link js-delete-quantity-link-${matchingItem.id}" data-product-id = "${matchingItem.id}">
                  Delete
                </span>
                <p class="update-quantity-check js-update-quantity-check-${matchingItem.id}"></p>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingItem, cartItem)}
            </div>
          </div>
        </div>
      `
  });


  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const dateString = calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `Rs. ${formattedPrice(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
            data-product-id="${matchingItem.id}" 
            data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
                ${isChecked ? 'checked' : ''} 
                class="delivery-option-input" 
                name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return html;
  }


  document.querySelector('.js-order-summary')
    .innerHTML = cartCollectionHTML;

  //delete cart quantity

  document.querySelectorAll('.js-delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);

        renderOrderSummary();
        renderPaymentSummary();
        renderCheckoutHeader();
      });
    });


  // make update interactive
  document.querySelectorAll('.js-update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        let productId = link.dataset.productId;

        const updateContainer = document.querySelector(`.js-cart-item-container-${productId}`);
        updateContainer.classList.add('is-editing-quantity');
      });
    });

  function handleInput(productId) {

    const saveContainer = document.querySelector(`.js-cart-item-container-${productId}`);
    saveContainer.classList.remove('is-editing-quantity');

    const updatedValue = document.querySelector(`.js-quantity-input-${productId}`);

    let newQuantity = Number(updatedValue.value);
    const errorMessage = document.querySelector(`.js-update-quantity-check-${productId}`);

    if (newQuantity >= 0 && newQuantity < 1000) {
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      quantityLabel.innerHTML = newQuantity;
      renderPaymentSummary();
      updatedValue.value = '';
    }
    else {
      errorMessage.innerHTML = 'Invalid Quantity!';

      setTimeout(() => {
        errorMessage.innerHTML = '';
      }, 2000);
      updatedValue.value = '';
    }

    renderCheckoutHeader();
  }

  //click event
  document.querySelectorAll('.js-save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        let productId = link.dataset.productId;
        handleInput(productId);
      });
    });

  //for keypress
  document.querySelectorAll('.js-input-quantity')
    .forEach((input) => {
      input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          let productId = input.dataset.productId;
          handleInput(productId);
        }
      });
    });


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
  }