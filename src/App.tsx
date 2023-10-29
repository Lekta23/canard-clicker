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
  const contractAddress = "0xf84cc41be929306d509c6948D4828D11059B379d";
  const [generatedItems, setGeneratedItems] = useState<NftItem[]>([]);
  const [isLogoEnlarged, setIsLogoEnlarged] = useState(false);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();
  const [nfts, setNfts] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [methods, setMethods] = useState<any>();
  const [isMutted, setIsMutted] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [coinCoin, setCoinCoin] = useState<any>();
  const [totalMintPrice, setTotalMintPrice] = useState<any>();
  const [loading, setLoading] = useState(false);
  let myClick = 0.1;
  const additionnalClick = generatedItems.reduce((total, item) => total + item.speed, 0);
  let totalClick = myClick + additionnalClick;
  if (totalClick < 0.1) {
    totalClick = 0.1;
  }
  // let mintPrice = 1;
  // let mintMultiplier = generatedItems.length;
  // //let totalMintPrice = (mintPrice * ((105 * mintMultiplier) / 100));
  // if (totalMintPrice < mintPrice) {
  //   totalMintPrice = mintPrice;
  // }

  // console.log("🚀 ~ file: App.tsx:36 ~ App ~ totalClick:", totalClick)
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
            const instance = new web3.eth.Contract(CoinCoin.abi, contractAddress);
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
    if (methods !== undefined) {
      getAllNft();
      getCoinCoinBalance();
      getMintPrice();
    }
  }, []);
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
    const result = await methods.balanceOf(accountAddress, id).call();
    return result;
  }

  async function getAllNft() {
    setGeneratedItems([]);
    const result = {
      1: await getBalance(1),
      2: await getBalance(2),
      3: await getBalance(3),
      4: await getBalance(4),
      5: await getBalance(5),
      6: await getBalance(6),
      7: await getBalance(7),
    }
    for (let [key, value] of Object.entries(result)) {
      if (value > 0) {
        const newItems = Array.from({ length: parseInt(value) }, () => AllNft[parseInt(key) - 1]);
        setGeneratedItems(prevItems => [...prevItems, ...newItems]);
      }
    }
    // for (let i = 1; i < 8; i++) {
    //   setGeneratedItems(prevItems => [...prevItems, AllNft[i - 1]]);
    // }
    setNfts(result);
  }

  async function getCoinCoinBalance() {
    const result = await getBalance(8);
    console.log(result);
    setCoinCoin(result);
    return result;
  }

  function countNfts() {
    let result = 0
    for (let i = 1; i < 8; i++) {
      if (nfts[i] > 0) {
        result = result + parseInt(nfts[i]);
      }
    }
    return result;
  }

  async function getMintPrice() {
    const result = await methods.price(accountAddress).call();
    setTotalMintPrice(result);
    console.log(totalMintPrice);
    return result;
  }

  async function changeClickToCoinCoin() {
    const floor_click = Math.floor(clickCount);
    const resetClickTo = clickCount - floor_click;
    try {
      setLoading(true);
      await mintCoinCoin(floor_click).then(res => {
        console.log(res);
        setClickCount(resetClickTo);
        getCoinCoinBalance();
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function mintRandomBoost() {
    if (parseInt(coinCoin) >= totalMintPrice) {
      try {
        setLoading(true);
        await mintBoost().then(res => {
          console.log(res);
          getCoinCoinBalance();
          getMintPrice();
          getAllNft();
          setLoading(false);
        });
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  async function mintCoinCoin(amount: number) {
    const gasEstimate = await methods.mintCoinCoin(account[0], amount).estimateGas({ from: account[0] });
    let encodedABI = methods.mintCoinCoin(account[0], amount).encodeABI();
    const result = await methods.mintCoinCoin(account[0], amount).send({ from: account[0], to: contractAddress, gas: gasEstimate, data: encodedABI });
  }

  async function mintBoost() {
    const gasEstimate = await methods.mintBoost(account[0]).estimateGas({ from: account[0] });
    let encodedABI = methods.mintBoost(account[0]).encodeABI();
    const result = await methods.mintBoost(account[0]).send({ from: account[0], to: contractAddress, gas: gasEstimate, data: encodedABI });
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
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center" style={{ display: loading ? "" : "none" }}>
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
          <p className="w-1/2 text-center text-white">Transaction in progress, don't forget to accept on MetaMask</p>
        </div>
        <img src={logo} style={logoStyle} alt="logo" onClick={toggleLogoSize} />

        <h1 className="text-3xl font-bold shadow-2xl absolute top-5 left-1/2 transform -translate-x-1/2">
          {" "}
          Click on Ducky !
        </h1>
        <div className="text-3xl font-bold shadow-2xl absolute left-1/2 top-16 transform -translate-x-1/2">
          CoinCoin per clic : {Math.floor(totalClick * 10) / 10}
        </div>

        <button
          className="bg-white text-black text-sm py-1 px-2 rounded inline-block absolute bottom-4 left-4"
          onClick={() => setIsMutted((prevState) => !prevState)}
        >
          {isMutted ? "Unmute" : "Mute"}
        </button>
        {
          haveMetamask ? (
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
          )
        }
        <Inventory items={generatedItems} total={generatedItems.length + 1} />
        {
          isConnected ? (
            clickCount >= 50 ? (
              <button
                onClick={changeClickToCoinCoin}
                type="button"
                className="text-black bg-orange-400 hover:bg-orange-500 font-bold rounded-lg text-lg px-12 py-2.5 text-center inline-flex items-center absolute m-4 mr-2 mb-20 bottom-20"
              >
                Convert to CoinCoin - {Math.floor(clickCount)}
              </button>
            ) : (
              <button
                // onClick={console.log('Mint')}
                type="button"
                className="text-black bg-gray-400 font-bold rounded-lg text-lg px-12 py-2.5 text-center inline-flex items-center absolute m-4 mr-2 mb-20 bottom-20"
              >
                Convert to CoinCoin - 50
              </button>
            )
          ) : null
        }
        {
          isConnected ? (
            parseInt(coinCoin) >= totalMintPrice ? (
              <button
                onClick={mintRandomBoost}
                type="button"
                className="text-black bg-orange-400 hover:bg-orange-500 font-bold rounded-lg text-lg px-12 py-2.5  inline-flex  absolute m-4 mr-2 mb-2 bottom-20"
              >
                Mint - {parseInt(totalMintPrice)}
              </button>
            ) : (
              <button
                type="button"
                className="text-black bg-gray-400 font-bold rounded-lg text-lg px-12 py-2.5 text-center inline-flex items-center absolute m-4 mr-2 mb-2 bottom-20"
              >
                Mint - {parseInt(totalMintPrice)}
              </button>
            )
          ) : null
        }



        <p className="text-white absolute bottom-10 left-1/2 transform -translate-x-1/2">
          Click Count: {Math.floor(clickCount * 10) / 10}
        </p>
        <p className="text-white absolute bottom-1 left-1/2 transform -translate-x-1/2">
          CoinCoin Balance: {Math.floor(parseInt(coinCoin) * 10) / 10}
        </p>
      </header >
    </div >
  );
}

export default App;
