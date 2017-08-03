const tape = require('tape');
const shot = require('shot');
const router = require('../src/router');

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
});

tape('Router.js, Test 2: Home route returns status code of 404', (t) => {
	shot.inject(router, {method: 'get', url: "/who-am-I" }, (res) => {
		t.deepEqual(res.statusCode, 404, 'should return w/status code 404');
		t.end();
	})
});


tape('Router.js - Test 3: Returns as an object and as a truthy statement', (t) => {
	shot.inject(router, {method: 'get', url: '/'}, (res) => {
			t.ok(res, 'should not return falsey')
			t.deepEqual(typeof res, 'object', 'should return obj');
			t.end();
	})
});

tape('Router.js, Test 3: Route returns 404 and error message', (t) => {
	shot.inject(router, {method: 'get', url: '/avocodo-muncher'}, (res) => {
		t.deepEqual(res.statusCode, 404, 'should return w/status code 404');
		t.deepEqual(res.payload, '<h1>File not found</h1>', 'should return res.end message');
		t.end();
	})
})

module.exports = router.test;