# AIU_VIT_NUR_BAK — ERC-20 Token Testing with Hardhat

A Solidity and Hardhat project demonstrating the development and automated testing of a custom **ERC-20 token** based on OpenZeppelin contracts.

The `AIU_VIT_NUR_BAK` token has:

* ERC-20 functionality
* fixed initial supply of 2,000 AIU
* OpenZeppelin ownership management
* custom transaction-detail events
* helper functions for sender, receiver, and block timestamp information
* two custom Hardhat/Chai test suites
* Sepolia deployment configuration through QuickNode

The project focuses especially on **smart-contract testing and comparison of two test-suite versions**.

---

## Project Overview

```text
AIU_VIT_NUR_BAK.sol
        │
        ├── ERC-20
        ├── Ownable
        ├── 2,000 AIU initial supply
        └── Custom utility functions
        │
        ▼
      Hardhat
        │
   ┌────┴──────────────────┐
   │                       │
   ▼                       ▼
Initial Test Suite     Modified Test Suite
   │                       │
   ▼                       ▼
6 displayed tests      7 displayed tests
   │                       │
   └───────────┬───────────┘
               │
               ▼
        Contract Validation
```

---

# Main Features

The project demonstrates:

* Solidity smart-contract development
* ERC-20 token creation
* OpenZeppelin `ERC20`
* OpenZeppelin `Ownable`
* initial token minting
* Ethereum events
* block timestamps
* `msg.sender`
* address handling
* Hardhat development environment
* Ethers.js
* Chai assertions
* automated contract deployment during tests
* isolated test accounts
* Sepolia deployment configuration
* environment-variable management

---

# Technology Stack

## Smart Contract

```text
Solidity ^0.8.20
OpenZeppelin Contracts 5.2
ERC-20
Ownable
```

## Testing

```text
Hardhat 2.22
Mocha
Chai
Hardhat Chai Matchers
Ethers.js 6
Sinon
```

## Deployment

```text
Ethereum
Sepolia Testnet
QuickNode RPC
dotenv
```

---

# Repository Structure

The archive contains an outer project directory and the actual complete Hardhat project inside `BT_3_2/`.

```text
BT_3_2-main/
│
├── README.md
├── package.json
├── package-lock.json
├── node_modules/
│
└── BT_3_2/
    │
    ├── contracts/
    │   └── AIU_VIT_NUR_BAK.sol
    │
    ├── scripts/
    │   └── deploy.js
    │
    ├── test/
    │   ├── AIU_VIT_NUR_BAK.test.js
    │   ├── AIU_VIT_NUR_BAK_Modified.test.js
    │   └── Lock.js
    │
    ├── 11.png
    ├── 12.png
    │
    ├── hardhat.config.js
    ├── package.json
    ├── package-lock.json
    ├── .gitignore
    ├── .gitattributes
    ├── LICENSE
    └── README.md
```

The main working directory is therefore:

```bash
cd BT_3_2
```

---

# Smart Contract

The main contract is:

```text
contracts/AIU_VIT_NUR_BAK.sol
```

The contract inherits:

```solidity
ERC20
Ownable
```

from OpenZeppelin.

```solidity
contract AIU_VIT_NUR_BAK is ERC20, Ownable
```

---

# Constructor

The token is initialized using:

```solidity
constructor(address initialOwner)
    ERC20("AIU_VIT_NUR_BAK", "AIU")
    Ownable(initialOwner)
{
    _mint(initialOwner, 2000 * 10 ** decimals());
}
```

During deployment:

```text
Deployer
   │
   ▼
initialOwner
   │
   ├── Becomes contract owner
   │
   └── Receives 2,000 AIU
```

---

# Token Parameters

| Property         | Value                |
| ---------------- | -------------------- |
| Token Name       | `AIU_VIT_NUR_BAK`    |
| Symbol           | `AIU`                |
| Standard         | ERC-20               |
| Initial Supply   | 2,000 AIU            |
| Decimals         | 18                   |
| Ownership        | OpenZeppelin Ownable |
| Solidity         | `^0.8.20`            |
| Hardhat Compiler | `0.8.28`             |

---

# Initial Supply

The constructor mints:

```solidity
_mint(
    initialOwner,
    2000 * 10 ** decimals()
);
```

Since OpenZeppelin ERC-20 uses:

```text
18 decimals
```

the internal supply is:

