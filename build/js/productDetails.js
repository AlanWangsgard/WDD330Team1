var a=(i,r,d)=>new Promise((u,c)=>{var p=t=>{try{o(d.next(t))}catch(s){c(s)}},l=t=>{try{o(d.throw(t))}catch(s){c(s)}},o=t=>t.done?u(t.value):Promise.resolve(t.value).then(p,l);o((d=d.apply(i,r)).next())});import{setLocalStorage as h}from"./utils.js";import{getLocalStorage as e}from"./utils.js";export default class n{constructor(r,d){this.productId=r,this.product={},this.products=[],this.dataSource=d}init(){return a(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),document.querySelector("main").innerHTML=this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(r){e("so-cart")!=null&&(this.products=e("so-cart")),this.products.push(this.product),h("so-cart",this.products)}renderProductDetails(){return`<section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Image}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`}}
