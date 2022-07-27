var paginated = document.querySelector(".pagination");
var number = document.querySelector("#num").value;
var page = document.querySelector("#page").value;
var html = "";

if(number / 60 > 1){
    for(var i = 0; i < number / 60; i++){
        if(page ==! i + 1){
            html += "<form action='/economy/list' method='GET'><input type='number' name='page' value='"+ (i + 1) +"' style='display: none;'><li class='page-item'><button type='submit' class='page-link text-light'>"+ (i + 1) +"</button></li></form>"
        } else {
           html += "<form action='/economy/list' method='GET'><input type='number' name='page' value='"+ (i + 1) +"' style='display: none;'><li class='page-item'><button type='submit' class='page-link text-light active'>"+ (i + 1) +"</button></li></form>"
        }
    }
}

paginated.innerHTML = html;