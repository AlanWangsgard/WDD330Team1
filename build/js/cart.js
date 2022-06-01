import{setLocalStorage as i}from"./utils.js";function a(e){return JSON.parse(localStorage.getItem(e))}function c(){let e="";var t=0;const r=a("so-cart"),o=r.map(s=>u(s,t++));document.querySelector(".product-list").innerHTML=o.join("")}function l(){const e=a("so-cart");let t=0;if(e!==null){for(let o of e)t+=o.FinalPrice,console.log(t);let r=`$${t.toFixed(2)}`;document.querySelector(".cart-total").innerHTML=r,document.querySelector(".cart-footer").style.display="inline"}else document.querySelector(".cart-footer").style.display="none";return t}function u(e){const t=`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${e.Image}"
      alt="${e.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${e.Name}</h2>
  </a>
  <p class="cart-card__color">${e.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${e.FinalPrice}</p>
  <button id='removeFromCart' type='button' value=${e.Id}>Delete</delete>
</li>`;return console.log(t),t}function d(e){console.log(e);let t=a("so-cart");t||(t=[]);var r=t.find(o=>o.Id===e);t.splice(t.indexOf(r),1),console.log(t),i("so-cart",t),c(),n(),l()}a("so-cart")!=null&&(c(),n(),l());function n(){var e=document.querySelectorAll("#removeFromCart");e.forEach(t=>t.addEventListener("click",function(){d(t.value)}))}
