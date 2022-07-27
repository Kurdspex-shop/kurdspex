let IQD = document.querySelector(".IQD");
let tab = document.querySelector(".cardTab");
let cardBody = document.querySelector(".cardBody");
let lang1 = document.querySelector(".lang");

let windows = {
    title: 'Windows 10',
    cards: [
        {image: "./W10P.jpg", name: "Windows 10 Professional", description: "Windows 10 Professional Lifetime Product Key (active key) for 32/64 Bit computer Systems", price: 20.00}
    ]
}

let Offices = {
    title: 'Microsoft Office',
    cards: [
        {image: "./O19PP.jpg", name: "Microsoft Office 2019 Professional Plus", description: "Original Microsoft Office 2019 Professional Plus Lifetime Product Key (active key) for 32/64 Bit Systems <br> (for 1 PC) + Supported Official Website", price: 70.00},
        {image: "./O19SB.jpg", name: "Microsoft Office 2019 Home and Student", description: "Original Microsoft Office 2019 <br> Home and Student Lifetime Product Key (active key) for 32/64 Bit Systems <br> (for 1 PC) (Windows)", price: 60.00},
        {image: "./O19SB.jpg", name: "Microsoft Office 2019 Home and Student", description: "Original Microsoft Office 2019 <br> Home and Student Lifetime Product Key (active key) for 32/64 Bit Systems <br> (for 1 PC) (MAC + Windows)", price: 115.00},
        {image: "./O16PP.jpg", name: "Microsoft Office 2016 Professional Plus", description: "Original Microsoft Office 2016 Professional Plus serial number (active key) for 32/64 Bit Systems <br> (for 1 PC) + Supported Official Website", price: 45.00},
        {image: "./O16SB.jpg", name: "Microsoft Office 2016 Home and Student", description: "Original Microsoft Office 2016 <br> Home and Student Lifetime Product Key (active key) for 32/64 Bit Systems <br> (for 1 PC) (MAC + Windows)", price: 90.00}
    ]
}

let windowsServer = {
    title: 'Windows Server',
    cards: [
        {image: "./WSD19.jpg", name: "Windows Server 2019 Datacenter", description: "Windows Server 2019 Datacenter <br> Lifetime Product Key (active key)", price: 505.00},
        {image: "./WSS19.jpg", name: "Windows Server 2019 Standard", description: "Windows Server 2019 Standard <br> Lifetime Product Key (active key)", price: 455.00},
        {image: "./WSE19.jpg", name: "Windows Server 2019 Essentials", description: "Windows Server 2019 Essentials <br> Lifetime Product Key (active key)", price: 135.00},
        {image: "./WSD16.jpg", name: "Windows Server 2016 Datacenter", description: "Windows Server 2016 Datacenter <br> Lifetime Product Key (active key)", price: 135.00},
        {image: "./WSS16.jpg", name: "Windows Server 2016 Standard", description: "Windows Server 2016 Standard <br> Lifetime Product Key (active key)", price: 105.00},
        {image: "./WSE16.jpg", name: "Windows Server 2016 Essentials", description: "Windows Server 2016 Essentials <br> Lifetime Product Key (active key)", price: 90.00}
    ]
}

if(tab.textContent !== '') {
    if(tab.textContent === 'windows') makeCards(windows);
    else if(tab.textContent === 'office') makeCards(Offices);
    else if(tab.textContent === 'server') makeCards(windowsServer);
}

function makeCards(list) {
    let html = `<div class="container mb-5"><div class="text-center display-1 mb-2">${list.title}</div><div class="row">`;
    list.cards.forEach( card => {
        html += `<div class="col-xl-4 col-md-5 mx-auto mt-4">
            <div id="${list.title.replace(' ', '')}" class="card shadow">
                <img src="${card.image}" class="card-img-top">
                <div class="card-body bg-light">
                  <h2 class="card-title">${card.name}</h2>
                  <p class="card-text">${card.description}</p>
                  <br>
                  <h1>$<span id="price">${card.price}</span></h1>
                  <button type="button" class="btn btn-primary rounded-pill px-4 ms-auto mt-2" data-bs-toggle="modal" data-bs-target="#Modal">Buy</button>
                </div></div></div>`
    });
    html += `<div class="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
    <div class="modal-content"><div class="modal-header bg-dark"><div class="d-none lang">${lang1.textContent}</div>
    <h4 class="modal-title text-light mx-auto display-5 KU d-none" id="ModalLabel">چۆنیەتی کڕینی کاڵا</h4><h4 class="modal-title text-light mx-auto display-5 EN d-none" id="ModalLabel">How To Buy Product</h4><h4 class="modal-title text-light mx-auto display-5 AR d-none" id="ModalLabel">كيفية شراء المنتج</h4><select class="form-select p-1 ps-2 bg-dark text-light language">
    <option value="KU" class="option">KU</option><option value="AR" class="option">AR</option><option value="EN" class="option">EN</option></select>
    </div><div class="modal-body"><div class="text-center mb-4 KU d-none">بۆ کڕینی ئەم کاڵایە پەیوەندیمان پێوەبکە لەرێگای ئەم لینکانەی خوارەوە</div>
    <div class="text-center mb-4 EN d-none">To buy this product you can contact us throw those links</div><div class="text-center mb-4 AR d-none">لشراء هذا المنتج يمكنك الاتصال بنا من خلال هذه الروابط</div>
    <div class="job-cv mt-2"><div class="d-flex flex-row mx-2 text-dark"><div class="mx-auto"><a href="https://www.instagram.com/kurdspexcompany/" class="icon"><i class="fab fa-facebook"></i></a>
    </div><div class="mx-auto"><a href="https://t.me/Kurdspex" class="icon"><i class="fab fa-telegram"></i></a></div><div class="mx-auto"><a href="viber://chat?number=07518979796" class="icon"><i class="fab fa-viber"></i></a></div></div></div>
    <div class="text-center mt-3 KU d-none">یان دەتوانی پەیوەندیمان پێوەبکەیمان پێوەبکەی لە رێگای ئەمژمارەی پەیوەندیەی خوارەوە</div><div class="text-center mt-3 EN d-none">or you can call us at this number</div>
    <div class="text-center mt-3 AR d-none">أو يمكنك الاتصال بنا على هذا الرقم</div><div class="text-center h1">0751 897 9796</div>
    </div></div></div></div>`
    html += `</div></div>`
    cardBody.innerHTML = html;
}