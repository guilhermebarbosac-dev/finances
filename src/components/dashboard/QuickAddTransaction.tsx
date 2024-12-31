import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, DollarSign } from "lucide-react";

interface QuickAddTransactionProps {
  onSubmit?: (transaction: {
    type: "personal" | "joint";
    category: string;
    amount: number;
    description: string;
  }) => void;
  isOpen?: boolean;
}

const personalCategories = [
  "Compras",
  "Entretenimento",
  "Alimentação",
  "Transporte",
  "Saúde",
];

const jointCategories = [
  "Aluguel/Financiamento",
  "Contas",
  "Mercado",
  "Seguros",
  "Lazer Conjunto",
];

const QuickAddTransaction = ({
  onSubmit = () => {},
  isOpen = true,
}: QuickAddTransactionProps) => {
  const [transactionType, setTransactionType] = React.useState<
    "personal" | "joint"
  >("personal");

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 rounded-full h-14 w-14 p-0">
          <Plus className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Adicionar Transação
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <Label>Tipo de Transação</Label>
            <RadioGroup
              defaultValue="personal"
              onValueChange={(value) =>
                setTransactionType(value as "personal" | "joint")
              }
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Pessoal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="joint" id="joint" />
                <Label htmlFor="joint">Conjunto</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              defaultValue={
                transactionType === "personal"
                  ? personalCategories[0]
                  : jointCategories[0]
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(transactionType === "personal"
                  ? personalCategories
                  : jointCategories
                ).map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Valor</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500">
                R$
              </span>
              <Input type="number" className="pl-12" placeholder="0,00" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input placeholder="Digite a descrição da transação" />
          </div>

          <Button
            onClick={() =>
              onSubmit({
                type: transactionType,
                category:
                  transactionType === "personal"
                    ? personalCategories[0]
                    : jointCategories[0],
                amount: 0,
                description: "",
              })
            }
            className="w-full"
          >
            Adicionar Transação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickAddTransaction;
