var tabs = document.querySelectorAll(".nav-link");
var currentTab = document.querySelector("#nav");

if(currentTab) {
    if(currentTab.textContent === "Carts"){
        var cart = document.querySelector("#cart");
        cart.classList.add("cart-active");
    } else {
        tabs.forEach(function(tab){
            if(tab.textContent === currentTab.textContent){
                tab.classList.toggle("active");
            }
        });
    }
}