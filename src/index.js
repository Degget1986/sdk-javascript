/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Assets from './api/assets';
import Events from './api/events';
import Auth from './api/auth';

export default class AmbrosusSDK {
  constructor(extendSettings) {
    this._settings = { apiEndpoint: 'https://gateway-test.ambrosus.com' };
    this.events = {};
    this.empty = [];

    if (!extendSettings || !extendSettings.secret || !extendSettings.address) {
      console.error('API init values are missing');
      return false;
    }

    if ((!extendSettings.token && !extendSettings.secret) || !extendSettings.address) {
      console.error('Secret key and account address are required in order to generate an access token.');
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
      if (!assetId) {
        return reject(this.rejectResponse('Asset ID is missing.'));
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
        return reject(this.rejectResponse('Event ID is missing.'));
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

  createAsset(asset) {
    return new Promise((resolve, reject) => {
      if (!asset) {
        return reject(this.rejectResponse('Asset data is missing.'));
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

      return this._assets
        .createAsset(params)
        .then(assetRes => {
          if (asset.length >= 1) {
            let finalEventResponse = [];

            for (let i = 0; i < asset.length; i++) {
              finalEventResponse[i] = new Promise((resolve, reject) => {
                return this.createEvent(assetRes.assetId, asset[i]).then(eventRes => {
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
        return reject(this.rejectResponse('Asset ID is missing.'));
      }

      if (!event) {
        return reject(this.rejectResponse('Event data is missing.'));
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
      } else {
        return reject(this.rejectResponse('Invalid data: No content found at content.data.'));
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

  checkTimeStamp(event) {
    let timestamp = Math.floor(Date.now() / 1000);

    return event.content && event.content.idData && event.content.idData.timestamp ? event.content.idData.timestamp : timestamp;
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

  rejectResponse(message) {
    return {
      status: 400,
      data: null,
      message: message
    };
  }
}
