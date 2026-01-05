"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

interface OrderDetailsDialogProps {
  order: any;
}

export function OrderDetailsDialog({ order }: OrderDetailsDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <ClipboardList className="w-3 h-3 mr-2" />
          Ver detalhes completos
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800">
        {/* Adicionado 'pr-8' para dar espaço ao botão de fechar */}
        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-50 flex flex-col gap-1">
            <div className="flex justify-between items-start">
              <span>Pedido #{order.id}</span>
            </div>
            <span className="text-lg font-bold text-green-600 dark:text-green-400">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(order.total_amount)}
            </span>
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            {order.customer_name} •{" "}
            {new Date(order.created_at).toLocaleString("pt-BR")}
          </DialogDescription>
        </DialogHeader>

        {/* Lista Completa de Itens */}
        <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-900 dark:text-gray-200 border-b pb-2 border-gray-100 dark:border-zinc-800">
              Itens do Pedido
            </h4>
            {order.order_items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-start text-sm"
              >
                <div className="flex gap-3">
                  <span className="font-bold bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-gray-900 dark:text-gray-100 h-fit">
                    {item.quantity}x
                  </span>
                  <div className="flex flex-col">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {item.products?.name}
                    </span>
                    {/* Se tiver preço unitário, pode mostrar aqui */}
                    <span className="text-xs text-gray-500">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.unit_price)}{" "}
                      un.
                    </span>
                  </div>
                </div>
                <span className="font-medium text-gray-900 dark:text-gray-200">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(item.unit_price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
