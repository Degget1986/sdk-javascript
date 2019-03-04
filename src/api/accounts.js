/*
Copyright: Ambrosus Inc.
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Request from './request';

/** Class for accounts */
export default class Accounts {
  /**
   * Initializing the account class
   *
   * @param {RequestSettings} settings
   */
  constructor(settings) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  /**
   * Add a new account
   *
   * {@link https://ambrosus.docs.apiary.io/#reference/account/accounts/add-account Add Account}
   * @function addAccount
   * @param {Object} params
   * @returns {Promise<Object>} Promise - Account created.
   */
  addAccount(params) {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      this._request.postRequest('accounts', params, true)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}