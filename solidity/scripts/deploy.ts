import { ethers } from 'hardhat';

async function main() {
  const deployer = await ethers.getSigner('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');

  console.log(`Deploying the coincoinNTF_tmp contract with the address: ${deployer.address}`);

  // Deploy the contract
  const CoincoinNFT = await ethers.getContractFactory('coincoinNFT_tmp');
  const coincoinNFT = await CoincoinNFT.deploy();
  await mintInitialNFTs(CoincoinNFT, deployer);

  // No need to use .deployed() here

  console.log(`coincoinNTF_tmp contract deployed to address: ${await coincoinNFT.getAddress()}`);

  async function mintInitialNFTs(coincoinNTF : any, deployer : any) {
    // Mint initial NFTs to the deployer
    const amountToMint = 1500; // Set the initial quantity to mint&
  
    await coincoinNTF.mintCoinCoin(deployer.address, amountToMint);
    console.log('this : ',await coincoinNTF.balanceOf(deployer.address, 8));
  
    console.log(`Minted initial NFTs to ${deployer.address}`);
    console.log('count : ',await coincoinNTF.price());
    
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
