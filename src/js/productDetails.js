// import { setLocalStorage } from "./utils.js";
// import { getLocalStorage } from "./utils.js";
// export default class productDetails {

//     constructor(productId, dataSource) {
//         this.productId = productId;
//         this.product = {};
//         this.products = [];
//         this.dataSource = dataSource;
//     }
//     async init() {
//         // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//         // console.log(this.dataSource.findProductById(this.productId))
//         this.product = await this.dataSource.findProductById(this.productId);
//         document.querySelector("main").innerHTML = this.renderProductDetails()
//             // once we have the product details we can render out the HTML
//             // once the HTML is rendered we can add a listener to Add to Cart button
//             // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
//         document.getElementById('addToCart')
//             .addEventListener('click', this.addToCart.bind(this));
//     }

//     addToCart(e) {
//         // console.log("yeet", this.product)
//         // console.log()
//         if (getLocalStorage("so-cart") != null) {
//             this.products = getLocalStorage("so-cart")
//         }
//         this.products.push(this.product)
//             // const data = this.product.getData().find((item) => item.Id === e.target.dataset.id);
//         setLocalStorage("so-cart", this.products);
//     }

//     renderProductDetails() {
//         // const data = this.product.Name
//         // console.log("details", this.product)
//         return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
//     <h2 class="divider">${this.product.NameWithoutBrand}</h2>
//     <img
//       class="divider"
//       src="${this.product.Image}"
//       alt="${this.product.NameWithoutBrand}"
//     />
//     <p class="product-card__price">$${this.product.FinalPrice}</p>
//     <p class="product__color">${this.product.Colors[0].ColorName}</p>
//     <p class="product__description">
//     ${this.product.DescriptionHtmlSimple}
//     </p>
//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
//     </div></section>`;
//     }


// }

import { setLocalStorage, getLocalStorage, loadHeaderFooter } from './utils.js';


loadHeaderFooter();
export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        document.querySelector('main').innerHTML = this.renderProductDetails();
        // add listener to Add to Cart button
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
    }
    addToCart() {
        // to fix the cart we need to get anything that is in the cart already.
        let cartContents = getLocalStorage('so-cart');
        //check to see if there was anything there
        if (!cartContents) {
            cartContents = [];
        }
        // then add the current product to the list
        cartContents.push(this.product);
        setLocalStorage('so-cart', cartContents);
    }

    calculateDiscount() {
        let discountPercentage = 0;
        let priceDifference = 0;

        priceDifference = this.product.SuggestedRetailPrice - this.product.FinalPrice;
        discountPercentage = (priceDifference / this.product.SuggestedRetailPrice) * 100;
        return Math.round(discountPercentage);
    }

    renderProductDetails() {
        return `<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.SuggestedRetailPrice}</p>
    <p class="product-card__discount">$${this.product.FinalPrice} (${this.calculateDiscount()}% off!)</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
    }

}