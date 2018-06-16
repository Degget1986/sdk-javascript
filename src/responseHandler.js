/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

export const handleResponse = request => {
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

export const rejectResponse = message => {
  return {
    status: 400,
    data: null,
    message: message
  };
};
