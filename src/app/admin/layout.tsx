import Link from "next/link";
import { LayoutDashboard, Menu, Settings, LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Lateral */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-orange-600">Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
          >
            <LayoutDashboard className="h-5 w-5" />
            Pedidos
          </Link>
          <Link
            href="/admin/menu"
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
            Cardápio
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors cursor-not-allowed"
          >
            <Settings className="h-5 w-5" />
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full rounded-lg transition-colors">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
