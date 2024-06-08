import { createMint as _createMint } from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import fs from "node:fs/promises";

import { config } from "./utils.js";

const DECIMALS = 6;
export const UNIT = 10 ** DECIMALS;

export const createMint = async (
  connection: Connection,
  keypair: Keypair,
  fileName = config.mintFile
) => {
  const mint = await _createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    DECIMALS
  );

  await fs.writeFile(config.mintFile, JSON.stringify(mint.toBase58()));

  return mint;
};

export const getMint = async (fileName = config.mintFile) => {
  const { default: pubKey } = await import(config.mintFile);
  return new PublicKey(pubKey);
};
