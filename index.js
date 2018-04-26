'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonp = require('jsonp');

var _jsonp2 = _interopRequireDefault(_jsonp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subscribeEmailToMailChimp = function subscribeEmailToMailChimp(url) {
  return new Promise(function (resolve, reject) {
    return (0, _jsonp2.default)(url, { param: 'c' }, function (err, data) {
      // `param` object avoids CORS issues
      if (err) reject(err);
      if (data) {
        if (data.result === 'error') reject(data);
        resolve(data);
      }
    });
  });
};

var convertAdditionalFieldsToQuery = function convertAdditionalFieldsToQuery(additionalFields) {
  return Object.keys(additionalFields).reduce(function (queryParams, field) {
    return queryParams.concat('&' + field.toUpperCase() + '=' + additionalFields[field]);
  }, '');
};

var converUrlToUsePostJson = function converUrlToUsePostJson(url) {
  return url.replace(/\/post\?/, '/post-json?');
};

var addToMailChimp = function addToMailChimp(url, email) {
  var additionalFields = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var emailEncoded = encodeURIComponent(email);
  var queryParams = '&EMAIL=' + emailEncoded + convertAdditionalFieldsToQuery(additionalFields);
  var finalUrl = '' + converUrlToUsePostJson(url) + queryParams;
  return subscribeEmailToMailChimp(finalUrl);
};
exports.default = addToMailChimp;