import React, { useEffect } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {

  const checkIfWalletIsConnected = () => {
    /*
    * First make sure we have access to window.ethereum
    */
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you havemetamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
        Check if we're authorized to access the user's wallet
      */

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized accountt ", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
    useEffect(() => {
      checkIfWalletIsConnected();
    }, [])

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
