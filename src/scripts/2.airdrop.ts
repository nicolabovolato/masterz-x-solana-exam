import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

import { config } from "../lib/utils.js";
import { getWallet } from "../lib/wallet.js";

const SOL = 1;

const keypair = await getWallet(config.senderWalletFile);

const connection = new Connection(config.rpcUrl, "confirmed");

console.log(`Requesting ${SOL} SOL airdrop to ${keypair.publicKey}...`);

try {
  const airdropSignature = await connection.requestAirdrop(
    keypair.publicKey,
    SOL * LAMPORTS_PER_SOL
  );

  console.log("Airdrop confirmed");
  console.log(
    `https://explorer.solana.com/tx/${airdropSignature}?cluster=${config.cluster}`
  );
} catch (error) {
  console.error(error);
}
