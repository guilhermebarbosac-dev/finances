import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface IncomeChartProps {
  data?: {
    month: string;
    partner1: number;
    partner2: number;
  }[];
  partner1Name?: string;
  partner2Name?: string;
}

const defaultData = [
  { month: "Jan", partner1: 4000, partner2: 3500 },
  { month: "Fev", partner1: 4200, partner2: 3700 },
  { month: "Mar", partner1: 3800, partner2: 3600 },
  { month: "Abr", partner1: 4100, partner2: 3800 },
  { month: "Mai", partner1: 4300, partner2: 3900 },
  { month: "Jun", partner1: 4500, partner2: 4000 },
];

const IncomeChart = ({
  data = defaultData,
  partner1Name = "Parceiro 1",
  partner2Name = "Parceiro 2",
}: IncomeChartProps) => {
  return (
    <Card className="w-full h-[380px] bg-white">
      <CardHeader>
        <CardTitle>Renda Combinada</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) =>
                `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
              }
            />
            <Legend />
            <Bar
              dataKey="partner1"
              name={partner1Name}
              fill="#8884d8"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="partner2"
              name={partner2Name}
              fill="#82ca9d"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default IncomeChart;
