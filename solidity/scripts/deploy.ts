import { ethers } from 'hardhat';

async function main() {
  const deployer = await ethers.getSigner('0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199');

  console.log(`Deploying the coincoinNTF_tmp contract with the address: ${deployer.address}`);

  // Deploy the contract
  const CoincoinNTF = await ethers.getContractFactory('coincoinNTF_tmp');
  const coincoinNTF = await CoincoinNTF.deploy();
  await mintInitialNFTs(coincoinNTF, deployer);

  // No need to use .deployed() here

  console.log(`coincoinNTF_tmp contract deployed to address: ${await coincoinNTF.getAddress()}`);

  async function mintInitialNFTs(coincoinNTF : any, deployer : any) {
    // Mint initial NFTs to the deployer
    const amountToMint = 1500; // Set the initial quantity to mint
  
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
