import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";

export const revalidate = 0; // Opcional: Garante que a página sempre busque dados novos (sem cache estático)

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("is_available", true)
    .returns<Product[]>();

  if (error) {
    console.error("Erro ao carregar produtos:", error);
    return <div className="p-10 text-red-500">Erro ao carregar cardápio.</div>;
  }

  return (
    <main className="max-w-7xl mx-auto p-8">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Nosso Cardápio
        </h1>
        <p className="text-gray-600">Escolha suas delícias favoritas</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          // Passamos o dado "product" para dentro do componente
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
