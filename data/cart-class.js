export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

   // функция загрузить из хранилища
  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOptionId: '2'
      }
    ];
    // if(!this.cartItems) {
    //   this.cartItems = [{
    //     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    //     quantity: 2
    //   }, {
    //     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    //     quantity: 1
    //   }];
    // }
  }

   // функция для сохранения корзины в localStorage
  saveToStorage () {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems))
  }

  // функция по добавлению в корзину
  addToCart (productId) {
    let matchingItem;
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })

    if(matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({productId: productId, quantity: 1, deliveryOptionId: '1'})
    }

    this.saveToStorage();
  }

  // функция по удалению из корзины
  removeFromCart (productId) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
    this.saveToStorage();
  }

  // функция для расчета и обновлению кол-ва товара в корзине
  calculateCartQuantity () {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    return cartQuantity;
  }

  // функция для обновления опций доставки в корзине
  updateDeliveryOptions (productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem
      }
    })

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  // функция которая находит соответствующий товар в корзине и обновляет его кол-во до нового
  updateQuantity (productId, newQuantity) {
    const matchingItem = this.cartItems.find(cartItem => cartItem.productId === productId);
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  }
}

export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

// cart.#localStorageKey = 'aaa'

console.log(cart)
console.log(businessCart)

console.log(businessCart instanceof Cart)