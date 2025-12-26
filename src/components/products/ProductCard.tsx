"use client";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/use-cart-store";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border bg-card text-card-foreground p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full dark:border-zinc-800">
      {/* Área da Imagem */}
      <div className="h-40 bg-gray-100 dark:bg-zinc-900 mb-4 rounded-md overflow-hidden flex items-center justify-center relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">Sem foto</span>
        )}
      </div>

      {/* Informações */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Rodapé do Card */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 gap-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Preço
          </span>

          <span className="font-bold text-green-700 dark:text-green-400 text-lg">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(product.price)}
          </span>
        </div>

        <Button
          size="sm"
          className="bg-orange-600 hover:bg-orange-700 text-white"
          onClick={() => {
            addToCart(product);
            toast.success(`${product.name} adicionado!`, {
              duration: 2000,
              position: "bottom-center",
            });
          }}
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}
