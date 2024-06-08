import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import { Connection } from "@solana/web3.js";

import { UNIT, getMint } from "../lib/mint.js";
import { config } from "../lib/utils.js";
import { getWallet } from "../lib/wallet.js";

const AMOUNT = 0.5;

const sender = await getWallet(config.senderWalletFile);
const receiver = await getWallet(config.receiverWalletFile);
const mint = await getMint();
const connection = new Connection(config.rpcUrl, "confirmed");

console.log("Retrieving Sender ATA...");
const senderTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  mint,
  sender.publicKey
);

console.log("Retrieving Receiver ATA...");
const receiverTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  sender,
  mint,
  receiver.publicKey
);

console.log(
  "Sender holds",
  (senderTokenAccount.amount / BigInt(UNIT)).toString(),
  "tokens"
);
console.log(
  "Receiver holds",
  (receiverTokenAccount.amount / BigInt(UNIT)).toString(),
  "tokens"
);

console.log("Transfering tokens...");
await transfer(
  connection,
  sender,
  senderTokenAccount.address,
  receiverTokenAccount.address,
  sender,
  AMOUNT * UNIT
);

console.log(
  "Transferred",
  AMOUNT,
  "tokens from",
  senderTokenAccount.address.toBase58(),
  "to",
  receiverTokenAccount.address.toBase58()
);

console.log(
  "Sender holds",
  (senderTokenAccount.amount / BigInt(UNIT)).toString(),
  "tokens"
);
console.log(
  "Receiver holds",
  (receiverTokenAccount.amount / BigInt(UNIT)).toString(),
  "tokens"
);
