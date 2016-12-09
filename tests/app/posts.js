import test from 'ava';
import posts from '../../app/posts.js';

test(t => {
    return t.true(Array.isArray(posts));
});

test(t => {
    return t.true('title' in posts[0]);
});
