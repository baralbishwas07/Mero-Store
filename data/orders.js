import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
export const orders = JSON.parse(localStorage.getItem('orders'))||[];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

export function getOrder(orderId){
    let matchingOrder;

    orders.forEach((order) => {
        if(orderId === order.id){
            matchingOrder = order;
        }
    });
    return matchingOrder;
}

export function getOrderTime(orderItem){
    const orderTime = orderItem.orderTime;
    const formattedTime = dayjs(orderTime).format('MMMM D');
    return formattedTime;
}

export function getdeliveryTime(product){
    const deliveryTime = product.estimatedDeliveryTime;
    const formattedTime = dayjs(deliveryTime).format('MMMM D');
    return formattedTime;
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}