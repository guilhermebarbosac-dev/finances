import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import FinancialOverview from "./dashboard/FinancialOverview";
import QuickAddTransaction from "./dashboard/QuickAddTransaction";
import SavingsGoalTracker from "./dashboard/SavingsGoalTracker";
import TransactionList from "./dashboard/TransactionList";

interface HomeProps {
  userData?: {
    user1: {
      name: string;
      avatar: string;
    };
    user2: {
      name: string;
      avatar: string;
    };
  };
  financialData?: {
    incomeData: {
      month: string;
      partner1: number;
      partner2: number;
    }[];
    expenseData: {
      personalExpenses: number;
      jointExpenses: number;
      categories: Array<{
        name: string;
        amount: number;
        type: "personal" | "joint";
      }>;
    };
    savingsData: {
      totalSavings: number;
      partnerASavings: number;
      partnerBSavings: number;
      goal: number;
    };
  };
}

const defaultUserData = {
  user1: {
    name: "Partner A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=partner1",
  },
  user2: {
    name: "Partner B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=partner2",
  },
};

const defaultFinancialData = {
  incomeData: [
    { month: "Jan", partner1: 4000, partner2: 3500 },
    { month: "Feb", partner1: 4200, partner2: 3700 },
    { month: "Mar", partner1: 3800, partner2: 3600 },
    { month: "Apr", partner1: 4100, partner2: 3800 },
    { month: "May", partner1: 4300, partner2: 3900 },
    { month: "Jun", partner1: 4500, partner2: 4000 },
  ],
  expenseData: {
    personalExpenses: 2500,
    jointExpenses: 3500,
    categories: [
      { name: "Rent", amount: 2000, type: "joint" },
      { name: "Utilities", amount: 500, type: "joint" },
      { name: "Groceries", amount: 1000, type: "joint" },
      { name: "Shopping", amount: 1500, type: "personal" },
      { name: "Entertainment", amount: 1000, type: "personal" },
    ],
  },
  savingsData: {
    totalSavings: 15000,
    partnerASavings: 8000,
    partnerBSavings: 7000,
    goal: 20000,
  },
};

const Home = ({
  userData = defaultUserData,
  financialData = defaultFinancialData,
}: HomeProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        user1={userData.user1}
        user2={userData.user2}
        notifications={3}
      />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <FinancialOverview
          incomeData={financialData.incomeData}
          expenseData={financialData.expenseData}
          savingsData={financialData.savingsData}
        />
        <SavingsGoalTracker
          currentAmount={financialData.savingsData.totalSavings}
          goalAmount={financialData.savingsData.goal}
          partner1Contribution={financialData.savingsData.partnerASavings}
          partner2Contribution={financialData.savingsData.partnerBSavings}
          partner1Name={userData.user1.name}
          partner2Name={userData.user2.name}
          lastMonthGrowth={12.5}
        />
        <TransactionList />
        <QuickAddTransaction
          onSubmit={(transaction) => {
            console.log("New transaction:", transaction);
          }}
        />
      </main>
    </div>
  );
};

export default Home;
