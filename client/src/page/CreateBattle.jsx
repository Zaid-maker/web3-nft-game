import React from "react";
import { PageHOC, CustomInput, CustomButton } from "../components";

const CreateBattle = () => {
  return (
    <>
      <div className="flex flex-col mb-5">
        <CustomInput label="Battle" placeHolder="Enter battle name" />

        <CustomButton
          title="Create Battle"
          //handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
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
