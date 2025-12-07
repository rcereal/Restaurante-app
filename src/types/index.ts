// Definiçao da categoria
export interface Category {
  id: number;
  name: string;
}

// Definiçao do produto
export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  category_id: number;
  categories?: Category | null; // Ponto de interrogaçao diz que isso é opcional.
}
