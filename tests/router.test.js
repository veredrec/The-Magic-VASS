const tape = require('tape');
const shot = require('shot');
const router = require('../src/router');
// const handler = require('./src/handler.js')

tape('Do I work?', (t) => {
	let num = 0
	t.deepEquals(num, 0, 'should return 0')
	t.end();
});

tape('Router.js, Test 1: Home route returns status code of 200', (t) => {
	shot.inject(router, {method: 'get', url: "/" }, (res) => {
		t.deepEqual(res.statusCode, 200, 'should return w/status code 200');
		t.end();
	})
})

tape('Router.js, Test 2: Home route returns status code of 404', (t) => {
	shot.inject(router, {method: 'get', url: "/who-am-I" }, (res) => {
		t.deepEqual(res.statusCode, 404, 'should return w/status code 404');
		t.end();
	})
})

tape('Router.js, Test 3: Route returns message of res.end', (t) => {
	// urlTest = request.'/public/';
	shot.inject(router, {method: 'get', url: '/avobum'}, (res) => {
		t.deepEqual(res.statusCode, 404, 'should return w/status code 404');
		t.deepEqual(res.payload, '<h1>File not found</h1>', 'should return res.end message');
		t.end();
	})
})



// tape('HandlePublic - First Test: Check if the file is split', (t) => {
// 	let expected = 'myMomLikesTomatoes.jpg'
// 	console.log(handlePublic.extension(expected));
// 	shot.inject({method: 'get', 'url': '/'}, (res) => {
// 		t.deepEqual(arr, expected, 'Should return ')
// 	})


// 	let expected = handlePublic.extension

module.exports = router.test;
