/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Request from './request';
import { serializeParams } from './../utils';

export default class Assets {
  constructor(settings) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  getAssetById(assetId) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`assets/${encodeURIComponent(assetId)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getAssets(params) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`assets?${serializeParams(params)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  createAsset(params) {
    return new Promise((resolve, reject) => {
      this._request.postRequest('assets', params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}
