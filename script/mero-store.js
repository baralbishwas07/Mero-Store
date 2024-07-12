const products = [{
    image: 'images/products/puma-men-shoes-bmw.jpg',
    name: "PUMA men's Bmw Motorsport Drift Cat Sneaker",
    rating: {
        stars: 4.5,
        count: 129
    },
    price: 5400
}, {
    image: 'images/products/cotton-bath-towels-teal.webp',
    name: 'Diamond Jacquard Bath Towel Set, 2 Pack, White',
    rating: {
        stars: 4,
        count: 328
    },
    price: 3299
}, {
    image: 'images/products/bathroom-rug.jpg',
    name: 'Home Weavers Opulent Reversible Bathmat',
    rating: {
        stars: 4.5,
        count: 34
    },
    price: 1425
}];

let productHTML = '';
products.forEach((product) => {
    let formattedPrice = product.price.toLocaleString('en-IN');
    productHTML +=
        `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            Rs. ${formattedPrice}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary">
            Add to Cart
          </button>
        </div>`
});
document.querySelector('.js-products-grid')
    .innerHTML = productHTML;