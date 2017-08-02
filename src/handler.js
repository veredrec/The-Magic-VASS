const path = require('path');
const fs = require('fs');
const apiCall = require('./api.js');
const apiURL = 'https://api.cryptowat.ch/markets/summaries'


const handleHome = (response) => { //this is for taking the 

}

const handlePublic = (request, response) => { //This is to handle all files that are not related to home and API requests

}

const handleInput = (request, response) => {

}

module.exports = {
	handleHome, 
	handlePublic, 
	handleInput
}
