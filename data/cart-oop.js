import { validDeliveryOption } from "./deliveryOptions.js";

function Cart(localStorageKey){
    const cart = {
        cartItems: undefined,
    
        loadFromStorage(){
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
            if (!this.cartItems) {
                this.cartItems = [{
                    productId: '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
                    quantity: 1,
                    deliveryOptionId: '1'
                }, {
                    productId: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
                    quantity: 1,
                    deliveryOptionId: '2'
                }];
            }
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
        addToCart(productId, quantitySelected) {
            let matchingItem;
            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
        
            if (matchingItem) {
                matchingItem.quantity += quantitySelected;
            }
            else {
                this.cartItems.push({
                    productId,
                    quantity: quantitySelected,
                    deliveryOptionId: '1'
                });
            }
            this.saveToStorage();
        },
    
        removeFromCart(productId) {
            let newCart = [];
        
            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            this.saveToStorage();
        },
    
        calculateCartQuantity() {
            let cartQuantity = 0;
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
            return cartQuantity === 0 ? "" : cartQuantity;
        },
    
        updateQuantity(productId, newQuantity) {
            let matchingItem;
            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
        
            matchingItem.quantity = newQuantity;
            this.saveToStorage();
        },
        
        updateDeliveryOption(productId, deliveryOptionId) {
            let matchingItem;
            this.cartItems.forEach((item) => {
                if (productId === item.productId) {
                    matchingItem = item;
                }
            });
        
            if(!matchingItem){
                return;
            }
        
            if (!validDeliveryOption(deliveryOptionId)) {
                return;
            }
        
            matchingItem.deliveryOptionId = deliveryOptionId;
        
            this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

cart.addToCart('d82e4fbd-ee13-4d4f-a0e1-6fc624bd3e2a',2);

console.log(cart);


console.log(businessCart);