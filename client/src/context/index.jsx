import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [battleGround, setBattleGround] = useState("bg-astral");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [step, setStep] = useState(1);
  const [gameData, setGameData] = useState({
    players: [],
    pendingBattles: [],
    activeBattle: null,
  });
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: "info",
    message: "",
  });
  const [battleName, setBattleName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateGameData, setUpdateGameData] = useState(0);

  const updateCurrentWalletAddress = async () => {
    const accounts = await window?.ethereum?.request({
      method: "eth_requestAccounts",
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateCurrentWalletAddress();

    window?.ethereum?.on("accountsChanged", updateCurrentWalletAddress);
  }, []);

  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = new newProvider.getSigner();

      setProvider(newProvider);
    };

    setSmartContractAndProvider();
  }, []);

  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
