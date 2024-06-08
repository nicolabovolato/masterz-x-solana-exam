import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

import { UNIT, getMint } from "../lib/mint.js";
import { config } from "../lib/utils.js";
import { getWallet } from "../lib/wallet.js";

const AMOUNT = 1;

const keypair = await getWallet(config.senderWalletFile);
const mint = await getMint();
const connection = new Connection(config.rpcUrl, "confirmed");

console.log("Retrieving ATA...");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  keypair,
  mint,
  keypair.publicKey
);

console.log("ATA Address:", tokenAccount.address.toBase58());

console.log("Minting...");
await mintTo(
  connection,
  keypair,
  mint,
  tokenAccount.address,
  keypair.publicKey,
  AMOUNT * UNIT
);

console.log("Minted", AMOUNT, "tokens to", tokenAccount.address.toBase58());
