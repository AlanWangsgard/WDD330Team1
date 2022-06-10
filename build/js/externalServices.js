const baseURL = 'http://157.201.228.93:2992/'

function convertToJson(res) {
    var jsonResponse = res.json()
        // var errorResponse = res.body()
    if (res.ok) {
        return jsonResponse;
    } else {
        throw { name: 'servicesError', message: jsonResponse };
    }
}

export default class ExternalServices {
    constructor() {
        // this.category = category;
        // this.path = `../json/${this.category}.json`;

    }
    getData(category) {
        // instead we will pass the category we want in here when we need it.
        return fetch(baseURL + `products/search/${category}`)
            .then(convertToJson).then((data) => data.Result);
        // .then(res => res.json()).then((data) => data.Result);


    }
    async findProductById(id) {
        //const products = await this.getData()
        //return products.find((item) => item.Id === id);
        return await fetch(baseURL + `product/${id}`).then(convertToJson)
            .then((data) => data.Result);
    }
    async checkout(payload) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        };
        // return await fetch(baseURL + 'checkout/', options).then(convertToJson);
    }
}