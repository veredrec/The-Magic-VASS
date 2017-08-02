const tape = require('tape');
const shot = require('shot');
const router = require('./router');

test('Initialise', (t) => {
	let num = 0
	t.deepEquals(num, 0, 'should return 0')
	t.end();
});