![alt text](https://cdn-images-1.medium.com/max/1600/1*hGJHnXJuOmfjIcEofbC0Ww.png 'Ambrosus')

# Ambrosus SDK

<!-- BADGES -->

[![Build Status](https://travis-ci.com/ambrosus/sdk-javascript.svg?branch=master)](https://travis-ci.com/ambrosus/sdk-javascript) [![Coverage Status](https://img.shields.io/badge/coverage-90%25-brightgreen.svg)](https://github.com/ambrosus/sdk-javascript-internal)

<!-- END BADGES -->

Library for simple interaction with Ambrosus API.

## Contribution

Please refer to project's code style guidelines and guidelines for submitting patches and additions. In general, we follow the "fork-and-pull" Git workflow.

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

It is mandatory to follow our code of conduct described in [CONTRIBUTING.md](https://github.com/ambrosus/sdk-javascript/blob/master/CONTRIBUTING.md).

## Overview

- [Prerequisite](#prerequisite)
- [Setup](#setup)
- [Usage](#usage)
- [Response from Ambrosus SDK methods](#response-from-ambrosus-sdk-methods)
- [SDK Events](#listen-to-sdk-events)
- [Ambrosus SDK methods](https://github.com/ambrosus/sdk-javascript-internal/wiki)
  - [Get asset](https://github.com/ambrosus/sdk-javascript-internal/wiki/Assets#get-asset)
  - [Get assets](https://github.com/ambrosus/sdk-javascript-internal/wiki/Assets#get-assets)
  - [Create asset](https://github.com/ambrosus/sdk-javascript-internal/wiki/Assets#create-asset)
  - [Get event](https://github.com/ambrosus/sdk-javascript-internal/wiki/Events#get-event)
  - [Get events](https://github.com/ambrosus/sdk-javascript-internal/wiki/Events#get-events)
  - [Create event](https://github.com/ambrosus/sdk-javascript-internal/wiki/Events#create-event)
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

Directly download the library and host it locally.\
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

In order to use the web3.js library to support client side data signing while creating assets or events or token,
we will need to import the web3.js library.\

For *node.js*\
Simply `npm install web3` and import in your `.js` file like - `const Web3 = require('web3');`

For a client side *HTML*\
Import web3 using the script tag. like - `<script async src="/path/to/js/web3.min.js"></script>`

In the script on your page where you use Ambrosus SDK, put this code in the beginning of the script:

```js
var ambrosus = new AmbrosusSDK({
  // Provide env variables
  secret: '0x6823520c03ad7b17bc1a7144fbbd2d24bfa2ce933d715ace209d658e03fdd388',
  Web3: Web3
});
```

| Variable | Type   | Definition                        | Example                                                            |
| -------- | ------ | --------------------------------- | ------------------------------------------------------------------ |
| secret   | string | Secret key you received in email. | 0x6c06dD0215d4eef9E795C0b5BwED697a26287aFB                         |
| address  | string | Address you received in email.    | 0x6823520c03ad7b17bc1a7144fbbd2d24bfa2ce933d715ace209d658e03fdd388 |

___

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

## Listen to SDK Events

Library supports internal events.

```javascript
ambrosus.on('asset:created', function() {
  // your method here
});
```

## Examples

See [examples/](examples/) for working examples of how the SDK can be used.
