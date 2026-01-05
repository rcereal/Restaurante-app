"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Menu as MenuIcon, // Ícone do Cardápio
  DollarSign,
  Settings,
  LogOut,
  UtensilsCrossed,
  Menu, // Usaremos este mesmo ícone para o botão Hambúrguer
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle"; // Mantive seu componente original
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Criamos este componente interno para não repetir código
  // Ele é o conteúdo que aparece tanto na Sidebar fixa (PC) quanto no Menu (Celular)
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-orange-600">
          <UtensilsCrossed size={24} />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <Link
          href="/admin"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors font-medium"
        >
          <LayoutDashboard className="h-5 w-5" />
          Pedidos
        </Link>
        <Link
          href="/admin/menu"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors font-medium"
        >
          {/* MenuIcon aqui é o ícone do link Cardápio */}
          <MenuIcon className="h-5 w-5" />
          Cardápio
        </Link>
        <Link
          href="/admin/finance"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg transition-colors font-medium"
        >
          <DollarSign className="h-5 w-5" />
          Financeiro
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800 rounded-lg transition-colors cursor-not-allowed"
        >
          <Settings className="h-5 w-5" />
          Configurações
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-zinc-800">
        <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 w-full rounded-lg transition-colors font-medium">
          <LogOut className="h-5 w-5" />
          Sair
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      {/* --- SIDEBAR DESKTOP (Fixa, some no mobile) --- */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col flex-shrink-0 z-10 transition-colors duration-300">
        <SidebarContent />
      </aside>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* HEADER SUPERIOR */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-4 md:px-8 transition-colors duration-300">
          {/* LADO ESQUERDO: Menu Mobile (Visível só no mobile) */}
          <div className="flex items-center gap-3">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="-ml-2">
                    <Menu className="h-6 w-6 text-gray-700 dark:text-gray-200" />
                  </Button>
                </SheetTrigger>

                {/* Conteúdo da Gaveta (Mobile) */}
                <SheetContent
                  side="left"
                  className="p-0 w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800"
                >
                  <SheetHeader className="sr-only">
                    <SheetTitle>Menu Admin</SheetTitle>
                  </SheetHeader>
                  {/* Reusamos o conteúdo da sidebar aqui */}
                  <SidebarContent />
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo simplificado para Mobile (opcional, aparece ao lado do menu) */}
            <span className="md:hidden font-bold text-orange-600 text-lg">
              Admin
            </span>
          </div>

          {/* LADO DIREITO: Theme Toggle */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
              Modo de exibição:
            </span>
            <ThemeToggle />
          </div>
        </header>

        {/* ÁREA DE CONTEÚDO (Scrollável) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10">{children}</main>
      </div>
    </div>
  );
}
