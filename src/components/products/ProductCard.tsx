import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* Área da Imagem */}
      <div className="h-40 bg-gray-100 mb-4 rounded-md overflow-hidden flex items-center justify-center relative">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400 text-sm">Sem foto</span>
        )}
      </div>

      {/*Informaçoes */}
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
      </div>

      {/* Rodapé do Card */}
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
          {product.categories?.name || "Geral"}
        </span>
        <span className="font-bold text-green-700 text-lg">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </span>
      </div>
    </div>
  );
}
