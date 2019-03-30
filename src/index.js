/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
/**
 * Object Property for request.
 * @typedef {Object} ExtendedSettings
 * @property {string} [secret] - Private key of the user
 * @property {string} [rpcURL] - RPC URL for the web3 instance
 * @property {string} [apiEndpoint] - API Endpoint.
 * @property {Object} [headers] - Header object for the request
 */

/**
 * Object for initializing all classes.
 * @typedef {Object} ClassProperties
 * @property {ExtendedSettings} settings - Setting object which includes headers and privateKey
 * @property {Object} [web3] - Service class object
 */

import Assets from './api/assets';
import Events from './api/events';
import Accounts from './api/accounts';
import Utils from './utils/index';
import Service from './service';
import { rejectResponse } from './responseHandler';
import Web3 from 'web3';

/**
 * Main Class for initializing the SDK
 *
 * @class
 * @classdesc Entry point for the SDK.
 */
class AmbrosusSDK {
    /**
     * @type {Object}
     */
    static get utils() {
        return Utils;
    }

    /**
     * Creating a SDK and initializing all the default variables.
     *
     * @param {ExtendedSettings} [extendSettings] - Properties to initialize the object.
     */
    constructor(extendSettings = {}) {
        let web3 = new Web3();
        /**
         * Contains the properties for the SDK.
         * @type {Object}
         * @property {string} secret Private key of the user
         * @property {string} rpcURL RPC URL for the web3 instance
         * @property {apiEndpoint} apiEndpoint Endpoint of the hermes
         * @property {headers} headers Header object for the request
         */
        this._settings = {};
        /**
         * Object of class Service
         * @type {Object}
         */
        this.service = new Service(this._settings, web3);
        if (Utils.isObject(extendSettings)) {
            Object.keys(extendSettings).map(key => {
                this._settings[key] = extendSettings[key];
            });
            if (this._settings.secret) {
                this._settings.address = this.service.getAddress(this._settings.secret);
                const token = this.service.getApiToken(this._settings.secret);
                if (token.status !== 400) {
                    this._settings.token = token;
                    this._settings['headers'] = Object.assign({
                        'Authorization': `AMB ${token}`
                    }, this._settings.headers);
                }
                this.service = new Service(this._settings, web3);
            }

            if (this._settings.rpcURL) {
                web3 = new Web3(new Web3.providers.HttpProvider((this._settings.rpcURL)));
                this.service = new Service(this._settings, web3);
            }
        } else {
            return rejectResponse('SDK Init parameters should be an object');
        }

        /**
         * Object of class Assets
         * @type {Object}
         */
        this.assets = new Assets(this._settings, this.service);

        /**
         * Object of class Events
         * @type {Object}
         */
        this.events = new Events(this._settings, this.service);

        /**
         * Object of class Accounts
         * @type {Object}
         */
        this.accounts = new Accounts(this._settings);
    }
}

export default AmbrosusSDK;
