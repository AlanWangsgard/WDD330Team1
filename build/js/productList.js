import { renderListWithTemplate } from './utils.js';

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.list
    }
    async init() {
        const list = await this.dataSource.getData(this.category);
        console.log("hello", list);
        this.list = list
        this.renderList(list);
        document.querySelector('.title').innerHTML = this.category;
        document.querySelector('.topProduct').innerHTML = this.category;
    }

    prepareTemplate(template, product) {

        template.querySelector('a').href += product.Id;
        template.querySelector('img').src = product.Images.PrimaryMedium;
        template.querySelector('img').alt += product.Name;
        template.querySelector('.card__brand').textContent = product.Brand.Name;
        template.querySelector('.card__name').textContent = product.NameWithoutBrand;
        template.querySelector('.product-card__price').textContent += product.FinalPrice;
        template.querySelector('.brand').textContent = product.Brand.Name;
        template.querySelector('.product').textContent = product.NameWithoutBrand;
        if (product.IsClearance == true) {
            template.querySelector('.card__discount').textContent = (100 - (product.FinalPrice / product.SuggestedRetailPrice * 100)).toFixed(0) + "% off!"
        }
        return template;
    }
    renderList(list) {
        this.listElement.innerHTML = '';
        const template = document.getElementById('product-card-template');
        renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);

    }
    filter(min, max) {
        const list = this.list
        this.list = []
        list.forEach(element => {
            if (parseInt(element.FinalPrice) > min && parseInt(element.FinalPrice) < max) {
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

}