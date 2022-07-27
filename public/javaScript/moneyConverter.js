let from = document.querySelector(".from");
let to = document.querySelector(".to");
let amount = document.querySelector(".amount");
let result = document.querySelector(".result");
let btn = document.querySelector(".convert");
let IQD = document.querySelector(".IQD");

btn.addEventListener("click", function(e){
    if(from.value === 'USD' && to.value === 'IQD') {
        result.textContent = (amount.value * parseFloat(IQD.textContent)) + ' IQD';
    }

    else if(from.value === 'IQD' && to.value === 'USD') {
        result.textContent = '$' + (amount.value / parseFloat(IQD.textContent));
    }
});