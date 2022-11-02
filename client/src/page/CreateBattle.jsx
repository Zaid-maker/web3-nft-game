import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";
import { PageHOC, CustomInput, CustomButton, GameLoad } from "../components";
import { useGlobalContext } from "../context";

const CreateBattle = () => {
  const { contract, gameData, battleName, setBattleName, setErrorMessage } =
    useGlobalContext();
  const [winBattle, setWinBattle] = useState();
  const navigate = useNavigate();

  /**
   * When the user clicks the button, the function checks if the battle name is empty. If it is, it
   * returns null. If it isn't, it calls the createBattle function in the contract. If the function is
   * successful, it sets the winBattle state to true. If it isn't, it sets the errorMessage state to
   * the error
   * @returns null
   */
  const handleClick = async () => {
    if (battleName === "" || battleName.trim() === "") return null;

    try {
      await contract.createBattle(battleName);

      setWinBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {winBattle && <GameLoad />}

      <div className="flex flex-col mb-5">
        <CustomInput
          label="Battle"
          placeHolder="Enter battle name"
          value={battleName}
        />

        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
        Or join already existing battles
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
