"use client";

import { useState } from "react";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Coffee, Utensils } from "lucide-react";

interface MenuProps {
  products: Product[];
  categories: { id: number; name: string }[]; // Vamos receber categorias
}

export function Menu({ products, categories }: MenuProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // A Lógica de Filtragem
  const filteredProducts = products.filter((product) => {
    // 1. Filtro de Texto (Nome ou Descrição)
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    // 2. Filtro de Categoria
    // (Assumindo que categories.name seja algo como 'Lanches', 'Bebidas')
    // Se selecionou 'all', passa tudo. Se não, compara o nome da categoria.
    const matchesCategory =
      selectedCategory === "all" ||
      product.categories?.name === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* BARRA DE CONTROLE (Busca + Filtros) */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between sticky top-16 bg-gray-50/95 p-4 z-10 backdrop-blur rounded-xl border">
        {/* Campo de Busca */}
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar lanche, bebida..."
            className="pl-10 bg-white dark:bg-zinc-900 dark:border-zinc-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botões de Categoria */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={
              selectedCategory === "all"
                ? "bg-orange-600 hover:bg-orange-700"
                : ""
            }
          >
            Todos
          </Button>

          {categories.map((category) => (
            <Button
              key={category.id}
              variant={
                selectedCategory === category.name ? "default" : "outline"
              }
              onClick={() => setSelectedCategory(category.name)}
              className={
                selectedCategory === category.name
                  ? "bg-orange-600 hover:bg-orange-700"
                  : ""
              }
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* GRID DE PRODUTOS */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        // Estado Vazio (Se não achar nada)
        <div className="text-center py-20">
          <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800">
            Nenhum produto encontrado
          </h3>
          <p className="text-gray-500">Tente buscar por outro termo.</p>
          <Button
            variant="link"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-2 text-orange-600"
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
}
