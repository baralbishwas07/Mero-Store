import { loadProductsFetch } from "../data/product-lists.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadCartFetch } from "../data/cart.js";
// import '../data/cart-class.js'
// import '../data/backend-practice.js'

/*
async function loadPage() {
    try{
        // throw 'error1';

        await loadProductsFetch();

        // await new Promise((resolve,reject) => {
        //     // throw 'error2';
        //     loadCartFetch(() => {
        //         // reject('error3');
        //         resolve();
        //     });
        // });

        await loadCartFetch();
    } catch(error){
        console.log('Unexpected error. please try again later!');
    }

    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();
*/
try{
    await Promise.all([
        loadProductsFetch(),
    
        loadCartFetch()
    ]).then(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
} catch {
    console.log('Unexpected error. please try again later!');
}


// Promise.all([
//     loadProductsFetch(),

//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     })
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });


/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve(); 
    });

}).then(()=>{
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
*/

//callbacks---------------->
// loadProducts(()=>{
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });


