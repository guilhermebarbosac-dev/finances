import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bell, Plus, Settings, LogOut, Menu } from "lucide-react";

interface DashboardHeaderProps {
  user1?: {
    name: string;
    avatar: string;
  };
  user2?: {
    name: string;
    avatar: string;
  };
  notifications?: number;
}

const DashboardHeader = ({
  user1 = {
    name: "Parceiro A",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=partner1",
  },
  user2 = {
    name: "Parceiro B",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=partner2",
  },
  notifications = 3,
}: DashboardHeaderProps) => {
  return (
    <header className="w-full h-20 px-4 border-b bg-white flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          aria-label="Menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex -space-x-2">
          <Avatar className="border-2 border-white">
            <AvatarImage src={user1.avatar} alt={user1.name} />
            <AvatarFallback>{user1.name[0]}</AvatarFallback>
          </Avatar>
          <Avatar className="border-2 border-white">
            <AvatarImage src={user2.avatar} alt={user2.name} />
            <AvatarFallback>{user2.name[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="hidden lg:block">
          <h2 className="text-sm font-medium">
            {user1.name} & {user2.name}
          </h2>
          <p className="text-sm text-gray-500">Conta Conjunta</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hidden sm:flex gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Transação
            </Button>
          </DialogTrigger>
          <DialogContent>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-4">Nova Transação</h2>
              <p className="text-gray-500">
                Formulário de transação será implementado aqui
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Configurações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações de Perfil</DropdownMenuItem>
            <DropdownMenuItem>Preferências da Conta</DropdownMenuItem>
            <DropdownMenuItem>Notificações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
