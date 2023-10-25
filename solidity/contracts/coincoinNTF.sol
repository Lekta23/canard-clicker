// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract coincoinNTF_tmp is ERC1155 {
    uint256 public constant wheat = 1;
    uint256 public constant pond = 2;
    uint256 public constant fox = 3;
    uint256 public constant duckling = 4;
    uint256 public constant eggs = 5;
    uint256 public constant flight = 6;
    uint256 public constant dive = 7;
    uint256 public constant coincoin = 8;




    constructor() ERC1155("https://ipfs.io/ipfs/bafybeia5m3nte4pprldq2wusdrrvd4zzbpvdipkbpgqdlthbthvzkrf7mm/{id}.json") {
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
                "https://ipfs.io/ipfs/bafybeia5m3nte4pprldq2wusdrrvd4zzbpvdipkbpgqdlthbthvzkrf7mm/",
                Strings.toString(_tokenid),".json"
            )
        );
    }

    function mintRandom(address to) public {
        uint256 id = _generateRandomNumber();
        _mint(to, id, 1, "");
    }

    // Mint with coincoin 
    // Check si Plus de 1000 CoinCoin
    // Si oui, on mintRandom et burn 1000 CoinCoin

    // Mint CoinCoin
    // Permet de mint(X) CoinCoin
    function mintCoinCoin(address to, uint256 number) public {
        _mint(to, 100, number, "");
    }


    function _generateRandomNumber() internal view returns (uint256) {
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));

        // Modifiez ces valeurs pour définir vos propres probabilités 
        if (randomNumber % 100 < 1) { 
            return 6;  // 1% de chance d'obtenir plongée
        } else if (randomNumber % 100 < 5) {
            return 5;  // 4% de chance d'obtenir vol
        } else if (randomNumber % 100 < 12) {
            return 4;  // 7 % de chance d'obtenir cannetons
        } else if (randomNumber % 100 < 23) {
            return 3;  // 11% de chance d'obtenir renard
        } else if (randomNumber % 100 < 35) {
            return 2;  // 12% de chance d'obtenir mare
        } else if (randomNumber % 100 < 50) {
            return 1;  // 15% de chance d'obtenir oeufs
        } else {
            return 0;  // 50% de chance d'obtenir blé
        }
    }
}