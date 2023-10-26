import logo from "./assets/Canard.png";
import wallpaper from "./assets/Background.png";
import "./App.css";
import ButtonConnexion from "./composents/button_connexion";
import canardCoincoin from "./assets/coincoin.mp3";
import AllNft from "./composents/all.json"

import { useState, useEffect } from "react";
import CoinCoin from "./artifacts/contracts/coincoinNFT.sol/coincoinNFT_tmp.json";
import getWeb3 from "./web3";
import Inventory from "./composents/Inventory";
import NftCard from "./composents/NftCard";

interface NftItem {
  name: string;
  speed: number;
}


function App() {
  const [generatedItems, setGeneratedItems] = useState<NftItem[]>([]);
  const [isLogoEnlarged, setIsLogoEnlarged] = useState(false);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [methods, setMethods] = useState<any>();
  const [isMutted, setIsMutted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  let myClick = 0.1;
  const additionnalClick = generatedItems.reduce((total, item) => total + item.speed, 0);
  let totalClick = myClick + additionnalClick;
  if (totalClick < 0.1) {
    totalClick = 0.1;
  }
  let mintPrice = 1;
  let mintMultiplier = generatedItems.length;
  let totalMintPrice = (mintPrice * ((105 * mintMultiplier) / 100));
  if (totalMintPrice < mintPrice) {
    totalMintPrice = mintPrice;
  }

  console.log("🚀 ~ file: App.tsx:36 ~ App ~ totalClick:", totalClick)
  const [multiplicateur, setMultiplicateur] = useState(totalClick);


  const generateRandomNumber = (): NftItem => {
    const randomNumber = Math.floor(Math.random() * 100); // Generate a random number between 0 and 99

    if (randomNumber < 1) {
      return AllNft[6]; // 1% chance of getting "Plongée"
    } else if (randomNumber < 5) {
      return AllNft[5]; // 4% chance of getting "Vol"
    } else if (randomNumber < 12) {
      return AllNft[3]; // 7% chance of getting "Cannetons"
    } else if (randomNumber < 23) {
      return AllNft[2]; // 11% chance of getting "Renard"
    } else if (randomNumber < 35) {
      return AllNft[1]; // 12% chance of getting "Mare"
    } else if (randomNumber < 50) {
      return AllNft[4]; // 15% chance of getting "Oeufs"
    } else {
      return AllNft[0]; // 50% chance of getting "Blé"
    }
  };

  const resetClickCount = () => {
    setClickCount(clickCount - totalMintPrice);
    const numberOfItemsToGenerate = 1; // You can change this number based on your requirement
    const newItems = Array.from({ length: numberOfItemsToGenerate }, () => generateRandomNumber());
    console.log(newItems);
    // Concatenate newly generated items with existing items and set the state
    setGeneratedItems(prevItems => [...prevItems, ...newItems]);
  };



  useEffect(() => {

    const checkMetamask = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAccountAddress(accounts[0]);
            setIsConnected(true);
            //console.log(accounts[0]);
            const web3 = await getWeb3();
            const account = await web3.eth.getAccounts();
            const instance = new web3.eth.Contract(CoinCoin.abi, "0xca29ea22a539872fA3cB9052aA8626858a66E303");
            //console.log(account);
            setAccount(account);
            setWeb3(web3);
            setContract(instance);
            setMethods(instance.methods);
            setUserAddress(
              account[0].slice(0, 6) + "..." + account[0].slice(38, 42)
            );
          }
        } catch (error) {
          setIsConnected(false);
        }
      } else {
        sethaveMetamask(false);
      }
    };

    checkMetamask();
  }, []);
  //console.log(contract, account, web3, userAddress);
  //mintCoinCoin(100);
  // console.log(methods.price().call());
  //getMintPrice();
  const connectWallet = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccountAddress(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      setIsConnected(false);
    }
  };

  let audio = new Audio(canardCoincoin);

  const toggleLogoSize = () => {
    setIsLogoEnlarged(true); // Activer l'agrandissement

    // Rétablir la taille du logo après quelques millisecondes (par exemple, 500 ms)
    setTimeout(() => {
      setIsLogoEnlarged(false);
    }, 500);

    // Jouer le fichier audio
    if (!isMutted) {
      audio.play();
    }
    setClickCount(clickCount + totalClick);
  };


  async function getBalance(id: number) {
    const result = await methods.balanceOf(account[0], id).call();
    console.log(account[0], id)
    console.log(`Balance of ${id}: ${result}`);
    return result;
  }

  async function getMintPrice() {
    const result = await methods.price().call();
    console.log(result);
  }

  async function mintCoinCoin(amount: number) {
    const result = await methods.mintCoinCoin(account[0], amount).send({ from: account[0] });
  }

  const backgroundStyle = {
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
  };

  const logoStyle = {
    width: isLogoEnlarged ? "177px" : "187px", // Largeur du logo agrandi ou non
    height: isLogoEnlarged ? "280px" : "290px", // Hauteur du logo agrandi ou non
    cursor: "pointer",
    transition: "all 0.2s", // Animation de transition pour un agrandissement instantané
  };

  return (
    <div style={backgroundStyle}>
      <header className="App-header">
        <img src={logo} style={logoStyle} alt="logo" onClick={toggleLogoSize} />

        <h1 className="text-3xl font-bold shadow-2xl absolute top-5 left-1/2 transform -translate-x-1/2">
          {" "}
          Click on Ducky !
        </h1>
        <div className="text-3xl font-bold shadow-2xl absolute left-1/2 top-16 transform -translate-x-1/2">
          Nombre de CoinCoin par clic : {Math.floor(totalClick * 10) / 10}
        </div>

        <button
          className="bg-white text-black text-sm py-1 px-2 rounded inline-block absolute bottom-4 left-4"
          onClick={() => setIsMutted((prevState) => !prevState)}
        >
          {isMutted ? "Unmute" : "Mute"}
        </button>
        {haveMetamask ? (
          isConnected ? (
            <div
              className="bg-white text-black text-sm py-2 px-4 rounded absolute top-0 right-0 m-4"
              onClick={connectWallet}
            >
              {userAddress}
            </div>
          ) : (
            <ButtonConnexion
              label="Connect Wallet"
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 m-4"
              onClick={connectWallet}
            />
          )
        ) : (
          <div
            className="bg-white text-black text-sm py-2 px-4 rounded absolute top-0 right-0 m-4"
            onClick={connectWallet}
          >
            MetaMask not detected.
          </div>
        )}
        <Inventory items={generatedItems} total={generatedItems.length + 1} />
        {isConnected ? (
          clickCount >= totalMintPrice ? (
            <button
              onClick={resetClickCount}
              type="button"
              className="text-black bg-orange-400 hover:bg-orange-500 font-bold rounded-lg text-lg px-12 py-2.5 text-center inline-flex items-center absolute m-4 mr-2 mb-2 bottom-16"
            >
              Mint - {totalMintPrice}
            </button>
          ) : (
            <button
              // onClick={console.log('Mint')}
              type="button"
              className="text-black bg-gray-400 font-bold rounded-lg text-lg px-12 py-2.5 text-center inline-flex items-center absolute m-4 mr-2 mb-2 bottom-16"
            >
              Mint - {totalMintPrice}
            </button>
          )
        ) : null}



        <p className="text-white absolute bottom-4 left-1/2 transform -translate-x-1/2">
          Click Count: {Math.floor(clickCount * 10) / 10}
        </p>
      </header>
    </div>
  );
}

export default App;
