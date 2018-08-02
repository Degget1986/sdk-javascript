/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

export const checkTimeStamp = event => {
  let timestamp = Math.floor(Date.now() / 1000);

  return event.content && event.content.idData && event.content.idData.timestamp ? event.content.idData.timestamp : timestamp;
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
