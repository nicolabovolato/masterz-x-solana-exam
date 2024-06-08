# MasterZ x Solana exam

## How to run

- `pnpm install` or `npm install`
- add environment variables or use [provided defaults](./src/lib/utils.ts):
  - RPC_URL: solana endpoint
  - SENDER_WALLET_FILE: sender wallet path
  - RECEIVER_WALLET_FILE: receiver wallet path
  - MINT_FILE: path to store mint address
- run each of these scripts in order:
    ```
    pnpm wallet:create
    pnpm wallet:airdrop
    pnpm mint:create
    pnpm mint:token
    pnpm transfer:token
    ```