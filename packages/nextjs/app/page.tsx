"use client";

import { DepositModule } from "@/components/DepositModule";
import InsuranceBridgeCard from "@/components/InsuranceBridgeCard";
import { RewardsModule } from "@/components/RewardsModule";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold">SygmaOne Insurance</h1>
          <p className="text-gray-500 mt-2">Parametric Web3 Insurance</p>
        </header>

        <div className="space-y-8">
          {/* <section className="bg-gray-100 p-6 rounded-lg shadow">
            <RewardsModule debtAmount={"100.00"} />
          </section>

          <section className="bg-gray-100 p-6 rounded-lg shadow">
            <DepositModule />
          </section> */}

          <section className="bg-gray-100 p-6 rounded-lg shadow">
            <InsuranceBridgeCard />
          </section>
        </div>
      </div>
    </div>
  );
}
