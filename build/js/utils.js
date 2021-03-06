function convertToText(res) {
    if (res.ok) {
        return res.text();
    } else {
        throw new Error('Bad Response');
    }
}



export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
export function setClick(selector, callback) {
    qs(selector).addEventListener('touchend', (event) => {
        event.preventDefault();
        callback();
    });
    qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export function renderListWithTemplate(template, parent, list, callback) {
    list.forEach(item => {
        const clone = template.content.cloneNode(true);
        const templateWithData = callback(clone, item);
        parent.appendChild(templateWithData);
    })
}

export function renderWithTemplate(template, parent, data, callback) {

    let clone = template.content.cloneNode(true);
    if (callback) {
        clone = callback(clone, data);

    }
    parent.appendChild(clone);

}

export async function loadTemplate(path) {
    const html = await fetch(path).then(convertToText);
    const template = document.createElement('template');
    template.innerHTML = html;
    return template;

}

export async function loadHeaderFooter() {
    const header = await loadTemplate('../partials/header.html');
    const footer = await loadTemplate('../partials/footer.html');
    const headerElement = document.getElementById('main-header');
    const footerElement = document.getElementById('main-footer');
    renderWithTemplate(header, headerElement);
    renderWithTemplate(footer, footerElement);
}

export function animateCart() {
    var cart = document.querySelector(".cart");

    cart.addClass('shake');

}

export function cartIconValue() {
    var data = getLocalStorage("so-cart")
    var numItems = 0
    if (data != null) {
        data.forEach(item => { numItems += item.quantity });
        document.querySelector(".iconNumber").innerHTML = numItems
    }
}