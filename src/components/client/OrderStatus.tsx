"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Progress } from "@/components/ui/progress";

interface OrderStatusProps {
  orderId: number;
  initialStatus: string;
}

export function OrderStatus({ orderId, initialStatus }: OrderStatusProps) {
  const [status, setStatus] = useState(initialStatus);
  // Mapa de progresso: Qual status vale quantos %?
  const progressValue =
    {
      PENDING: 33,
      PREPARING: 66,
      DONE: 100,
    }[status] || 0;

  // Mapa de Textos e Cores
  const statusConfig = {
    PENDING: { label: "Aguardando Confirmação", color: "bg-yellow-500" },
    PREPARING: { label: "Em Preparo na Cozinha", color: "bg-blue-600" },
    DONE: { label: "Pedido Pronto! 🎉", color: "bg-green-600" },
  }[status] || { label: "Desconhecido", color: "bg-gray-400" };

  useEffect(() => {
    // Escutar APENAS este pedido específico (id=eq.orderId)
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          console.log("Status mudou!", payload.new.status);
          setStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  return (
    <div className="space-y-4 p-6 border rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-bold text-lg text-gray-800">Status do Pedido</h2>
        <span
          className={`px-3 py-1 rounded-full text-white text-xs font-bold ${statusConfig.color}`}
        >
          {statusConfig.label}
        </span>
      </div>

      <Progress value={progressValue} className="h-3" />

      <p className="text-sm text-gray-500 text-center animate-pulse">
        {status === "PENDING" && "Aguarde, a cozinha já vai aceitar..."}
        {status === "PREPARING" && "Nossos chefs estão caprichando!"}
        {status === "DONE" && "Seu pedido está a caminho!"}
      </p>
    </div>
  );
}
