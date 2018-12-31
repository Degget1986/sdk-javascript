/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/
import Assets from './api/assets';
import Events from './api/events';
import Accounts from './api/accounts';
import Utils, {
  checkTimeStamp,
  parseEvents,
  serializeForHashing,
  base64url,
  checkAccessLevel,
} from './utils';
import {
  rejectResponse,
  successResponse
} from './responseHandler';
let assetSequenceNumber = 0;

export default class AmbrosusSDK {
  constructor(extendSettings = {}) {
    console.log(Utils);
    this.utils = Utils;
    console.log(this.utils);
    this._settings = {
      apiEndpoint: 'https://gateway-test.ambrosus.com'
    };
    this.events = {};
    this.empty = [];

    if (typeof extendSettings === 'object') {
      for (const key in extendSettings) {
        if (extendSettings.hasOwnProperty(key)) {
          this._settings[key] = extendSettings[key];
        }
      }

      /* istanbul ignore if */
      if (this._settings.Web3 && this._settings.secret) {
        this.web3 = new this._settings.Web3();

        if (this.web3.version.api) {
          console.log('Old version of web3 is not supported, Please import v1.0.0+');
        } else {
          this._settings.address = this.getAddress(this._settings.secret);
          this._settings.token = this.getToken(this._settings.secret);
        }

      } else if (this._settings.Web3) {
        this.web3 = new this._settings.Web3();
      }
    } else {
      return rejectResponse('SDK Init parameters should be an object');
    }

    this._assets = new Assets(this._settings);
    this._events = new Events(this._settings);
    this._accounts = new Accounts(this._settings);
  }

  calculateHash(data) {
    if (!this.web3) {
      return rejectResponse('web3.js Library is required get the token');
    } else {
      return this.web3.eth.accounts.hashMessage(serializeForHashing(data));
    }
  };

  getToken(secret = null, timestamp) {
    if (!this.web3) {
      return rejectResponse('web3.js Library is required get the token');
    } else if (!secret) {
      if (!this._settings.secret) {
        return rejectResponse('Secret key is required generate the token');
      } else {
        secret = this._settings.secret
      }
    }

    /* istanbul ignore next */
    const idData = {
      createdBy: this.getAddress(secret),
      validUntil: timestamp ? timestamp : Math.floor(Date.now() / 1000) + 300
    };

    /* istanbul ignore next */
    return base64url(serializeForHashing({
      signature: this.sign(idData, secret),
      idData
    }));
  }

  getAddress(secret = null) {
    if (!this.web3) {
      return rejectResponse('web3.js Library is required get the address');
    } else if (!secret) {
      if (!this._settings.secret) {
        return rejectResponse('Secret key is required generate the address');
      } else {
        secret = this._settings.secret
      }
    }

    /* istanbul ignore next */
    return this.web3.eth.accounts.privateKeyToAccount(secret).address;
  }

  sign(data = {}, secret = null) {
    if (!this.web3) {
      return rejectResponse('web3.js Library is required generate a signature');
    } else if (!secret) {
      if (!this._settings.secret) {
        return rejectResponse('Secret key is required generate a signature');
      } else {
        secret = this._settings.secret
      }
    }

    /* istanbul ignore next */
    return this.web3.eth.accounts.sign(serializeForHashing(data), secret).signature;
  }

  /**
   * Returns object consisting of address & privateKey
   * @returns {address, privateKey}
   */
  getPkPair() {
    if (!this.web3) {
      return rejectResponse('web3.js Library is required generate the publicKey / privateKey pair');
    }
    return this.web3.eth.accounts.create(this.web3.utils.randomHex(32));
  }

