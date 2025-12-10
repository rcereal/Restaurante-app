"use client";

import Link from "next/link";
import { UtensilsCrossed } from "lucide-react";
import { CartSidebar } from "@/components/cart/CartSidebar";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        {/* Logo / Nome */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-orange-600"
        >
          <UtensilsCrossed className="h-6 w-6" />
          <span>Restaurante App</span>
        </Link>

        <CartSidebar />
      </div>
    </header>
  );
}
