let btn = document.querySelector("#IQD-btn");
let money = document.querySelectorAll(".money");
let pref = document.querySelectorAll(".p");
let USD = [];
let IQD = document.querySelector("#IQD");

money.forEach(function(m){
    USD.push(m.textContent);
});

btn.addEventListener('click', function(event){
    if(btn.textContent === 'IQD') {
        btn.textContent = 'USD';
        money.forEach(function(m){
            m.textContent = new Intl.NumberFormat().format(Math.floor(parseFloat(m.textContent) * parseInt(IQD.textContent))) + " IQD";
        });
        pref.forEach(function(p){
            p.textContent = '';
        });
    } else {
        btn.textContent = 'IQD';
        for(var i = 0; i < money.length; i++){
            money[i].textContent = USD[i];
        }
        pref.forEach(function(p){
            p.textContent = '$';
        });
    }
});