import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, gameData, setShowAlert, setErrorMessage } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  /**
   * When the user clicks the button, we check if the player exists in the contract. If the player
   * doesn't exist, we register the player
   */
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate("/create-battle"), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  /* Checking if the player exists and if the player token exists. If both exist, it navigates to the
  create battle page. */
  useEffect(() => {
    const createPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate("/create-battle");
    };

    if (contract) createPlayerToken();
  }, [contract]);

  /* This is checking if the player has an active battle. If the player has an active battle, it
  navigates to the battle page. */
  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="Name"
          placeHolder="Enter your player name"
          value={playerName}
          handleValueChange={setPlayerName}
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
