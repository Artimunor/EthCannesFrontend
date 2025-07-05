// File: components/InsuranceBridgeCard.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

// File: components/InsuranceBridgeCard.tsx

const chains = [
  "Ethereum",
  "Arbitrum",
  "Optimism",
  "Polygon",
  "Base",
  "BNB Chain",
  "Avalanche",
  "Fantom",
  "zkSync",
  "Linea",
  "Scroll",
  "Celo",
];

const tokens = ["ETH", "USDC", "USDT", "DAI"];

const InsuranceBridgeCard = () => {
  const router = useRouter();

  const [fromChain, setFromChain] = useState("Ethereum");
  const [toChain, setToChain] = useState("Arbitrum");
  const [provider, setProvider] = useState("Stargate");
  const [token, setToken] = useState("ETH");
  const [amount, setAmount] = useState<number>(0);
  const [inputValue, setInputValue] = useState("");
  const [protectTx, setProtectTx] = useState(false);

  const networkFee = 0.000592;
  const insuranceFee = protectTx ? amount * 0.0001 : 0;
  const total = amount + networkFee + insuranceFee;

  const handleAmountChange = (val: string) => {
    setInputValue(val);
    setAmount(val === "" ? 0 : parseFloat(val));
  };

  const handleSend = () => {
    const tx = {
      id: uuidv4(),
      status: "claimable",
    };

    const prev = typeof window !== "undefined" && localStorage.getItem("sygmaTxs");
    const parsed = prev ? JSON.parse(prev) : [];

    const updated = [...parsed, tx];
    localStorage.setItem("sygmaTxs", JSON.stringify(updated));

    router.push("/claims");
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md w-full mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-center">Transaction Summary</h2>

      {/* Bridge Provider */}
      <div>
        <label className="text-sm font-medium block mb-1">Bridge Provider</label>
        <select
          value={provider}
          onChange={e => setProvider(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        >
          <option>Stargate</option>
          <option>1inch</option>
          <option>Uniswap</option>
        </select>
      </div>

      {/* From / To Chains */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">From</label>
          <select
            value={fromChain}
            onChange={e => setFromChain(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {chains.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">To</label>
          <select
            value={toChain}
            onChange={e => setToChain(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {chains.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Token + Amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">Asset</label>
          <select
            value={token}
            onChange={e => setToken(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          >
            {tokens.map(t => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">Send Amount</label>
          <input
            type="number"
            value={inputValue}
            onChange={e => handleAmountChange(e.target.value)}
            placeholder="0.00"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            min={0}
            step="0.0001"
          />
        </div>
      </div>

      {/* Protection Toggle */}
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm font-medium text-pink-600">Protect transaction (0.01%)</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={protectTx}
            onChange={() => setProtectTx(!protectTx)}
          />
          <div className="w-11 h-6 bg-gray-300 peer-checked:bg-pink-600 rounded-full transition-colors duration-300 relative" />
          <span
            className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
              protectTx ? "translate-x-5" : ""
            }`}
          />
        </label>
      </div>

      {/* Fee Summary */}
      <div className="text-sm text-gray-700 space-y-1 pt-2">
        <div className="flex justify-between">
          <span>Provider</span>
          <span>{provider}</span>
        </div>
        <div className="flex justify-between">
          <span>Network fee</span>
          <span>
            {networkFee.toFixed(6)} {token}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Insurance</span>
          <span>
            {insuranceFee.toFixed(6)} {token}
          </span>
        </div>
        <div className="flex justify-between font-semibold text-black mt-2">
          <span>Total</span>
          <span>
            {total.toFixed(6)} {token}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSend}
        className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition"
      >
        Send
      </button>
    </div>
  );
};

export default InsuranceBridgeCard;
