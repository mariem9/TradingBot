# dvf-bot-sample

Simple bot implementation for DeversiFi.
After registering and depositing ETH, the bot will start selling/buying every 60 seconds.

## Setup

To install all packages and dependencies run:

```bash
  npm install
```

Make sure you add your data to config.js

```js
module.exports = {
  API_URL: "https://api.stg.deversifi.com",
  PROVIDER_URL: "YOUR PROVIDER URL (INFURA)",
  PRIVATE_KEY: "YOUR PRIVATE KEY",
};
```

After the config file is completed run the following script to register and deposit all your ETH.

```bash
  npm run setup
```

### dvf-client-js

[dvf-client-js](https://github.com/DeversiFi/dvf-client-js) Is being used for every operation, you can find more details on how the configuration is done in the [dvf.js](https://github.com/DeversiFi/dvf-bot-sample/blob/master/dvf.js) file.

## Trade

To start running the bot:

```bash
  npm start
```

### Getting ETH price

The function [getPriceFromOrderBook](https://github.com/DeversiFi/dvf-bot-sample/blob/master/trade.js#L67) will reach out to the order book api and get the first price on the book. To make sure the order will be settled when submitting it, it will increase/decrease 5% of the price depending if the operation buy or sell.
