const resumo = [
  { titulo: "Agendamentos de hoje", valor: "12", detalhe: "3 ainda pendentes" },
  { titulo: "Faturamento do dia", valor: "R$ 640", detalhe: "Meta: R$ 900" },
  { titulo: "Clientes ativos", valor: "148", detalhe: "+9 neste mês" },
  { titulo: "Assinaturas ativas", valor: "37", detalhe: "R$ 2.960/mês" },
];

const proximos = [
  { hora: "14:00", cliente: "Rafael Souza", servico: "Corte + Barba", barbeiro: "Diego" },
  { hora: "14:45", cliente: "Lucas Mendes", servico: "Corte", barbeiro: "Thiago" },
  { hora: "15:30", cliente: "Bruno Alves", servico: "Barba", barbeiro: "Diego" },
  { hora: "16:15", cliente: "Carlos Lima", servico: "Combo", barbeiro: "Thiago" },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Bom dia, barbeiro</h1>
      <p className="mt-1 text-sm text-slate-400">
        Veja como está o movimento da sua barbearia hoje.
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {resumo.map((item) => (
          <div
            key={item.titulo}
            className="rounded-xl border border-white/10 bg-slate-900 p-5"
          >
            <p className="text-sm text-slate-400">{item.titulo}</p>
            <p className="mt-2 text-3xl font-bold text-yellow-400">
              {item.valor}
            </p>
            <p className="mt-1 text-xs text-slate-500">{item.detalhe}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">Próximos horários</h2>

        <ul className="mt-4 divide-y divide-white/10">
          {proximos.map((p) => (
            <li
              key={p.hora}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="flex items-center gap-4">
                <span className="w-14 text-lg font-bold text-yellow-400">
                  {p.hora}
                </span>
                <div>
                  <p className="font-medium">{p.cliente}</p>
                  <p className="text-sm text-slate-400">{p.servico}</p>
                </div>
              </div>
              <span className="text-sm text-slate-400">{p.barbeiro}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}