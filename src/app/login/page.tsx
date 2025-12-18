"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  // 1. Criamos estados para guardar o que é digitado
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Impede a página de recarregar
    setLoading(true);
    setError(null);

    console.log("Tentando logar (via State):", { email, password }); // Debug (se preciso tirar depois)

    // 2. Enviamos os estados direto para o Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Erro Supabase:", error.message);
      setError("Email ou senha incorretos.");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm space-y-6 bg-white p-8 shadow-lg rounded-xl border">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-orange-100 p-3 rounded-full">
            <UtensilsCrossed className="h-8 w-8 text-orange-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Acesso Restrito</h1>
          <p className="text-sm text-gray-500">
            Entre para gerenciar o restaurante
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded text-center">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Entrar"
            )}
          </Button>
        </form>
      </div>
    </main>
  );
}
