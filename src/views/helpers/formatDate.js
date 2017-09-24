const moment = require('moment')

module.exports = function(date) { 
    if (typeof date !== 'string') return '';

    return moment(date).format('MMMM Do, YYYY');
}