function packageItems(items) {

}

function formDataToJSON() {
    var formdata = document.querySelector(".checkout-form")
    const formData = new FormData(formdata),
        convertedJSON = {};
    console.log(formData)
    formData.forEach(function(value, key) {
        convertedJSON[key] = value;
    });
    console.log(convertedJSON)
    return convertedJSON;
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
        // calculate and display the total amount of the items in the cart, and the number of items.

    }
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        // display the totals.
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page

    }


    async checkout(form) {

    }

}
document.querySelector("#checkoutbutton").addEventListener("click", formDataToJSON)