"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { createOrder } from "@/actions/create-order"; // Nossa função nova!

export function CartSidebar() {
  const { items, addToCart, removeFromCart, clearCart } = useCartStore();
  const [checkoutName, setCheckoutName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Função que roda ao clicar em "Finalizar"
  async function handleCheckout() {
    if (!checkoutName.trim()) return; // Não deixa enviar sem nome

    setIsSubmitting(true);

    const result = await createOrder(checkoutName, items);

    if (result.success) {
      alert(`Pedido ${result.orderId} realizado com sucesso! 🚀`);
      clearCart(); // Limpa o carrinho
      setCheckoutName(""); // Limpa o nome
      // Aqui futuramente vamos redirecionar para a página de acompanhamento
    } else {
      alert("Erro: " + result.message);
    }

    setIsSubmitting(false);
  }

  return (
    <Sheet>
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

      <SheetContent className="flex flex-col h-full w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Seu Pedido</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
              <ShoppingCart className="h-12 w-12 text-gray-300" />
              <p className="text-gray-500">Seu carrinho está vazio 😔</p>
              <p className="text-sm text-gray-400">
                Adicione itens deliciosos do cardápio!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white hover:shadow-sm rounded-md"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="text-sm font-bold w-6 text-center tabular-nums">
                      {item.quantity}
                    </span>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:bg-white hover:shadow-sm rounded-md"
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

        {items.length > 0 && (
          <SheetFooter className="mt-auto border-t pt-6 bg-white">
            <div className="w-full space-y-6">
              {/* Resumo */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-green-600">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(total)}
                </span>
              </div>

              {/* Formulário Simples */}
              <div className="space-y-2">
                <Label htmlFor="name">Seu Nome</Label>
                <Input
                  id="name"
                  placeholder="Ex: João Silva"
                  value={checkoutName}
                  onChange={(e) => setCheckoutName(e.target.value)}
                />
              </div>

              {/* Botão de Ação */}
              <Button
                className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg font-bold shadow-md"
                onClick={handleCheckout}
                disabled={isSubmitting || !checkoutName.trim()}
              >
                {isSubmitting ? "Enviando..." : "Confirmar Pedido"}
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
