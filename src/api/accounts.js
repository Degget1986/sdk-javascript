/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
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