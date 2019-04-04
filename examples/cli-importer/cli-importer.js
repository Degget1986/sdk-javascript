global.XMLHttpRequest = require('xhr2');

const fs = require('fs');
const program = require('commander');
const { prompt } = require('inquirer');
// eslint-disable-next-line no-unused-vars
const Web3 = require('web3');
const AmbrosusSDK = require('../../lib/ambrosus.cjs.js');

program
    .version('0.0.1')
    .description(
        'A command-line tool to import and create assets and events on the Ambrosus Network'
    );

const jsonSettings = [
    {
        type: 'input',
        name: 'fileName',
        message: 'Path to json file ... (Example: ./../demo-assets/chocolate.json)'
    }
];

program
    .command('initialize')
    .alias('init')
    .description('Initialize SDK')
    .action(() => {
        prompt(jsonSettings).then(jsonSettings => initializeSdk(jsonSettings));
    });

initializeSdk = jsonSettings => {
    global.ambrosus = new AmbrosusSDK({
        apiEndpoint: 'https://hermes.ambrosus-test.com',
        secret: '0xf426aa4dbc1f74997fc31bbcbbdbe6f66bd11f1bf5dbe637ef242740d74080ad'
    });

    if (readExtension(jsonSettings.fileName)) {
        fs.readFile(process.cwd() + '/' + jsonSettings.fileName, { encoding: 'utf8' }, function(
            err,
            data
        ) {
            if (err) console.log('Incorrect File');
            var assetInfo = JSON.parse(data);
            createAsset(assetInfo);
            verifyEvents('0x52933fb3cc270a214ae304285582ad472413bd0b145110de53bd76a9c1193f66');
        });
    }
};

createAsset = (assetInfo) => {
    const data = [];
    ambrosus.assets.createAsset(data)
        .then((response) => {
            console.log('Asset ID Created: ' + response.data.assetId);
            initEventCreation(assetInfo, response.data.assetId);
        })
        .catch((error) => {
            console.log('Asset Creation Failed');
            console.log(error.message);
        });
};

initEventCreation = (assetInfo, assetId) => {
    for (let i = 0; i < assetInfo.length; i++) {
        createEvent(assetInfo[i], assetId);
    }
};

createEvent = (data, assetId) => {
    ambrosus.events.createEvent(assetId, data)
        .then((response) => {
            console.log('Event Created Successfully: ' + response.data.eventId);
        })
        .catch((error) => {
            console.log('Event Creation Failed');
            console.log(error.message);
        });
};

readExtension = fileName => {
    if (fileName.split('.').pop() === 'json') {
        return true;
    } else {
        console.log('Please upload a json file');
        return false;
    }
};

verifyEvents = (eventId) => {
    ambrosus.service.verifyEvents(eventId).then(verified => {
        console.log(verified);
    });
};

program.parse(process.argv);
