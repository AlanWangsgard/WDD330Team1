import { setLocalStorage, getLocalStorage, cartIconValue } from './utils.js';


export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;

    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        console.log(this.product)
        document.querySelector('main').innerHTML = this.renderProductDetails();
        document.getElementById('addToCart')
            .addEventListener('click', this.addToCart.bind(this));
        document.getElementById('addToWishList')
            .addEventListener('click', this.addToWishList.bind(this));

        document.querySelector(".productTitle").textContent = this.product.NameWithoutBrand;
        const discount = document.querySelector(".discount")
        const fullPrice = document.querySelector(".fullPrice")
        if (this.product.IsClearance == true) {
            discount.innerHTML = " " + (100 - (this.product.FinalPrice / this.product.SuggestedRetailPrice * 100)).toFixed(0) + "% Off!"
            discount.style.display = "block"
            fullPrice.innerHTML = " $" + this.product.SuggestedRetailPrice
        }
        // if (this.product.Colors.length > 1) {
        // console.log(this.product.Colors)
        const procolors = document.querySelector(".product__color")
        const ul = document.createElement("ul")
        ul.classList.add("previewList")
        var i = 0
        this.product.Colors.forEach(color => {
            var li = document.createElement("li")
            var span = document.createElement("span")
            const input = document.createElement("input")
            input.type = "hidden"

            span.innerHTML = color.ColorName
            span.classList.add("previewBox")
            var img = document.createElement("img")
            img.classList.add("preview")
            img.src = color.ColorPreviewImageSrc
            input.value = color.ColorName
            input.classList.add("colorValue")
            span.append(img)
            span.append(input)
            li.append(span)
            ul.append(li)
            i += 1
        })
        procolors.innerHTML = ""
        procolors.append(ul)
            // }
        this.addListen()
        if (this.product.Images.ExtraImages.length > 0) {
            this.createCarousel()
        }
        showSlide(0)

    }
    addListen() {
        var product = this.product
        document.querySelector(".previewBox").classList.add("selected")
        console.log(product.Colors[0])
        var i = 0
        document.querySelectorAll(".previewBox").forEach(element => {

            element.addEventListener("click", function() {
                if (document.querySelector(".selected") != null) {
                    document.querySelector(".selected").classList.remove("selected")
                }
                element.classList.add("selected")
            })
        })



    }
    addToCart() {
        // to fix the cart we need to get anything that is in the cart already.
        let cartContents = getLocalStorage('so-cart');
        //check to see if there was anything there
        if (!cartContents) {
            cartContents = [];
        }
        this.product.selectedColor = this.product.Colors.find(colors => colors.ColorName == document.querySelector(".selected").querySelector(".colorValue").value)
        console.log(cartContents.length)
        if (!this.product.quantity) {
            this.product.quantity = 1
        }
        if (cartContents.length == 0) {

            cartContents.push(this.product);
        } else {
            var duplicate = true
            cartContents.forEach(item => { if (!item.quantity) { item.quantity = 1 } if (item.Id == this.productId && item.selectedColor.ColorName == this.product.selectedColor.ColorName) { item.quantity += 1, duplicate = true } else { duplicate = false } });
            console.log(duplicate);
            if (duplicate == false) {
                cartContents.push(this.product)
            }
        }

        setLocalStorage('so-cart', cartContents);
        var cart = document.querySelector(".cart");
        cart.classList.toggle("shake")
        setTimeout(function() {
            cart.classList.toggle("shake")
        }, 1000)
        cartIconValue()
    }
    addToWishList() {
        let cartContents = getLocalStorage('wish-list');
        if (!cartContents) {
            cartContents = [];
        }
        this.product.selectedColor = this.product.Colors.find(colors => colors.ColorName == document.querySelector(".selected").querySelector(".colorValue").value)
        console.log(cartContents.length)
        if (!this.product.quantity) {
            this.product.quantity = 1
        }
        if (cartContents.length == 0) {

            cartContents.push(this.product);
        } else {
            var duplicate = true
            cartContents.forEach(item => { if (!item.quantity) { item.quantity = 1 } if (item.Id == this.productId && item.selectedColor.ColorName == this.product.selectedColor.ColorName) { item.quantity += 1, duplicate = true } else { duplicate = false } });
            console.log(duplicate);
            if (duplicate == false) {
                cartContents.push(this.product)
            }
        }

        setLocalStorage('wish-list', cartContents);
    }
    renderProductDetails() {
        return `<section class="product-detail"><p class="discount"></p> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <div class="slideContainer">
    <div class="slide activeSlide">
    <input type="hidden" class="slidenumber" value="0">
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    </div>
    </div>
    <p class="product-card__price">$${this.product.FinalPrice}<span class="fullPrice"></span></p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      <button id="addToWishList" data-id="${this.product.Id}">Add To Wish List</button>
    </div></section>`;
    }
    createCarousel() {
        const images = this.product.Images.ExtraImages
        var container = document.querySelector(".slideContainer")
        container.classList.add("slidecontainer")
        var i = 1
        images.forEach(img => {
            var div = document.createElement("div")
            var input = document.createElement("input")
            input.type = "hidden"
            input.classList.add("slidenumber")
            input.value = i
            div.classList.add("slide")
            div.style.display = "none"
            var image = document.createElement("img")
            image.src = img.Src
            img.alt = img.Title
            div.append(input)
            div.append(image)
            container.append(div)
            i++
        })
        var prev = document.createElement("input")
        var next = document.createElement("input")
        prev.addEventListener("click", minusSlide)
        next.addEventListener("click", plusSlide)
        prev.classList.add("prev")
        next.classList.add("next")
        prev.type = "button"
        next.type = "button"
        prev.value = "<"
        next.value = ">"
        container.append(prev)
        container.append(next)
            // document.querySelector("main").append(container)
        var slides = document.getElementsByClassName("slide")
            // slides[0].classList.add("activeSlide")
            // showSlide(0)
    }

}

// document.querySelector(".prev").addEventListener("click", minusSlide)
// document.querySelector(".next").addEventListener("click", plusSlide)

function minusSlide() {
    console.log("minus")
    showSlide(-1)
}

function plusSlide() {
    console.log("plus")
    showSlide(1)
}

function showSlide(i) {
    var slides = document.getElementsByClassName("slide")
    var active = document.querySelector(".activeSlide")
    var slideNumber = active.querySelector(".slidenumber").value
    var newslide = parseInt(slideNumber) + i
    if (newslide < 0) {
        newslide = slides.length - 1
    } else if (newslide > (slides.length - 1)) {
        newslide = 0
    }
    // slides[parseInt(slideNumber)].classList.remove("")
    // console.log(slides[parseInt(slideNumber) + i])
    active.style.display = "none"
    slides[newslide].style.display = "block"
    active.classList.remove("activeSlide")
    slides[newslide].classList.add("activeSlide")
}