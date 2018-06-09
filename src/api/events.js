/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import { Response } from '../responseHandler';
export default class Events extends Response {
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
