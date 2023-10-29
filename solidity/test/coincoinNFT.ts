
const { ethers } = require("hardhat");

describe("coincoinNFT_tmp", function () {
  let coincoinNFT : any;
  let user: any;

  beforeEach(async function () {
    user = await ethers.getSigners();
    coincoinNFT = await ethers.deployContract("coincoinNFT_tmp");
    await coincoinNFT.waitForDeployment();
  });

  it("Should mint a random NFT with coincoin and burn coincoin", async function () {
    // Mint some coincoin to the user
    await coincoinNFT.mintCoinCoin(user.address, 1000);

    // Check user's balance before minting
    const userCoinCoinBalanceBefore = await coincoinNFT.balanceOf(user.address, 8);

    // Mint a boost
    await coincoinNFT.connect(user).mintBoost();

    // Check user's balance after minting
    const userCoinCoinBalanceAfter = await coincoinNFT.balanceOf(user.address, 8);

    expect(userCoinCoinBalanceBefore.sub(userCoinCoinBalanceAfter)).to.equal(1000);
  });

  it("Should calculate the correct price for minting a boost", async function () {
    // Mint some NFTs to the user
    await coincoinNFT.mintRandom(user.address);

    // Calculate the expected price
    const expectedPrice = (1000 * 0.5 * ((105 * 8) / 100));

    // Call the price function
    const actualPrice = await coincoinNFT.price();

    expect(actualPrice).to.equal(expectedPrice);
  });

  it("Should count the total number of NFTs for a user", async function () {
    // Mint some NFTs to the user
    await coincoinNFT.mintRandom(user.address);

    // Call the _countNFTs function
    const totalNFTs = await coincoinNFT.connect(user)._countNFTs(user.address);

    // Assuming the user now has 8 NFTs, the count should be 8.
    expect(totalNFTs).to.equal(8);
  });

  it("Should mint CoinCoin for a user", async function () {
    // Mint some CoinCoin to the user
    await coincoinNFT.mintCoinCoin(user.address, 1000);

    // Check the user's CoinCoin balance
    const userCoinCoinBalance = await coincoinNFT.balanceOf(user.address, 8);

    expect(userCoinCoinBalance).to.equal(1000);
  });

  it("Should generate a random NFT ID", async function () {
    const randomNFTId = await coincoinNFT._generateRandomNumber();

    // Ensure the generated NFT ID is within the valid range
    expect(randomNFTId).to.be.within(1, 8);
  });
});
