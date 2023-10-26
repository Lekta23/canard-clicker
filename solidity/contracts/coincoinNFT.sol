// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract coincoinNFT_tmp is ERC1155 {
    uint256 internal constant wheat = 1;
    uint256 internal constant pond = 2;
    uint256 internal constant fox = 3;
    uint256 internal constant duckling = 4;
    uint256 internal constant eggs = 5;
    uint256 internal constant flight = 6;
    uint256 internal constant dive = 7;
    uint256 internal constant coincoin = 8;

    constructor() ERC1155("https://ipfs.io/ipfs/bafybeibixbzd6lxmcrgulslbbriuq4azckcp5jchss7uo2qpm6ykwxwgwm/{id}.json") {
        _mint(msg.sender, wheat, 1, "");
        _mint(msg.sender, pond, 1, "");
        _mint(msg.sender, fox, 1, "");
        _mint(msg.sender, duckling, 1, "");
        _mint(msg.sender, eggs, 1, "");
        _mint(msg.sender, flight, 1, "");
        _mint(msg.sender, dive, 1, "");
        _mint(msg.sender, coincoin, 1, "");        
    }

    function uri(uint256 _tokenid) override public pure returns (string memory) {
        return string(
            abi.encodePacked(
                "https://ipfs.io/ipfs/bafybeibixbzd6lxmcrgulslbbriuq4azckcp5jchss7uo2qpm6ykwxwgwm/",
                Strings.toString(_tokenid),".json"
            )
        );
    }

    function _mintRandom(address to) internal {
        uint256 id = _generateRandomNumber();
        _mint(to, id, 1, "");
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }

    // Mint with coincoin 
    // Check si Plus de 1000 CoinCoin
    // Si oui, on mintRandom et burn 1000 CoinCoin
    function mintBoost() public {
        uint256 cost = price(); // Calcul du coût en coincoin

        // Vérification si l'expéditeur a suffisamment de jetons coincoin
        require(balanceOf(msg.sender, coincoin) >= cost, "Not enough coincoin tokens");

        // Attribution d'un NFT aléatoire à l'adresse spécifiée
        _mintRandom(msg.sender);

        // Brûler le coût en coincoin
        _burn(msg.sender, coincoin, cost);
    }

    function price() view public returns (uint256) {
        return (1000 * 0.5 * ((105 * _countNFTs(msg.sender))) / 100);
    }

    // Count sum of nfts
    function _countNFTs(address account) internal view returns (uint256) {
        uint256 totalNFTs = 0;
        for (uint256 tokenId = 1; tokenId <= 7; tokenId++) {
            // Assuming you have NFTs with IDs 1 and 2 (wheat and egg)
            totalNFTs += balanceOf(account, tokenId);
        }
        return totalNFTs;
    }

    // Mint CoinCoin
    // Permet de mint(X) CoinCoin
    function mintCoinCoin(address to, uint256 number) public {
        _mint(to, coincoin, number, "");
    }


    function _generateRandomNumber() internal view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));

        // Modifiez ces valeurs pour définir vos propres probabilités 
        if (randomNumber % 100 < 1) { 
            return dive;  // 1% de chance d'obtenir plongée
        } else if (randomNumber % 100 < 5) {
            return flight;  // 4% de chance d'obtenir vol
        } else if (randomNumber % 100 < 12) {
            return duckling;  // 7 % de chance d'obtenir cannetons
        } else if (randomNumber % 100 < 23) {
            return fox;  // 11% de chance d'obtenir renard
        } else if (randomNumber % 100 < 35) {
            return pond;  // 12% de chance d'obtenir mare
        } else if (randomNumber % 100 < 50) {
            return eggs;  // 15% de chance d'obtenir oeufs
        } else {
            return wheat;  // 50% de chance d'obtenir blé
        }
    }
}