import React from "react";
import { PageHOC } from "../components";

const CreateBattle = () => {
  return <div>CreateBattle</div>;
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
