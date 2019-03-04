/*
Copyright: Ambrosus Inc.
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

import Request from './request';
import {
  serializeParams
} from './../utils';

/** Class for events */
export default class Events {

  /**
   * Initialize the events class
   * @param {any} settings
   */
  constructor(settings) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  /**
   * Find event by id
   *
   * @function getEventById
   * @param {string} eventId
   * @returns {Promise<Object>} Promise - Event.
   */
  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`events/${encodeURIComponent(eventId)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Get all events with the matching params.
   *
   * @function getEvents
   * @param {any} params
   * @returns {Promise<Object>} Promise - Events
   */
  getEvents(params) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`events?${serializeParams(params)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Create a new event.
   *
   * @function createEvent
   * @param {string} assetId
   * @param {any} params
   * @returns {Promise<Object>} Promise - Event created.
   */
  createEvent(assetId, params) {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      this._request.postRequest(`assets/${assetId}/events`, params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Find bundle by id.
   *
   * @function getBundleById
   * @param {string} bundleId
   * @returns {Promise<Object>} Promise - Bundle.
   */
  getBundleById(bundleId) {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      this._request.getRequest(`bundle/${encodeURIComponent(bundleId)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

}