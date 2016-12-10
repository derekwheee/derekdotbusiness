var moment = require('moment');

module.exports = function (Handlebars) {

    return {

        formatDate : function (date, format) {

            format = typeof format === 'string' ? format : 'MMMM Do YYYY, h:mm a';

            return moment(date).format(format);

        }

    };

};
