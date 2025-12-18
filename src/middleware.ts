import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Cria uma resposta inicial (que vamos modificar adicionando cookies)
  let supabaseResponse = NextResponse.next({
    request,
  });

  // 2. Cria o cliente Supabase para o servidor
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Lê todos os cookies da requisição
        getAll() {
          return request.cookies.getAll();
        },
        // Grava cookies (tokens) na resposta
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Atualiza a sessão (se o token estiver velho, ele renova aqui)
  // IMPORTANTE: Não confie apenas no getUser() para proteger rotas sensíveis,
  // mas aqui serve para garantir que a sessão existe.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. Regras de Proteção de Rota
  // Se tentar acessar /admin sem usuário -> Login
  if (request.nextUrl.pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se já estiver logado e tentar acessar /login -> Admin
  if (request.nextUrl.pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return supabaseResponse;
}

export const config = {
  // Define onde o middleware vai rodar (ignora arquivos estáticos, imagens, etc)
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
