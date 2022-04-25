import React, {useEffect, useRef, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./util/WavePortal.json"

export default function App() {
  /*
    * Just a state variable we use to store our user's public wallet.
    */
  const [currentAccount, setCurrentAccount] = useState("");
  const target = useRef();
  const [waveMessage, setWaveMessage] = useState("");
  const [allWaves, setAllWaves]=useState([]);
  const contractAddress = "0x196B4Dd97DC821f176a677b4C6D37838cb1E9FB6";

  const contractABI = abi.abi;

  const getAllWaves = async () => {
    try {
      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);


        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach(wave => {
          wavesCleaned.push({
            address : wave.waver,
            timestamp : new Date(wave.timestamp * 1000),
            message : wave.message
          });

        });

        setAllWaves(wavesCleaned);
      }
    } catch (error) {
      
    }
  }

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
        getAllWaves();

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

  const wave = async () => {
    try{
      const {ethereum } = window;
      if (ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
       
        let count = await wavePortalContract.getTotalWaves();
        
        console.log("Retrieved total wave count ... ", count.toNumber());

        const waveTxn = await wavePortalContract.wave(waveMessage, );
        console.log("mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();

        console.log("Retrieved total wave count ... ", count.toNumber());
        let waves = await getAllWaves();
        setAllWaves(waves);
      }else{
        console.log("Ethereum object doesn't exist!");
      }

    }catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
          👋 Hey there!
        </div>

        <div className="bio">
          I am Lisandro Connect your Ethereum wallet and wave at me!
        </div>

        <input 
        ref={target}
        type="text"
        name="messageBox"
        placeholder="Enter message here..." onChange={(e) => setWaveMessage(e.target.value)} />
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="waveButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}

        {allWaves.map((wave, index) => {
          return (
            <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
              <div>Address: {wave.address}</div>
              <div>Time: {wave.timestamp.toString()}</div>
              <div>Message: {wave.message}</div>
            </div>)
        })}
      </div>
    </div>
  );
}
