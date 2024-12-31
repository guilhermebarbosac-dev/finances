import React from "react";
import IncomeChart from "./charts/IncomeChart";
import ExpenseChart from "./charts/ExpenseChart";
import SavingsChart from "./charts/SavingsChart";

interface FinancialOverviewProps {
  incomeData?: {
    month: string;
    partner1: number;
    partner2: number;
  }[];
  expenseData?: {
    personalExpenses: number;
    jointExpenses: number;
    categories: Array<{
      name: string;
      amount: number;
      type: "personal" | "joint";
    }>;
  };
  savingsData?: {
    totalSavings: number;
    partnerASavings: number;
    partnerBSavings: number;
    goal: number;
  };
}

const defaultIncomeData = [
  { month: "Jan", partner1: 4000, partner2: 3500 },
  { month: "Feb", partner1: 4200, partner2: 3700 },
  { month: "Mar", partner1: 3800, partner2: 3600 },
  { month: "Apr", partner1: 4100, partner2: 3800 },
  { month: "May", partner1: 4300, partner2: 3900 },
  { month: "Jun", partner1: 4500, partner2: 4000 },
];

const defaultExpenseData = {
  personalExpenses: 2500,
  jointExpenses: 3500,
  categories: [
    { name: "Rent", amount: 2000, type: "joint" },
    { name: "Utilities", amount: 500, type: "joint" },
    { name: "Groceries", amount: 1000, type: "joint" },
    { name: "Shopping", amount: 1500, type: "personal" },
    { name: "Entertainment", amount: 1000, type: "personal" },
  ],
};

const defaultSavingsData = {
  totalSavings: 15000,
  partnerASavings: 8000,
  partnerBSavings: 7000,
  goal: 20000,
};

const FinancialOverview = ({
  incomeData = defaultIncomeData,
  expenseData = defaultExpenseData,
  savingsData = defaultSavingsData,
}: FinancialOverviewProps) => {
  return (
    <div className="w-full h-[400px] bg-gray-50 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        <IncomeChart
          data={incomeData}
          partner1Name="Partner A"
          partner2Name="Partner B"
        />
        <ExpenseChart
          personalExpenses={expenseData.personalExpenses}
          jointExpenses={expenseData.jointExpenses}
          categories={expenseData.categories}
        />
        <SavingsChart
          totalSavings={savingsData.totalSavings}
          partnerASavings={savingsData.partnerASavings}
          partnerBSavings={savingsData.partnerBSavings}
          goal={savingsData.goal}
        />
      </div>
    </div>
  );
};

export default FinancialOverview;
