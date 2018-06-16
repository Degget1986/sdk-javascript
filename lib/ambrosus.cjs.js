'use strict';

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
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

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class Assets {
  constructor(settings, auth) {
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
          handleResponse(request).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
          });
        },
        false
      );

      request.send();
    });
  }

  getAssets(params) {
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
        `${this._settings.apiEndpoint}/assets?${serializeParams}`,
        true
      );

      request.addEventListener(
        'load',
        () => {
          handleResponse(request).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
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
        handleResponse(request).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
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

class Events {
  constructor(settings, auth) {
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
          handleResponse(request).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
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
          handleResponse(request).then(response => {
            resolve(response);
          }).catch(error => {
            reject(error);
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
        handleResponse(request).then(response => {
          resolve(response);
        }).catch(error => {
          reject(error);
        });
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

    if (!this._settings || 
      (!this._settings.secret || !this._settings.token) || this._settings.address ) {
        console.error(
          'Secret key and account address are required in order to generate an access token.'
        );
      return false;
    }

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

const checkTimeStamp = event => {
  let timestamp = Math.floor(Date.now() / 1000);

  return event.content && event.content.idData && event.content.idData.timestamp ? event.content.idData.timestamp : timestamp;
};

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

class AmbrosusSDK {
  constructor(extendSettings) {
    this._settings = {
      apiEndpoint: 'https://gateway-test.ambrosus.com'
    };

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
      return this._assets
        .getAssetById(assetId)
        .then(asset => {
          resolve(asset);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      if (!eventId) {
        return reject(rejectResponse('Event ID is missing.'));
      }

      return this._events
        .getEventById(eventId)
        .then(event => {
          resolve(event);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getAssets(params = {}) {
    return new Promise((resolve, reject) => {
      return this._assets
        .getAssets(params)
        .then(asset => {
          resolve(asset);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      return this._events
        .getEvents(params)
        .then(event => {
          resolve(event);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  createAsset(asset = {}) {
    return new Promise((resolve, reject) => {
      if (!asset) {
        return reject(rejectResponse('Asset data is missing.'));
      }

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

      return this._assets
        .createAsset(params)
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
            resolve(assetRes);
          }
          resolve(assetRes);
        })
        .catch(error => {
          reject(error);
        });
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

      return this._events
        .createEvent(assetId, params)
        .then(event => {
          resolve(event);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = AmbrosusSDK;
