import { ethers } from "ethers";

import { ABI } from "../contract";
import { playAudio, sparcle } from "../utils/animation.js";
import { defenseSound } from "../assets";

/**
 * It takes an event filter, a provider, and a callback function. It removes any existing listeners for
 * the event filter, and then adds a new listener for the event filter. When the event is triggered,
 * the callback function is called with the parsed log as an argument
 * @param eventFilter - This is the event name that you want to listen to.
 * @param provider - The provider object that you created in the previous step.
 * @param cb - callback function
 */
const AddNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parsedLog);
  });
};

/**
 * It takes a reference to a card and returns an object with the x and y coordinates of the center of
 * the card
 * @param cardRef - This is the ref of the card that we want to get the coordinates of.
 * @returns An object with two properties, pageX and pageY.
 */
const getCoords = (cardRef) => {
  const { left, top, width, height } = cardRef.current.getBoundingClientRect();

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

const emptyAccount = "0x0000000000000000000000000000000000000000";

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  player1Ref,
  player2Ref,
  setUpdateGameData,
}) => {
  const NewPlayerEventFilter = contract.filters.NewPlayer();
  AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
    console.log("New Player has been created", args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: "success",
        message: "Player has been successfully registered.",
      });
    }
  });

  const NewBattleEventFilter = contract.filters.NewBattle();
  AddNewEvent(NewBattleEventFilter, provider, ({ args }) => {
    console.log("New battle started!", args, walletAddress);
  });
};
