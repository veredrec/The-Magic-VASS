const handler = require('./handler.js');

const router = (request, response) => {
	const url = request.url;
	if (url === '/') {
		handler.handleHome(response)
	} else if (url.indexOf('/public/') === 0) {
		handler.handlePublic(request, response)
	} else if (url.indexOf('/?submit=') === 0) {
		handler.handleInput(request, response)
	} else {
		response.writeHead(404, {'Content-Type' : 'text/html'});
		response.end('<h1>File not found</h1>')
	}
}

module.exports = router;
