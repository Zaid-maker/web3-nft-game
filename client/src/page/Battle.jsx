import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "../styles";
import { ActionButton, Alert, Card, GameInfo, PlayerInfo } from "../components";
import { useGlobalContext } from "../context";
import {
  attack,
  attackSound,
  defense,
  defenseSound,
  player01 as player01Icon,
  player02 as player02Icon,
} from "../assets";
import { playAudio } from "../utils/animation.js";

const Battle = () => {
  const {
    contract,
    gameData,
    battleGround,
    walletAddress,
    setErrorMessage,
    showAlert,
    setShowAlert,
    player1Ref,
    player2Ref,
  } = useGlobalContext();
  const [player2, setPlayer2] = useState({});
  const [player1, setPlayer1] = useState({});
  const { battleName } = useParams();
  const navigate = useNavigate();

  /* This is a useEffect hook that is checking if the gameData.activeBattle is true. If it is not true,
  it will navigate to the home page. */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!gameData?.activeBattle) navigate("/");
    }, [2000]);

    return () => clearTimeout(timer);
  }, []);

  const makeAMove = async (choice) => {
    playAudio(choice === 1 ? attackSound : defenseSound);

    try {
      await contract.attackOrDefendChoice(choice, battleName, {
        gasLimit: 200000,
      });

      setShowAlert({
        status: true,
        type: "info",
        message: `Initiating ${choice === 1 ? "attack" : "defense"}`,
      });
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <div
      className={`${styles.flexBetween} ${styles.gameContainer} ${battleGround}`}
    >
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}

      <PlayerInfo player={player2} playerIcon={player02Icon} mt />

      <div className={`${styles.flexCenter} flex-col my-10`}>
        <Card
          card={player2}
          title={player2?.playerName}
          cardRef={player2Ref}
          playerTwo
        />

        <div className="flex items-center flex-row">
          <ActionButton
            imgUrl={attack}
            handleClick={() => makeAMove(1)}
            restStyles="mr-2 hover:border-yellow-400"
          />

          <Card
            card={player1}
            title={player1?.playerName}
            cardRef={player1Ref}
            restStyles="mt-3"
          />

          <ActionButton
            imgUrl={defense}
            handleClick={() => makeAMove(2)}
            restStyles="ml-6 hover:border-red-600"
          />
        </div>
      </div>

      <PlayerInfo player={player1} playerIcon={player01Icon} />

      <GameInfo />
    </div>
  );
};

export default Battle;
