import { setLocalStorage } from "../js/utils";

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
    let markup = '';
    var i = 0
    const cartItems = getLocalStorage('so-cart');
    const htmlItems = cartItems.map((item) => renderCartItem(item, i++));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function renderCartItem(item, i) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id='removeFromCart' type='button' value=${item.Id}>Delete</delete>
</li>`;
    // console.log(newItem);
    return newItem;
}

function removeFromCart(id) {
    console.log(id)
        // to fix the cart we need to get anything that is in the cart already.
    let cartContents = getLocalStorage('so-cart');
    //check to see if there was anything there
    if (!cartContents) {
        cartContents = [];
    }
    // then add the current product to the list
    var cartItem = cartContents.find(item => item.Id === id)

    // console.log(cartItem)
    cartContents.splice(cartContents.indexOf(cartItem), 1);
    console.log(cartContents)
        // cartContents.pop()
    setLocalStorage('so-cart', cartContents);
    getCartContents();
    addlisteners()

}

if (getLocalStorage("so-cart") != null) {
    getCartContents();


    // document.getElementById("removeFromCart").addEventListener("click", removeFromCart(document.getElementById("removeFromCart").value))
}

function addlisteners() {
    var elements = document.querySelectorAll("#removeFromCart")
    elements.forEach(element => element.addEventListener("click", function() { removeFromCart(element.value) }));
}

addlisteners()
    // if (document.getElementById("removeFromCart")) {
    //     document.getElementById("removeFromCart").addEventListener("click", removeFromCart(value))
    // }