/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */

import {
  handleResponse
} from './../responseHandler';

/** Class for Request */
export default class Request {

  /**
   * Initialize the request class
   * @param {RequestSettings} settings
   */
  constructor(settings) {
    this._settings = settings;
  }

  /**
   * Create a GET request
   *
   * @param {string} path
   */
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

  /**
   * Create a POST Request
   *
   * @param {string} path
   * @param {Object} params
   * @param {boolean} hasHeader
   */
  postRequest(path, params, hasHeader = false) {
    /* istanbul ignore next */
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