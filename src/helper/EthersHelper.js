import { ethers } from "ethers";
import erc20Abi from "../data/abis/erc20.json";

export const getBalance = (token, userAddress) => {
  if (
    ethers.utils.isAddress(token.address) &&
    ethers.utils.isAddress(userAddress)
  ) {
    const { balanceOf } = new ethers.Contract(
      ethers.utils.getAddress(token.address),
      erc20Abi,
      token.chain.provider
    );
    return balanceOf(ethers.utils.getAddress(userAddress));
  } else {
    return "0";
  }
};
