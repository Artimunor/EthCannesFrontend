"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Transaction {
  id: string;
  hash: string;
  status: "pending" | "claimable" | "success";
  amount: number;
  from: string;
  to: string;
  asset: string;
  provider: string;
  protected: boolean;
  timestamp: number;
}

const dummyTxs: Transaction[] = [
  {
    id: "1",
    hash: "0x2a1349a954098a8d4d1ab5db34efc35c66b1eaf0",
    status: "pending",
    amount: 0.08266,
    from: "0x4838B106...B0BAD5F97",
    to: "0x5995510b...6519c43F",
    asset: "ETH",
    provider: "1inch",
    protected: true,
    timestamp: Date.now(),
  },
  {
    id: "2",
    hash: "0xbca085d95a117a92f3b83407b25957b505a37a2f",
    status: "claimable",
    amount: 8,
    from: "0xC506a637...e324dDFB1",
    to: "0xFa1E186...226590b98",
    asset: "ETH",
    provider: "Stargate",
    protected: true,
    timestamp: Date.now(),
  },
  {
    id: "3",
    hash: "0x11c7bdb9f32b3902c2459b0d0c15d5b2e774a18f",
    status: "claimable",
    amount: 0.01,
    from: "0x24446f7...0DFbFA301B",
    to: "0xB0999731...0077b7397",
    asset: "ETH",
    provider: "Uniswap",
    protected: true,
    timestamp: Date.now(),
  },
  {
    id: "4",
    hash: "0x71888075964eb0e06cf6faef89727ff9e3bc5c93",
    status: "success",
    amount: 0,
    from: "0xF405513e...b1527AC85",
    to: "0x692A2528...ffEaFb3cD",
    asset: "ETH",
    provider: "Uniswap",
    protected: false,
    timestamp: Date.now(),
  },
];

export default function ClaimsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    setTransactions(dummyTxs);
  }, []);

  const pending = transactions.filter(tx => tx.status === "pending");
  const claimable = transactions.filter(tx => tx.status === "claimable");
  const successful = transactions.filter(tx => tx.status === "success");

  const renderTx = (tx: Transaction) => (
    <li
      key={tx.id}
      className="bg-white bg-opacity-90 backdrop-blur p-3 rounded-md shadow flex justify-between items-center text-sm"
    >
      <div className="space-y-0.5">
        <p className="text-gray-800">
          {tx.asset} <span className="font-semibold">{tx.amount}</span>
        </p>
        <p className="text-gray-500">
          From <span className="font-mono">{tx.from}</span>
        </p>
        <p className="text-gray-500">
          To <span className="font-mono">{tx.to}</span>
        </p>
        <p className="text-gray-500">
          Tx:{" "}
          <span className="font-mono">
            {tx.hash.slice(0, 8)}...{tx.hash.slice(-6)}
          </span>
        </p>
      </div>
      <div>
        {tx.status === "claimable" && (
          <Link
            href={`/claims/verifying?id=${tx.id}`}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            Claim
          </Link>
        )}
        {tx.status === "success" && <span className="text-green-600 font-semibold">Success</span>}
        {tx.status === "pending" && <span className="text-yellow-500 font-semibold">Pending</span>}
      </div>
    </li>
  );

  return (
    <div className="min-h-screen bg-[url('/mountains.jpeg')] bg-cover bg-no-repeat bg-center py-10 px-4 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white bg-opacity-80 rounded-xl p-6 shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Insurance Claims</h1>

        {pending.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">⏳ Pending</h2>
            <ul className="space-y-2">{pending.map(renderTx)}</ul>
          </div>
        )}

        {claimable.length > 0 && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">🟢 Claims</h2>
            <ul className="space-y-2">{claimable.map(renderTx)}</ul>
          </div>
        )}

        {successful.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">✅ Successful</h2>
            <ul className="space-y-2">{successful.map(renderTx)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
