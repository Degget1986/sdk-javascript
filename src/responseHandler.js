/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

export class Response {
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
