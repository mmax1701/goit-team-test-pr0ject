function getCart() {
  if (!localStorage.cart) {
    localStorage.cart = JSON.stringify([]);
  }
  return JSON.parse(localStorage.cart);
}

function addItemToCart(id) {
  const cart = getCart();
  cart.push(id);
  localStorage.cart = JSON.stringify(cart);
}

function removeItemFromCart(id) {
  const cart = getCart().filter(el => el !== id);
  localStorage.cart = JSON.stringify(cart);
}

function findItemById(id) {
  return getCart().find(el => el === id);
}

function resetCart() {
  localStorage.cart = JSON.stringify([]);
}

export { addItemToCart, findItemById, getCart, removeItemFromCart, resetCart };
