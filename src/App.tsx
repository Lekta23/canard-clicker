import React from "react";
import logo from "./assets/Canard.png";
import wallpaper from "./assets/Background.png";
import "./App.css";
import ButtonConnexion from "./composents/button_connexion";

import { useState, useEffect } from "react";
function App() {
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

  const backgroundStyle = {
    backgroundImage: `url(${wallpaper})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Set height to cover the entire viewport
  };

  return (
    <div style={backgroundStyle}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="text-3xl font-bold shadow-2xl">
          Clique sur le canard !
        </h1>
        <ButtonConnexion
          label="Connexion test"
          className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded absolute top-0 right-0 m-4"
          onClick={connectWallet}
        />
      </header>
    </div>
  );
}

export default App;
