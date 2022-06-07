function convertToJson(res) {
    if (res.ok) {
        return res.json();
    } else {
        throw new Error('Bad Response');
    }
}

export default class Alert {
    constructor() {}

    async getJson() {

        return await fetch("../json/alerts.json")
            .then(convertToJson).then((data) => { return data })
            // .then((data) => data.value)
    }


}

async function renderalerts() {
    var data = new Alert()
    let sec = document.createElement("section");
    sec.classList.add("alert-list");
    console.log(await data.getJson())
    var alerts = await data.getJson()
    alerts.forEach(element => {
        let p = document.createElement("p")
        p.innerHTML = element.message
        p.style.backgroundColor = element.background
        p.style.color = element.color
        sec.appendChild(p)
    });
    document.querySelector("main").prepend(sec)
}

renderalerts()