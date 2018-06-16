![alt text](https://cdn-images-1.medium.com/max/1600/1*hGJHnXJuOmfjIcEofbC0Ww.png 'Ambrosus')

# Ambrosus SDK

<!-- BADGES -->

[![Build Status](https://travis-ci.com/ambrosus/sdk-javascript.svg?token=8bp7sGWAHfH34uPfst7s&branch=dev)](https://travis-ci.com/ambrosus/sdk-javascript)

<!-- END BADGES -->

Library for simple interaction with Ambrosus API.

## Overview

- [Prerequisite](#prerequisite)
- [Setup](#setup)
- [Usage](#usage)
- [Response from Ambrosus SDK methods](#response-from-ambrosus-sdk-methods)
- [Events](#events)
- [Ambrosus SDK methods](#ambrosus-sdk-methods)
  - [Get asset](#get-asset)
  - [Get assets](#get-assets)
  - [Create asset](#create-asset)
  - [Get event](#get-event)
  - [Get events](#get-events)
  - [Create event](#create-event)
- [Examples](#examples)

## Prerequisite

In order to use Ambrosus SDK, first you _need to have a developers account_.\
You can [apply for one here](https://selfservice-test.ambrosus.com/create).

Ambrosus team will send you an email with your account **address** and **secret** key.

**Important note:**
PLEASE DO NOT SHARE YOUR SECRET WITH ANYONE. \
We do not store your secret for security reasons, so please save it somewhere safe, in order to use it in SDK.

_To use Ambrosus SDK, you will need your **address** and **secret** key._\
Now we can go to setup.

## Setup

### npm

```
$ npm install ambrosus-javascript-sdk --save
```

Import the SDK in your javascript file

`const AmbrosusSDK = require('ambrosus-javascript-sdk');`

### Download

Directly download the library and host it localy.\
You can [download library here](https://github.com/ambrosus/sdk-javascript/releases).

If your project structure is for example:

```
project-name/js/ambrosus.min.js
project-name/index.html
```

You would include it in your index.html where you use Ambrosus SDK like:

```
<script async src="/js/ambrosus.min.js"></script>
```

## Usage

Initialize the Ambrosus library.\
In the script on your page where you use Ambrosus SDK, put this code in the beginning of the script:

```js
var ambrosus = new AmbrosusSDK({
  // Provide env variables
  secret: '0x6823520c03ad7b17bc1a7144fbbd2d24bfa2ce933d715ace209d658e03fdd388',
  address: '0x6c06dD0215d4eef9E795C0b5BwED697a26287aFB'
});
```

<<<<<<< HEAD
| Variable | Type   | Definition                        | Example                                                            |
| -------- | ------ | --------------------------------- | ------------------------------------------------------------------ |
| secret   | string | Secret key you received in email. | 0x6c06dD0215d4eef9E795C0b5BwED697a26287aFB                         |
| address  | string | Address you received in email.    | 0x6823520c03ad7b17bc1a7144fbbd2d24bfa2ce933d715ace209d658e03fdd388 |
=======
Each state-modifying call needs to have the secret and address values. 
If you wish to use the SDK only to request or query the data, 
You can initialise the SDK like - 

```js
var ambrosus = new AmbrosusSDK({
  apiEndpoint: 'https://gateway-test.ambrosus.com'
});
```

Variable | Type | Definition | Example
---------|------|------------|--------
secret   | string | Secret key you received in email. | 0x6c06dD0215d4eef9E795C0b5BwED697a26287aFB                         
address  | string | Address you received in email.    | 0x6823520c03ad7b17bc1a7144fbbd2d24bfa2ce933d715ace209d658e03fdd388

>>>>>>> origin/dev

## Response from Ambrosus SDK methods

Every Ambrosus SDK method (examples below), will return the response with this structure:

**Response type**: object

```json
{
  "status": 404,
  "data": null,
  "message": "Entity not found: No event with id = null found"
}
```

| Property | Type   | Definition                      | Example                                                |
| -------- | ------ | ------------------------------- | ------------------------------------------------------ |
| status   | number | Http response code              | 200, 404                                               |
| data     | object | Data returned from the SDK      | JSON response data (examples below) or null (if error) |
| message  | string | Message describing the response | Entity not found: No event with id = null found        |

## Events

Librar supports internal events.

```javascript
ambrosus.on('asset:created', function() {
  // your method here
});
```

## Ambrosus SDK methods

## Assets

### GET asset

Returns the data of a specific asset.

| Parameter | Requirement | Type   | Definition | Example                                                            |
| --------- | ----------- | ------ | ---------- | ------------------------------------------------------------------ |
| assetId   | required    | string | Asset's ID | 0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db |

```js
ambrosus.getAssetById(assetId).then(function(response) {
  // Response if successful
  console.log(response);
}).catch(function(error) {
  // Error if error
  console.log(error);
);
```

Response example for GET asset:

```js
{
  "status": 200,
  "data": {
    "assetId": "0xc5cfd04.....30755ed65",
    "content": {
      "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
      "idData": {
        "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
        "timestamp": 1503424923,
        "sequenceNumber": 3
      }
    },
    "metadata": {
      "bundleId": "0x85a427a3.....cd1d38ebbd",
      "bundleTransactionHash": "0x21ab....1cdf8e55b37"
    }
  },
  "message": "success"
}
```

Error example for GET asset.
Reasons:

1.  If in the setup, address and secret are incorrect.
2.  If assetID doesn't exist.
3.  If you don't have permission to access the asset.

```js
{
  "status": 404,
  "data": null,
  "message": "No asset with such assetId found"
}
```

---

### GET assets

Returns array of assets.\
For this method you can apply certain filters, to get ie. first 20 assets.

Parameters:

| Parameter | Requirement | Type   | Definition      | Example       |
| --------- | ----------- | ------ | --------------- | ------------- |
| options   | optional    | object | Options (below) | Example below |

Options (filters):

| Parameter | Requirement | Type   | Definition                          | Example |
| --------- | ----------- | ------ | ----------------------------------- | ------- |
| perPage   | optional    | number | Number of assets to return per page | 20      |

```js
    const options = {
        "perPage": 1
    }

    ambrosus.getAssets(options).then(function(response) {
      // Response if successful
      console.log(response);
    }).catch(function(error) {
      // Error if error
      console.log(error);
    );
```

Response example for GET assets:

```js
{
  "status": 200,
  "data": {
    "results": [
      {
        "assetId": "0xc5cfd04.....30755ed65",
        "content": {
          "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
          "idData": {
            "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
            "timestamp": 1503424923,
            "sequenceNumber": 3
          }
        },
        "metadata": {
          "bundleId": "0x85a427a3.....cd1d38ebbd",
          "bundleTransactionHash": "0x21ab....1cdf8e55b37"
        }
      }
    ],
    "resultCount": 53
  },
  "message": "success"
}
```

Error example for GET assets.\
In this case, if you don't have any assets, you will receive status of 200, but in the data, data.results will be empty array, as well as data.resultCount will be 0.

```js
{
  "status": 200,
  "data": {
    "results": [],
    "resultCount": 0
  },
  "message": ""
}
```

---

### CREATE asset

Create new asset.

Parameters:

| Parameter | Requirement | Type   | Definition             | Example       |
| --------- | ----------- | ------ | ---------------------- | ------------- |
| assetData | required    | object | Asset data information | Example below |

Example for assetData:

```json
    [
      {
        "type": "ambrosus.asset.info",
        "name": "PURE DARK CHOCOLATE BAR 92%",
        "images": {
          "default": {
            "url": "http://imageurlgoeshere.com/file.extension"
          }
        },
        "size": "2.64 oz.",
        "Product Information": {
          "attributes": "No-GMOs, Vegan, Gluten Free, Kosher, Soy Free",
          "ingredients": "Organic cocoa beans, organic sugar, organic cocoa butter",
          "Brand": "Madecasse"
        },
        "Batch Information": {
          "Origin": "Madagascar"
        }
      }
    ];
```

This will first create an asset in the background of SDK, then on success it will create a first following event. It's important that event type ends with **.info**, all other information in example above is customizable.

```js
ambrosus.createAsset(assetData).then(function(response) {
  // Response if successful
  console.log(response);
}).catch(function(error) {
  // Error if error
  console.log(error);
);
```

Response example for GET asset:

```js
{
  "status": 200,
  "data": {
    "assetId": "0xc5cfd04.....30755ed65",
    "content": {
      "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
      "idData": {
        "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
        "timestamp": 1503424923,
        "sequenceNumber": 3
      }
    }
  },
  "message": "success"
}
```

Error example for CREATE asset.
Reasons:

1.  If in the setup, address and secret are incorrect.

```js
{
  "status": 403,
  "data": null,
  "message": "The createdBy user is not registered or has no "create_entity" permission"
}
```

## Events

### GET event

Returns the data of a specific event.

| Parameter | Requirement | Type   | Definition | Example                                                            |
| --------- | ----------- | ------ | ---------- | ------------------------------------------------------------------ |
| eventId   | required    | string | Event's ID | 0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db |

```js
ambrosus.getEventById(eventId).then(function(response) {
  // Response if successful
  console.log(response);
}).catch(function(error) {
  // Error if error
  console.log(error);
);
```

Response example for GET event:

```js
{
  "status": 200,
  "data": {
    "eventId": "0xc5cfd04.....30755ed65",
    "content": {
      "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
      "idData": {
        "assetId": "0xc5cfd04.....30755ed65",
        "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
        "accessLevel": 4,
        "timestamp": 1503424923,
        "dataHash": "0x01cd181cd38eb5bbd162a44701727a31f457a538"
      },
      "data": [
        {
          "type": "ambrosus.event.customevent",
          "customField": "customValue"
        }
      ]
    }
  },
  "message": "success"
}
```

Error example for GET event.
Reasons:

1.  If event with eventId doesn't exist.

```js
{
  "status": 404,
  "data": null,
  "message": "Event not found"
}
```

---

### GET events

Returns array of events.\
For this method you can apply certain filters, to get ie. all events for a specific assetId.

Parameters:

| Parameter | Requirement | Type   | Definition      | Example       |
| --------- | ----------- | ------ | --------------- | ------------- |
| options   | optional    | object | Options (below) | Example below |

Options (filters):

| Parameter     | Requirement | Type   | Definition                                                     | Example                                                            |
| ------------- | ----------- | ------ | -------------------------------------------------------------- | ------------------------------------------------------------------ |
| assetId       | optional    | string | Asset's ID                                                     | 0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db |
| fromTimestamp | optional    | number | Earliest timestamp (date in seconds)                           | 1503424923                                                         |
| toTimestamp   | optional    | number | Latest timestamp (date in seconds)                             | 1503424923                                                         |
| perPage       | optional    | number | Number of assets to return per page                            | 20                                                                 |
| data          | optional    | string | Filter events by object properties in event.content.data array | data[type]=ambrosus.event.info                                     |

```js
    const options = {
        "assetId": "0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db",
        "fromTimestamp": 1503424723,
        "toTimestamp": 1503424923,
        "perPage": 5,
        "data": "data[type]=ambrosus.event.info"
    }

    ambrosus.getEvents(options).then(function(response) {
      // Response if successful
      console.log(response);
    }).catch(function(error) {
      // Error if error
      console.log(error);
    );
```

Response example for GET events:

```js
{
  "status": 200,
  "data": {
    "results": [
      {
        "eventId": "0xc5cfd04.....30755ed65",
        "content": {
          "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
          "idData": {
            "assetId": "0xc5cfd04.....30755ed65",
            "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
            "timestamp": 1503424923,
            "dataHash": "0x01cd181cd38eb5bbd162a44701727a31f457a538"
          },
          "data": [
            {
              "type": "ambrosus.event.customevent",
              "customField": "customValue"
            }
          ]
        }
      }
    ],
    "resultCount": 112
  },
  "message": "success"
}
```

Error example for GET events.\
Reasons:

1.  No events with provided options.

```js
{
  "status": 404,
  "data": null,
  "message": "Event not found"
}
```

---

## CREATE event

Create new event.

Parameters:

| Parameter | Requirement | Type   | Definition             | Example                                                            |
| --------- | ----------- | ------ | ---------------------- | ------------------------------------------------------------------ |
| assetId   | required    | string | Asset's ID             | 0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db |
| eventData | required    | object | Event data information | Example below                                                      |

Example for eventData:

```json
    [
      {
        "type": "ambrosus.asset.info",
        "name": "PURE DARK CHOCOLATE BAR 92%",
        "assetType": "ambrosus.assetTypes.batch",
        "images": {
          "default": {
            "url": "http://imageurlgoeshere.com/file.extension"
          }
        },
        "size": "2.64 oz.",
        "Product Information": {
          "attributes": "No-GMOs, Vegan, Gluten Free, Kosher, Soy Free",
          "ingredients": "Organic cocoa beans, organic sugar, organic cocoa butter",
          "Brand": "Madecasse"
        },
        "Batch Information": {
          "Origin": "Madagascar"
        }
      }
    ];
```

```js
ambrosus.createEvent(assetId, eventData).then(function(response) {
  // Response if successful
  console.log(response);
}).catch(function(error) {
  // Error if error
  console.log(error);
);
```

Response example for CREATE event:

```js
{
  "status": 200,
  "data": {
    "eventId": "0xc5cfd04.....30755ed65",
    "content": {
      "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
      "idData": {
        "assetId": "0xc5cfd04.....30755ed65",
        "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
        "accessLevel": 4,
        "timestamp": 1503424923,
        "dataHash": "0x01cd181cd38eb5bbd162a44701727a31f457a538"
      },
      "data": [
        {
          "type": "ambrosus.event.customevent",
          "customField": "customValue"
        }
      ]
    }
  },
  "message": "success"
}
```

Error example for CREATE event.
Reasons:

1.  If in the setup, address and secret are incorrect.

```js
{
  "status": 400 or 403,
  "data": null,
  "message": "Invalid input" or "The createdBy user is not registered or has no "create_entity" permission"
}
```

## Examples

See [examples/](examples/) for working examples of how the SDK can be used.
