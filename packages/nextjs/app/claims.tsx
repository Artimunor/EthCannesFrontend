// File: app/claims/page.tsx
"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

// File: app/claims/page.tsx

// File: app/claims/page.tsx

const mockTransactions = [
  { id: "0xabc123", status: "pending" },
  { id: "0xdef456", status: "claimable" },
  { id: "0xghi789", status: "claimable" },
  { id: "0x123456", status: "success" },
  { id: "0x654321", status: "success" },
];

export default function ClaimsPage() {
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClaim = (txId: string) => {
    setVerifyingId(txId);
    setTimeout(() => {
      setVerifyingId(null);
      setShowSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-10 max-w-2xl mx-auto text-gray-800">
      <h1 className="text-2xl font-semibold text-center mb-6">Insurance Claims</h1>

      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <h2 className="text-md font-bold mb-2">Recent Transactions</h2>
        {mockTransactions.map(tx => (
          <div key={tx.id} className="flex justify-between items-center border-b py-2">
            <span className="truncate w-2/3">{tx.id}</span>
            <span className="text-sm">
              {tx.status === "pending" && <span className="text-yellow-500">Pending</span>}
              {tx.status === "claimable" && (
                <button
                  onClick={() => handleClaim(tx.id)}
                  className="bg-black text-white px-3 py-1 text-xs rounded hover:bg-gray-800"
                >
                  Claim
                </button>
              )}
              {tx.status === "success" && <span className="text-green-600">Success</span>}
            </span>
          </div>
        ))}
      </div>

      {/* Modal: Verifying Claim */}
      <Dialog open={!!verifyingId} onClose={() => setVerifyingId(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded shadow-xl max-w-sm w-full text-center">
            <div className="animate-spin h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4" />
            <Dialog.Title className="text-lg font-medium">Verifying claim...</Dialog.Title>
            <p className="text-sm mt-2 text-gray-600">Please wait while your claim is being verified.</p>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal: Claim Approved */}
      <Dialog open={showSuccess} onClose={() => setShowSuccess(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center">
          <Dialog.Panel className="bg-white p-6 rounded shadow-xl max-w-sm w-full text-center">
            <CheckCircleIcon className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <Dialog.Title className="text-lg font-bold">Claim Approved</Dialog.Title>
            <p className="mt-2 text-sm text-gray-600">
              Your wallet has been refunded <span className="font-semibold">100.01 ETH</span>.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
