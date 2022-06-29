#!/usr/bin/env node
const DVF = require("./dvf");
const axios = require("axios");
const { PRIVATE_KEY, API_URL } = require("./config");

(async () => {
  const dvf = await DVF();
  const ethAmount = 0.1;
  // Starting selling ether
  trade(dvf, -ethAmount);

  let nextAction = "buy";

  // trading every 60 seconds switching buy and sell
  setInterval(() => {
    if (nextAction === "sell") {
      trade(dvf, -ethAmount);
      nextAction = "buy";
    } else {
      trade(dvf, ethAmount);
      nextAction = "sell";
    }
    console.log("Sleeping 60 seconds");
  }, 60000);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});

async function trade(dvf, amount) {
  // Gets the price from the order book api and cuts 10% to make sure the order will be settled
  let price = await getPriceFromOrderBook();

  if (!price) {
    console.error("Error getting the price");
    process.exit(1);
  }

  console.log("Current ETH price: ", price);
  if (amount < 0) {
    console.log(`Selling ${amount}ETH`);
    price = price - price * 0.1;
  } else {
    console.log(`Buying ${amount}ETH`);
    price = price + price * 0.1;
  }

  try {
    await dvf.submitOrder({
      symbol: "ETH:USDT",
      amount,
      price,
      starkPrivateKey: PRIVATE_KEY,
    });
    console.log("Trade completed");
  } catch (e) {
    const error = (e.error && e.error.details && e.error.details.error) || {};
    console.warn("Trade not completed");
    if (error.error === "NOT_ENOUGH_AVAILABLE_BALANCE") {
      console.warn("Reason: Not enough balance");
    } else {
      console.error(e);
    }
  }
}

async function getPriceFromOrderBook() {
  try {
    const res = await axios.get(`${API_URL}/bfx/v2/tickers?symbols=tETHUST`);
    const data = (res && res.data) || [];

    if (!data.length || !data[0] || !data[0][1]) {
      console.log("Error getting order book from api");
      return null;
    }

    return data[0][1];
  } catch (e) {
    return null;
  }
}
