import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, ArrowUp, ArrowDown, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SavingsGoalTrackerProps {
  currentAmount?: number;
  goalAmount?: number;
  partner1Contribution?: number;
  partner2Contribution?: number;
  partner1Name?: string;
  partner2Name?: string;
  lastMonthGrowth?: number;
  onUpdateGoal?: (goal: number) => Promise<void>;
}

const SavingsGoalTracker = ({
  currentAmount = 15000,
  goalAmount = 25000,
  partner1Contribution = 8000,
  partner2Contribution = 7000,
  partner1Name = "Parceiro 1",
  partner2Name = "Parceiro 2",
  lastMonthGrowth = 12.5,
  onUpdateGoal,
}: SavingsGoalTrackerProps) => {
  const [newGoal, setNewGoal] = React.useState(goalAmount);
  const [isOpen, setIsOpen] = React.useState(false);
  const progress = (currentAmount / goalAmount) * 100;
  const partner1Percentage = (partner1Contribution / currentAmount) * 100;
  const partner2Percentage = (partner2Contribution / currentAmount) * 100;

  const handleUpdateGoal = async () => {
    if (onUpdateGoal) {
      await onUpdateGoal(newGoal);
      setIsOpen(false);
    }
  };

  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Target className="h-5 w-5" />
          Progresso da Meta
        </CardTitle>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-1 ${
              lastMonthGrowth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {lastMonthGrowth >= 0 ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span className="font-semibold">{Math.abs(lastMonthGrowth)}%</span>
            <span className="text-sm text-gray-500">vs mês anterior</span>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Edit2 className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Atualizar Meta de Poupança</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    type="number"
                    value={newGoal}
                    onChange={(e) => setNewGoal(Number(e.target.value))}
                    placeholder="Nova meta"
                  />
                </div>
                <Button onClick={handleUpdateGoal} className="w-full">
                  Atualizar Meta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Meta Atual</span>
              <span>
                R$ {currentAmount.toLocaleString("pt-BR")} /{" "}
                {goalAmount.toLocaleString("pt-BR")}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{partner1Name}</span>
                <span>
                  R$ {partner1Contribution.toLocaleString("pt-BR")} (
                  {partner1Percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={partner1Percentage} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{partner2Name}</span>
                <span>
                  R$ {partner2Contribution.toLocaleString("pt-BR")} (
                  {partner2Percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={partner2Percentage} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalTracker;
