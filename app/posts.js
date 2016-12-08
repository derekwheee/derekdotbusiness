const fs = require('fs');
const path = require('path');

function getPosts(dirname) {

    const posts = [];
    const filenames = fs.readdirSync(dirname);

    filenames.forEach(function(filename) {

        var content = fs.readFileSync(dirname + filename, 'utf-8');
        var metadata = {};

        content.substring(content.indexOf('{{!--') + 5, content.indexOf('--}}')).trim().split('\n').forEach(function (line) {
            var opts = line.trim().split(/: /);
            metadata[opts[0].trim()] = opts[1].trim();
        });

        metadata.slug = filename.replace(/\.\w{2,3}/, '');

        posts.push(metadata);
    });

    return posts;
}

module.exports = (function () {

    return getPosts(path.join(__dirname, '../views/blerg/'));

}());
