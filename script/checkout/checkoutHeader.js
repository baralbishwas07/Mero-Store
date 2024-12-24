import { calculateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {

    function cartQuantityItems(){
        const cartQuantity = calculateCartQuantity();

        if(cartQuantity === ""){
            return "Add Now";
        }else if(cartQuantity === 1){
            return cartQuantity + ' item';
        } else {
            return cartQuantity + ' items';
        }
    }

    let checkoutHeaderHTML = '';

    checkoutHeaderHTML += `
     <div class="header-content">
        <div class="checkout-header-left-section">
          <a href="merostore.html">
            <img class="merostore-logo" src="images/merostore.png">
            <img class="merostore-mobile-logo" src="images/merostore-mobile.png">
          </a>
        </div>

        <div class="checkout-header-middle-section">
          Checkout (<a class="return-to-home-link"
            href="merostore.html">${cartQuantityItems()}</a>)
        </div>

        <div class="checkout-header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
     </div>
    `;

    document.querySelector('.js-checkout-header')
        .innerHTML = checkoutHeaderHTML;
}