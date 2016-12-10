import test from 'ava';
import Helpers from '../helpers.js';

const helpers = Helpers();

test('Validate module type', t => {
    return t.is(typeof Helpers, 'function');
});

test('Format date, default format', t => {

    return t.is(helpers.formatDate('2016-12-07T22:28'), 'December 7th 2016, 10:28 pm');

});

test('Format date, custom format', t => {

    return t.is(helpers.formatDate('2016-12-07T22:28', 'MMMM Do YYYY'), 'December 7th 2016');

});
