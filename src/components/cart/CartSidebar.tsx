"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

export function CartSidebar() {
  const { items, addToCart, removeFromCart } = useCartStore();

  // Calcula o total da compra
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Sheet>
      {/* O GATILHO (Botão que fica no Header) */}
      <SheetTrigger asChild>
        <Button variant="outline" className="relative" size="icon">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center animate-in zoom-in">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* O CONTEÚDO (A gaveta que abre) */}
      <SheetContent className="flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Seu Pedido</SheetTitle>
        </SheetHeader>

        {/* LISTA DE ITENS */}
        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              Seu carrinho está vazio 😔
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  {/* Nome e Preço */}
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)}
                    </p>
                  </div>

                  {/* Controles (+ e -) */}
                  <div className="flex items-center gap-2 bg-gray-100 rounded-md p-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="text-sm font-bold w-4 text-center">
                      {item.quantity}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RODAPÉ (Total e Botão Finalizar) */}
        {items.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-4">
            <div className="w-full space-y-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}
                </span>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg">
                Finalizar Pedido
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
