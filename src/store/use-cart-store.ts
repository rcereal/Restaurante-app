import { create } from "zustand";
import { Product } from "@/types";

// Definimos o formato do item no carrinho
// É igual ao produto, mas tem "quantity" (quantidade)
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],

  // AÇÃO: Adicionar item
  addToCart: (product) =>
    set((state) => {
      // 1. Verifica se o item já existe no carrinho
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        // Se já existe, apenas aumenta a quantidade (+1)
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      // Se não existe, adiciona o novo item com quantidade 1
      return { items: [...state.items, { ...product, quantity: 1 }] };
    }),

  // AÇÃO: Remover item
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  // AÇÃO: Limpar tudo
  clearCart: () => set({ items: [] }),
}));
