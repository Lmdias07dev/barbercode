"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { nome: "Dashboard", href: "/dashboard" },
  { nome: "Agenda", href: "/dashboard/agenda" },
  { nome: "Clientes", href: "/dashboard/clientes" },
  { nome: "Serviços", href: "/dashboard/servicos" },
  { nome: "Barbeiros", href: "/dashboard/barbeiros" },
  { nome: "Assinaturas", href: "/dashboard/assinaturas" },
  { nome: "Configurações", href: "/dashboard/configuracoes" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-950 text-white md:flex">
      <aside className="border-b border-white/10 bg-slate-900 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
        <Link
          href="/"
          className="block px-5 py-4 text-lg font-bold text-yellow-400"
        >
          BarberCode
        </Link>

        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:pb-0">
          {menu.map((item) => {
            const ativo = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-sm transition ${
                  ativo
                    ? "bg-yellow-400 font-semibold text-slate-950"
                    : "text-slate-300 hover:bg-white/10"
                }`}
              >
                {item.nome}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-5 md:p-8">{children}</main>
    </div>
  );
}