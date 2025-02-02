require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.QUICKNODE_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};


// pollingInterval: 1000, // 1 секунда (увеличьте, если нужно)