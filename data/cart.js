export let cart = [{
    productId : '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
    quantity : 1
},{
    productId : '8a53b080-6d40-4a65-ab26-b24ecf700bce',
    quantity : 1
}];

export function addToCart(productId,quantitySelected) {
    let matchingItem;
    cart.forEach((item) => {
        if (productId === item.productId) {
            matchingItem = item;
        }
    });

    if (matchingItem) {
        matchingItem.quantity += quantitySelected;
    }
    else {
        cart.push({
            productId,
            quantity: quantitySelected
        });
    }
}

export function removeFromCart(productId){
    let newCart = [];

    cart.forEach((cartItem) => {
        if(cartItem.productId !== productId){
            newCart.push(cartItem);
        }
    });
    cart = newCart;
}