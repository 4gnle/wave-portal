import * as React from "react";
import { ethers } from "ethers";
import './App.css';
import abi from './utils/contractABI.json';

import Spinner from './UI/Spinner';
import Button from './UI/Button';
import Input from './UI/Input';

export default function App() {

  const [currentAccount, setCurrentAccount] = React.useState();
  const contractAddress = "0xFa51B4EaD694b6A3297C7e15252C4731E052a2F5";
  const contractABI = abi.abi;

  const checkWallet = () => {
    const {ethereum} = window;

    if(!ethereum) {
      console.log("You don't have a connected wallet")
      return
    } else {
      console.log("Wallet connected", ethereum)
    }

    ethereum.request({method: 'eth_accounts'})
      .then(accounts => {
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log('Found a proper account:', account);
          setCurrentAccount(account);
        } else {
          console.log('No proper account was found');
        }
    })
  }

  const connectWallet = () => {
    const {ethereum} = window;
    if (!ethereum) {
      alert('GET A WALLET!')
    }

    ethereum.request({method: 'eth_requestAccounts'})
      .then(accounts => {
        console.log('Connected', accounts[0]);
        setCurrentAccount(accounts[0])
      })
      .catch(err => console.log(err))
  }

  const [allWaves, setAllWaves] = React.useState([]);
  const [allHighfives, setAllhighfives] = React.useState([]);
  const [spinner, setSpinner] = React.useState(false);

  const [message, setMessage] = React.useState()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const greetingsContract = new ethers.Contract(contractAddress, contractABI, signer);

  const getWaves = async () => {
    let waves = await greetingsContract.getSentWAVES();

    let mappedWaves = [];

    waves.forEach(wave => {
      mappedWaves.push({
        address: wave.waver,
        message: wave.message,
        timestamp: new Date(wave.timestamp * 1000)
      })
    })

    setAllWaves(mappedWaves);
  }

  const getHighfives = async () => {

    let highfives = greetingsContract.getSentHIGHFIVES();

    let mappedHighfives = [];

    highfives.forEach(highfive => {
      mappedHighfives.push({
        address: highfive.highfiver,
        message: highfive.message,
        name: highfive.name,
        timestamp: new Date(highfive.timestamp * 1000)
      })
    })

    setAllhighfives(mappedHighfives);
  }

  const wave = async (e) => {
    e.preventDefault();
    let count = await greetingsContract.getTotalWaves();

    try {
      setSpinner(true);
      const waveTxn = await greetingsContract.wave(`${message}`);
      await waveTxn.wait();
      setSpinner(false);
      getWaves();
    } catch (err) {
      setSpinner(false);
      console.log(err);
    }

    count = await greetingsContract.getTotalWaves();
  }

  const onChange = (e) => {
    setMessage(e.target.value);
  }

   React.useEffect(() => {
    checkWallet();
    getWaves();
  }, []);

  return (
    <div className="mainContainer">

      {spinner && <Spinner/>}

      <div className="dataContainer">
        <div className="header">
        <span role="img" aria-label="wave emoji">👋</span> WHAT UP
        </div>

        <div className="bio">
        My name is Angel and I wave back at people. I also like high fives
        </div>
        <br/>
        <div className='buttonDiv'>

        <Input
          style={{marginBottom: '18px'}}
          onChange={e => onChange(e)}
          value={message}
          placeholder="Send a message">
        </Input>
        <br/>
        <Button
          onClick={e => wave(e)}
          className='waveButton'
          >
        Wave at Me</Button>
        </div>

        {currentAccount ? null : (
        <button className="waveButton" onClick={connectWallet}>
          Connect Wallet
        </button>)}

        <h1 style={{color: 'white', textAlign: 'center', margin: '10px'}}>List of Waves:</h1>

        {allWaves.reverse().map((wave) => {
          return (
          <div className="wave-board">
            <p>{wave.address}</p>
            <h1>Sent a wave</h1>
            <h2>{wave.message}</h2>
            <h3>{wave.timestamp.toLocaleString ()}</h3>
          </div>
        )})}

      </div>
    </div>
  );
}
