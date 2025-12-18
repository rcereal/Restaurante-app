import { createBrowserClient } from "@supabase/ssr";

// Função para criar o cliente no Navegador (Client Components)
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// Mantemos a exportação padrão para compatibilidade, mas agora como função
export const supabase = createClient();
