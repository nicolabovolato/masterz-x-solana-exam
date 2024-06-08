import { config } from "../lib/utils.js";
import { createWallet } from "../lib/wallet.js";

console.log("Creating sender wallet...");
const sender = await createWallet(config.senderWalletFile);

console.log("Wallet Public Key:", sender.publicKey.toString());
//console.log("Wallet Private Key:", base58.encode(sender.secretKey));

console.log("Creating receiver wallet...");
const receiver = await createWallet(config.receiverWalletFile);

console.log("Wallet Public Key:", receiver.publicKey.toString());
//console.log("Wallet Private Key:", base58.encode(receiver.secretKey));
