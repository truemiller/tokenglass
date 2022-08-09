// @ts-ignore
import { ethers } from "ethers";

export const CHAINS = {
  ARBITRUM: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://arb1.arbitrum.io/rpc",
      {
        chainId: 42161,
        name: "Arbitrum One",
      }
    ),
  },
  AURORA: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://mainnet.aurora.dev/",
      {
        chainId: 1313161554,
        name: "Aurora",
      }
    ),
  },
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
  BNB: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://data-seed-prebsc-1-s1.binance.org:8545/",
      {
        chainId: 97,
        name: "BNB Chain",
      }
    ),
  },
  BITCI: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://bitci.bitcichain.com",
      {
        chainId: 1907,
        name: "BitciChain",
      }
    ),
  },
  BOBA: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://mainnet.boba.network",
      {
        chainId: 288,
        name: "Bobachain",
      }
    ),
  },
  CELO: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://forno.celo.org",
      {
        chainId: 42220,
        name: "Celo",
      }
    ),
  },
};
