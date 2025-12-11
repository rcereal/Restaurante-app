import { supabase } from "@/lib/supabase";
import { OrderCard } from "@/components/admin/OrderCard";
import { RealtimeOrders } from "@/components/admin/RealtimeOrders";

export const revalidate = 0; // Atualiza sempre que entrar na pagina (sem cache)

export default async function AdminDashboard() {
  // Buscamos os pedidos (orders) e também os itens dentro deles (order_items)
  // O .order('created_at', ...) garante que o mais recente apareça primeiro
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
    return <div className="p-10 text-red-500">Erro: {error.message}</div>;
  }

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      {/* Componente invisivel */}
      <RealtimeOrders />

      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          Painel da Cozinha 👨‍🍳
        </h1>
        <div className="text-sm text-gray-500">
          Atualização automática ativa
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders?.map((order) => (
          // Agora só chamamos o componente, passando os dados
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </main>
  );
}
