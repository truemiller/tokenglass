import { ethers } from "ethers";
import { ERC20ABI } from "../data/abis/erc20";
import { Token } from "../consts/tokens";

export const getBalance: (token: Token, userAddress: string) => any = (
  token: Token,
  userAddress: string
) => {
  if (
    ethers.utils.isAddress(token.address ?? "") &&
    ethers.utils.isAddress(userAddress)
  ) {
    const { balanceOf } = new ethers.Contract(
      ethers.utils.getAddress(token.address ?? ""),
      ERC20ABI,
      token.chain.provider
    );
    return balanceOf(ethers.utils.getAddress(userAddress));
  } else {
    return "0";
  }
};
