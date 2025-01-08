import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {

    const productId1 = '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4';
    const productId2 = '8a53b080-6d40-4a65-ab26-b24ecf700bce';
    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-checkout-header"></div>
            <div class="js-order-summary"></div>
            <div class="js-payment-summary">
        `;

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 1,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });

        loadFromStorage();

        renderOrderSummary();
    });

    afterEach(() => {
        document.querySelector('.js-test-container').innerHTML = '';
    })


    it('displays the cart', () => {

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

        expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');

        expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual("PUMA men's Bmw Motorsport Drift Cat Sneaker");

        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual("Rs. 5,400");

    });

    it('removes a product', () => {
        
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Diamond Jacquard Bath Towel Set, 2 Pack, White');

        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual("Rs. 3,299");

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].productId).toEqual(productId2);

    });

    it('updates the delivery option', () => {
        console.log(`.js-delivery-option-${productId1}-3`);

        document.querySelector(`.js-delivery-option-${productId1}-3`).click();

        expect(document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked).toEqual(true);

        expect(cart.length).toEqual(2);

        expect(cart[0].productId).toEqual(productId1)

        expect(cart[0].deliveryOptionId).toEqual('3')

        console.log(document.querySelector('.js-payment-summary-shipping'));

        expect(document.querySelector('.js-payment-summary-shipping').innerText).toEqual('Rs. 1,498');

        expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('Rs. 11,216.7');
    });
});