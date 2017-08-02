const handler = require('./handler.js');

const router = (request, response) => {
	console.log(request.url);
	const url = request.url;
	if (url === '/') {
		console.log('home route');
		handler.handleHome(response)
	} else if (url.indexOf('/public/') === 0) {
		handler.handlePublic(response, url)
	} else if (url.indexOf('/?cryptoCurrency') === 0) {
		console.log('running');
		handler.handleInput(request, response)
		// 	(err, res)=>{
		// 	console.log(res)
		// })
	} else {
		response.writeHead(404, {'Content-Type' : 'text/html'});
		response.end('<h1>File not found</h1>')
	}
}

module.exports = router;
