"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveProduct(formData: FormData) {
  // Pegamos os dados do formulário HTML
  const id = formData.get("id")?.toString(); // Se tiver ID, é edição
  const name = formData.get("name")?.toString();
  const price = parseFloat(
    formData.get("price")?.toString().replace("R$", "").replace(",", ".") || "0"
  );
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("image_url")?.toString();
  const categoryId = parseInt(formData.get("category_id")?.toString() || "1");

  try {
    if (id) {
      // --- EDIÇÃO (UPDATE) ---
      const { error } = await supabase
        .from("products")
        .update({
          name,
          price,
          description,
          image_url: imageUrl,
          category_id: categoryId,
        })
        .eq("id", id);

      if (error) throw error;
    } else {
      // --- CRIAÇÃO (INSERT) ---
      const { error } = await supabase.from("products").insert({
        name,
        price,
        description,
        image_url: imageUrl,
        category_id: categoryId,
      });

      if (error) throw error;
    }

    // Atualiza as telas para mostrar o novo dado
    revalidatePath("/admin/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    return { success: false };
  }
}
