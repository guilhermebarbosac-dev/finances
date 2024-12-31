import React from "react";
import DashboardHeader from "./dashboard/DashboardHeader";
import FinancialOverview from "./dashboard/FinancialOverview";
import QuickAddTransaction from "./dashboard/QuickAddTransaction";
import SavingsGoalTracker from "./dashboard/SavingsGoalTracker";
import TransactionList from "./dashboard/TransactionList";
import {
  useProfile,
  useCouple,
  useTransactions,
  useSavings,
} from "@/lib/hooks";
import { addTransaction, updateSavingsGoal } from "@/lib/queries";

const Home = () => {
  const { profile } = useProfile();
  const { couple } = useCouple();
  const { transactions } = useTransactions();
  const { savings } = useSavings();

  if (!profile || !couple) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  const isPartner1 = profile.id === couple.partner1.id;
  const partner1 = couple.partner1;
  const partner2 = couple.partner2;

  // Calculate financial data
  const currentDate = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

  const monthlyData = transactions
    .filter((t) => new Date(t.created_at) >= sixMonthsAgo)
    .reduce(
      (acc, t) => {
        const date = new Date(t.created_at);
        const monthKey = date.toLocaleString("pt-BR", { month: "short" });

        if (!acc[monthKey]) {
          acc[monthKey] = { month: monthKey, partner1: 0, partner2: 0 };
        }

        if (t.type === "personal") {
          if (t.partner_id === partner1.id) {
            acc[monthKey].partner1 += t.amount;
          } else {
            acc[monthKey].partner2 += t.amount;
          }
        } else {
          // Split joint expenses
          acc[monthKey].partner1 += t.amount / 2;
          acc[monthKey].partner2 += t.amount / 2;
        }

        return acc;
      },
      {} as Record<
        string,
        { month: string; partner1: number; partner2: number }
      >,
    );

  const incomeData = Object.values(monthlyData);

  const totalSavings = savings.reduce((sum, s) => sum + s.amount, 0);
  const partner1Savings = savings
    .filter((s) => s.partner_id === partner1.id)
    .reduce((sum, s) => sum + s.amount, 0);
  const partner2Savings = savings
    .filter((s) => s.partner_id === partner2.id)
    .reduce((sum, s) => sum + s.amount, 0);

  const personalExpenses = transactions
    .filter((t) => t.type === "personal")
    .reduce((sum, t) => sum + t.amount, 0);

  const jointExpenses = transactions
    .filter((t) => t.type === "joint")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseCategories = transactions.reduce(
    (acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { name: t.category, amount: 0, type: t.type };
      }
      acc[t.category].amount += t.amount;
      return acc;
    },
    {} as Record<
      string,
      { name: string; amount: number; type: "personal" | "joint" }
    >,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user1={partner1} user2={partner2} notifications={3} />
      <main className="container mx-auto px-4 py-6 space-y-6">
        <FinancialOverview
          incomeData={incomeData}
          expenseData={{
            personalExpenses,
            jointExpenses,
            categories: Object.values(expenseCategories),
          }}
          savingsData={{
            totalSavings,
            partnerASavings: partner1Savings,
            partnerBSavings: partner2Savings,
            goal: couple.savings_goal,
          }}
        />
        <SavingsGoalTracker
          currentAmount={totalSavings}
          goalAmount={couple.savings_goal}
          partner1Contribution={partner1Savings}
          partner2Contribution={partner2Savings}
          partner1Name={partner1.name}
          partner2Name={partner2.name}
          lastMonthGrowth={12.5}
          onUpdateGoal={updateSavingsGoal}
        />
        <TransactionList
          transactions={transactions.map((t) => ({
            ...t,
            partner:
              t.partner_id === partner1.id ? partner1.name : partner2.name,
          }))}
        />
        <QuickAddTransaction onSubmit={addTransaction} />
      </main>
    </div>
  );
};

export default Home;
