const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AIU_VIT_NUR_BAK (Modified Version)", function () {
  let contract;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Получаем аккаунты для тестов
    [owner, addr1, addr2] = await ethers.getSigners();

    // Разворачиваем контракт
    const Contract = await ethers.getContractFactory("AIU_VIT_NUR_BAK");
    contract = await Contract.deploy(owner.address);
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await contract.name()).to.equal("AIU_VIT_NUR_BAK");
    expect(await contract.symbol()).to.equal("AIU");
  });

  it("Should mint 2000 tokens to the initial owner", async function () {
    const balance = await contract.balanceOf(owner.address);
    expect(balance).to.equal(BigInt(2000 * 10 ** 18)); // Используем BigInt для безопасных чисел
  });

  it("Should set the correct initial owner", async function () {
    const contractOwner = await contract.owner();
    expect(contractOwner).to.equal(owner.address);
  });

  it("Should return the correct transaction sender", async function () {
    const sender = await contract.getTransactionSender();
    expect(sender).to.equal(owner.address);
  });

  it("Should return the correct transaction receiver", async function () {
    const receiver = await contract.getTransactionReceiver(addr1.address);
    expect(receiver).to.equal(addr1.address);
  });

  it("Should return the latest transaction timestamp", async function () {
    const timestamp = await contract.getLatestTransactionTimestamp();
    expect(timestamp).to.include("Timestamp:");
  });

  it("Should emit TransactionDetails event", async function () {
    it("Should emit TransactionDetails event", async function () {
      const tx = await token.getTransactionDetails(owner.address, addr1.address, 100);
      const receipt = await tx.wait();
    
      const event = receipt.events?.find(e => e.event === "TransactionDetails");
      
      // Проверка, что событие было найдено
      expect(event).to.not.be.undefined; 
    
      // Проверка аргументов события
      expect(event.args[0]).to.equal(owner.address); // sender
      expect(event.args[1]).to.equal(addr1.address); // receiver
      expect(event.args[2]).to.equal(100); // amount
      expect(event.args[3]).to.be.a("BigNumber"); // block timestamp
    });
    
  });
  
  
  
  
  
});
