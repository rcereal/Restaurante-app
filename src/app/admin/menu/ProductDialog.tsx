"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { saveProduct } from "@/actions/save-product";
import { Product } from "@/types";
import { PlusCircle, Pencil, Loader2 } from "lucide-react";

interface ProductDialogProps {
  productToEdit?: Product; // Opcional: Se vier, é modo Edição
}

export function ProductDialog({ productToEdit }: ProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Se for edição, preenchemos os campos iniciais
  // Se for criação, deixamos vazio
  const isEditing = !!productToEdit;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Não recarrega a página
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    // Se estiver editando, precisamos avisar qual ID é
    if (isEditing && productToEdit) {
      formData.append("id", productToEdit.id.toString());
    }

    await saveProduct(formData);

    setIsLoading(false);
    setOpen(false); // Fecha o modal
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEditing ? (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:bg-blue-50"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="bg-orange-600 hover:bg-orange-700 gap-2">
            <PlusCircle className="h-4 w-4" /> Novo Produto
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Nome */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome do Produto</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={productToEdit?.name}
              placeholder="Ex: X-Salada"
            />
          </div>

          {/* Preço e Categoria */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input
                id="price"
                name="price"
                required
                defaultValue={productToEdit?.price}
                placeholder="0.00"
                type="number"
                step="0.01"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category_id">Categoria ID</Label>
              {/* Por simplicidade, usaremos ID numérico (1=Lanches, 2=Bebidas). Futuro: Select */}
              <Input
                id="category_id"
                name="category_id"
                required
                defaultValue={productToEdit?.category_id}
                type="number"
              />
            </div>
          </div>

          {/* Imagem (URL) */}
          <div className="grid gap-2">
            <Label htmlFor="image_url">URL da Imagem</Label>
            <Input
              id="image_url"
              name="image_url"
              defaultValue={productToEdit?.image_url || ""}
              placeholder="https://..."
            />
          </div>

          {/* Descrição */}
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={productToEdit?.description || ""}
              placeholder="Ingredientes..."
            />
          </div>

          {/* Botão Salvar */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 hover:bg-green-700 mt-2"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-4 w-4 mr-2" />
            ) : null}
            {isEditing ? "Salvar Alterações" : "Criar Produto"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
