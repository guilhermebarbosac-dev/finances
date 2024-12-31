import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart, DollarSign } from "lucide-react";

interface ExpenseChartProps {
  personalExpenses?: number;
  jointExpenses?: number;
  categories?: Array<{
    name: string;
    amount: number;
    type: "personal" | "joint";
  }>;
}

const ExpenseChart = ({
  personalExpenses = 2500,
  jointExpenses = 3500,
  categories = [
    { name: "Aluguel", amount: 2000, type: "joint" },
    { name: "Contas", amount: 500, type: "joint" },
    { name: "Mercado", amount: 1000, type: "joint" },
    { name: "Compras", amount: 1500, type: "personal" },
    { name: "Entretenimento", amount: 1000, type: "personal" },
  ],
}: ExpenseChartProps) => {
  return (
    <Card className="w-[480px] h-[380px] bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Divisão de Despesas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <PieChart className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Categorias
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Despesas Pessoais</span>
                <span className="text-sm font-bold">
                  R${" "}
                  {personalExpenses.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{
                    width: `${(personalExpenses / (personalExpenses + jointExpenses)) * 100}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium">Despesas Conjuntas</span>
                <span className="text-sm font-bold">
                  R${" "}
                  {jointExpenses.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width: `${(jointExpenses / (personalExpenses + jointExpenses)) * 100}%`,
                  }}
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-medium">Total de Despesas</span>
                <span className="text-sm font-bold">
                  R${" "}
                  {(personalExpenses + jointExpenses).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="mt-4">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{category.name}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${category.type === "personal" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                      >
                        {category.type === "personal" ? "Pessoal" : "Conjunto"}
                      </span>
                      <span className="text-sm font-bold">
                        R${" "}
                        {category.amount.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${category.type === "personal" ? "bg-blue-500" : "bg-green-500"} h-2 rounded-full`}
                      style={{
                        width: `${(category.amount / (personalExpenses + jointExpenses)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
