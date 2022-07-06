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
}

load()

// const listElement = document.querySelector('.product-list');
// const myList = new ProductList('tents', dataSource, listElement);
// myList.init();