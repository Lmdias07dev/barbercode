"use client";

import { useState } from "react";

type Barbeiro = {
  id: number;
  nome: string;
  especialidade: string;
  inicio: string;
  fim: string;
  ativo: boolean;
};

const inicial: Barbeiro[] = [
  { id: 1, nome: "Diego", especialidade: "Corte e barba", inicio: "09:00", fim: "18:00", ativo: true },
  { id: 2, nome: "Thiago", especialidade: "Degradê", inicio: "10:00", fim: "19:00", ativo: true },
  { id: 3, nome: "Marcos", especialidade: "Barba", inicio: "13:00", fim: "20:00", ativo: false },
];

export default function BarbeirosPage() {
  const [lista, setLista] = useState(inicial);
  const [nome, setNome] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [inicio, setInicio] = useState("09:00");
  const [fim, setFim] = useState("18:00");
  const [erro, setErro] = useState("");

  const ativos = lista.filter((b) => b.ativo).length;

  function adicionar() {
    if (nome.trim().length < 2) {
      setErro("Digite o nome do barbeiro.");
      return;
    }
    if (inicio >= fim) {
      setErro("O horário de saída precisa ser depois da entrada.");
      return;
    }

    setErro("");
    setLista((atual) => [
      ...atual,
      {
        id: Date.now(),
        nome: nome.trim(),
        especialidade: especialidade.trim() || "Geral",
        inicio,
        fim,
        ativo: true,
      },
    ]);
    setNome("");
    setEspecialidade("");
  }

  function alternar(id: number) {
    setLista((atual) =>
      atual.map((b) => (b.id === id ? { ...b, ativo: !b.ativo } : b))
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Barbeiros</h1>
      <p className="mt-1 text-sm text-slate-400">
        {ativos} de {lista.length} barbeiros atendendo.
      </p>

      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="font-semibold">Novo barbeiro</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-5">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            placeholder="Especialidade"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            type="time"
            value={inicio}
            onChange={(e) => setInicio(e.target.value)}
            aria-label="Horário de entrada"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            type="time"
            value={fim}
            onChange={(e) => setFim(e.target.value)}
            aria-label="Horário de saída"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <button
            onClick={adicionar}
            className="rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Salvar barbeiro
          </button>
        </div>
        {erro && (
          <p role="alert" className="mt-2 text-sm text-red-400">
            {erro}
          </p>
        )}
      </section>

      <ul className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-900">
        {lista.map((b) => (
          <li
            key={b.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className={b.ativo ? "" : "opacity-50"}>
              <p className="font-medium">{b.nome}</p>
              <p className="text-sm text-slate-400">
                {b.especialidade} · {b.inicio} às {b.fim}
              </p>
            </div>

            <button
              onClick={() => alternar(b.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                b.ativo
                  ? "bg-green-500/20 text-green-400"
                  : "bg-slate-700 text-slate-300"
              }`}
            >
              {b.ativo ? "Atendendo" : "Afastado"}
            </button>
          </li>
        ))}

        {lista.length === 0 && (
          <li className="p-6 text-center text-sm text-slate-400">
            Nenhum barbeiro cadastrado. Preencha o formulário acima para criar
            o primeiro.
          </li>
        )}
      </ul>
    </div>
  );
}