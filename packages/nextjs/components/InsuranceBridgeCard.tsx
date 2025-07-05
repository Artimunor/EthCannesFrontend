"use client";

import React, { useMemo, useState } from "react";

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

const InsuranceBridgeCard = () => {
  const [fromChain, setFromChain] = useState("Ethereum");
  const [toChain, setToChain] = useState("Arbitrum");
  const [provider, setProvider] = useState("Stargate");
  const [amount, setAmount] = useState<number>(0);
  const [protectTx, setProtectTx] = useState<boolean>(true);

  const networkFee = 0.000592;
  const insuranceFee = useMemo(() => (protectTx ? amount * 0.0001 : 0), [amount, protectTx]);
  const total = useMemo(() => amount + networkFee + insuranceFee, [amount, networkFee, insuranceFee]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <h2 className="text-lg font-semibold">Transaction Summary</h2>

      {/* Bridge Provider */}
      <div>
        <label className="text-sm font-medium block mb-1">Bridge Provider</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
          value={provider}
          onChange={e => setProvider(e.target.value)}
        >
          <option>Stargate</option>
          <option>1inch</option>
          <option>Uniswap</option>
        </select>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1">From</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={fromChain}
            onChange={e => setFromChain(e.target.value)}
          >
            {chains.map(chain => (
              <option key={chain}>{chain}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium block mb-1">To</label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            value={toChain}
            onChange={e => setToChain(e.target.value)}
          >
            {chains.map(chain => (
              <option key={chain}>{chain}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Send Amount */}
      <div>
        <label className="text-sm font-medium block mb-1 mt-2">Send Amount (ETH)</label>
        <input
          type="number"
          min="0"
          step="0.0001"
          placeholder="0.00"
          value={amount}
          onChange={e => setAmount(parseFloat(e.target.value) || 0)}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
        />
      </div>

      {/* Protection Toggle */}
      <div className="flex justify-between items-center mt-4">
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
          <span>{networkFee.toFixed(6)} ETH</span>
        </div>
        <div className="flex justify-between">
          <span>Insurance</span>
          <span>{insuranceFee.toFixed(6)} ETH</span>
        </div>
        <div className="flex justify-between font-semibold text-black mt-2">
          <span>Total</span>
          <span>{total.toFixed(6)} ETH</span>
        </div>
      </div>

      {/* Send Button */}
      <button className="w-full bg-black text-white py-2 rounded font-medium hover:bg-gray-800 transition">Send</button>
    </div>
  );
};

export default InsuranceBridgeCard;
