let lang = document.querySelector(".language");
let KU = document.querySelectorAll(".KU");
let AR = document.querySelectorAll(".AR");
let EN = document.querySelectorAll(".EN");
let language = document.querySelector(".lang");
let option = document.querySelectorAll(".option");

if(language.textContent === 'EN'){
    option[2].setAttribute('selected', '');
    EN.forEach(function(e){
        e.classList.remove('d-none');
    });
}

else if(language.textContent === 'AR'){
    option[1].setAttribute('selected', '');
    AR.forEach(function(e){
        e.classList.remove('d-none');
    });
}

else {
    KU.forEach(function(e){
        e.classList.remove('d-none');
    });
}

lang.addEventListener("change", function(e){
    if(lang.value === 'KU') {
        KU.forEach(function(e){
            e.classList.remove('d-none');
        });

        AR.forEach(function(e){
            e.classList.add('d-none');
        });

        EN.forEach(function(e){
            e.classList.add('d-none');
        });
    } else if (lang.value === 'AR') {
        KU.forEach(function(e){
            e.classList.add('d-none');
        });

        AR.forEach(function(e){
            e.classList.remove('d-none');
        });

        EN.forEach(function(e){
            e.classList.add('d-none');
        });
    } else {
        KU.forEach(function(e){
            e.classList.add('d-none');
        });

        AR.forEach(function(e){
            e.classList.add('d-none');
        });

        EN.forEach(function(e){
            e.classList.remove('d-none');
        });
    }
    
    fetch('/language', {method: 'post', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'}, body: JSON.stringify({lang: lang.value})});
});