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

  // NOVA LÓGICA: Se tiver mais de 1, diminui. Se for 1, remove.
  removeFromCart: (productId) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 1) {
        return {
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }

      // Se só tem 1, remove da lista
      return {
        items: state.items.filter((item) => item.id !== productId),
      };
    }),

  clearCart: () => set({ items: [] }),
}));
