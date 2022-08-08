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
    logo: "https://snowtrace.io/images/svg/brands/mainbrand-1.svg?v=22.7.4.0",
  },
};
