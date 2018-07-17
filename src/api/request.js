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
