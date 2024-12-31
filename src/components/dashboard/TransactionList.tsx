import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, ArrowUpDown } from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "personal" | "joint";
  partner: "Parceiro A" | "Parceiro B";
}

interface TransactionListProps {
  transactions?: Transaction[];
}

const defaultTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Compras no Mercado",
    amount: 150.0,
    category: "Alimentação",
    type: "joint",
    partner: "Parceiro A",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Assinatura Netflix",
    amount: 15.99,
    category: "Entretenimento",
    type: "joint",
    partner: "Parceiro B",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Academia",
    amount: 50.0,
    category: "Saúde",
    type: "personal",
    partner: "Parceiro A",
  },
  {
    id: "4",
    date: "2024-01-12",
    description: "Jantar Restaurante",
    amount: 85.0,
    category: "Alimentação",
    type: "joint",
    partner: "Parceiro B",
  },
  {
    id: "5",
    date: "2024-01-11",
    description: "Compras",
    amount: 120.0,
    category: "Pessoal",
    type: "personal",
    partner: "Parceiro A",
  },
];

const TransactionList = ({
  transactions = defaultTransactions,
}: TransactionListProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transações Recentes</CardTitle>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar transações..."
                className="pl-8 w-[200px]"
              />
            </div>
            <Tabs defaultValue="all" className="w-[300px]">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="joint">Conjuntas</TabsTrigger>
                <TabsTrigger value="personal">Pessoais</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                <div className="flex items-center gap-1 cursor-pointer">
                  Data
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Parceiro</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      transaction.type === "joint"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }
                  >
                    {transaction.type === "joint" ? "Conjunto" : "Pessoal"}
                  </Badge>
                </TableCell>
                <TableCell>{transaction.partner}</TableCell>
                <TableCell className="text-right font-medium">
                  R${" "}
                  {transaction.amount.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionList;
