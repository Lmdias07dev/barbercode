"use client";

import { useState } from "react";

type Status = "Pendente" | "Confirmado" | "Concluído";

type Agendamento = {
  id: number;
  hora: string;
  cliente: string;
  servico: string;
  barbeiro: string;
  status: Status;
};

const inicial: Agendamento[] = [
  { id: 1, hora: "09:00", cliente: "Rafael Souza", servico: "Corte + Barba", barbeiro: "Diego", status: "Concluído" },
  { id: 2, hora: "10:00", cliente: "Lucas Mendes", servico: "Corte", barbeiro: "Thiago", status: "Concluído" },
  { id: 3, hora: "14:00", cliente: "Bruno Alves", servico: "Barba", barbeiro: "Diego", status: "Confirmado" },
  { id: 4, hora: "15:30", cliente: "Carlos Lima", servico: "Combo", barbeiro: "Thiago", status: "Pendente" },
  { id: 5, hora: "16:15", cliente: "André Rocha", servico: "Corte", barbeiro: "Diego", status: "Pendente" },
];

const proximo: Record<Status, Status> = {
  Pendente: "Confirmado",
  Confirmado: "Concluído",
  Concluído: "Pendente",
};

const cor: Record<Status, string> = {
  Pendente: "bg-slate-700 text-slate-200",
  Confirmado: "bg-yellow-400 text-slate-950",
  Concluído: "bg-green-500/20 text-green-400",
};

export default function AgendaPage() {
  const [lista, setLista] = useState(inicial);
  const [filtro, setFiltro] = useState("Todos");

  const barbeiros = ["Todos", "Diego", "Thiago"];
  const visiveis = lista.filter(
    (a) => filtro === "Todos" || a.barbeiro === filtro
  );

  function mudarStatus(id: number) {
    setLista((atual) =>
      atual.map((a) => (a.id === id ? { ...a, status: proximo[a.status] } : a))
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Agenda de hoje</h1>
      <p className="mt-1 text-sm text-slate-400">
        Toque no status para avançar: Pendente, Confirmado e Concluído.
      </p>

      <div className="mt-5 flex gap-2">
        {barbeiros.map((b) => (
          <button
            key={b}
            onClick={() => setFiltro(b)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              filtro === b
                ? "bg-yellow-400 font-semibold text-slate-950"
                : "bg-slate-900 text-slate-300 hover:bg-white/10"
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      <ul className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-900">
        {visiveis.map((a) => (
          <li
            key={a.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="flex items-center gap-4">
              <span className="w-14 text-lg font-bold text-yellow-400">
                {a.hora}
              </span>
              <div>
                <p className="font-medium">{a.cliente}</p>
                <p className="text-sm text-slate-400">
                  {a.servico} com {a.barbeiro}
                </p>
              </div>
            </div>

            <button
              onClick={() => mudarStatus(a.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${cor[a.status]}`}
            >
              {a.status}
            </button>
          </li>
        ))}

        {visiveis.length === 0 && (
          <li className="p-6 text-center text-sm text-slate-400">
            Nenhum agendamento para este barbeiro hoje.
          </li>
        )}
      </ul>
    </div>
  );
}