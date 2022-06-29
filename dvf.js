const HDWalletProvider = require("truffle-hdwallet-provider");
const DVF = require("dvf-client-js");
const { PRIVATE_KEY, PROVIDER_URL, API_URL } = require("./config");

module.exports = () => {
  const provider = new HDWalletProvider(PRIVATE_KEY, PROVIDER_URL);

  const dvfConfig = {
    api: API_URL,
    defaultProvider: provider,
  };
  return DVF(null, dvfConfig);
};
