import { setLocalStorage, cartIconValue } from "./utils.js";
// import ProductDetails from "./productDetails.js";
// const product = ProductDetails()

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

function getCartContents() {
    let markup = '';
    var i = 0
    const cartItems = getLocalStorage('wish-list');
    const htmlItems = cartItems.map((item) => renderCartItem(item));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    // document.querySelector(".product-list").innerHTML = renderCartItem(cartItems);
}

function displayTotal() {
    const cartItems = getLocalStorage("wish-list");
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
  <button id="addToCart" value="${item.Id}">Add To Cart</button>
</li>`;

    // console.log(newItem);
    return newItem;
}

function removeFromCart(id) {
    // console.log(id)
    // to fix the cart we need to get anything that is in the cart already.
    let cartContents = getLocalStorage('wish-list');
    //check to see if there was anything there
    if (!cartContents) {
        cartContents = [];
    }
    // then add the current product to the list
    var cartItem = cartContents.find(item => item.Id === id)

    // console.log(cartItem)
    cartContents.splice(cartContents.indexOf(cartItem), 1);
    // console.log(cartContents)
    // cartContents.pop()
    setLocalStorage('wish-list', cartContents);
    getCartContents();
    addlisteners()
    displayTotal();
    cartIconValue()

}

if (getLocalStorage("wish-list") != null) {
    getCartContents();
    addlisteners();
    displayTotal();


    // document.getElementById("removeFromCart").addEventListener("click", removeFromCart(document.getElementById("removeFromCart").value))
}

function addToCart(element) {
    console.log(element.value)
    let cartContents = getLocalStorage('so-cart');
    let wish = getLocalStorage('wish-list')
    var product = wish.find(item => item.Id == element.value)
    console.log(product)
    if (!cartContents) {
        cartContents = [];
    }
    if (!product.quantity) {
        product.quantity = 1
    }
    if (cartContents.length == 0) {

        cartContents.push(product);
    } else {
        var duplicate = true
        cartContents.forEach(item => { if (!item.quantity) { item.quantity = 1 } if (item.Id == product.Id && item.selectedColor.ColorName == product.selectedColor.ColorName) { item.quantity += 1, duplicate = true } else { duplicate = false } });
        console.log(duplicate);
        if (duplicate == false) {
            cartContents.push(product)
        }
    }

    setLocalStorage('so-cart', cartContents);
    var cart = document.querySelector(".cart");
    cart.classList.toggle("shake")
    setTimeout(function() {
        cart.classList.toggle("shake")
    }, 1000)
    cartIconValue()
    removeFromCart(product.Id)
}

function addlisteners() {
    // document.querySelector("#add").addEventListener("click", changeQty(id, 1))
    // document.querySelector("#subtract").addEventListener("click", changeQty(id, -1))
    var qtyselect = document.querySelectorAll("#changeQty")
        // qtyselect.forEach(element => console.log(element.querySelector("#idnum").value))
    qtyselect.forEach(element => { element.querySelector("#add").addEventListener("click", function() { changeQty(element.querySelector("#idnum").value, 1) }), element.querySelector("#subtract").addEventListener("click", function() { changeQty(element.querySelector("#idnum").value, -1) }) })
    var elements = document.querySelectorAll("#removeFromCart")
    elements.forEach(element => element.addEventListener("click", function() { removeFromCart(element.value) }));
    document.querySelectorAll("#addToCart").forEach(element => element.addEventListener("click", function() { addToCart(element) }))
}

function changeQty(id, num) {
    let cartContents = getLocalStorage('wish-list');
    var cartItem = cartContents.find(item => item.Id === id)
    cartItem.quantity += num
        // console.log(cartItem.quantity)
    setLocalStorage('wish-list', cartContents);
    getCartContents();
    addlisteners()
    displayTotal();
    cartIconValue()
}