```text
2,000 × 10^18
```

token units.

User-facing supply:

```text
2,000 AIU
```

---

# Supply Model

There is no public mint function.

```text
Contract Deployment
        │
        ▼
Mint 2,000 AIU
        │
        ▼
Initial Owner
        │
        ▼
No additional public minting
```

The initial supply therefore remains the only supply created by this contract unless the Solidity source is modified and redeployed.

---

# Standard ERC-20 Functions

OpenZeppelin provides all standard ERC-20 functionality automatically.

Important functions include:

```text
name()
symbol()
decimals()
totalSupply()

balanceOf()
transfer()

approve()
allowance()
transferFrom()
```

Standard events:

```text
Transfer
Approval
```

---

# Ownership

The token also inherits:

```solidity
Ownable
```

The address supplied to the constructor becomes the contract owner.

OpenZeppelin therefore provides:

```text
owner()
transferOwnership()
renounceOwnership()
```

The custom functions in this project currently do not use the `onlyOwner` modifier.

---

# Custom Event

The contract declares:

```solidity
event TransactionDetails(
    address sender,
    address receiver,
    uint256 amount,
    uint256 timestamp
);
```

The event records four supplied/generated values:

```text
Sender
Receiver
Amount
Current block timestamp
```

---

# `getTransactionDetails()`

```solidity
function getTransactionDetails(
    address sender,
    address receiver,
    uint256 amount
) public {
    uint256 timestamp = block.timestamp;

    emit TransactionDetails(
        sender,
        receiver,
        amount,
        timestamp
    );
}
```

Workflow:

```text
sender
receiver
amount
   │
   ▼
getTransactionDetails()
   │
   ▼
block.timestamp
   │
   ▼
TransactionDetails Event
   │
   ▼
Ethereum Transaction Log
```

---

# `emitTransactionDetails()`

This project also contains a second event-emission function:

```solidity
function emitTransactionDetails(
    address sender,
    address receiver,
    uint amount
) public {
    emit TransactionDetails(
        sender,
        receiver,
        amount,
        block.timestamp
    );
}
```

Both:

```text
getTransactionDetails()
```

and:

```text
emitTransactionDetails()
```

currently emit essentially the same event information.

The difference is mainly implementation style.

---

# Important Transaction Event Note

The contract does **not automatically retrieve historical ERC-20 transaction details**.

The caller manually supplies:

```text
sender
receiver
amount
```

to these custom functions.

For example:

```text
Caller
  │
  ├── sender = arbitrary address
  ├── receiver = arbitrary address
  └── amount = arbitrary number
           │
           ▼
TransactionDetails event
```

The values are therefore not automatically verified against an actual token transfer.

Real AIU transfers are already represented by the standard ERC-20:

```solidity
Transfer
```

event inherited from OpenZeppelin.

---

# Current Block Timestamp

The contract provides:

```solidity
function getLatestTransactionTimestamp()
    external
    view
    returns (string memory)
{
    uint256 timestamp = block.timestamp;
    return _timestampToString(timestamp);
}
```

The result has the format:

```text
Timestamp: 1730000000
```

---

# Important Timestamp Note

Despite the name:

```text
getLatestTransactionTimestamp()
```

the contract does not maintain a database of token transactions.

The function returns:

```solidity
block.timestamp
```

for the current blockchain context.

It is therefore more accurately interpreted as:

```text
Current block timestamp
```

rather than:

```text
Timestamp of the latest token transaction
```

---

# Timestamp Conversion

The numeric timestamp is converted to a string through:

```solidity
_timestampToString()
```

and:

```solidity
uint2str()
```

Flow:

```text
block.timestamp
       │
       ▼
     uint256
       │
       ▼
    uint2str()
       │
       ▼
"Timestamp: ..."
```

---

# Transaction Sender

The function:

```solidity
function getTransactionSender()
    external
    view
    returns (address)
{
    return msg.sender;
}
```

returns the address executing the call.

```text
Wallet
  │
  ▼
getTransactionSender()
  │
  ▼
msg.sender
  │
  ▼
Wallet Address
```

---

# Transaction Receiver

The contract includes:

```solidity
function getTransactionReceiver(
    address receiver
)
    external
    pure
    returns (address)
{
    return receiver;
}
```

It simply returns the provided argument.

It does not inspect a previous Ethereum or ERC-20 transaction.

---

# Contract Architecture

