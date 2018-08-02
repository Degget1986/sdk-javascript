/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Assets from './api/assets';
import Events from './api/events';
import Auth from './api/auth';
import { checkTimeStamp, parseEvents } from './utils';
import { rejectResponse, successResponse } from './responseHandler';
let assetSequenceNumber = 0;

export default class AmbrosusSDK {
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
            sequenceNumber: assetSequenceNumber = (assetSequenceNumber + 1) % 1000000
          }
        }
      };

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

  getBundleById(bundleId) {
    return new Promise((resolve, reject) => {
      if (!bundleId) {
        return reject(rejectResponse('Bundle ID is missing.'));
      }
      return this._events.getBundleById(bundleId)
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
