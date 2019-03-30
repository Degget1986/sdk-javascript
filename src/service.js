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
     * Calculate the hash value of the given data
     *
     * @param {Object} data - Can be object, array or a string
     * @returns {string} Hashed Message
     */
    calculateHash(data) {
        return this.hashMessage(utils.serializeForHashing(data));
    }

    /**
     * Hashes the given message passed
     * The data will be UTF-8 HEX decoded and enveloped as follows:
     * "\x19Ethereum Signed Message:\n" + message.length + message and hashed using keccak256.
     *
     * @param {String} data A message to hash, if its HEX it will be UTF8 decoded before.
     * @returns {String} Hashed Message
     */
    hashMessage(message) {
        return this.web3.eth.accounts.hashMessage(message);
    }

    /**
     * Generate the token which is used in API request.
     *
     * @param {string} secret - Private Key which is used to perform the signing of token
     * @param {number} timestamp - Validity of the token
     * @returns {Object} Rejected Response or encoded Data
     */
    getApiToken(secret = null, timestamp) {
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
     * Creates an account object from a private key.
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
    getBalance(address = null) {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        const userAddress = address || this._settings.address;
        return this.web3.eth.getBalance(userAddress);
    }

    /**
     * Returns a transaction matching the given transaction hash.
     *
     * @param {string} transactionHash
     * @returns {Promise<object> }- A transaction object
     */
    getTransaction(transactionHash) {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        return this.web3.eth.getTransaction(transactionHash);
    }

    /**
     * Returns the transaction recepit.
     * The receipt is not available for pending transactions and returns null.
     *
     * @param {string} transactionHash
     * @returns {Promise<object>} A transaction receipt object, or null when no receipt was found:
     */
    getTransactionRecepit(transactionHash) {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        return this.web3.eth.getTransactionReceipt(transactionHash);
    }

    /**
     * Get the numbers of transactions sent from this address.
     *
     * @param {string} address
     * @returns {Promise<number>} - The number of transactions sent from the given address.
     */
    getTransactionCount(address = null) {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        const userAddress = address || this._settings.address;
        return this.web3.eth.getTransactionCount(userAddress);
    }

    /**
     * Signs and sends the transaction to the network
     *
     * @param {string} address Address of the receiving person
     * @param {number} value Total number of token to be sent
     * @returns {Promise} transactionResponse
     */
    sendTransaction(address, value, data = null) {
        const txObject = {
            to: address,
            from: this._settings.address,
            value: this.web3.utils.toHex(this.web3.utils.toWei(value, 'ether')),
            gas: this.web3.utils.toHex(21000),
            gasPrice: this.web3.utils.toHex(this.web3Service.web3.utils.toWei('10', 'gwei'))
        };
        if (data) {
            txObject.data = data;
        }
        const account = this.getAccount(this._settings.secret);
        const signedTx = account.signTransaction(txObject);
        signedTx.then(value => this.web3.eth.sendSignedTransaction(value.rawTransaction))
            .catch(() => rejectResponse('Secret key is required generate a signature'));
    }

    /**
     * Returns a block matching the block number or block hash.
     *
     * @param {string | number} hashOrNumber
     * @returns {Promise<object>} - The block object
     */
    getBlock(hashOrNumber) {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        return this.web3.eth.getBlock(hashOrNumber);
    }

    /**
     * Returns the latest block.
     *
     * @returns {Promise<Object>} - The latest block data.
     */
    getLatestBlock() {
        if (!this._settings.secret && !this._settings.rpcURL) {
            return rejectResponse('Secret key is required generate a signature');
        }
        this.web3.eth.getBlockNumber().then(number => {
            return this.web3.eth.getBlock(number);
        });
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
