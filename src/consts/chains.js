// @ts-ignore
import { ethers } from "ethers";

export const CHAINS = {
  ARBITRUM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://arb1.arbitrum.io/rpc",
      {
        chainId: 42161,
        name: "Arbitrum One",
      }
    ),
  },
  AURORA: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://mainnet.aurora.dev/",
      {
        chainId: 1313161554,
        name: "Aurora",
      }
    ),
  },
  AVALANCHE: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ankr.com/avalanche",
      {
        chainId: 43114,
        name: "Avalanche",
      }
    ),
    logo: "https://snowtrace.io/images/svg/brands/mainbrand-1.svg?v=22.7.4.0",
  },
  BNB: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://bsc.mytokenpocket.vip",
      {
        chainId: 56,
        name: "BNB Chain",
      }
    ),
  },
  BITCI: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://bitci.bitcichain.com",
      {
        chainId: 1907,
        name: "BitciChain",
      }
    ),
  },
  BOBA: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://mainnet.boba.network",
      {
        chainId: 288,
        name: "Bobachain",
      }
    ),
  },
  CELO: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://forno.celo.org",
      {
        chainId: 42220,
        name: "Celo",
      }
    ),
  },
  CRONOS: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://evm.cronos.org",
      {
        chainId: 25,
        name: "Cronos",
      }
    ),
  },
  ETHEREUM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ankr.com/eth",
      {
        chainId: 1,
        name: "Ethereum",
      }
    ),
  },
  FANTOM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ftm.tools/",
      {
        chainId: 250,
        name: "Fantom",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/4001/small/Fantom.png?1558015016",
  },
  FUSE: {
    provider: new ethers.providers.JsonRpcBatchProvider("https://rpc.fuse.io", {
      chainId: 122,
      name: "Fuse",
    }),
  },
  FUSION: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://mainnet.anyswap.exchange",
      {
        chainId: 32659,
        name: "Fusion",
      }
    ),
  },
  HARMONY: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ankr.com/harmony",
      {
        chainId: 1666600000,
        name: "Harmony",
      }
    ),
  },
  HOO: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://http-mainnet.hoosmartchain.com",
      {
        chainId: 70,
        name: "Hoo",
      }
    ),
  },
  HUOBI: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://hecoapi.terminet.io/rpc",
      {
        chainId: 128,
        name: "Huobi",
      }
    ),
  },
  IOTEX: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ankr.com/iotex",
      {
        chainId: 4689,
        name: "Iotex",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/3334/small/iotex-logo.png?1547037941",
  },
  KARDIA: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.kardiachain.io/",
      {
        chainId: 0,
        name: "Kardia",
      }
    ),
  },
  KLAYTN: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://public-node-api.klaytnapi.com/v1/cypress",
      {
        chainId: 8217,
        name: "Klaytn",
      }
    ),
  },
  KUCOIN: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc-mainnet.kcc.network/",
      {
        chainId: 321,
        name: "Kucoin",
      }
    ),
  },
  METER: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.meter.io",
      {
        chainId: 82,
        name: "Meter",
      }
    ),
  },
  ANDROMEDA: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://andromeda.metis.io/?owner=1088",
      {
        chainId: 1088,
        name: "Andremeda",
      }
    ),
  },
  MOONRIVER: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://moonriver.public.blastapi.io",
      {
        chainId: 1285,
        name: "Moonriver",
      }
    ),
  },
  OKC: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://exchainrpc.okex.org",
      {
        chainId: 66,
        name: "OKC",
      }
    ),
  },
  OPTIMISM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://mainnet.optimism.io/",
      {
        chainId: 10,
        name: "Optimism",
      }
    ),
  },
  POLYGON: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://polygon-rpc.com",
      {
        chainId: 137,
        name: "Polygon",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912",
  },
  THETA: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://eth-rpc-api.thetatoken.org/rpc",
      {
        chainId: 361,
        name: "Theta",
      }
    ),
  },
  TOMOCHAIN: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.tomochain.com",
      {
        chainId: 88,
        name: "Tomochain",
      }
    ),
  },
  XDAI: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.gnosischain.com",
      {
        chainId: 100,
        name: "xDai",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/662/small/logo_square_simple_300px.png?1609402668",
  },
};
