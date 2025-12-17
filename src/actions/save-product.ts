"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function saveProduct(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const price = parseFloat(
    formData.get("price")?.toString().replace("R$", "").replace(",", ".") || "0"
  );
  const description = formData.get("description")?.toString();
  const categoryId = parseInt(formData.get("category_id")?.toString() || "1");

  // 1. Pegamos o arquivo enviado
  const imageFile = formData.get("image_file") as File;
  let imageUrl = formData.get("existing_image_url")?.toString(); // Mantém a antiga se não mudar

  try {
    // 2. Se tiver um novo arquivo, fazemos o upload
    if (imageFile && imageFile.size > 0) {
      // Criamos um nome único para não substituir fotos de outros produtos
      // Ex: 123456789-x-bacon.png
      const fileName = `${Date.now()}-${imageFile.name.replace(/\s/g, "-")}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from("products") // Nome do bucket que criamos
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (storageError)
        throw new Error("Erro no upload: " + storageError.message);

      // 3. Pegamos a URL pública para salvar no banco
      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      imageUrl = publicUrlData.publicUrl;
    }

    // 4. Salva no Banco de Dados (Igual antes)
    if (id) {
      await supabase
        .from("products")
        .update({
          name,
          price,
          description,
          image_url: imageUrl,
          category_id: categoryId,
        })
        .eq("id", id);
    } else {
      await supabase.from("products").insert({
        name,
        price,
        description,
        image_url: imageUrl,
        category_id: categoryId,
      });
    }

    revalidatePath("/admin/menu");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Erro ao salvar produto:", error);
    return { success: false };
  }
}
