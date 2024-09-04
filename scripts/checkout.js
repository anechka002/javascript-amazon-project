import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOptions} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js'

const today = dayjs();
// дата доставки
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'))

// обьединение html кода и размещение на странице
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  // совпадающий продукт
  let matchingProduct;

  products.forEach((product) => {
    // проверяем совпадает ли id с нашим productId
    if(product.id === productId) {
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId) {
      deliveryOption = option
    }
  })

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');


  cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingProduct.id}>
              Update
            </span>
            <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}"/>
            <span class="save-quantity-link link-primary js-save-link" data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
          
        </div>
      </div>
    </div>
  `;
});

// функция параметры доставки HTML
function deliveryOptionsHTML (matchingProduct, cartItem) {
  let html = '';

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCent === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCent)} -`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });
  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

const deleteLink = document.querySelectorAll('.js-delete-link');
deleteLink.forEach((link) => {
  link.addEventListener('click', () => {
    const productId = link.dataset.productId;
    removeFromCart(productId)
    
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove()

    updateCartQuantity()
  })
});

// функция использует другую функцию для расчета кол-ва в корзине и добавляет в HTML
export function updateCartQuantity () {
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`
}

updateCartQuantity();

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      // console.log(productId)
      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.add('is-editing-quantity')
    })
  })

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      // console.log(productId)

      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const newQuantity = Number(quantityInput.value);
      if(newQuantity < 0 || newQuantity >= 100) {
        alert('Quantity must be at least 0 and less than 100');
        return
      }      
      updateQuantity(productId, newQuantity);

      const container = document.querySelector(`.js-cart-item-container-${productId}`)
      container.classList.remove('is-editing-quantity');
      
      // const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`)
      // quantityLabel.innerHTML = newQuantity;
      
        const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
        quantityLabel.innerHTML = newQuantity; // Обновляем количество на странице
      updateCartQuantity();
    });
  });

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset
      updateDeliveryOptions(productId, deliveryOptionId)
    })
  })