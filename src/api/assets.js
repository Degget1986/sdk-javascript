/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */

import Request from './request';
import {
  serializeParams
} from './../utils';

/** Class for assets */
export default class Assets {

  /**
   * Initialize the asset class
   * @param {RequestSettings} settings
   */
  constructor(settings) {
    this._settings = settings;
    this._request = new Request(this._settings);
  }

  /**
   * Find asset by id
   *
   * {@link https://ambrosus.docs.apiary.io/#reference/asset/assets/fetch-an-asset-by-id  Find asset by Id}
   * @function getAssetById
   * @param {string} assetId
   * @returns {Promise<Object>} Promise - Asset found.
   */
  getAssetById(assetId) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`assets/${encodeURIComponent(assetId)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Get all assets with the matching params
   *
   * {@link https://ambrosus.docs.apiary.io/#reference/asset/assetsassetid/find-assets Find Assets}
   * @function getAssets
   * @param {Object} params
   * @returns {Promise<Object>} Promise - Assets.
   */
  getAssets(params) {
    return new Promise((resolve, reject) => {
      this._request.getRequest(`assets?${serializeParams(params)}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  /**
   * Create an asset with the provided params
   *
   * {@link https://ambrosus.docs.apiary.io/#reference/asset/assets/create-an-asset Create a new Asset}
   * @function createAsset
   * @param {Object} params
   * @returns {Promise<Object>} Promise - Asset created.
   */
  createAsset(params) {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      this._request.postRequest('assets', params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}