import { CHAINS } from "./chains";
import { ethers } from "ethers";
import LPABI from "../data/abis/lpabi.json";

const LPS = [
  {
    name: "WAVAX/ELK",
    contract: new ethers.Contract(
      "0x6a0c03c0b933875daf767bb90584ba696b713243",
      LPABI,
      CHAINS.AVALANCHE.provider
    ),
  },
];
