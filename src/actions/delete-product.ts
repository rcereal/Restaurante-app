"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: number) {
  try {
    // Em vez de .delete(), usamos .update()
    const { error } = await supabase
      .from("products")
      .update({ is_available: false }) // Marca como invisível
      .eq("id", productId);

    if (error) throw new Error(error.message);

    revalidatePath("/admin/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao desativar produto:", error);
    return { success: false, message: "Erro ao excluir." };
  }
}
