import { supabase } from "@/lib/supabase";
import { OrderCard } from "@/components/admin/OrderCard";
import { RealtimeOrders } from "@/components/admin/RealtimeOrders";

export const revalidate = 0;

export default async function AdminDashboard() {
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      `
      *,
      order_items (
        id,
        quantity,
        unit_price,
        products (name)
      )
    `
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
        Erro ao carregar pedidos: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Listener do Supabase (Invisível) */}
      <RealtimeOrders />

      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            Painel da Cozinha 👨‍🍳
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gerenciamento em tempo real
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
            Ao Vivo
          </span>
        </div>
      </header>

      {/* Grid de Pedidos */}
      {/* Se não tiver pedidos, mostramos uma mensagem amigável */}
      {!orders || orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-gray-500">Nenhum pedido na fila no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