```text
                 AIU_VIT_NUR_BAK
                       │
          ┌────────────┴─────────────┐
          │                          │
          ▼                          ▼
         ERC20                     Ownable
          │                          │
    ┌─────┼─────┐              ┌─────┼────────┐
    ▼     ▼     ▼              ▼     ▼        ▼
transfer balance approve     owner transfer  renounce
                                  ownership ownership
          │
          └──────────────┐
                         │
                         ▼
                   Custom Functions
                         │
            ┌────────────┼──────────────┐
            ▼            ▼              ▼
     TransactionDetails Timestamp    Addresses
          Event
```

---

# Testing

The main difference between this repository and the previous version of the project is the addition of dedicated token tests.

The repository contains:

```text
test/
├── AIU_VIT_NUR_BAK.test.js
├── AIU_VIT_NUR_BAK_Modified.test.js
└── Lock.js
```

---

# Initial Test Suite

File:

```text
test/AIU_VIT_NUR_BAK.test.js
```

The test suite deploys a fresh token before every test:

```javascript
beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();

    const AIU_VIT_NUR_BAK =
        await ethers.getContractFactory(
            "AIU_VIT_NUR_BAK"
        );

    token = await AIU_VIT_NUR_BAK.deploy(
        owner.address
    );
});
```

This provides test isolation:

```text
Test 1 ──► Fresh Contract
Test 2 ──► Fresh Contract
Test 3 ──► Fresh Contract
...
```

---

# Initial Version Checks

The test file checks:

```text
Correct token name
Correct token symbol
2,000 AIU initial owner balance
Transaction sender
Transaction receiver
Timestamp string
TransactionDetails test wrapper
```

Run it with:

```bash
npx hardhat test test/AIU_VIT_NUR_BAK.test.js
```

---

# Initial Test Result

The included screenshot shows:

```text
AIU_VIT_NUR_BAK (Initial Version)

✓ Should deploy with the correct name and symbol
✓ Should mint 2000 tokens to the owner
✓ Should return the correct transaction sender
✓ Should return the correct transaction receiver
✓ Should return the latest transaction timestamp
✓ Should emit TransactionDetails event

6 passing
```

Screenshot:

![Initial Hardhat tests](11.png)

---

# Modified Test Suite

File:

```text
test/AIU_VIT_NUR_BAK_Modified.test.js
```

This version additionally validates:

```solidity
owner()
```

to ensure that the constructor correctly configures the OpenZeppelin owner.

---

# Modified Version Checks

The modified suite contains displayed checks for:

```text
Correct token name
Correct token symbol
2,000 AIU initial supply
Correct initial owner
Transaction sender
Transaction receiver
Timestamp string
TransactionDetails test wrapper
```

Run:

```bash
npx hardhat test test/AIU_VIT_NUR_BAK_Modified.test.js
```

---

# Modified Test Result

The included screenshot shows:

```text
AIU_VIT_NUR_BAK (Modified Version)

✓ Should deploy with the correct name and symbol
✓ Should mint 2000 tokens to the initial owner
✓ Should set the correct initial owner
✓ Should return the correct transaction sender
✓ Should return the correct transaction receiver
✓ Should return the latest transaction timestamp
✓ Should emit TransactionDetails event

7 passing
```

Screenshot:

![Modified Hardhat tests](12.png)

---

# Initial vs Modified Tests

| Test                       | Initial | Modified |
| -------------------------- | :-----: | :------: |
| Token name                 |    ✓    |     ✓    |
| Token symbol               |    ✓    |     ✓    |
| Initial 2,000 AIU          |    ✓    |     ✓    |
| Initial owner              |    —    |     ✓    |
| `getTransactionSender()`   |    ✓    |     ✓    |
| `getTransactionReceiver()` |    ✓    |     ✓    |
| Timestamp                  |    ✓    |     ✓    |
| Event wrapper              |    ✓    |     ✓    |
| Displayed passing tests    |    6    |     7    |

The principal functional addition in the modified version is:

```text
Verification of the OpenZeppelin owner
```

---

# Important Event-Test Issue

Although both screenshots report the event test as passing, the current source code contains:

```javascript
it("Should emit TransactionDetails event", async function () {
    it("Should emit TransactionDetails event", async function () {
        // actual assertions
    });
});
```

This is a nested Mocha test.

That structure is incorrect.

