import ExternalServices from './externalServices.js';
import ProductList from './productList.js';
import { getParam } from './utils.js';

const category = getParam('category');
// first create an instance of our ProductData class.
const dataSource = new ExternalServices();
// then get the element we want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show our products
myList.init();

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
    console.log
    myList.filter(min, max)
}

function sort() {
    var term = document.querySelector(".sortTerm").value
    myList.sort(term)
}

document.querySelector(".sortButton").addEventListener("click", function() { sort() })

document.querySelector(".filterButton").addEventListener("click", function() { filter() })