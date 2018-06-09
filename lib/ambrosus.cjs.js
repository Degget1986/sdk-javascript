'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

var Response = function () {
  function Response() {
    classCallCheck(this, Response);
  }

  createClass(Response, [{
    key: 'handleResponse',
    value: function handleResponse(request, callback) {
      var response = {
        status: request.status,
        data: JSON.parse(request.response),
        message: 'success'
      };

      if (request.status !== 200) {
        response.data = null;
        response.message = JSON.parse(request.response).reason;
      }

      callback(response);
    }
  }]);
  return Response;
}();

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

var Assets = function (_Response) {
  inherits(Assets, _Response);

  function Assets(settings, auth) {
    classCallCheck(this, Assets);

    var _this = possibleConstructorReturn(this, (Assets.__proto__ || Object.getPrototypeOf(Assets)).call(this));

    _this._settings = settings;

    auth.getToken().then(function (token) {
      _this._settings.token = token;
    });
    return _this;
  }

  createClass(Assets, [{
    key: 'getAssetById',
    value: function getAssetById(assetId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('GET', _this2._settings.apiEndpoint + '/assets/' + assetId, true);
        request.addEventListener('load', function () {
          _this2.handleResponse(request, function (response) {
            resolve(response);
          });
        }, false);

        request.send();
      });
    }
  }, {
    key: 'createAsset',
    value: function createAsset(params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('POST', _this3._settings.apiEndpoint + '/assets', true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.setRequestHeader('Authorization', 'AMB ' + _this3._settings.secret);

        request.onload = function () {
          resolve(JSON.parse(request.responseText));
        };

        request.send(JSON.stringify(params));
      });
    }
  }]);
  return Assets;
}(Response);

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

var Events = function (_Response) {
  inherits(Events, _Response);

  function Events(settings, auth) {
    classCallCheck(this, Events);

    var _this = possibleConstructorReturn(this, (Events.__proto__ || Object.getPrototypeOf(Events)).call(this));

    _this._settings = settings;

    auth.getToken().then(function (token) {
      _this._settings.token = token;
    });
    return _this;
  }

  createClass(Events, [{
    key: 'getEventById',
    value: function getEventById(eventId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('GET', _this2._settings.apiEndpoint + '/events/' + eventId, true);
        request.addEventListener('load', function () {
          _this2.handleResponse(request, function (event) {
            resolve(event);
          });
        }, false);
        request.send();
      });
    }
  }, {
    key: 'getEvents',
    value: function getEvents(params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        var serializeParams = '';

        for (var key in params) {
          if (serializeParams !== '') {
            serializeParams += '&';
          }
          serializeParams += key + '=' + encodeURIComponent(params[key]);
        }

        request.open('GET', _this3._settings.apiEndpoint + '/events?' + serializeParams, true);

        request.addEventListener('load', function () {
          _this3.handleResponse(request, function (response) {
            resolve(response);
          });
        }, false);

        request.send();
      });
    }
  }, {
    key: 'createEvent',
    value: function createEvent(assetId, params) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();

        request.open('POST', _this4._settings.apiEndpoint + '/assets/' + assetId + '/events', true);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.setRequestHeader('Authorization', 'AMB ' + _this4._settings.secret);

        request.onload = function () {
          resolve(JSON.parse(request.responseText));
        };

        request.send(JSON.stringify(params));
      });
    }
  }]);
  return Events;
}(Response);

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

var Auth = function () {
  function Auth(settings) {
    classCallCheck(this, Auth);

    this._settings = settings;
  }

  createClass(Auth, [{
    key: 'getToken',
    value: function getToken() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (_this._settings.token) {
          resolve(_this._settings.token);
        } else {
          var request = new XMLHttpRequest();

          var params = {
            validUntil: 1600000000
          };

          request.open('POST', _this._settings.apiEndpoint + '/token', true);

          request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
          request.setRequestHeader('Authorization', 'AMB ' + _this._settings.secret);

          request.onload = function () {
            _this._settings.token = JSON.parse(request.responseText);
            resolve(_this._settings.token);
          };

          request.send(JSON.stringify(params));
        }
      });
    }
  }]);
  return Auth;
}();

/*
Copyright: Ambrosus Technologies GmbH
Email: tech@ambrosus.com
This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed with this file, You can obtain one at https://mozilla.org/MPL/2.0/.
This Source Code Form is “Incompatible With Secondary Licenses”, as defined by the Mozilla Public License, v. 2.0.
*/

var AmbrosusSDK = function () {
  function AmbrosusSDK(extendSettings) {
    classCallCheck(this, AmbrosusSDK);

    this._settings = { apiEndpoint: 'https://gateway-test.ambrosus.com' };

    if (!extendSettings || !extendSettings.secret || !extendSettings.address) {
      console.error('API init values are missing');
      return false;
    }

    if (!extendSettings.token && !extendSettings.secret || !extendSettings.address) {
      console.error('Secret key and account address are required in order to generate an access token.');
      return false;
    }

    for (var key in extendSettings) {
      if (extendSettings.hasOwnProperty(key)) {
        this._settings[key] = extendSettings[key];
      }
    }

    this._auth = new Auth(this._settings);

    this._assets = new Assets(this._settings, this._auth);
    this._events = new Events(this._settings, this._auth);
  }

  createClass(AmbrosusSDK, [{
    key: 'getAssetById',
    value: function getAssetById(assetId) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!assetId) {
          return reject('Asset ID is missing.');
        }

        return _this._assets.getAssetById(assetId).then(function (asset) {
          resolve(asset);
        });
      });
    }
  }, {
    key: 'getEventById',
    value: function getEventById(eventId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (!eventId) {
          return reject('Event ID is missing.');
        }

        return _this2._events.getEventById(eventId).then(function (event) {
          resolve(event);
        });
      });
    }
  }, {
    key: 'getEvents',
    value: function getEvents(params) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        if (!params.assetId) {
          return reject('Asset ID is missing.');
        }

        if (!params.createdBy) {
          return reject('Created By ID is missing.');
        }

        return _this3._events.getEvents(params).then(function (event) {
          resolve(event);
        });
      });
    }
  }, {
    key: 'createAsset',
    value: function createAsset(asset) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        if (!asset) {
          return reject('Asset data is missing.');
        }

        var params = {
          content: {
            idData: {
              createdBy: _this4._jsonSettings.address,
              timestamp: _this4.checkTimeStamp(asset),
              sequenceNumber: 0,
              data: asset.content.data
            }
          }
        };

        return _this4._assets.createAsset(params).then(function (asset) {
          resolve(asset);
        });
      });
    }
  }, {
    key: 'createEvent',
    value: function createEvent(assetId, event) {
      var _this5 = this;

      return new Promise(function (resolve, reject) {
        if (!assetId) {
          return reject('Asset ID is missing');
        }

        if (!event) {
          return reject('Event data is missing');
        }

        var params = {
          content: {
            idData: {
              assetId: assetId,
              timestamp: _this5.checkTimeStamp(event),
              accessLevel: 0,
              createdBy: _this5._jsonSettings.address
            },
            data: event.content.data
          }
        };

        return _this5._events.createEvent(assetId, params).then(function (event) {
          resolve(event);
        });
      });
    }
  }, {
    key: 'checkTimeStamp',
    value: function checkTimeStamp(event) {
      var timestamp = Math.floor(Date.now() / 1000);

      return event.content && event.content.idData && event.content.idData.timestamp ? event.content.idData.timestamp : timestamp;
    }
  }]);
  return AmbrosusSDK;
}();

module.exports = AmbrosusSDK;
