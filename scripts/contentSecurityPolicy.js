const helmet = require('helmet');

const connectSrcUrls = ["https://ka-f.fontawesome.com/"];
const scriptSrcUrls = ["https://kit.fontawesome.com/"];
const styleSrcUrls = ["https://ka-f.fontawesome.com/releases"];
const imgSrcUrls = ["https://images-na.ssl-images-amazon.com/images/", "https://m.media-amazon.com/images/", "https://sc04.alicdn.com/"];
const fontSrcUrls = ["https://ka-f.fontawesome.com/"];

module.exports = helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: [],
        connectSrc:["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", "blob:"],
        objectSrc: [],
        imgSrc: ["'self'", "blob:", "data:", ...imgSrcUrls],
        fontSrc: ["'self'", ...fontSrcUrls],
        frameSrc: ["'self'", "https://www.google.com/", "https://youtu.be/", "https://www.youtube.com/"]
    }
})