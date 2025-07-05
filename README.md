# 🛡️ SygmaOne - Web3 Insurance Frontend

SygmaOne is a decentralized insurance UX built on top of Scaffold-ETH 2.0. This frontend allows users to:

- Submit on-chain protected transactions
- View and manage insurance claims
- Claim eligible refunds for failed protected transfers

## 📦 Tech Stack

- [Next.js App Router](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RainbowKit + wagmi](https://www.rainbowkit.com/)
- [Foundry](https://book.getfoundry.sh/) (via `packages/foundry`)
- Scaffold-ETH 2.0 boilerplate

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone git@github.com:YOUR_USERNAME/EthCannesFrontend.git
cd EthCannesFrontend/sygmaone
```

### 2. Install dependencies
```bash
yarn install
```

### 3. Run the local dev server
```bash
yarn dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 🧪 Test Data
To populate the app with sample transactions for demo:

Open the browser console and paste:
```js
localStorage.setItem("sygmaTxs", JSON.stringify([
  { id: "1", hash: "0xabc123...", amount: 8, status: "pending", from: "0xabc...", to: "0xdef...", asset: "ETH", provider: "Stargate", protected: true },
  { id: "2", hash: "0xdef456...", amount: 2, status: "claimable", from: "0xabc...", to: "0xdef...", asset: "ETH", provider: "1inch", protected: true },
  { id: "3", hash: "0xghi789...", amount: 5, status: "success", from: "0xabc...", to: "0xdef...", asset: "ETH", provider: "Uniswap", protected: false }
]))
```

Then refresh the page.

## 💻 Folder Structure

```
packages/
├── foundry/        # Smart contracts & deployments
├── nextjs/         # Frontend app (Next.js App Router)
│   ├── app/        # All routes (e.g., claims, success)
│   ├── components/ # Reusable UI components
│   ├── styles/     # Tailwind/global styles
```

## 🛠️ Dev Notes
- Claims are stored in `localStorage` under `sygmaTxs`
- A full refund is only issued minus the 0.01% insurance fee (if protected)
- The success screen calculates and shows the adjusted refund amount

## 🧰 Scripts
```bash
yarn dev           # Start frontend
corepack enable    # Enable Yarn 4 if needed
yarn chain         # Start local Anvil chain
```

## 📝 License
MIT

---

> Built at ETHGlobal Cannes 2025 🏖️

