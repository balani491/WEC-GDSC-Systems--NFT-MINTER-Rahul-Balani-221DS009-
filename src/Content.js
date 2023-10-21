import {useEffect, useState} from 'react';
import  { connectWallet, mintNFT,getCurrentWalletConnected } from './utils/Connect';
import { ethers } from 'ethers';

import './index.css'; 

//  require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);


const Content = (props) => {


  
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [url, setURL] = useState("");
const [walletAddress, setWallet] = useState("");
const [status, setStatus] = useState("");







function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0]);
        setStatus("👆🏽 Write a message in the text-field above.");
      } else {
        setWallet("");
        setStatus("🦊 Connect to Metamask using the top right button.");
      }
    });
  } else {
    setStatus(
      <p>
        {" "}
        🦊{" "}
        <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install Metamask, a virtual Ethereum wallet, in your
          browser.
        </a>
      </p>
    );
  }
}

const connectWalletPressed = async () => { //TODO: implement
    const walletResponse = await connectWallet();
  setStatus(walletResponse.status);
  setWallet(walletResponse.address);
};




const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description);
  setStatus(status);
};

// const connectWalletPressed = async () => {
//   const walletResponse = await connectWallet();
//   setStatus(walletResponse.status);
//   setWallet(walletResponse.address);
// };


    return ( 
        <div>
        <button onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}

        </button>
        <form>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={(e)=>{setName(e.target.value)}} /><br /><br />

          <label htmlFor="url">URL:</label>
          <input type="text" id="url" name="url" onChange={(e)=>{setURL(e.target.value)}}  /><br /><br />

          <label htmlFor="description">Description:</label><br />
          <textarea id="description" name="description" rows="4" cols="50" onChange={(e)=>{setDescription(e.target.value)}} ></textarea><br /><br />

          <button type="button" onClick={onMintPressed} >Mint</button>
        </form>
        <p id="status" style={{ color: "red" }}>
        {status}
      </p>
      </div>
     


     );
}
 
export default Content;