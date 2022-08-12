// @ts-ignore
import { ethers } from "ethers";

export type Chain = {
  provider: ethers.providers.JsonRpcBatchProvider;
  logo: string;
};
export const CHAINS = {
  ARBITRUM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://arb1.arbitrum.io/rpc",
      {
        chainId: 42161,
        name: "Arbitrum One",
      }
    ),
    logo: "https://s3.us-east-2.amazonaws.com/nomics-api/static/images/currencies/ARBETH.svg",
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
      "https://rpc.ankr.com/bsc",
      {
        chainId: 56,
        name: "BNB Chain",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png?1644979850",
  },
  ETHEREUM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ankr.com/eth",
      {
        chainId: 1,
        name: "Ethereum",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880",
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
    logo: "https://s2.coinmarketcap.com/static/img/coins/200x200/5634.png",
  },
  HARMONY: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.ankr.com/harmony",
      {
        chainId: 1666600000,
        name: "Harmony",
      }
    ),
    logo: "https://cryptologos.cc/logos/harmony-one-logo.png",
  },
  HOO: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://http-mainnet.hoosmartchain.com",
      {
        chainId: 70,
        name: "Hoo",
      }
    ),
    logo: "",
  },
  HUOBI: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://hecoapi.terminet.io/rpc",
      {
        chainId: 128,
        name: "Huobi",
      }
    ),
    logo: "",
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
  KUCOIN: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc-mainnet.kcc.network/",
      {
        chainId: 321,
        name: "Kucoin",
      }
    ),
    logo: "",
  },
  METER: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.meter.io",
      {
        chainId: 82,
        name: "Meter",
      }
    ),
    logo: "",
  },
  ANDROMEDA: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://andromeda.metis.io/?owner=1088",
      {
        chainId: 1088,
        name: "Andremeda",
      }
    ),
    logo: "",
  },
  MOONRIVER: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://rpc.api.moonriver.moonbeam.network",
      {
        chainId: 1285,
        name: "Moonriver",
      }
    ),
    logo: "https://assets.coingecko.com/coins/images/17984/small/9285.png?1630028620",
  },
  OKC: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://exchainrpc.okex.org",
      {
        chainId: 66,
        name: "OKC",
      }
    ),
    logo: "",
  },
  OPTIMISM: {
    provider: new ethers.providers.JsonRpcBatchProvider(
      "https://mainnet.optimism.io/",
      {
        chainId: 10,
        name: "Optimism",
      }
    ),
    logo: "",
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
    logo: "",
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
