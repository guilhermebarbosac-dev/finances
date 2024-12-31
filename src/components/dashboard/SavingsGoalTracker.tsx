import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, ArrowUp, ArrowDown } from "lucide-react";

interface SavingsGoalTrackerProps {
  currentAmount?: number;
  goalAmount?: number;
  partner1Contribution?: number;
  partner2Contribution?: number;
  partner1Name?: string;
  partner2Name?: string;
  lastMonthGrowth?: number;
}

const SavingsGoalTracker = ({
  currentAmount = 15000,
  goalAmount = 25000,
  partner1Contribution = 8000,
  partner2Contribution = 7000,
  partner1Name = "Partner 1",
  partner2Name = "Partner 2",
  lastMonthGrowth = 12.5,
}: SavingsGoalTrackerProps) => {
  const progress = (currentAmount / goalAmount) * 100;
  const partner1Percentage = (partner1Contribution / currentAmount) * 100;
  const partner2Percentage = (partner2Contribution / currentAmount) * 100;

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Target className="h-5 w-5" />
          Savings Goal Progress
        </CardTitle>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1 ${lastMonthGrowth >= 0 ? "text-green-600" : "text-red-600"}`}
          >
            {lastMonthGrowth >= 0 ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span className="font-semibold">{Math.abs(lastMonthGrowth)}%</span>
            <span className="text-sm text-gray-500">vs last month</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium">
              ${currentAmount.toLocaleString()} of $
              {goalAmount.toLocaleString()}
            </span>
            <span className="text-sm font-medium">{progress.toFixed(1)}%</span>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-blue-600">
                  {partner1Name}
                </span>
                <span className="text-sm font-medium">
                  ${partner1Contribution.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-blue-600 h-1.5 rounded-full"
                  style={{ width: `${partner1Percentage}%` }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium text-purple-600">
                  {partner2Name}
                </span>
                <span className="text-sm font-medium">
                  ${partner2Contribution.toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-purple-600 h-1.5 rounded-full"
                  style={{ width: `${partner2Percentage}%` }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>
              Remaining: ${(goalAmount - currentAmount).toLocaleString()}
            </span>
            <span>Target: ${goalAmount.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalTracker;
