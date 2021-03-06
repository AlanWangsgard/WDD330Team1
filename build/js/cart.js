import { setLocalStorage, cartIconValue } from "./utils.js";

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
    let markup = '';
    var i = 0
    const cartItems = getLocalStorage('so-cart');
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}


function displayTotal() {
    const cartItems = getLocalStorage("so-cart");
    let cartTotal = 0;

    if (cartItems !== null) {
        for (let cartItem of cartItems) {
            cartTotal += cartItem.FinalPrice * cartItem.quantity;
            // console.log(cartTotal);
        }

        let cartHtml = `$${cartTotal.toFixed(2)}`;
        document.querySelector(".cart-total").innerHTML = cartHtml;
        document.querySelector(".cart-footer").style.display = "inline";
    } else {
        document.querySelector(".cart-footer").style.display = "none";
    }
    return cartTotal;
}

function renderCartItem(item) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.selectedColor.ColorPreviewImageSrc}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.selectedColor.ColorName}</p>
  <p class="cart-card__quantity"><span id="changeQty"> <input id="idnum" type="hidden" value="${item.Id}"><input id="add" type="button" value="+">Qty: ${item.quantity}<input id="subtract" type="button" value="-"></span</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button id='removeFromCart' type='button' value=${item.Id}>Delete</delete>
</li>`;

    // console.log(newItem);
    return newItem;
}

function removeFromCart(id) {
    // console.log(id)
    let cartContents = getLocalStorage('so-cart');
    if (!cartContents) {
        cartContents = [];
    }

    // console.log(cartItem)
    cartContents.splice(cartContents.indexOf(cartItem), 1);
    // console.log(cartContents)
    // cartContents.pop()
    setLocalStorage('so-cart', cartContents);
    getCartContents();
    addlisteners()
    displayTotal();
    cartIconValue()

}

if (getLocalStorage("so-cart") != null) {
    getCartContents();
    addlisteners();
    displayTotal();


    // document.getElementById("removeFromCart").addEventListener("click", removeFromCart(document.getElementById("removeFromCart").value))
}

function addlisteners() {
    // document.querySelector("#add").addEventListener("click", changeQty(id, 1))
    // document.querySelector("#subtract").addEventListener("click", changeQty(id, -1))
    var qtyselect = document.querySelectorAll("#changeQty")
        // qtyselect.forEach(element => console.log(element.querySelector("#idnum").value))
    qtyselect.forEach(element => { element.querySelector("#add").addEventListener("click", function() { changeQty(element.querySelector("#idnum").value, 1) }), element.querySelector("#subtract").addEventListener("click", function() { changeQty(element.querySelector("#idnum").value, -1) }) })
    var elements = document.querySelectorAll("#removeFromCart")
    elements.forEach(element => element.addEventListener("click", function() { removeFromCart(element.value) }));
}

function changeQty(id, num) {
    let cartContents = getLocalStorage('so-cart');
    var cartItem = cartContents.find(item => item.Id === id)
    cartItem.quantity += num
        // console.log(cartItem.quantity)
    setLocalStorage('so-cart', cartContents);
    getCartContents();
    addlisteners()
    displayTotal();
    cartIconValue()
}