import { ethers } from 'hardhat';

async function main() {
  //const deployer = await ethers.getSigner('0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266');

  //console.log(`Deploying the coincoinNTF_tmp contract with the address: ${deployer.address}`);

  // Deploy the contract
  //const CoincoinNTF = await ethers.getContractFactory('coincoinNTF_tmp');
  const coincoinNTF = await ethers.deployContract("coincoinNFT_tmp");
  await coincoinNTF.waitForDeployment();
  await mintInitialNFTs(coincoinNTF);
  await coincoinNTF.mintCoinCoin("0xF9e16bF9F8daAee6C744C9a57DC0612346447564", 100)

  // No need to use .deployed() here

  console.log(`coincoinNTF_tmp contract deployed to address: ${await coincoinNTF.getAddress()}`);

  async function mintInitialNFTs(coincoinNTF : any) {
    // Mint initial NFTs to the deployer
    const amountToMint = 1500; // Set the initial quantity to mint&
  
    // await coincoinNTF.mintCoinCoin(deployer.address, amountToMint);
    // console.log('Balance of deployer : ',await coincoinNTF.balanceOf(deployer.address, 8));
    // console.log('Count of NFT : ',await coincoinNTF.price());
    console.log('Contract Address:', await coincoinNTF.getAddress());
    
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
