import { loadHeaderFooter } from './utils.js';
import CheckoutProcess from './checkoutProcess.js';

// loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', '.checkout-summary');
myCheckout.init();

document.querySelector('.zip').addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));
// this is how it would look if we listen for the click on the button
document.querySelector('#checkoutbutton')
    .addEventListener('click', (e) => {
        // e.preventDefault();
        const myForm = document.forms[0];
        console.log(myForm)
        const chk_status = myForm.checkValidity();
        console.log(chk_status)
            //         myForm.reportValidity();
        if (chk_status)
            myCheckout.checkout();
    })
    //     });