import { Wallet } from "lucide-react";

export default function AdminBudgetPage() {
  return (
    <div>
      <h1 className="text-2xl font-light mb-1">Budget Tracker</h1>
      <p className="text-sm text-[#16241a]/50 mb-8">
        Revenue and manual expense tracking for the business.
      </p>

      <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-2xl p-10 text-center">
        <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center mx-auto mb-4">
          <Wallet size={20} className="text-[#6a9a72]" />
        </div>
        <p className="font-medium mb-1">Coming with the Payments phase</p>
        <p className="text-sm text-[#16241a]/50 max-w-sm mx-auto">
          The BudgetEntry schema already exists for manual income/expense
          lines — this view will populate once real Paystack payments are
          flowing in.
        </p>
      </div>
    </div>
  );
}
