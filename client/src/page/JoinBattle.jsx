import React from "react";

import { PageHOC } from "../components";
import styles from "../styles";

const JoinBattle = () => {
  return (
    <>
      <h2 className={styles.joinHeadText}>Available Battles:</h2>

      <p className={styles.infoText} onClick={() => navigate("/create-battle")}>
        Or create a new battle
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already existing battles</>
);
