export let cart;

localFromStorage();

// функция загрузить из хранилища
export function localFromStorage () {
  cart = JSON.parse(localStorage.getItem('cart')) || [
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
  // if(!cart) {
  //   cart = [{
  //     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  //     quantity: 2
  //   }, {
  //     productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  //     quantity: 1
  //   }];
  // }
}

// функция для сохранения корзины в localStorage
function saveToStorage () {
  localStorage.setItem('cart', JSON.stringify(cart))
}

// функция по добавлению в корзину
export function addToCart (productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  if(matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({productId: productId, quantity: 1, deliveryOptionId: '1'})
  }

  saveToStorage();
}

// функция по удалению из корзины
export function removeFromCart (productId) {
  cart = cart.filter(cartItem => cartItem.productId !== productId);
  saveToStorage();
}

// функция для расчета и обновлению кол-ва товара в корзине
export function calculateCartQuantity () {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
};

// функция для обновления опций доставки в корзине
export function updateDeliveryOptions (productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId) {
      matchingItem = cartItem
    }
  })

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

// функция которая находит соответствующий товар в корзине и обновляет его кол-во до нового
export function updateQuantity (productId, newQuantity) {
  const matchingItem = cart.find(cartItem => cartItem.productId === productId);
  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}