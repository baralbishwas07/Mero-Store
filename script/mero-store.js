import { addToCart, updateCartQuantity } from "../data/cart.js";
import { loadProductsFetch, products } from "../data/product-lists.js";

renderProductsGrid();

async function renderProductsGrid() {
  await loadProductsFetch();
  let productHTML = '';
  let timeoutIds = {};

  updateCartQuantity();

  function handleAddedMessage(productId) {
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('show-added-to-cart');

    if (timeoutIds[productId]) {
      clearTimeout(timeoutIds[productId]);
    }

    timeoutIds[productId] = setTimeout(() => {
      addedMessage.classList.remove('show-added-to-cart');
    }, 2000);
  }

  function renderProducts(filteredProducts) {
    productHTML = '';
    filteredProducts.forEach((product) => {
      productHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
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

          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png"> Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
    });

    document.querySelector('.js-products-grid').innerHTML = productHTML;

    document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        const quantitySelected = Number(
          document.querySelector(`.js-quantity-selector-${productId}`).value
        );

        handleAddedMessage(productId);
        addToCart(productId, quantitySelected);
        updateCartQuantity();
      });
    });
  }

  function searchResults() {
    const url = new URL(window.location.href);
    const searchQuery = url.searchParams.get('search');

    if (!searchQuery) {
      return products; 
    }

  return products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
    
  }


  const filteredProducts = searchResults();
  renderProducts(filteredProducts);


  const searchButton = document.querySelector('.js-search-button');
  const searchBar = document.querySelector('.js-search-bar');

  const handleSearch = () => {
    const searchQuery = searchBar.value.trim();

    if (searchQuery) {
      window.location.href = `merostore.html?search=${searchQuery}`;
    } else {
      alert('Please enter something to search!');
    }
  };

  searchButton.addEventListener('click', handleSearch);

  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
}
