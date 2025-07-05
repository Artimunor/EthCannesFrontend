"use client";

import { useState } from "react";

export default function InsuranceBridgeCard() {
  const [insured, setInsured] = useState(true);

  const provider = "Uniswap";
  const networkFee = 0.000592;
  const insuranceFee = 0.000457;
  const total = networkFee + (insured ? insuranceFee : 0);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Transaction Summary</h2>

      <div className="space-y-2 text-sm text-gray-700">
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
          <span>{insured ? insuranceFee.toFixed(6) : "0.000000"} ETH</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t mt-2">
          <span>Total</span>
          <span>{total.toFixed(6)} ETH</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6">
        <label className="flex items-center gap-2 text-sm font-medium text-pink-600">
          <input type="checkbox" checked={insured} onChange={() => setInsured(!insured)} className="accent-pink-500" />
          Protect transaction (0.05%)
        </label>
      </div>

      <button className="mt-6 w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition">
        Bridge
      </button>
    </div>
  );
}
