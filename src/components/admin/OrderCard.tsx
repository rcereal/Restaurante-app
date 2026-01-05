"use client";

import { updateOrderStatus } from "@/actions/update-order-status";
import { Button } from "../ui/button";
import { OrderDetailsDialog } from "./OrderDetailsDialog"; // Import do Modal

interface OrderCardProps {
  order: any;
}

export function OrderCard({ order }: OrderCardProps) {
  const handleStatusChange = async (newStatus: string) => {
    await updateOrderStatus(order.id, newStatus);
  };

  // Lógica para limitar itens visíveis no card (evita cards gigantes)
  const visibleItems = order.order_items.slice(0, 2); // Pega só os 2 primeiros
  const remainingItemsCount = order.order_items.length - 2;

  return (
    <div
      className={`p-6 rounded-xl shadow-sm border flex flex-col transition-all duration-300 ${
        order.status === "DONE"
          ? "bg-gray-50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-800 opacity-60"
          : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
      }`}
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-4 border-b border-gray-100 dark:border-zinc-800 pb-4">
        <div>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              order.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                : order.status === "PREPARING"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
            }`}
          >
            {order.status === "PENDING"
              ? "PENDENTE"
              : order.status === "PREPARING"
              ? "PREPARANDO"
              : "CONCLUÍDO"}
          </span>

          <h2 className="text-xl font-bold mt-2 text-gray-900 dark:text-gray-50">
            #{order.id} - {order.customer_name}
          </h2>

          <p className="text-gray-500 dark:text-gray-400 text-xs font-medium mt-1">
            {new Date(order.created_at).toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-green-600 dark:text-green-400">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order.total_amount)}
          </p>
        </div>
      </div>

      {/* Itens (Resumido) */}
      <div className="space-y-2 mb-4 flex-1">
        {/* MUDANÇA: Usamos visibleItems em vez de order.order_items */}
        {visibleItems.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-300">
              <span className="font-bold text-gray-900 dark:text-gray-100">
                {item.quantity}x
              </span>{" "}
              {item.products?.name}
            </span>
          </div>
        ))}

        {/* MUDANÇA: Se tiver mais itens escondidos, mostra aviso */}
        {remainingItemsCount > 0 && (
          <p className="text-xs text-gray-400 italic mt-1">
            + {remainingItemsCount} outros itens...
          </p>
        )}

        {/* MUDANÇA: Botão que abre o Modal com tudo */}
        <OrderDetailsDialog order={order} />
      </div>

      {/* Botões Inteligentes */}
      <div className="flex gap-2 mt-auto">
        {order.status === "PENDING" && (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600"
            onClick={() => handleStatusChange("PREPARING")}
          >
            👨‍🍳 Aceitar Pedido
          </Button>
        )}

        {order.status === "PREPARING" && (
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
            onClick={() => handleStatusChange("DONE")}
          >
            ✅ Finalizar
          </Button>
        )}

        {order.status === "DONE" && (
          <Button
            variant="outline"
            className="w-full cursor-not-allowed bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-gray-500 border-none"
            disabled
          >
            Entregue
          </Button>
        )}
      </div>
    </div>
  );
}
