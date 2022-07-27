const https = require("https");

let money = {
    IQD: 1475,
    date: 20202020,
    convert: function(money, from = 'USD', to = 'IQD') {
        return new Promise((resolve, reject) => {
            https.get(`https://www.xe.com/currencyconverter/convert/?Amount=${money}&From=${from}&To=${to}`, res => {
                let data = '';
                res.on("data", chunk => {
                    data += chunk;
                });
    
                res.on("end", () => {
                    data = data.slice(210000);
                    let target = '<p class="result__BigRate-sc-1bsijpp-1 iGrAod">';
                    let index = data.indexOf(target) + target.length;
                    let IQD = data.slice(index, data.indexOf('<span class="faded-digits">'));
                    resolve(IQD.replace(',', ''));
                });
            }).on("error", err => {
                reject(err);
            });
        });
    },
    revalue: async function() {
        await money.convert(1).then(data => {
            money.IQD = parseInt(data);
            money.date = Date.now();
        });
    }
}

module.exports = money;