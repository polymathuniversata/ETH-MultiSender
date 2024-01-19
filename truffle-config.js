const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    // Uncomment and update the following section for Sepolia testnet
    sepolia: {
      provider: () => new HDWalletProvider("sleep burst patrol gap mixed moment clerk exhibit stamp thing obvious common", "https://sepolia.infura.io/v3/b14c4b42d7584ae6bc9b7127c911d297"),
      network_id: 11155111,  // Replace with the Sepolia network ID
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    // You can add more networks if needed..
  networks: {
     development: {
     host: "127.0.0.1",
     port: 8545,  // Update this line to use 8545
     network_id: "*",
      },
      // ... other network configurations
    },
    
  },

  // Other configurations...

  compilers: {
    solc: {
      version: "0.8.21",
    },
  },

  // Other configurations...
};
