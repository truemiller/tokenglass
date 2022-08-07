// @ts-ignore
import { ethers } from "ethers";

export const CHAINS = {
  AVALANCHE: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://api.avax.network/ext/bc/C/rpc",
      {
        chainId: 43114,
        name: "Avalanche",
      }
    ),
  },
};
