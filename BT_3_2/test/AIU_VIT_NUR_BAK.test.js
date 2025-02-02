const { expect } = require("chai");
const { ethers } = require("hardhat");



describe("AIU_VIT_NUR_BAK (Initial Version)", function () {
  let token;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const AIU_VIT_NUR_BAK = await ethers.getContractFactory("AIU_VIT_NUR_BAK");
    token = await AIU_VIT_NUR_BAK.deploy(owner.address); // Pass owner as the initial owner
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await token.name()).to.equal("AIU_VIT_NUR_BAK");
    expect(await token.symbol()).to.equal("AIU");
  });

  it("Should mint 2000 tokens to the owner", async function () {
    const ownerBalance = await token.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.parseUnits("2000", 18));
  });

  it("Should return the correct transaction sender", async function () {
    const sender = await token.getTransactionSender();
    expect(sender).to.equal(owner.address);
  });

  it("Should return the correct transaction receiver", async function () {
    const receiver = await token.getTransactionReceiver(addr1.address);
    expect(receiver).to.equal(addr1.address);
  });

  it("Should return the latest transaction timestamp", async function () {
    const timestamp = await token.getLatestTransactionTimestamp();
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