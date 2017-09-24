const lousyLoad = require('lousy-load');
const prism = require('prismjs');

const common = {
    init() {
        // Lazy load all images
        const ll = new lousyLoad(document.body);
    },
};

module.exports = common;