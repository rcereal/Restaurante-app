import Link from "next/link";
import {
  LayoutDashboard,
  Menu,
  DollarSign,
  Settings,
  LogOut,
  UtensilsCrossed,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // MUDANÇA: dark:bg-zinc-950 muda o fundo geral para escuro
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      {/* MUDANÇA: dark:bg-zinc-900 dark:border-zinc-800 muda a sidebar e a borda */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col flex-shrink-0 z-10 transition-colors duration-300">
        <div className="h-16 flex items-center px-6 border-b border-gray-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-orange-600">
            <UtensilsCrossed size={24} />
            {/* MUDANÇA: Texto do logo adapta ao tema */}
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
            <Menu className="h-5 w-5" />
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
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header Superior */}
        {/* MUDANÇA: dark:bg-zinc-900 dark:border-zinc-800 */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-end px-8 transition-colors duration-300">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Modo de exibição:
            </span>
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}
