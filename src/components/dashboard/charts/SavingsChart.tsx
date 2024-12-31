import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, DollarSign } from "lucide-react";

interface SavingsChartProps {
  totalSavings?: number;
  partnerASavings?: number;
  partnerBSavings?: number;
  goal?: number;
}

const SavingsChart = ({
  totalSavings = 15000,
  partnerASavings = 8000,
  partnerBSavings = 7000,
  goal = 20000,
}: SavingsChartProps) => {
  const progress = (totalSavings / goal) * 100;
  const partnerAPercentage = (partnerASavings / totalSavings) * 100;
  const partnerBPercentage = (partnerBSavings / totalSavings) * 100;

  return (
    <Card className="p-6 w-full h-[380px] bg-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Progresso da Poupança</h3>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-500" />
          <span className="text-2xl font-bold">
            R${" "}
            {totalSavings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progresso Total</span>
            <span>{progress.toFixed(1)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-blue-600">Parceiro A</span>
              <span>
                R${" "}
                {partnerASavings.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <Progress value={partnerAPercentage} className="h-2 bg-blue-100">
              <div
                className="h-full bg-blue-600 transition-all"
                style={{ width: `${partnerAPercentage}%` }}
              />
            </Progress>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-purple-600">Parceiro B</span>
              <span>
                R${" "}
                {partnerBSavings.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <Progress value={partnerBPercentage} className="h-2 bg-purple-100">
              <div
                className="h-full bg-purple-600 transition-all"
                style={{ width: `${partnerBPercentage}%` }}
              />
            </Progress>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Meta: R${" "}
              {goal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
            <span>
              Restante: R${" "}
              {(goal - totalSavings).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-600" />
            <span className="text-sm">
              Parceiro A ({partnerAPercentage.toFixed(1)}%)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-600" />
            <span className="text-sm">
              Parceiro B ({partnerBPercentage.toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SavingsChart;
