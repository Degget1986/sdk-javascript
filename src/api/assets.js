/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */

import { getRequest, postRequest } from './request';
import utils from '../utils/index';
import Events from './events';
import { rejectResponse } from '../responseHandler';
import EventHandler from '../eventHandler';

/**
 * Assets Class
 *
 * @class
 * @classdesc Every Assets related methods
 */
class Assets {
    /**
     * Initializing the Assets class
     *
     * @param {ClassProperties} - Properties to initialize the class object
     */
    constructor(settings, service) {
        this._settings = settings;
        this.service = service;
        this.events = new Events(this._settings);
        this.eventHandler = new EventHandler();
    }

    /**
     * Find asset by Id.
     *
     * {@link https://ambrosus.docs.apiary.io/#reference/asset/assets/fetch-an-asset-by-id  Find asset by Id}
     * @param {string} assetId - Id of the asset to be searched.
     * @returns {Object} asset
     */
    getAssetById(assetId) {
        return new Promise((resolve, reject) => {
            if (!assetId) {
                return reject(rejectResponse('Asset ID is missing.'));
            }
            getRequest(`${this._settings.apiEndpoint}/assets/${encodeURIComponent(assetId)}`,
                this._settings.headers)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    /**
     * Get all assets with the matching params
     *
     * {@link https://ambrosus.docs.apiary.io/#reference/asset/assetsassetid/find-assets Find Assets}
     * @param {Object} params - Parameters to search assets.
     * @returns {Object} assets
     */
    getAssets(params = {}) {
        return new Promise((resolve, reject) => {
            getRequest(`${this._settings.apiEndpoint}/assets?${utils.serializeParams(params)}`, this._settings.headers)
                .then(response => resolve(response))
                .catch(error => reject(error));
        });
    }

    /**
     * Creates a new Asset
     *
     * {@link https://ambrosus.docs.apiary.io/#reference/asset/assets/create-an-asset Create a new Asset}
     * @param {Object} asset - Parameters to create a new asset.
     * @returns {Object} assetResponse
     */
    createAsset(asset = {}) {
        let assetSequenceNumber = 0;
        return new Promise((resolve, reject) => {
            if (typeof asset !== 'object') {
                return reject(rejectResponse('asset should be a json object or empty'));
            } else if (!this._settings.secret) {
                return reject(rejectResponse('Secret missing: Please initialize the SDK with your secret key'));
            }

            const idData = {
                timestamp: utils.checkTimeStamp(asset),
                sequenceNumber: assetSequenceNumber = (assetSequenceNumber + 1) % 1000000,
                createdBy: this._settings.address
            };

            if (asset && asset.content && asset.content.data) {
                idData['dataHash'] = this.service.hashMessage(serializeForHashing(asset.content.data));
            }

            const params = {
                content: {
                    idData: idData,
                    signature: this.service.sign(idData, this._settings.secret)
                }
            };

            if (params.content && params.content.idData && params.content.idData.dataHash) {
                params.content['data'] = asset.content.data;
            }

            postRequest(`${this._settings.apiEndpoint}/assets`, this._settings.headers, params)
                .then(assetRes => {
                    if (asset.length >= 1) {
                        asset.map((event) => {
                            return this.events.createSingleEvent(assetRes.data.assetId, event)
                                .then(response => resolve(response))
                                .catch(error => reject(error));
                        });
                        this.eventHandler.emit('asset:created');
                        resolve(assetRes);
                    } else {
                        this.eventHandler.emit('asset:created');
                        resolve(assetRes);
                    }
                }).catch(error => reject(error));
        });
    }
}

export default Assets;