The outer test can complete successfully after registering the inner `it()` without executing the intended event assertions as part of that test.

Therefore:

> The displayed `6 passing` and `7 passing` results should not be interpreted as proof that the actual `TransactionDetails` event arguments were verified.

The event test should instead be written as one normal test.

A correct Hardhat/Ethers.js 6 version would be:

```javascript
it("Should emit TransactionDetails event", async function () {
    await expect(
        token.getTransactionDetails(
            owner.address,
            addr1.address,
            100
        )
    )
        .to.emit(token, "TransactionDetails")
        .withArgs(
            owner.address,
            addr1.address,
            100,
            anyValue
        );
});
```

with:

```javascript
const {
    anyValue
} = require(
    "@nomicfoundation/hardhat-chai-matchers/withArgs"
);
```

---

# Another Issue in Modified Event Test

Inside the nested event test in:

```text
AIU_VIT_NUR_BAK_Modified.test.js
```

the source references:

```javascript
token.getTransactionDetails(...)
```

but that test suite defines the contract instance as:

```javascript
contract
```

rather than:

```javascript
token
```

Therefore, if the nested body were actually executed, this reference would need to be changed to:

```javascript
contract.getTransactionDetails(...)
```

---

# Ethers.js Version

The project uses:

```text
ethers ^6.13.5
```

This is important because Ethers.js 6 represents Solidity integers using JavaScript:

```text
bigint
```

rather than the Ethers.js 5 `BigNumber` API.

For example:

```javascript
ethers.parseUnits("2000", 18)
```

returns a:

```text
bigint
```

---

# Recommended Token Supply Assertion

The safest form is:

```javascript
expect(
    await contract.balanceOf(owner.address)
).to.equal(
    ethers.parseUnits("2000", 18)
);
```

This avoids manually calculating:

```javascript
2000 * 10 ** 18
```

with JavaScript `Number`.

---

# Leftover Hardhat `Lock.js`

The repository still contains:

```text
test/Lock.js
```

This is the standard Hardhat starter test.

It expects a contract named:

```text
Lock
```

and tests:

* unlock time
* locked ETH
* withdrawals
* ownership
* withdrawal events

However, this project does not contain:

```text
contracts/Lock.sol
```

Therefore `Lock.js` is unrelated to the AIU token and should normally be removed.

Running:

```bash
npx hardhat test
```

can attempt to include this obsolete test file.

For this project, use the AIU-specific tests directly or delete `Lock.js`.

---

# Recommended Test Structure

A cleaned test directory should contain:

```text
test/
├── AIU_VIT_NUR_BAK.test.js
└── AIU_VIT_NUR_BAK_Modified.test.js
```

or preferably one consolidated file:

```text
test/
└── AIU_VIT_NUR_BAK.test.js
```

with all current tests implemented correctly.

---

# Additional Tests Recommended

The existing tests cover only part of the contract.

A more complete suite should also verify:

```text
ERC-20
│
├── totalSupply()
├── decimals()
├── transfer()
├── balanceOf()
├── approve()
├── allowance()
└── transferFrom()

Ownership
│
├── owner()
├── transferOwnership()
└── renounceOwnership()

Custom Functions
│
├── TransactionDetails event
├── emitTransactionDetails()
├── getTransactionSender()
├── getTransactionReceiver()
└── getLatestTransactionTimestamp()
```

---

# Installation

The actual Hardhat project is located inside:

```text
BT_3_2/
```

Enter it first:

```bash
cd BT_3_2
```

Then install dependencies:

```bash
npm install
```

---

# Dependencies

The project declares:

```text
@nomicfoundation/hardhat-chai-matchers ^2.0.8
@nomicfoundation/hardhat-toolbox       ^5.0.0
@openzeppelin/contracts                ^5.2.0
dotenv                                 ^16.4.7
hardhat                                ^2.22.18
ethers                                 ^6.13.5
sinon                                  ^19.0.2
```

---

# Compile the Contract

Run:

```bash
npx hardhat compile
```

Hardhat compiles:

```text
contracts/AIU_VIT_NUR_BAK.sol
```

using:

```text
Solidity 0.8.28
```

The contract itself declares:

```solidity
pragma solidity ^0.8.20;
```

These versions are compatible.

---

# Run the Initial Tests

```bash
npx hardhat test test/AIU_VIT_NUR_BAK.test.js
```

The saved project screenshot reports:

