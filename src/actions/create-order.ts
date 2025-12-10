"use server";

import { supabase } from "@/lib/supabase";
import { CartItem } from "@/store/use-cart-store";

export async function createOrder(name: string, items: CartItem[]) {
  // 1. Validar dados basicos
  if (!name || items.length === 0) {
    return { success: false, message: "Dados inválidos" };
  }

  // 2. Calcular total (segurança extra: recalcular no back para evitar fraudes)
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  try {
    // 3. Criar o pedido na tabela 'orders'
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: name,
        total_amount: total,
        status: "PENDING", // inicial
      })
      .select()
      .single();

    if (orderError) throw new Error(orderError.message);

    // 4. Preparar os itens para salvar
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    // 5. Salvar os itens na tabela 'order_items'
    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
    if (itemsError) throw new Error(itemsError.message);

    // Retorna o id do pedido para redirecionar o cliente depois
    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return { success: false, message: "Erro ao processar pedido." };
  }
}
