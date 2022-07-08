import { doc } from "../web_modules/prettier.js";
import ExternalServices from './externalServices.js';

export default class Admin {


    constructor(outputSelector) {
        this.mainElement = document.querySelector(outputSelector);
        this.token = null;
        this.services = new ExternalServices();
    }
    async login(creds, next) {
        // I built the login method with a callback: next. 
        // This makes it much more flexible...
        // there could be many different things the user wants to do after logging in...
        // this allows us that flexibility without having to write a bunch of login methods
        try {
            this.token = await this.services.loginRequest(creds);
            next()
        } catch (err) {
            // remember this from before?
            console.log(err.message.message);
        }
    }
    async showOrders() {
        // console.log("hello")
        try {
            const orders = await this.services.getOrders(this.token);
            console.log(orders)
            this.mainElement.innerHTML = orderHtml();
            const parent = document.querySelector('#orders tbody');
            // why not a template like we have done before?  The markup here was simple enough that I didn't think it worth the overhead...but a template would certainly work!
            parent.innerHTML = orders.map(order => `<tr><td>${order.id}</td><td>${new Date(order.orderDate).toLocaleDateString('en-US')}</td><td>${checkorder(order)}</td><td>${order.orderTotal}</td></tr>`).join('');
        } catch (err) {
            console.log(err);
        }
    }

    async showLogin() {
        //     let loginContainer = document.querySelector(".login");
        //     loginContainer.innerHTML =
        //         `<h2>Login</h2>
        // <form id="loginForm" action="">
        // <label for="email">Email:</label>
        // <input type="text" name="email" id="email">
        // <label for="password">Password:</label>
        // <input type="password" name="password" id="password">
        // <Button id="loginButton">Submit</Button>
        // </form> `;
        this.mainElement.innerHTML = loginForm();

        document.querySelector('#loginButton').addEventListener('click', (e) => {
                const email = document.querySelector('#email').value;
                const password = document.querySelector('#password').value;
                this.login({ email, password }, this.showOrders.bind(this));
            }

        )
    }
}

function loginForm() {
    return `<h2>Login</h2>
        <form id="loginForm" action="">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email" value="user1@email.com">
        <label for="password">Password:</label>
        <input type="password" name="password" id="password">
        <Button id="loginButton" type="button">Submit</Button>
        </form> `;
}

function orderHtml() {
    return `<h2>Current Orders</h2>
  <table id="orders">
  <thead>
  <tr><th>Id</th><th>Date</th><th>#Items</th><th>Total</th>
  </thead>
  <tbody class="order-body"></tbody>
  </table>
  `;
}

function checkorder(order) {
    if (order.items) {
        return order.items.length
    } else {
        return 0
    }
}
const myAdmin = new Admin("main");
myAdmin.showLogin();