```text
6 passing
```

with the event-test caveat described above.

---

# Run the Modified Tests

```bash
npx hardhat test test/AIU_VIT_NUR_BAK_Modified.test.js
```

The saved project screenshot reports:

```text
7 passing
```

with the same event-test caveat.

---

# Environment Variables

The deployment configuration requires:

```text
QUICKNODE_URL
PRIVATE_KEY
```

Create a `.env` file inside:

```text
BT_3_2/
```

The environment file should contain your Sepolia RPC endpoint and development-wallet private key using those variable names.

Do not commit `.env`.

The repository's `.gitignore` already excludes it.

---

# Hardhat Configuration

The current configuration is:

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
    solidity: "0.8.28",

    networks: {
        sepolia: {
            url: process.env.QUICKNODE_URL,
            accounts: [
                process.env.PRIVATE_KEY
            ],
        },
    },
};
```

---

# Deployment Script

The deployment script is:

```text
scripts/deploy.js
```

It retrieves the configured signer:

```javascript
const [deployer] =
    await hre.ethers.getSigners();
```

and uses that address as:

```text
Contract deployer
+
Initial contract owner
+
Initial AIU token holder
```

Deployment:

```javascript
const token =
    await AIU_VIT_NUR_BAK.deploy(
        deployer.address
    );
```

---

# Deploy to Sepolia

Compile first:

```bash
npx hardhat compile
```

Then deploy:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

The terminal prints:

```text
Deploying contracts with the account: ...
Token deployed to: ...
```

The exact address depends on the deployment transaction.

No fixed Sepolia contract address is stored in this version of the repository.

---

# Deployment Architecture

```text
Developer
    │
    ▼
Hardhat
    │
    ├── Solidity Compiler
    │
    ├── Ethers.js
    │
    └── Deployment Script
    │
    ▼
QuickNode
    │
    ▼
Sepolia RPC
    │
    ▼
Ethereum Sepolia
    │
    ▼
AIU_VIT_NUR_BAK
```

---

# Development Workflow

```text
1. Open the actual project
       │
       ▼
   cd BT_3_2
       │
       ▼
2. Install dependencies
       │
       ▼
   npm install
       │
       ▼
3. Compile
       │
       ▼
   npx hardhat compile
       │
       ▼
4. Run AIU tests
       │
       ├── Initial
       └── Modified
       │
       ▼
5. Configure .env
       │
       ▼
6. Deploy to Sepolia
```

---

# `.gitignore`

The project correctly ignores:

```text
node_modules
.env

cache
artifacts

typechain
typechain-types

coverage
coverage.json

