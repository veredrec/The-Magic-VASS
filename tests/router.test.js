const tape = require('tape');
const shot = require('shot');
// const router = require('./src/router.js');

tape('Initialise', (t) => {
	let num = 0
	t.deepEquals(num, 0, 'should return 0')
	t.end();
});