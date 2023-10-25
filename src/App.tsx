import logo from "./assets/Canard.png";
import wallpaper from "./assets/Background.png";
import "./App.css";
import ButtonConnexion from "./composents/button_connexion";
import canardCoincoin from "./assets/coincoin.mp3";

import { useState, useEffect } from "react";

function App() {
  const [isLogoEnlarged, setIsLogoEnlarged] = useState(false);
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [accountAddress, setAccountAddress] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const { ethereum } = window;

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        sethaveMetamask(false);
      }
      const accounts = await ethereum.request({
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
    audio.play();
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
        <ButtonConnexion
          onClick={connectWallet}
          label="Connexion test"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 m-4"
        />
      </header>
    </div>
  );
}

export default App;
