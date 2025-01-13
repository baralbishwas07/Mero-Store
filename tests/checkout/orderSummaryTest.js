import { renderOrderSummary } from "../../script/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProductsFetch } from "../../data/product-lists.js";

describe('test suite: renderOrderSummary', () => {

    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProductsFetch().then(() => {
            done();
        });
    });


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

        expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual("Black and Gray Athletic Cotton Socks - 6 Pairs");

        expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual("Rs. 1,090");

    });

    it('removes a product', () => {
        
        document.querySelector(`.js-delete-quantity-link-${productId1}`).click();

        expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');

        expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual("Rs. 2,095");

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

        expect(document.querySelector('.js-payment-summary-total').innerText).toEqual('Rs. 5,151.3');
    });
});