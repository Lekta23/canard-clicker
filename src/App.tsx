import logo from "./assets/Canard.png";
import wallpaper from "./assets/Background.png";
import "./App.css";
import ButtonConnexion from "./composents/button_connexion";
import canardCoincoin from "./assets/coincoin.mp3";

import { useState, useEffect } from "react";
import CoinCoin from "./artifacts/contracts/coincoinNTF.sol/coincoinNTF_tmp.json";
import getWeb3 from "./web3";

function App() {
  const [isLogoEnlarged, setIsLogoEnlarged] = useState(false);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [userAddress, setUserAddress] = useState<any>();
  const [contract, setContract] = useState<any>();
  const [web3, setWeb3] = useState<any>();
  const [account, setAccount] = useState<any>();
  const [isMutted, setIsMutted] = useState(false);

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
            console.log(accounts[0]);
            const web3 = await getWeb3();
            const account = await web3.eth.getAccounts();
            const instance = new web3.eth.Contract(CoinCoin.abi, "");
            console.log(account);
            setAccount(account);
            setWeb3(web3);
            setContract(instance);
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
  console.log(contract, account, web3, userAddress);

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

  };

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
        <h1 className="text-3xl font-bold shadow-2xl">
          Clique sur le canard !
        </h1>
        <button onClick={() => setIsMutted(prevState => !prevState)}>
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
      </header>
    </div>
  );
}

export default App;
