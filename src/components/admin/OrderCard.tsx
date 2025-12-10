"use client";

import { updateOrderStatus } from "@/actions/update-order-status";
import { Button } from "../ui/button";

interface OrderCardProps {
  order: any; // Tipagem rapida para simplificar
}

export function OrderCard({ order }: OrderCardProps) {
  // Funcao que chama nossa server action
  const handleStatusChange = async (newStatus: string) => {
    await updateOrderStatus(order.id, newStatus);
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-md border flex flex-col transition-all ${
        order.status === "DONE"
          ? "bg-gray-50 border-gray-100 opacity-60"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Cabeçalho */}
      <div className="flex justify-between items-start mb-4 border-b pb-4">
        <div>
          <span
            className={`text-xs font-bold px-2 py-1 rounded ${
              order.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "PREPARING"
                ? "bg-blue-100 text-blue-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {order.status === "PENDING"
              ? "PENDENTE"
              : order.status === "PREPARING"
              ? "PREPARANDO"
              : "CONCLUÍDO"}
          </span>
          <h2 className="text-xl font-bold mt-2">
            #{order.id} - {order.customer_name}
          </h2>
          <p className="text-gray-400 text-xs">
            {new Date(order.created_at).toLocaleTimeString("pt-BR")}
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg text-green-600">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(order.total_amount)}
          </p>
        </div>
      </div>

      {/* Itens */}
      <div className="space-y-2 mb-6 flex-1">
        {order.order_items.map((item: any) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              <span className="font-bold text-gray-900">{item.quantity}x</span>{" "}
              {item.products?.name}
            </span>
          </div>
        ))}
      </div>

      {/* Botões Inteligentes */}
      <div className="flex gap-2 mt-auto">
        {/* Se estiver PENDENTE, mostra botão ACEITAR */}
        {order.status === "PENDING" && (
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={() => handleStatusChange("PREPARING")}
          >
            👨‍🍳 Aceitar Pedido
          </Button>
        )}

        {/* Se estiver PREPARANDO, mostra botão CONCLUIR */}
        {order.status === "PREPARING" && (
          <Button
            className="w-full bg-green-600 hover:bg-green-700"
            onClick={() => handleStatusChange("DONE")}
          >
            ✅ Finalizar
          </Button>
        )}

        {/* Se estiver DONE, apenas avisa */}
        {order.status === "DONE" && (
          <Button
            variant="outline"
            className="w-full cursor-not-allowed"
            disabled
          >
            Entregue
          </Button>
        )}
      </div>
    </div>
  );
}
