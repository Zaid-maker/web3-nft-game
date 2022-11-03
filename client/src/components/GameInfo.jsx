import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";
import { useGlobalContext } from "../context";
import { alertIcon, gameRules } from "../assets";
import styles from "../styles";

const GameInfo = () => {
  const { contract, gameData, setErrorMessage, setShowAlert } =
    useGlobalContext();
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.gameInfoIconBox}>
        <div
          className={`${styles.gameInfoIcon} ${styles.flexCenter}`}
          onClick={() => setToggleSidebar(true)}
        >
          <img
            src={alertIcon}
            alt="alert icon"
            className={styles.gameInfoIconImg}
          />
        </div>
      </div>
    </>
  );
};

export default GameInfo;
