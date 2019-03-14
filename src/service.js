/**
 * Copyright 2018 Ambrosus Inc.
 * Email: tech@ambrosus.com
 */
import utils from './utils/index';
import { rejectResponse } from './responseHandler';
import Web3 from 'web3';
const DEFAULT_GAS = 4700000;

/**
 * Class with web3 related methods.
 *
 * @class
 */
class Service {
    /**
     *
     * @param {ExtendedSettings} ExtendedSettings - Setting object which includes headers and privateKey
     * @param {Web3} web3 - A Web3 Object
     */
    constructor(settings, web3) {
        this._settings = settings;
        this.web3 = web3;
    }

    /**
     * Calculate the hash for the respective data
     *
     * @param {Object} data - Object which is to be hashed
     * @returns {string} Hash Message
     */
    calculateHash(data) {
        return this.web3.eth.accounts.hashMessage(utils.serializeForHashing(data));
    }

    hashMessage(data) {
        return this.web3.eth.accounts.hashMessage(data);
    }

    /**
     * Setting the secret key
     *
     * @param {string} secret - Private Key which is used to perform the signing of token
     * @param {number} timestamp - Validity of the token
     * @returns {Object} Rejected Response or encoded Data
     */
    getToken(secret = null, timestamp) {
        if (!secret && !this._settings.secret) {
            return rejectResponse('Secret key is required generate the token');
        }

        const secretKey = secret || this._settings.secret;
        /* istanbul ignore next */
        const idData = {
            createdBy: this.getAddress(secretKey),
            validUntil: timestamp || Math.floor(Date.now() / 1000) + 300
        };

        /* istanbul ignore next */
        return utils.base64url(utils.serializeForHashing({
            signature: this.sign(idData, secretKey),
            idData
        }));
    }

    /**
     * Get the account with respect to secret key.
     *
     * @param {string} secret - Private Key which is used to create account.
     * @returns {Object} Account
     */
    getAccount(secret = null) {
        if (!secret && !this._settings.secret) {
            return rejectResponse('Secret key is required generate the address');
        }

        const secretKey = secret || this._settings.secret;
        /* istanbul ignore next */
        return this.web3.eth.accounts.privateKeyToAccount(secretKey);
    }

    /**
     * Returns the address
     *
     * @param {string | null} secret - Private Key which is used to extract the address.
     * @returns {Object | string} Rejected Response or address
     */
    getAddress(secret = null) {
        if (!secret && !this._settings.secret) {
            return rejectResponse('Secret key is required generate the address');
        }
        const secretKey = secret || this._settings.secret;
        /* istanbul ignore next */
        return this.web3.eth.accounts.privateKeyToAccount(secretKey).address;
    }

    /**
     * Retruns the signed value of the Object provided.
     *
     * @param {Object} data - Object which is to be signed.
     * @param {string} secret - Private key to sign the object.
     * @returns {Object | string} Rejected Response or Signed data
     */
    sign(data = {}, secret = null) {
        if (!secret && !this._settings.secret) {
            return rejectResponse('Secret key is required generate a signature');
        }

        const secretKey = secret || this._settings.secret;

        /* istanbul ignore next */
        return this.web3.eth.accounts.sign(utils.serializeForHashing(data), secretKey).signature;
    }

    /**
     * Returns object consisting of address & privateKey
     *
     * @returns {{address, privateKey}}
     */
    getPkPair() {
        return this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
    }

    /**
     * Returns the balance of the account on the Network
     *
     * @returns {Promise} balance
     */
    getBalance() {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        return (this.web3.eth.getBalance(this._settings.address));
    }

    /**
     * Sends the signed Transaction to the provided address on the network.
     *
     * @param {Object} rawTransaction
     * @returns {Promise} transactionResponse
     */
    sendSignedTransaction(rawTransaction) {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return this.web3.web3.eth.sendSignedTransaction(rawTransaction);
        }
    }

    /**
     * Decrypt the encrypted privateKey
     *
     * @param {string} token
     * @param {string} password
     * @returns {Object}
     */
    decryptPrivateKey(token, password) {
        try {
            const { address, privateKey } = this.web3Serivce.web3.eth.accounts.decrypt(token, password);
            return [address, privateKey];
        } catch (e) {
            return [null];
        }
    }

    /**
     * Checks if the provided RPC URL is valid
     * @param {string} url
     * @returns {boolean}
     */
    isRPCValid(url) {
        const web3 = new Web3(url);
        return web3.eth.net.isListening().then(() => {
            return true;
        }).catch(() => {
            return false;
        });
    }

    /**
     * Encrypt the data with the provided privateKey
     *
     * @param {string} secret
     * @param {any} data
     * @returns {string} encryptedData
     */
    encryptData(secret = null, data) {
        if (!secret && !this._settings.secret) {
            return rejectResponse('Secret key is required generate a signature');
        }

        const secretKey = secret || this._settings.secret;
        return this.web3.eth.accounts.encrypt(secretKey, data);
    }

    /**
     * Get the version of the web3 instance.
     */
    getVersion() {
        return this.web3.version;
    }

    /**
     * Loads a contract from the network.
     *
     * @param {Object} abi
     * @param {string} address
     * @returns {Object} contract.
     */
    loadContract(abi, address) {
        if (!this._settings.rpcURL) {
            return rejectResponse('RPC URL is required');
        }
        return this.web3.eth.Contract(abi, address, {
            gas: DEFAULT_GAS,
            gasPrice: this.web3.utils.toWei('5', 'gwei')
        });
    }
}

export default Service;
