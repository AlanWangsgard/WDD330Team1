import { renderListWithTemplate } from './utils.js';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        // We passed in this information to make our class as reusable as possible. Being able to define these things when we use the class will make it very flexible
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.list
    }
    async init() {
        // our dataSource will return a Promise...so we can use await to resolve it.
        const list = await this.dataSource.getData(this.category);
        console.log("hello", list);
        this.list = list
        this.renderList(list);
        //set the title to the current category
        document.querySelector('.title').innerHTML = this.category;
        document.querySelector('.topProduct').innerHTML = this.category;
    }

    prepareTemplate(template, product) {

        template.querySelector('a').href += product.Id;
        template.querySelector('img').src = product.Images.PrimaryMedium;
        template.querySelector('img').alt += product.Name;
        //document.querySelector(".productTitle").textContent = this.product.Brand.Name;
        template.querySelector('.card__brand').textContent = product.Brand.Name;
        template.querySelector('.card__name').textContent = product.NameWithoutBrand;
        template.querySelector('.product-card__price').textContent += product.FinalPrice;
        if (product.IsClearance == true) {
            template.querySelector('.card__discount').textContent = (100 - (product.FinalPrice / product.SuggestedRetailPrice * 100)).toFixed(0) + "% off!"
        }
        return template;
    }
    renderList(list) {
        // make sure the list is empty
        this.listElement.innerHTML = '';
        //get the template
        const template = document.getElementById('product-card-template');
        renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);

    }
    filter(min, max) {
        const list = this.list
        this.list = []
        list.forEach(element => {
            // console.log(element.FinalPrice + " " + (parseFloat(element.FinalPrice) < 100))
            if (parseInt(element.FinalPrice) > min && parseInt(element.FinalPrice) < max) {
                // console.log(this.list.indexOf(element))
                this.list.push(element)
            }
        });
        console.log(this.list)
        this.renderList(this.list)
    }
    sort(term) {
            const list = this.list
            this.list = []
            console.log(typeof(term))
            list.forEach(element => {
                var name = element.Name
                console.log(element.Name)
                if (name.toLowerCase().includes(term.toLowerCase())) {
                    this.list.push(element)
                }
            })
            this.renderList(this.list)
        }
        // original method before moving the template logic to utils.js
        // renderList(list) {
        // const template = document.getElementById('product-card-template');
        // list.forEach(product => {
        //   const clone = template.content.cloneNode(true);
        //   const hydratedTemplate = this.prepareTemplate(clone, product);
        //   this.listElement.appendChild(hydratedTemplate);
        // })
        // }
}