  getAssetById(assetId) {
    return new Promise((resolve, reject) => {
      if (!assetId) {
        return reject(rejectResponse('Asset ID is missing.'));
      }
      return this._assets.getAssetById(assetId)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getEventById(eventId) {
    return new Promise((resolve, reject) => {
      if (!eventId) {
        return reject(rejectResponse('Event ID is missing.'));
      }

      return this._events.getEventById(eventId)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getAssets(params = {}) {
    return new Promise((resolve, reject) => {
      return this._assets.getAssets(params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  getEvents(params) {
    return new Promise((resolve, reject) => {
      return this._events.getEvents(params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  createAsset(asset = {}) {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => {
      let idData = {};

      if (typeof asset !== 'object') {
        return reject(rejectResponse('asset should be a json object or empty'));
      } else if (!this.web3) {
        return reject(rejectResponse('web3.js library is required to create an asset'));
      } else if (!this._settings.secret) {
        return reject(rejectResponse('Secret missing: Please initialize the SDK with your secret key'));
      }

      idData = {
        timestamp: checkTimeStamp(asset),
        sequenceNumber: assetSequenceNumber = (assetSequenceNumber + 1) % 1000000,
        createdBy: this._settings.address
      };

      if (asset && asset.content && asset.content.data) {
        idData['dataHash'] = this.web3.eth.accounts.hashMessage(serializeForHashing(asset.content.data));
      }

      let params = {
        content: {
          idData: idData,
          signature: this.sign(idData, this._settings.secret)
        }
      };

      if (params.content && params.content.idData && params.content.idData.dataHash) {
        params.content['data'] = asset.content.data;
      }

      return this._assets.createAsset(params)
        .then(assetRes => {
          if (asset.length >= 1) {

            asset.map((event) => {
              return this.createEvent(assetRes.data.assetId, event)
                .then(response => resolve(response))
                .catch(error => reject(error));
            });

            this.emit('asset:created');
            resolve(assetRes);
          } else {
            this.emit('asset:created');
            resolve(assetRes);
            return;
          }
        })
        .catch(error => reject(error));
    });
  }

  createEvent(assetId, event) {
    /* istanbul ignore next */
    return new Promise((resolve, reject) => {

      if (typeof event !== 'object') {
        return reject(rejectResponse('event should be a json object'));
      } else if (!this.web3) {
        return reject(rejectResponse('web3.js library is required to create an event'));
      } else if (!this._settings.secret) {
        return reject(rejectResponse('Secret missing: Please initialize the SDK with your secret key'));
      }

      if (!assetId) {
        return reject(rejectResponse('Asset ID is missing.'));
      }

      if (!event) {
        return reject(rejectResponse('Event data is missing.'));
      }

      let params = {};

      if (event.content && event.content.data) {

        const idData = {
          assetId: assetId,
          timestamp: checkTimeStamp(event),
          accessLevel: checkAccessLevel(event),
          createdBy: this._settings.address,
          dataHash: this.web3.eth.accounts.hashMessage(serializeForHashing(event.content.data))
        };

        params = {
          content: {
            idData: idData,
            signature: this.sign(idData, this._settings.secret),
            data: event.content.data
          }
        };

      } else {
        return reject(rejectResponse('Invalid data: No content found at content.data.'));
      }

      return this._events.createEvent(assetId, params)
        .then((response) => {
          this.emit('event:created');
          resolve(response);
        })
        .catch(error => reject(error));
    });
  }

  parseEvents(eventsArray) {
    return new Promise((resolve, reject) => {

      if (eventsArray && eventsArray.results) {
        return resolve(successResponse(parseEvents(eventsArray)));
      }

      return reject(rejectResponse('Results array is missing.'));

    });
  }

  getBundleById(bundleId) {
    return new Promise((resolve, reject) => {
      if (!bundleId) {
        return reject(rejectResponse('Bundle ID is missing.'));
      }
      /* istanbul ignore next */
      return this._events.getBundleById(bundleId)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  addAccount(params) {
    return new Promise((resolve, reject) => {
      if (!this._settings.secret) {
        return reject(rejectResponse('Secret key is required to add an account.'));
      }
      /* istanbul ignore next */
      else if (!params) {
        return reject(rejectResponse('Create account params are required to create an account.'));
      }
      /* istanbul ignore next */
      this.setTokenHeader(this._settings.secret);
      /* istanbul ignore next */
      return this._accounts.addAccount(params)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  setTokenHeader(secret = null) {
    /* istanbul ignore next */
    if (!this.web3) {
      return rejectResponse('web3.js Library is required set the token');
    } else if (!secret) {
      if (!this._settings.secret) {
        return rejectResponse('Secret key is required set the token');
      } else {
        secret = this._settings.secret
      }
    }

    this._settings['headers'] = {
      'Authorization': `AMB_TOKEN ${this.getToken(secret)}`
    };

  }

  on(type, func, ctx) {
    /* istanbul ignore next */
    (this.events[type] = this.events[type] || []).push([func, ctx]);
    /* istanbul ignore next */
    return this;
  }

  off(type, func) {
    /* istanbul ignore next */
    type || (this.events = {});
    let list = this.events[type] || this.empty;
    let i = (list.length = func ? list.length : 0);

    /* istanbul ignore next */
    while (i--) {
      func === list[i][0] && list.splice(i, 1);
    }
    /* istanbul ignore next */
    return this;
  }

  emit(type) {
    /* istanbul ignore next */
    let e = this.events[type] || this.empty;
    let list = e.length > 0 ? e.slice(0, e.length) : e;
    let i = 0;
    let j;

    /* istanbul ignore next */
    while ((j = list[i++])) {
      j[0].apply(j[1], this.empty.slice.call(arguments, 1));
    }
    /* istanbul ignore next */
    return this;
  }
}