"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function RealtimeOrders() {
  const router = useRouter();

  useEffect(() => {
    //conecta ao canal de 'broadcast' do supabase
    const channel = supabase
      .channel("realtime-orders")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (playload) => {
          console.log("Novo pedido recebido!", playload);

          // 1 tocar o som
          const audio = new Audio("/notification.mp3");
          audio.play().catch((err) => console.log("Erro ao tocar som:", err));

          // 2 Atualiza a tela( Recarrega os dados do server component)
          router.refresh();
        }
      )
      .subscribe();

    // Limpa quando sair da pagina (pra nao deixar conexoes abertas)
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null; // Componente invisivel na tela
}
