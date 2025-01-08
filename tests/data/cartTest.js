import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from "../../data/cart.js";

describe('test suite: addToCart', () => {

    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    })

    it('adds an existing product to the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });

        loadFromStorage();

        addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e',1)
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart[0].quantity).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 2,
            deliveryOptionId: '1'
        }]));
    });

    it('adds a new product to the cart', () => {

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();
        addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e',1)
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 1,
            deliveryOptionId: '1'
        }]));
    });
});

describe('testsuite: removeFromCart',() => {
    beforeEach(() => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
                quantity: 1,
                deliveryOptionId: '1'
            }, {
                productId: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
    });

    it('remove a productId that is in the cart',() => {
        loadFromStorage();

        removeFromCart('6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4');

        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('8a53b080-6d40-4a65-ab26-b24ecf700bce');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
            quantity: 1,
            deliveryOptionId: '2'
        }]));
    });


    it("remove a productId that's not in the cart",() => {
        loadFromStorage();

        removeFromCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');

        expect(cart.length).toEqual(2);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4');
        expect(cart[0].quantity).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
            quantity: 1,
            deliveryOptionId: '1'
        }, {
            productId: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
            quantity: 1,
            deliveryOptionId: '2'
        }]));
    });
});

describe('testsuite: updateDeliveryOption', () => {
    beforeEach(() => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
                quantity: 1,
                deliveryOptionId: '1'
            }, {
                productId: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
    });

    it('update the delivery option of product in the cart', () => {
        loadFromStorage();

        updateDeliveryOption('6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4', '2');

        expect(cart[0].deliveryOptionId).toEqual('2');

        expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
            productId: '6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4',
            quantity: 1,
            deliveryOptionId: '2'
        }, {
            productId: '8a53b080-6d40-4a65-ab26-b24ecf700bce',
            quantity: 1,
            deliveryOptionId: '2'
        }]));
    });

    it('update the delivery option of a product that is not in the cart',() => {
        loadFromStorage();

        updateDeliveryOption('6f37d921-1a8b-45d6-9f2d-0e9f6e427cd4', '2');

        expect(cart[0].deliveryOptionId).toEqual('1');

        expect(cart[1].deliveryOptionId).toEqual('2');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });

    it('does nothing if a deliveryOptionId does not exist',() => {
        loadFromStorage();

        updateDeliveryOption('6f37d921-1a8b-45c6-9e2d-8e9f6e427cd4','5');

        expect(cart[0].deliveryOptionId).toEqual('1');

        expect(cart[1].deliveryOptionId).toEqual('2');

        expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    })
});