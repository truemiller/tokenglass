import { CHAINS } from "./chains";
import { Contract, ethers } from "ethers";
import LPABI from "../data/abis/lpabi.json";
import { AVALANCHE_TOKENS, Token, TOKENS } from "./tokens";

type LP = {
  name: string;
  address: string;
  token_1: Token | any;
  token_2: Token | any;
};

const LPS: LP[] = [
  {
    name: "WAVAX/ELK",
    address: "0x6a0c03c0b933875daf767bb90584ba696b713243",
    token_1: AVALANCHE_TOKENS.find((token) => token.symbol === "wavax"),
    token_2: AVALANCHE_TOKENS.find((token) => token.symbol === "elk"),
  },
];
