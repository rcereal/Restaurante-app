import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { Menu } from "@/components/products/Menu"; // Importe o componente novo

export const revalidate = 0;

export default async function Home() {
  // 1. Buscamos Produtos Ativos
  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("is_available", true)
    .order("name")
    .returns<Product[]>();

  // 2. Buscamos Categorias (Para montar os botões)
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <main className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12 space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Nosso Cardápio
        </h1>
        <p className="text-lg text-gray-600">Escolha suas delícias favoritas</p>
      </div>

      {/* 3. Entregamos os dados para o Menu fazer a mágica */}
      <Menu products={products || []} categories={categories || []} />
    </main>
  );
}
