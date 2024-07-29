import { calculateCartQuantity, cart, removeFromCart } from "../data/cart.js";
import { products } from "../data/product-lists.js";
import { formattedPrice } from "./utils/pricing.js";

let cartCollectionHTML = '';
cart.forEach((cartItem) => {
  let productId = cartItem.productId;

  let matchingItem;

  products.forEach((product) => {
    if (productId === product.id) {
      matchingItem = product;
    }
  });

  cartCollectionHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
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
              Rs. ${formattedPrice(matchingItem.price)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary 
              js-update-quantity-link" data-product-id = "${matchingItem.id}">
                Update
              </span>
              <input class = "quantity-input">
              <span class = "save-quantity-link link-primary">Save</span>
              <span class="delete-quantity-link link-primary 
              js-delete-quantity-link" data-product-id = "${matchingItem.id}">
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
                name="delivery-option-${matchingItem.id}">
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
                name="delivery-option-${matchingItem.id}">
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
                name="delivery-option-${matchingItem.id}">
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

document.querySelectorAll('.js-delete-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const deleteContainer = document.querySelector
        (`.js-cart-item-container-${productId}`)
      deleteContainer.remove();
      updateCartQuantity();
    });
  });

//update cart quantity 

function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home')
    .innerHTML = `${cartQuantity} items`;
}

updateCartQuantity();
return-to-home

// make update interactive
document.querySelectorAll('.js-update-quantity-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      let productId = link.dataset.productId;

      const updateContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      updateContainer.classList.add('is-editing-quantity');
    });
  });
