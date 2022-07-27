let carts = document.querySelectorAll(".price");
let total = document.querySelector(".total");
let sum = 0;

console.log(carts);
console.log(total);

carts.forEach(function(price){
    sum += parseFloat(price.textContent.slice(0));
});

total.textContent = sum;
