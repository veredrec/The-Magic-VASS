const apiCall = require('./api.js'); // request file api.js for app
const fs = require('fs'); // require fs for app
const path = require('path'); // require path for app
const apiURL = 'https://api.cryptowat.ch/markets/summaries'; // url for api call

const handleHome = (response) => {
    const filePath = path.join(__dirname, `..`, `public`, `index.html` );
    fs.readFile(filePath, (error, file) => {
        if (error) { // if there is an error - print a 500 error message
            response.writeHead(500, `Content-Type: text/html`);
            response.end(`<h1>Sorry, there is a problem with the server </h1>`);
        } else { // if the call went through - serve the file
            response.writeHead(200, `Content-Type: text/html`); // server the html file
            response.end(file); // serve the file
        }
    })
}

const handlePublic = (response, url) => {
    const extention = url.split('.')[1]; // taking the part of the file name which is the extention, i.e. "css".
    const extentionType = { //object of the differnet types of files
        html: 'text/html',
        css: 'text/css',
        js: 'application/javascript',
        ico: 'image/x-icon',
        png: 'image/png'
    }
    const filePath = path.join(__dirname, '..', url); // define file path
    fs.readFile(filePath, (error, file) => { // read file and pass error first callback
        if (error) { // if there is an error - print a 500 error message
            response.writeHead(500, `Content-Type: text/html`);
            response.end(`<h1>Sorry, there is a problem with the server </h1>`);
        } else { // if the call went through - serve the file
            response.writeHead(200, `Content-Type: ${extentionType[extention]}`); // server the file that matches the type we are looking for
            response.end(file); // serve the file
        }
    })
}

// const handleInput = (request, response) => {
//
// }

module.exports = {
    handleHome,
    handlePublic
    // handleInput
}
