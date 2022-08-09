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
  CRONOS: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://evm.cronos.org",
      {
        chainId: 25,
        name: "Cronos",
      }
    ),
  },  
  ETHEREUM: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.ankr.com/eth",
      {
        chainId: 1,
        name: "Ethereum",
      }
    ),
  },  
  FANTOM: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.ftm.tools/",
      {
        chainId: 250,
        name: "Fantom",
      }
    ),
  },  
  FUSE: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.fuse.io",
      {
        chainId: 122,
        name: "Fuse",
      }
    ),
  },  
  FUSION: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://mainnet.anyswap.exchange",
      {
        chainId: 32659,
        name: "Fusion",
      }
    ),
  },  
  HARMONY: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.ankr.com/harmony",
      {
        chainId: 1666600000,
        name: "Harmony",
      }
    ),
  },  
  HOO: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://http-mainnet.hoosmartchain.com",
      {
        chainId: 70,
        name: "Hoo",
      }
    ),
  },  
  HUOBI: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://pub001.hg.network/rpc",
      {
        chainId: 128,
        name: "Huobi",
      }
    ),
  },  
  IOTEX: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.ankr.com/iotex",
      {
        chainId: 4689,
        name: "Iotex",
      }
    ),
  },  
  KARDIA: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.kardiachain.io/",
      {
        chainId: 0,
        name: "Kardia",
      }
    ),
  },  
  KLAYTN: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://public-node-api.klaytnapi.com/v1/cypress",
      {
        chainId: 8217,
        name: "Klaytn",
      }
    ),
  },  
  KUCOIN: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc-mainnet.kcc.network/",
      {
        chainId: 321,
        name: "Kucoin",
      }
    ),
  },  
  METER: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.meter.io",
      {
        chainId: 82,
        name: "Meter",
      }
    ),
  },  
  ANDROMEDA: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://andromeda.metis.io/?owner=1088",
      {
        chainId: 1088,
        name: "Andremeda",
      }
    ),
  },  
  MOONRIVER: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://moonriver.public.blastapi.io",
      {
        chainId: 1285,
        name: "Moonriver",
      }
    ),
  },  
  OKC: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://exchainrpc.okex.org",
      {
        chainId: 66,
        name: "OKC",
      }
    ),
  },  
  OPTIMISM: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://mainnet.optimism.io/",
      {
        chainId: 10,
        name: "Optimism",
      }
    ),
  },  
  POLYGON: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.ankr.com/polygon",
      {
        chainId: 137,
        name: "Polygon",
      }
    ),
  },  
  THETA: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://eth-rpc-api.thetatoken.org/rpc",
      {
        chainId: 361,
        name: "Theta",
      }
    ),
  },  
  TOMOCHAIN: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.tomochain.com",
      {
        chainId: 88,
        name: "Tomochain",
      }
    ),
  },   
  XDAI: {
    provider: new ethers.providers.StaticJsonRpcProvider(
      "https://rpc.ankr.com/gnosis",
      {
        chainId: 100,
        name: "xDai",
      }
    ),
  },
};
