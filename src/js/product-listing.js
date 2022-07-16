import ExternalServices from './externalServices.js';
import ProductList from './productList.js';
import { getParam } from './utils.js';

const category = getParam('category');

const productSearch = getParam('searchTerm')

const dataSource = new ExternalServices();
const listElement = document.querySelector('.product-list');
const myList = new ProductList(category, dataSource, listElement);
async function search() {
    await myList.init();
    if (productSearch != null) {
        myList.sort(productSearch)
    }
}

function filter() {
    var min = document.querySelector(".min").value
    var max = document.querySelector(".max").value


    console.log(typeof(parseFloat(max)))
    if (isNaN(min)) {
        min = 0
    }
    if (isNaN(max)) {
        max = 1000
    }
    myList.filter(min, max)
}

function sort() {
    var term = document.querySelector(".sortTerm").value
    myList.sort(term)
}

// async function search() {
//     await myList.init();
//     console.log(productSearch)
//     if (productSearch != null) {
//         console.log(myList.list)
//         myList.sort(productSearch)
//     }
// }
search()

document.querySelector(".sortButton").addEventListener("click", function() { sort() })

document.querySelector(".filterButton").addEventListener("click", function() { filter() })

document.querySelector(".clearSort").addEventListener("click", function() { myList.init() })