"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ClaimSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [refundAmount, setRefundAmount] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;

    const stored = localStorage.getItem("sygmaTxs");
    if (!stored) return;

    try {
      const transactions = JSON.parse(stored);
      const tx = transactions.find((tx: any) => tx.id === id);
      if (tx && tx.amount) {
        // Subtract 0.01% protection fee if protection was on
        const refund = tx.protected ? tx.amount * (1 - 0.0001) : tx.amount;
        setRefundAmount(refund);
      }
    } catch (e) {
      console.error("Failed to parse sygmaTxs from localStorage:", e);
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-[url('/mountains.jpeg')] bg-cover bg-no-repeat bg-center flex items-center justify-center px-4">
      <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg text-center max-w-sm">
        <CheckCircleIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Claim Approved</h2>
        <p className="mb-6 text-sm text-gray-700">
          {refundAmount !== null
            ? `Your wallet has been refunded ${refundAmount.toFixed(4)} ETH.`
            : "Transaction not found. Please try again."}
        </p>
        <button className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800" onClick={() => router.push("/")}>
          Close
        </button>
      </div>
    </div>
  );
}
