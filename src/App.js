import React, {useEffect} from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const checkIfWalletIsConnected = () => {
    /*
    * First make sure we have access to window.ethereum
    */

    const {ethereum} = window;

    if(!ethereum){
      console.log("Make sure you havemetamask!");
    }else{
      console.log("We have the ethereum object", ethereum);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  },[])
  
  const wave = () => {
    
  }
  
  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>

        <div className="bio">
        I am lisandro! Connect your Ethereum wallet and wave at me!
        </div>

        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}
