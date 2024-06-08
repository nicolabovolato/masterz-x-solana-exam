import path from "node:path";
import url from "node:url";

export const getDirname = () =>
  url.fileURLToPath(new URL(".", import.meta.url));

export const getCluster = (url: string) => {
  const clusterRegex = new RegExp(/api\.(\w+)\.solana\.com/);
  const match = url.match(clusterRegex);
  if (!match) {
    throw new Error(`Invalid RPC URL: ${url}`);
  }
  return match[1];
};

const rpcUrl = process.env.RPC_URL || "https://api.devnet.solana.com";
export const config = {
  rpcUrl: rpcUrl,
  cluster: getCluster(rpcUrl),
  senderWalletFile:
    process.env.SENDER_WALLET_FILE ||
    path.join(getDirname(), "../../tmp/senderWallet.json"),
  mintFile:
    process.env.MINT_FILE || path.join(getDirname(), "../../tmp/mint.json"),
  receiverWalletFile:
    process.env.RECEIVER_WALLET_FILE ||
    path.join(getDirname(), "../../tmp/receiverWallet.json"),
};
