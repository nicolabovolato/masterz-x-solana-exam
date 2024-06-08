import { Connection } from "@solana/web3.js";

import { createMint } from "../lib/mint.js";
import { config } from "../lib/utils.js";
import { getWallet } from "../lib/wallet.js";

const keypair = await getWallet(config.senderWalletFile);
const connection = new Connection(config.rpcUrl, "confirmed");

console.log("Creating mint...");

const mint = await createMint(connection, keypair);

console.log("Mint Public Key:", mint.toBase58());
