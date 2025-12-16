import Link from "next/link";
import { PlusCircle, Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { deleteProduct } from "@/actions/delete-product";
import { ProductDialog } from "./ProductDialog";

// Força a atualização da página sempre que entrar (sem cache)
export const revalidate = 0;

export default async function AdminMenuPage() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("is_available", true)
    .order("name", { ascending: true })
    .returns<Product[]>();

  if (error) {
    return <div className="p-10 text-red-500">Erro: {error.message}</div>;
  }

  return (
    <main className="p-10 bg-gray-50 min-h-screen">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cardápio 🍔</h1>
          <p className="text-gray-500">Gerencie seus produtos ativos</p>
        </div>
        {/* Botao de Criar */}
        <ProductDialog />
      </header>

      <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 font-medium text-gray-600">Produto</th>
              <th className="p-4 font-medium text-gray-600">Categoria</th>
              <th className="p-4 font-medium text-gray-600">Preço</th>
              <th className="p-4 font-medium text-gray-600 text-right">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products?.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 bg-gray-200 rounded-md overflow-hidden">
                    {product.image_url && (
                      <img
                        src={product.image_url}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
                  <span className="font-medium">{product.name}</span>
                </td>
                <td className="p-4">
                  <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-bold">
                    {product.categories?.name || "Geral"}
                  </span>
                </td>
                <td className="p-4 text-green-700 font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(product.price)}
                </td>
                <td className="p-4 text-right space-x-2 flex justify-end">
                  {/* Botão Editar (Visual) */}
                  <ProductDialog productToEdit={product} />

                  {/* Formulário de Deletar */}
                  <form
                    action={async () => {
                      "use server";
                      // Chamamos a action passando o ID
                      await deleteProduct(product.id);
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      type="submit"
                      className="h-8 w-8 text-red-600 bg-red-50 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
