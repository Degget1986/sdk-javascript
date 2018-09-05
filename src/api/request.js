/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import { handleResponse } from './../responseHandler';

export default class Request {
  constructor(settings) {
    this._settings = settings;
  }

  getRequest(path) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('GET', `${this._settings.apiEndpoint}/${path}`, true);
      if (this._settings.headers) {
        for (const key in this._settings.headers) {
          request.setRequestHeader(`${key}`, `${this._settings.headers[key]}`);
        }
      }
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

  postRequest(path, params, hasHeader = false) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();

      request.open('POST', `${this._settings.apiEndpoint}/${path}`, true, this._settings);
      request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      
      if (this._settings.headers && hasHeader === true) {
        for (const key in this._settings.headers) {
          request.setRequestHeader(`${key}`, `${this._settings.headers[key]}`);
        }
      }

      request.onload = () => {
        handleResponse(request)
          .then(response => resolve(response))
          .catch(error => reject(error));
      };

      request.send(JSON.stringify(params));
    });
  }
}
