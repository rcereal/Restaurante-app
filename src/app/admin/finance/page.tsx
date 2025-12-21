import { supabase } from "@/lib/supabase";
import { DollarSign, ShoppingBag, TrendingUp } from "lucide-react";
import { SalesChart } from "@/components/admin/finance/SalesChart";

export const revalidate = 0;

export default async function FinancePage() {
  // 1 Buscamos apenas pedidos concluidos (dinheiro real no bolso)
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("status", "DONE")
    .order("created_at", { ascending: true });

  if (error) {
    return <div className="p-10 text-red-500">Erro: {error.message}</div>;
  }

  // 2 Calculos matematicos (KPIs)
  const totalRevenue =
    orders?.reduce((acc, order) => acc + order.total_amount, 0) || 0;
  const totalOrders = orders?.length || 0;
  const averageTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Painel Financeiro 📊
      </h1>

      {/* CARDS DE RESUMO (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Faturamento */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <DollarSign className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Faturamento Total
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalRevenue)}
            </h3>
          </div>
        </div>

        {/* Card 2: Total de Pedidos */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total de Vendas</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
          </div>
        </div>

        {/* Card 3: Ticket Médio */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full text-orange-600">
            <TrendingUp className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Ticket Médio</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(averageTicket)}
            </h3>
          </div>
        </div>
      </div>

      {/* ÁREA DO GRÁFICO */}
      <div className="bg-white p-6 rounded-xl shadow-sm border h-[400px]">
        <h2 className="text-lg font-bold text-gray-800 mb-6">
          Histórico de Vendas
        </h2>

        {/* Passamos os dados crus para o componente do gráfico tratar */}
        <SalesChart data={orders || []} />
      </div>
    </main>
  );
}
