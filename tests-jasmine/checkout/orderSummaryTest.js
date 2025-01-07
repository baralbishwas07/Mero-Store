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

    });

    it('removes a product', () => {
        
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);

        expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual(null);

        expect(cart.length).toEqual(1);

        expect(cart[0].productId).toEqual(productId2);

    });
});