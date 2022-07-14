import { setLocalStorage, getLocalStorage } from './utils.js'
import ExternalServices from './ExternalServices.js';

const services = new ExternalServices();

function formDataToJSON(formElement) {
    let formData = new FormData(formElement);

    const converted = Object.fromEntries(formData.entries());

    return converted;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1,
        };
    });
    return simplifiedItems;
}

export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }
    init() {
        this.list = getLocalStorage(this.key);
        this.calculateItemSummary();
    }
    calculateItemSummary() {
        const summaryElement = document.querySelector(
            this.outputSelector + ' #cartTotal'
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + ' #num-items'
        );
        var numItems = this.list.map((item) => item.quantity);
        itemNumElement.innerText = numItems.reduce((sum, item) => sum + item)
            // calculate the total of all the items in the cart
        const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
        this.itemTotal = amounts.reduce((sum, item) => sum + item);
        this.itemTotal = this.itemTotal.toFixed(2)
        summaryElement.innerText = '$' + this.itemTotal;
    }
    calculateOrdertotal() {
        this.shipping = 10 + (this.list.length - 1) * 2;
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const shipping = document.querySelector(this.outputSelector + ' .shipping');
        const tax = document.querySelector(this.outputSelector + ' .tax');
        const orderTotal = document.querySelector(
            this.outputSelector + ' .orderTotal'
        );
        shipping.innerText = '$' + this.shipping;
        tax.innerText = '$' + this.tax;
        orderTotal.innerText = '$' + this.orderTotal;
    }
    async checkout() {
        const formElement = document.querySelector('.checkout-form');

        const json = formDataToJSON(formElement);
        console.log(json)
        json.orderDate = new Date();
        json.orderTotal = this.orderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        console.log(json);
        // try {
        const res = await services.checkout(json);
        console.log(res);
        setLocalStorage('so-cart', []);
        loc
        console.log(services.getOrders())
        location.assign('/checkout/checkedout.html');
        // } catch (err) {
        //     for (let message in err.message) {
        //         console.log(err.message[message]);
        //     }

        // console.log(err);
    }
}