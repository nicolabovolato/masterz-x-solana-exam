import { Keypair } from "@solana/web3.js";
import fs from "node:fs/promises";

import path from "node:path";

export const createWallet = async (fileName: string) => {
  const keypair = Keypair.generate();

  const privateKeyArr = keypair.secretKey
    .toString()
    .split(",")
    .map((value) => Number(value));

  await fs.mkdir(path.dirname(fileName), { recursive: true });
  await fs.writeFile(fileName, JSON.stringify(privateKeyArr));

  return keypair;
};

export const getWallet = async (fileName: string) => {
  const { default: wallet } = await import(fileName);
  return Keypair.fromSecretKey(new Uint8Array(wallet));
};
