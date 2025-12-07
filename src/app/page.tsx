import { supabase } from "@/lib/supabase";

export default async function Home() {
  // 1. Buscando os produtos no Supabase
  // .select('*, categories(*)') significa: Traga tudo de produtos E os dados da categoria associada
  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name)");

  // Se der erro no console, vamos ver o que é
  if (error) {
    console.error("Erro ao buscar produtos:", error);
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-8">Cardápio Digital</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-sm">
            {/* Imagem Placeholder se não tiver foto */}
            <div className="h-40 bg-gray-200 mb-4 rounded-md"></div>

            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="text-gray-500 text-sm">{product.description}</p>

            <div className="mt-4 flex justify-between items-center">
              {/* O TypeScript pode reclamar que categories é um array, vamos tratar isso depois */}
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {/* @ts-ignore - Apenas para testar agora */}
                {product.categories?.name}
              </span>
              <span className="font-bold text-green-600">
                R$ {product.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
