import Link from "next/link";

const recursos = [
  { titulo: "Agenda online", texto: "Controle todos os horários da barbearia em um só lugar." },
  { titulo: "Clientes", texto: "Cadastro e histórico completo de cada cliente." },
  { titulo: "Barbeiros e serviços", texto: "Organize a equipe, os horários e os preços." },
  { titulo: "Assinaturas", texto: "Planos mensais para ter receita previsível." },
  { titulo: "Financeiro", texto: "Acompanhe faturamento e resultados do dia." },
  { titulo: "Acesso pelo celular", texto: "Use no balcão ou de qualquer lugar." },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-800 text-white">
      <section className="mx-auto flex max-w-5xl flex-col px-6 py-24">
        <span className="w-fit rounded-full border border-yellow-400/60 px-4 py-1 text-sm text-yellow-400">
          Sistema completo para barbearias
        </span>

        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">
          Transforme sua barbearia em um negócio{" "}
          <span className="text-yellow-400">mais inteligente.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-slate-300">
          Agendamentos, clientes, barbeiros, serviços, assinaturas e financeiro
          em um único sistema.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/login"
            className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Começar agora
          </Link>
          <a
            href="#sistema"
            className="rounded-lg border border-white/30 px-6 py-3 font-semibold transition hover:bg-white/10"
          >
            Conhecer o sistema
          </a>
        </div>
      </section>

      <section id="sistema" className="border-t border-white/10 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold md:text-3xl">
            Tudo o que sua barbearia precisa
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recursos.map((r) => (
              <div
                key={r.titulo}
                className="rounded-xl border border-white/10 bg-slate-900 p-5"
              >
                <h3 className="font-semibold text-yellow-400">{r.titulo}</h3>
                <p className="mt-2 text-sm text-slate-400">{r.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-1 text-sm text-slate-400 md:flex-row md:justify-between">
          <p>© 2026 BarberCode</p>
          <p>Gestão inteligente para barbearias.</p>
        </div>
      </footer>
    </main>
  );
}