# AIU_VIT_NUR_BAK Token (ERC-20)

This repository contains the source code for the **AIU_VIT_NUR_BAK** token, an ERC-20 token deployed on the Sepolia testnet. The token has an initial supply of 2000 tokens and includes additional functions to retrieve transaction information.

## Table of Contents
- [Features](#features)
- [Usage](#usage)
- [Examples](#examples)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- **ERC-20 Standard**: The token follows the ERC-20 standard.
- **Initial Supply**: 2000 tokens are minted to the deployer's address upon deployment.
- **Transaction Information**:
  - Retrieve the block timestamp of the latest transaction in a human-readable format.
  - Retrieve the address of the transaction sender.
  - Retrieve the address of the transaction receiver.

## Usage

### Prerequisites

- Node.js (v16 or higher)
- Hardhat
- MetaMask (for interacting with the contract)
- Sepolia testnet ETH (for gas fees)

### Installation

1. Clone the repository:

2. Install dependencies:
    ```bash
    npm install

3. Set up environment variables:
    Create a .env file in the root directory and add the following:
    ```bash
    QUICKNODE_URL="your_quicknode_url"
    PRIVATE_KEY="your_private_key"

4. Compile the Contract
    ```bash
    npx hardhat compile

5. Deploy the Contract
    Deploy the contract to the Sepolia testnet:
    ```bash
    npx hardhat run scripts/deploy.js --network sepolia


### Examples

1. DEPLOY TEST_1: AIU_VIT_NUR_BAK.test
    ```bash
    npx hardhat test test/AIU_VIT_NUR_BAK.test.js

2. DEPLOY TEST_2: AIU_VIT_NUR_BAK_Modified.test
    ```bash
    npx hardhat test test/AIU_VIT_NUR_BAK_Modified.test.js

## Screenshots
- ![alt text](11.png)
- ![alt text](12.png)

