import test from 'ava';
import request from 'request-promise';
import posts from '../app/posts.js';

const options = {
    method : 'GET',
    uri : 'http://localhost:5000/',
    resolveWithFullResponse : true
};
var express;

test.before(t => {
    express = require('../server.js');
});

test.after(t => {
    express.server.close();
})

test(t => {
    return request(options).then(result => {
        t.is(result.statusCode, 200);
    });
});

test(t => {
    return request({
        uri : 'http://derek.business/',
        resolveWithFullResponse : true
    }).then(result => {
        t.is(result.request.uri.protocol, 'https:');
    })
});

test(t => {
    return request({
        uri : 'http://www.derek.business/',
        resolveWithFullResponse : true
    }).then(result => {
        t.is(result.request.uri.hostname, 'derek.business');
    })
});

test(t => {
    const opts = Object.assign({}, options);
    opts.uri = options.uri + 'blerg/';
    return request(opts).then(result => {
        t.is(result.statusCode, 200);
    });
});

test(t => {
    const opts = Object.assign({}, options);
    opts.uri = `${options.uri}blerg/${posts[0].slug}`;
    return request(opts).then(result => {
        t.is(result.statusCode, 200);
    });
});

test(t => {
    return t.is(express.app.get('port'), 5000);
});
