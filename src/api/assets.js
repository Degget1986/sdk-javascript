/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import { handleResponse } from '../responseHandler';

export default class Assets {
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
            reject(error)
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
            reject(error)
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
          reject(error)
        });
      };

      request.send(JSON.stringify(params));
    });
  }
}
