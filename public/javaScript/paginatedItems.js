const paginated = document.querySelector(".pagination");
const number = document.querySelector("#num").value;
const page = parseInt(document.querySelector("#page").value);
let html = "";

let pageNumber = Math.ceil(number / 24);
let start = Math.max(Math.min(page, pageNumber - 2), 3) - 2;
let end = Math.min(start + 4, pageNumber);

if(pageNumber > 1){
    html += `<form action='/items' method='GET'><input type='number' name='page' value='1' style='display: none;'><li class='page-item'><button type='submit' class='page-link text-light'>&laquo;</button></li></form>`
    for(var i = start; i <= end; i++){
        if(page === i){
            html += `<form action='/items' method='GET'><input type='number' name='page' value='${i}' style='display: none;'><li class='page-item'><button type='submit' class='page-link text-light active'>${i}</button></li></form>`
        } else {
           html += `<form action='/items' method='GET'><input type='number' name='page' value='${i}' style='display: none;'><li class='page-item'><button type='submit' class='page-link text-light'>${i}</button></li></form>`
        }
    }
    html += `<form action='/items' method='GET'><input type='number' name='page' value='${pageNumber}' style='display: none;'><li class='page-item'><button type='submit' class='page-link text-light'>&raquo;</button></li></form>`
}

paginated.innerHTML = html;