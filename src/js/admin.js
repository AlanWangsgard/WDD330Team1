import { doc } from "prettier";
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
    } 
    catch(err) {
        // remember this from before?
        alertMessage(err.message.message);
    }
    }

    async showLogin() {
        let loginContainer = document.querySelector(".login");
        loginContainer.innerHTML = 
        `<h2>Login</h2>
        <form id="loginForm" action="">
        <label for="email">Email:</label>
        <input type="text" name="email" id="emailAddress">
        <label for="password">Password:</label>
        <input type="password" name="password" id="passWord">
        <Button>Submit</Button>
        </form> `;
    }

}

const myAdmin = new Admin("main");
myAdmin.showLogin();