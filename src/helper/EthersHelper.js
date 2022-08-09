import { ethers } from "ethers";
import erc20Abi from "../data/abis/erc20.json";

export const getBalance = (token, userAddress) => {
  // if (token && userAddress) {
  const contract = new ethers.Contract(
    token.address,
    erc20Abi,
    token.chain.provider
  );
  return contract.balanceOf(userAddress);
  // } else return false;
};
