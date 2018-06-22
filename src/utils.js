/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

export const checkTimeStamp = event => {
  let timestamp = Math.floor(Date.now() / 1000);

  return event.content && event.content.idData && event.content.idData.timestamp ?
    event.content.idData.timestamp : timestamp;
};

export const parseEvents = eventsArray => {

  return eventsArray.results.reduce(
    (asset, { content, eventId}) => {

      const timestamp = content.idData.timestamp;
      const author = content.idData.createdBy;

      if (content && content.data) {
        content.data
          .filter(obj => {
            obj.timestamp = timestamp;
            obj.author = author;
            obj.name = obj.name || obj.type;
            obj.action = obj.type;
            obj.type = obj.type.substr(obj.type.lastIndexOf('.') + 1);
            obj.eventId = eventId;

            if (obj.type === 'location') {
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
            const target = ['info', 'redirection', 'identifiers', 'branding'].indexOf(event.type) > -1 ?
              asset : asset.events;

            if (!target[event.type] || target[event.type].timestamp < event.timestamp) {
              target[event.type] = event;
            }
          });
      }

      return asset;
    }, {
      events: {}
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
