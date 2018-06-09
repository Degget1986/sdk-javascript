'use strict';

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Response {
  handleResponse(request, callback) {
    const response = {
      status: request.status,
      data: JSON.parse(request.response),
      message: 'success'
    };

    if (request.status !== 200) {
      response.data = null;
      response.message = JSON.parse(request.response).reason;
    }

    callback(response);
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Assets extends Response {
  constructor(settings, auth) {
    super();
    this._settings = settings;

    auth.getToken().then(token => {
      this._settings.token = token;
    });
  }

  getAssetById(assetId) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open(
        'GET',
        `${this._settings.apiEndpoint}/assets/${assetId}`,
        true
      );
      request.addEventListener(
        'load',
        () => {
          this.handleResponse(request, response => {
            resolve(response);
          });
        },
        false
      );

      request.send();
    });
  }

  createAsset(params) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('POST', `${this._settings.apiEndpoint}/assets`, true);
      request.setRequestHeader(
        'Content-type',
        'application/json; charset=utf-8'
      );
      request.setRequestHeader('Authorization', 'AMB ' + this._settings.secret);

      request.onload = () => {
        resolve(JSON.parse(request.responseText));
      };

      request.send(JSON.stringify(params));
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/
class Events extends Response {
  constructor(settings, auth) {
    super();
    this._settings = settings;

    auth.getToken().then(token => {
      this._settings.token = token;
    });
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open(
        'GET',
        `${this._settings.apiEndpoint}/events/${eventId}`,
        true
      );
      request.addEventListener(
        'load',
        () => {
          this.handleResponse(request, event => {
            resolve(event);
          });
        },
        false
      );
      request.send();
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      let serializeParams = '';

      for (let key in params) {
        if (serializeParams !== '') {
          serializeParams += '&';
        }
        serializeParams += key + '=' + encodeURIComponent(params[key]);
      }

      request.open(
        'GET',
        `${this._settings.apiEndpoint}/events?${serializeParams}`,
        true
      );

      request.addEventListener(
        'load',
        () => {
          this.handleResponse(request, response => {
            resolve(response);
          });
        },
        false
      );

      request.send();
    });
  }

  createEvent(assetId, params) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open(
        'POST',
        `${this._settings.apiEndpoint}/assets/${assetId}/events`,
        true
      );
      request.setRequestHeader(
        'Content-type',
        'application/json; charset=utf-8'
      );
      request.setRequestHeader('Authorization', 'AMB ' + this._settings.secret);

      request.onload = () => {
        resolve(JSON.parse(request.responseText));
      };

      request.send(JSON.stringify(params));
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Auth {
  constructor(settings) {
    this._settings = settings;
  }

  getToken() {
    return new Promise((resolve, reject) => {
      if (this._settings.token) {
        resolve(this._settings.token);
      } else {
        let request = new XMLHttpRequest();

        const params = {
          validUntil: 1600000000
        };

        request.open('POST', `${this._settings.apiEndpoint}/token`, true);

        request.setRequestHeader(
          'Content-type',
          'application/json; charset=utf-8'
        );
        request.setRequestHeader(
          'Authorization',
          'AMB ' + this._settings.secret
        );

        request.onload = () => {
          this._settings.token = JSON.parse(request.responseText);
          resolve(this._settings.token);
        };

        request.send(JSON.stringify(params));
      }
    });
  }
}

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class AmbrosusSDK {
  constructor(extendSettings) {
    this._settings = { apiEndpoint: 'https://gateway-test.ambrosus.com' };

    if (!extendSettings || !extendSettings.secret || !extendSettings.address) {
      console.error('API init values are missing');
      return false;
    }

    if (
      (!extendSettings.token && !extendSettings.secret) ||
      !extendSettings.address
    ) {
      console.error(
        'Secret key and account address are required in order to generate an access token.'
      );
      return false;
    }

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
      return this._assets.getAssetById(assetId).then(asset => {
        resolve(asset);
      });
    });
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      if (!eventId) {
        return reject('Event ID is missing.');
      }

      return this._events.getEventById(eventId).then(event => {
        resolve(event);
      });
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      return this._events.getEvents(params).then(event => {
        resolve(event);
      });
    });
  }

  createAsset(asset) {
    return new Promise((resolve, reject) => {
      if (!asset) {
        return reject('Asset data is missing.');
      }

      let params = {
        content: {
          idData: {
            createdBy: this._settings.address,
            timestamp: this.checkTimeStamp(asset),
            sequenceNumber: 0
          }
        }
      };

      if (asset.data) {
        params['data'] = asset.data;
      }

      return this._assets.createAsset(params).then(asset => {
        resolve(asset);
      });
    });
  }

  createEvent(assetId, event) {
    return new Promise((resolve, reject) => {
      if (!assetId) {
        return reject('Asset ID is missing');
      }

      if (!event) {
        return reject('Event data is missing');
      }

      let params = {
        content: {
          idData: {
            assetId: assetId,
            timestamp: this.checkTimeStamp(event),
            accessLevel: 0,
            createdBy: this._settings.address
          }
        }
      };

      if (event.content && event.content.data) {
        params.content['data'] = event.content.data;
      }

      return this._events.createEvent(assetId, params).then(event => {
        resolve(event);
      });
    });
  }

  checkTimeStamp(event) {
    let timestamp = Math.floor(Date.now() / 1000);

    return event.content &&
      event.content.idData &&
      event.content.idData.timestamp
      ? event.content.idData.timestamp
      : timestamp;
  }
}

module.exports = AmbrosusSDK;
