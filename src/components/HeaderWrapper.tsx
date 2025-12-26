"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";

export function HeaderWrapper() {
  const pathname = usePathname();

  // Verifica se a rota atual começa com "/admin"
  const isAdmin = pathname?.startsWith("/admin");

  // Se for admin, não renderiza nada (null)
  if (isAdmin) {
    return null;
  }

  // Se não for admin, mostra o Header normal
  return <Header />;
}
