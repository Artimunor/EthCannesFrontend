"use client";

import InsuranceBridgeCard from "@/components/InsuranceBridgeCard";

export default function Page() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat text-gray-900 font-sans"
      style={{ backgroundImage: "url('/mountains.jpeg')" }}
    >
      <div className="backdrop-blur-sm bg-white/80 min-h-screen flex flex-col items-center px-4 py-6">
        <header className="text-center">
          <div className="flex flex-col items-center">
            <img src="/logoblack.jpeg" alt="SygmaOne Logo" className="h-24 md:h-28 mb-1" />
            <p className="text-gray-800 text-lg font-medium mt-1">Parametric Web3 Insurance</p>
          </div>
        </header>

        <div className="w-full max-w-md mt-6">
          <section className="bg-gray-100 p-6 rounded-lg shadow">
            <InsuranceBridgeCard />
          </section>
        </div>
      </div>
    </div>
  );
}
