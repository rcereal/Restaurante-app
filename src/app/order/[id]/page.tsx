import { supabase } from "@/lib/supabase";
import { OrderStatus } from "@/components/client/OrderStatus";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

interface OrderPageProps {
  params: Promise<{ id: string }>; // Next.js 15+ pede Promise nos params
}

export default async function OrderPage({ params }: OrderPageProps) {
  // 1. Pegar o ID da URL
  const { id } = await params;

  // 2. Buscar o pedido no banco
  const { data: order, error } = await supabase
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
    .eq("id", id)
    .single();

  if (error || !order) {
    return <div className="p-10 text-center">Pedido não encontrado 😕</div>;
  }

  return (
    <main className="max-w-md mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Botão Voltar */}
      <Link href="/">
        <Button variant="ghost" className="mb-4 pl-0 hover:bg-transparent">
          <ChevronLeft className="mr-2 h-4 w-4" /> Voltar ao Cardápio
        </Button>
      </Link>

      <h1 className="text-2xl font-bold mb-2">Pedido #{order.id}</h1>
      <p className="text-gray-500 mb-6">Olá, {order.customer_name}!</p>

      {/* COMPONENTE REALTIME AQUI 👇 */}
      <OrderStatus orderId={order.id} initialStatus={order.status} />

      {/* Resumo do Pedido */}
      <div className="mt-8 bg-white p-6 rounded-lg border space-y-4">
        <h3 className="font-semibold border-b pb-2">Resumo da Compra</h3>

        <div className="space-y-3">
          {order.order_items.map((item: any) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}x {item.products?.name}
              </span>
              <span className="font-medium">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(item.unit_price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between font-bold text-lg text-green-700">
          <span>Total</span>
          <span>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order.total_amount)}
          </span>
        </div>
      </div>
    </main>
  );
}
