/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

const validTimestamp = timestamp => {
  return new Date(timestamp).getTime() > 0;
};

export const checkTimeStamp = event => {
  let timestamp = Math.floor(Date.now() / 1000);

  return event.content && event.content.idData && event.content.idData.timestamp && validTimestamp(event.content.idData.timestamp) ? event.content.idData.timestamp : timestamp;
};

export const parseEvents = eventsArray => {
  return eventsArray.results.reduce(
    (asset, { content, eventId }) => {
      const timestamp = content.idData.timestamp;
      const author = content.idData.createdBy;

      if (content && content.data) {
        content.data
          .filter(obj => {
            const parts = obj.type.split('.');
            const type = parts[parts.length - 1];
            const category = parts[parts.length - 2] || 'asset';
            const namespace = parts[parts.length -3] || 'ambrosus';

            obj.timestamp = timestamp;
            obj.author = author;
            obj.name = obj.name || type;
            obj.action = type;
            obj.type = type;
            obj.eventId = eventId;

            if (obj.type === 'location' && category === 'event') {
              content.data.reduce((location, _event) => {
                if (_event.type !== 'location') {
                  _event.location = location;
                }
              }, obj);
            } else {
              return obj;
            }
          })
          .map(event => {
            if (['info', 'redirection', 'identifiers', 'branding'].indexOf(event.type) > -1) {
              if (!asset[event.type] || asset[event.type].timestamp < event.timestamp) {
                asset[event.type] = event;
              }
            } else {
              asset.events.push(event);
            }
          });
      }

      return asset;
    },
    {
      events: []
    }
  );
};

export const serializeParams = params => {
  let serializeParams = '';

  for (let key in params) {
    if (serializeParams !== '') {
      serializeParams += '&';
    }
    serializeParams += key + '=' + encodeURIComponent(params[key]);
  }
  return serializeParams;
};

export const serializeForHashing = (object) => {
  const isDict = (subject) => typeof subject === 'object' && !Array.isArray(subject);
  const isString = (subject) => typeof subject === 'string';
  const isArray = (subject) => Array.isArray(subject);

  if (isDict(object)) {
    const content = Object.keys(object).sort().map((key) => `"${key}":${serializeForHashing(object[key])}`).join(',');

    return `{${content}}`;
  } else if (isArray(object)) {
    const content = object.map((item) => serializeForHashing(item)).join(',');

    return `[${content}]`;
  } else if (isString(object)) {
    return `"${object}"`;
  }
  return object.toString();
};

// private method for UTF-8 encoding
const utf8Encode = (string) => {
  string = string.replace(/\r\n/g, '\n');
  let utftext = '';

  for (let n = 0; n < string.length; n++) {

    let c = string.charCodeAt(n);

    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }

  }

  return utftext;
};

let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

export const base64url = (input) => {

  let output = '';
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;

  input = utf8Encode(input);

  while (i < input.length) {

    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);

    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;

    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }

    output = output +
      _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) + _keyStr.charAt(enc4);

  }

  return output;

};

export const checkAccessLevel = event => {
  try {
    return event.content.idData.accessLevel;
  } catch (error) {
    return 0;
  }
};
