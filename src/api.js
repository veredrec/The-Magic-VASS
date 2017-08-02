const http = require('http');
const request = require('request');
const fs = require('fs');


const apiCall = (url) => {
//  request(url, (error, response, body) => {
//     // console.log(response.statusCode);
//      console.log(body);
// // return response;
//   })

}

// let apiData = '';
// request
//   .get(url)
//   .on('error',(err) =>{
//   console.log(new TypeError('this is an Error'));
//   })
//   .on('data', (chunks) = {
//       apiData += chunks
//     })
//   // .pipe(fs.createWriteStream(data));
//   console.log(apiData)


	// request.get(apiURL, (response) => {
	// 	if (res.statusCode !== 200) {
	// 		response.writeHead(404, {'Content-Type' : 'text/html'})
	// 		response.end("Request Failed." + res.statusCode);
	// 	}
	// 	else {
	// 		callback(null, response)
	// 	}
	// })

module.exports = apiCall;
