import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate()

  /**
   * When the user clicks the button, we check if the player exists in the contract. If the player
   * doesn't exist, we register the player
   */
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress)

      setShowAlert({
        status: true,
        type: 'info',
        message: `${playerName} is being summoned!`,
      });

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, { gasLimit: 500000 })
        setTimeout(() => navigate('/create-battle'), 8000)
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const createPlayerToken = async () => {}

    if (contract) createPlayerToken()
  }, [gameData])

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
        />

        <CustomButton
          title="Register"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>  
    )
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start playing <br /> the ultimate Web3 Battle Card
    Game
  </>
);