ignition/deployments/chain-31337
```

---

# Repository Cleanup

The archive contains:

```text
node_modules/
```

in the outer project directory.

`node_modules` should normally not be stored in a Git repository.

Dependencies can always be restored using:

```bash
npm install
```

The recommended repository structure would be:

```text
BT_3_2/
├── contracts/
├── scripts/
├── test/
├── 11.png
├── 12.png
├── hardhat.config.js
├── package.json
├── package-lock.json
├── .gitignore
├── LICENSE
└── README.md
```

without the extra outer Node project and committed `node_modules`.

---

# Test Screenshots

## Initial Version

![Initial version tests](11.png)

Result shown in the repository:

```text
6 passing (537ms)
```

---

## Modified Version

![Modified version tests](12.png)

Result shown in the repository:

```text
7 passing (557ms)
```

Execution time depends on the development environment and may differ on another machine.

---

# Current Test Coverage

The current meaningful checks include:

| Area                                   | Status           |
| -------------------------------------- | ---------------- |
| Contract deployment                    | Tested           |
| Token name                             | Tested           |
| Token symbol                           | Tested           |
| Initial 2,000 AIU balance              | Tested           |
| Initial owner                          | Modified suite   |
| Transaction sender helper              | Tested           |
| Transaction receiver helper            | Tested           |
| Timestamp helper                       | Tested           |
| `TransactionDetails` actual assertions | Needs correction |
| Standard ERC-20 transfer               | Not tested       |
| Approval / allowance                   | Not tested       |
| `transferFrom()`                       | Not tested       |
| Ownership transfer                     | Not tested       |
| `emitTransactionDetails()`             | Not tested       |

---

# Current Limitations

The project currently has several technical limitations:

1. The custom event functions accept manually supplied transaction information.
2. They do not automatically inspect ERC-20 transfers.
3. `getLatestTransactionTimestamp()` returns the current block timestamp, not stored transaction history.
4. `getTransactionReceiver()` only returns its argument.
5. Both custom event-emission functions perform nearly identical tasks.
6. The `TransactionDetails` test is incorrectly nested inside another `it()`.
7. The modified nested event test references `token` instead of `contract`.
8. `Lock.js` belongs to the Hardhat template and is unrelated to this contract.
9. Standard ERC-20 transfer behavior is not tested by the custom suites.
10. Ownership-transfer functionality is not tested.
11. `npm test` is still configured as a placeholder.
12. The archive contains an unnecessary outer Node project and `node_modules`.

---

# `npm test`

The inner project's `package.json` currently defines:

```json
"test": "echo \"Error: no test specified\" && exit 1"
```

Therefore:

```bash
npm test
```

does not run the Hardhat suite.

The current test commands are:

```bash
npx hardhat test test/AIU_VIT_NUR_BAK.test.js
```

and:

```bash
npx hardhat test test/AIU_VIT_NUR_BAK_Modified.test.js
```

A useful future change would be to configure:

```json
"scripts": {
    "test": "hardhat test"
}
```

after removing the unrelated `Lock.js`.

---

# Security

The deployment configuration uses:

```text
PRIVATE_KEY
```

from `.env`.

Never publish a private key.

For Sepolia development:

* use a dedicated test wallet
* keep only testnet ETH in it
* store its private key only in `.env`
* never commit `.env`
* never use a production wallet key
* rotate a key immediately if it has been exposed

---

# License

The Solidity source declares:

```solidity
// SPDX-License-Identifier: MIT
```

and the project includes:

```text
LICENSE
```

containing the MIT License.

Therefore the source repository is intended to use:

```text
MIT
```

However, `package.json` currently declares:

```json
"license": "ISC"
```

For consistency, it should be changed to:

```json
"license": "MIT"
```

The included `LICENSE` file also still contains the generic copyright text:

```text
Copyright (c) 2023 Your Name
```

which should be replaced with the intended copyright holder before publication.

---

# Learning Objectives

This project demonstrates:

* Solidity inheritance
* ERC-20 token creation
* OpenZeppelin libraries
* smart-contract ownership
* token minting
* Ethereum events
* block timestamps
* Solidity address handling
* Hardhat
* Ethers.js 6
* Mocha
* Chai
* unit-test setup
* test isolation with `beforeEach`
* multiple Ethereum signers
* contract deployment in tests
* assertions against blockchain state
* Sepolia configuration
* environment-variable management

---

# Recommended Next Version

A cleaner testing structure would contain:

```text
AIU_VIT_NUR_BAK
│
├── Deployment
│   ├── name
│   ├── symbol
│   ├── decimals
│   ├── total supply
│   ├── owner
│   └── owner balance
│
├── ERC-20 Transfers
│   ├── transfer
│   ├── insufficient balance
│   ├── approve
│   ├── allowance
│   └── transferFrom
│
├── Ownership
│   └── transferOwnership
│
└── Custom Functions
    ├── sender
    ├── receiver
    ├── timestamp
    ├── getTransactionDetails event
    └── emitTransactionDetails event
```

---

# Summary

```text
Project:             AIU_VIT_NUR_BAK
Project Focus:       ERC-20 + Smart Contract Testing
Token Symbol:        AIU
Standard:            ERC-20
Initial Supply:      2,000 AIU
Decimals:            18
Blockchain:          Ethereum
Deployment Target:   Sepolia
Solidity:            ^0.8.20
Hardhat Compiler:    0.8.28
OpenZeppelin:        5.2
Hardhat:             2.22
Ethers.js:           6.13
Testing:             Mocha + Chai
Initial Screenshot:  6 passing
Modified Screenshot: 7 passing
License:             MIT
```

## Final Workflow

```text
                  AIU_VIT_NUR_BAK.sol
                           │
                           ▼
                      OpenZeppelin
                     ERC20 + Ownable
                           │
                           ▼
                        Hardhat
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
       Initial Test Suite       Modified Test Suite
              │                         │
              ▼                         ▼
     6 displayed passing       7 displayed passing
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
                    Contract Validation
                           │
                           ▼
                     Sepolia Deployment
                           │
                           ▼
                        Ethereum
```
