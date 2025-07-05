// app/claims/verifying/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dialog } from "@headlessui/react";

// app/claims/verifying/page.tsx

export default function VerifyingPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    setTimeout(() => {
      const stored = localStorage.getItem("sygmaTxs");
      if (!stored) return;
      const txs = JSON.parse(stored);
      const updated = txs.map((tx: any) => (tx.id === id ? { ...tx, status: "success" } : tx));
      localStorage.setItem("sygmaTxs", JSON.stringify(updated));
      router.push("/claims/success?id=" + id);
    }, 3000);
  }, [id, router]);

  return (
    <Dialog open onClose={() => {}} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/30">
        <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
          <div className="animate-spin mb-4 h-8 w-8 border-4 border-pink-500 border-t-transparent rounded-full mx-auto" />
          <Dialog.Title className="text-lg font-semibold mb-2">Verifying claim...</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500">
            Please wait while your claim is being verified.
          </Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
