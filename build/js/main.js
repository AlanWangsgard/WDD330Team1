import { loadHeaderFooter } from './utils.js';
import { getLocalStorage, cartIconValue } from "./utils.js";

async function load() {


    await loadHeaderFooter();
    let stuff = getLocalStorage("so-cart")

    let icon = document.querySelector(".cart").querySelector("a")
    let p = document.createElement("p")
    if (stuff) {
        p.innerHTML = stuff.length
    }
    p.classList.add("iconNumber")
    icon.prepend(p)
    cartIconValue()
    document.querySelector(".SearchButton").addEventListener("click", function() { window.location.href = "../product-listing/index.html?category=" + document.querySelector(".selectCategory").value + "&searchTerm=" + document.querySelector(".itemSearch").value })

}

load()


// const listElement = document.querySelector('.product-list');
// const myList = new ProductList('tents', dataSource, listElement);
// myList.init();