/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

export default class Auth {
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
