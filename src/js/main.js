import { loadHeaderFooter } from './utils.js';
import { getLocalStorage } from "./utils.js";

async function load() {


    await loadHeaderFooter();
    let stuff = getLocalStorage("so-cart")

    let icon = document.querySelector(".cart").querySelector("a")
    let p = document.createElement("p")
    p.innerHTML = stuff.length
    p.classList.add("iconNumber")
    icon.appendChild(p)
}

load()

// const listElement = document.querySelector('.product-list');
// const myList = new ProductList('tents', dataSource, listElement);
// myList.init();