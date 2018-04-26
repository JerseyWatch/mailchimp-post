import jsonp from 'jsonp';

const subscribeEmailToMailChimp = url => (
  new Promise((resolve, reject) => jsonp(url, { param: 'c' }, (err, data) => { // `param` object avoids CORS issues
    if (err) reject(err);
    if (data) {
      if (data.result === 'error') reject(data);
      resolve(data);
    }
  }))
);

const convertAdditionalFieldsToQuery = additionalFields => Object.keys(additionalFields).reduce((queryParams, field) => queryParams.concat(`&${field.toUpperCase()}=${additionalFields[field]}`), '');

const converUrlToUsePostJson = url => url.replace(/\/post\?/, '/post-json?');

const addToMailChimp = (url, email, additionalFields = {}) => {
  const emailEncoded = encodeURIComponent(email);
  const queryParams = `&EMAIL=${emailEncoded}${convertAdditionalFieldsToQuery(additionalFields)}`;
  const finalUrl = `${converUrlToUsePostJson(url)}${queryParams}`;
  return subscribeEmailToMailChimp(finalUrl);
};
export default addToMailChimp;
