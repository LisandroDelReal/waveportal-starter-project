import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';

export default function App() {
  /*
    * Just a state variable we use to store our user's public wallet.
    */
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {


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
  }

  /**
   * ConnectWallet method
   */
  const connectWallet = async () => {
    try{
      const { ethereum } = window;
      
      if(!ethereum){
        alert("Get Metamask");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    }catch (error) {
      console.log(error);
    }
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


        {/*
        * If there is no currentAccount render this button
        */}
        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </div>
  );
}
