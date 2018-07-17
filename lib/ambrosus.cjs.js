'use strict';

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

const handleResponse = request => {
  return new Promise((resolve, reject) => {
    const response = {
      status: request.status,
      data: null,
      message: JSON.parse(request.response).reason
    };

    if (request.status === 200 || request.status === 201) {
      response.data = JSON.parse(request.response);
      response.message = 'success';
      resolve(response);
    }
    reject(response);
  });
};

const rejectResponse = message => {
  return {
    status: 400,
    data: null,
    message: message
  };
};

const successResponse = data => {
  return {
    status: 200,
    data: data,
    message: 'success'
  };
};

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Request {
  constructor(settings) {
    this._settings = settings;
  }

  getRequest(path) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('GET', `${this._settings.apiEndpoint}/${path}`, true);
      request.addEventListener(
        'load',
        () => {
          handleResponse(request)
            .then(response => resolve(response))
            .catch(error => reject(error));
        },
        false
      );
      request.send();
    });
  }

  postRequest(path, params) {
    return new Promise((resolve, reject) => {
      if (this._settings && this._settings.secret && this._settings.address) {
        return reject({
          status: 400,
          data: null,
          message: 'Secret key and account address are required for a state-modifying call'
        });
      }

      let request = new XMLHttpRequest();

      request.open('POST', `${this._settings.apiEndpoint}/${path}`, true, this._settings);
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      request.setRequestHeader('Authorization', 'AMB ' + this._settings.secret);

      request.onload = () => {
        handleResponse(request)
          .then(response => resolve(response))
          .catch(error => reject(error));
      };

      request.send(JSON.stringify(params));
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

const checkTimeStamp = event => {
  let timestamp = Math.floor(Date.now() / 1000);

  return event.content && event.content.idData && event.content.idData.timestamp ? event.content.idData.timestamp : timestamp;
};

const parseEvents = eventsArray => {
  return eventsArray.results.reduce(
    (asset, { content, eventId }) => {
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
            obj.for = obj.type.split('.')[1];
            obj.eventId = eventId;

            if (obj.type === 'location' && obj.for === 'event') {
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

const serializeParams = params => {
  let serializeParams = '';

  for (let key in params) {
    if (serializeParams !== '') {
      serializeParams += '&';
    }
    serializeParams += key + '=' + encodeURIComponent(params[key]);
  }
  return serializeParams;
};

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Assets {
  constructor(settings, auth) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  getAssetById(assetId) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`assets/${encodeURIComponent(assetId)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getAssets(params) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`assets?${serializeParams(params)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  createAsset(params) {
    return new Promise((resolve, reject) => {
      this._request.postRequest('assets', params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Events {
  constructor(settings, auth) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`events/${encodeURIComponent(eventId)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`events?${serializeParams(params)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  createEvent(assetId, params) {
    return new Promise((resolve, reject) => {
      this._request.postRequest(`assets/${assetId}/events`, params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Auth {
  constructor(settings) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  getToken(params) {
    return new Promise((resolve, reject) => {
      this._request
        .postRequest('token', params)
        .then(response => {
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class AmbrosusSDK {
  constructor(extendSettings) {
    this._settings = {
      apiEndpoint: 'https://gateway-test.ambrosus.com'
    };
    this.events = {};
    this.empty = [];

    for (const key in extendSettings) {
      if (extendSettings.hasOwnProperty(key)) {
        this._settings[key] = extendSettings[key];
      }
    }

    this._auth = new Auth(this._settings);
    this._assets = new Assets(this._settings, this._auth);
    this._events = new Events(this._settings, this._auth);
  }

  getAssetById(assetId) {
    return new Promise((resolve, reject) => {
      if (!assetId) {
        return reject(rejectResponse('Asset ID is missing.'));
      }
      return this._assets.getAssetById(assetId)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      if (!eventId) {
        return reject(rejectResponse('Event ID is missing.'));
      }

      return this._events.getEventById(eventId)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getAssets(params = {}) {
    return new Promise((resolve, reject) => {
      return this._assets.getAssets(params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      return this._events.getEvents(params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  createAsset(asset = {}) {
    return new Promise((resolve, reject) => {

      let params = {
        content: {
          idData: {
            createdBy: this._settings.address,
            timestamp: checkTimeStamp(asset),
            sequenceNumber: 0
          }
        }
      };

      if (asset.data) {
        params['data'] = asset.data;
      }

      return this._assets.createAsset(params)
        .then(assetRes => {
          if (asset.length >= 1) {
            let finalEventResponse = [];

            for (let i = 0; i < asset.length; i++) {
              finalEventResponse[i] = new Promise((resolve, reject) => {
                return this.createEvent(assetRes.data.assetId, asset[i]).then(eventRes => {
                  resolve(eventRes);
                });
              });
            }
            this.emit('asset:created');
            resolve(assetRes);
          } else {
            this.emit('asset:created');
            resolve(assetRes);
            return;
          }
        })
        .catch(error => reject(error));
    });
  }

  createEvent(assetId, event) {
    return new Promise((resolve, reject) => {
      if (!assetId) {
        return reject(rejectResponse('Asset ID is missing.'));
      }

      if (!event) {
        return reject(rejectResponse('Event data is missing.'));
      }

      let params = {
        content: {
          idData: {
            assetId: assetId,
            timestamp: checkTimeStamp(event),
            accessLevel: 0,
            createdBy: this._settings.address
          }
        }
      };

      if (event.content && event.content.data) {
        params.content['data'] = event.content.data;
      } else {
        return reject(rejectResponse('Invalid data: No content found at content.data.'));
      }

      return this._events.createEvent(assetId, params)
        .then((response) => { this.emit('event:created'); resolve(response); })
        .catch(error => reject(error));
    });
  }

  parseEvents(eventsArray) {
    return new Promise((resolve, reject) => {

      if (eventsArray && eventsArray.results) {
        return resolve(successResponse(parseEvents(eventsArray)));
      }

      return reject(rejectResponse('Results array is missing.'));

    });
  }

  getToken(params) {
    return new Promise((resolve, reject) => {
      if (!params && !params.validUntil) {
        return reject(rejectResponse('Invalid data: Unix timestamp was not provided or has an invalid format'));
      }
      this._auth.getToken(params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  on(type, func, ctx) {
    (this.events[type] = this.events[type] || []).push([func, ctx]);
    return this;
  }

  off(type, func) {
    type || (this.events = {});
    let list = this.events[type] || this.empty;
    let i = (list.length = func ? list.length : 0);

    while (i--) {
      func === list[i][0] && list.splice(i, 1);
    }
    return this;
  }

  emit(type) {
    let e = this.events[type] || this.empty;
    let list = e.length > 0 ? e.slice(0, e.length) : e;
    let i = 0;
    let j;

    while ((j = list[i++])) {
      j[0].apply(j[1], this.empty.slice.call(arguments, 1));
    }
    return this;
  }

}

module.exports = AmbrosusSDK;
