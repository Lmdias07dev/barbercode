"use client";

import { useState } from "react";

type Servico = {
  id: number;
  nome: string;
  preco: number;
  duracao: number;
};

const inicial: Servico[] = [
  { id: 1, nome: "Corte", preco: 40, duracao: 30 },
  { id: 2, nome: "Barba", preco: 30, duracao: 20 },
  { id: 3, nome: "Corte + Barba", preco: 65, duracao: 50 },
  { id: 4, nome: "Sobrancelha", preco: 15, duracao: 10 },
];

function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ServicosPage() {
  const [lista, setLista] = useState(inicial);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [duracao, setDuracao] = useState("");
  const [erro, setErro] = useState("");

  function adicionar() {
    const precoNumero = Number(preco.replace(",", "."));
    const duracaoNumero = Number(duracao);

    if (nome.trim().length < 2) {
      setErro("Digite o nome do serviço.");
      return;
    }
    if (!precoNumero || precoNumero <= 0) {
      setErro("Digite um preço maior que zero.");
      return;
    }
    if (!duracaoNumero || duracaoNumero <= 0) {
      setErro("Digite a duração em minutos.");
      return;
    }

    setErro("");
    setLista((atual) => [
      ...atual,
      {
        id: Date.now(),
        nome: nome.trim(),
        preco: precoNumero,
        duracao: duracaoNumero,
      },
    ]);
    setNome("");
    setPreco("");
    setDuracao("");
  }

  function remover(id: number) {
    setLista((atual) => atual.filter((s) => s.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Serviços</h1>
      <p className="mt-1 text-sm text-slate-400">
        Cadastre o que sua barbearia oferece, com preço e duração.
      </p>

      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="font-semibold">Novo serviço</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do serviço"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço (R$)"
            inputMode="decimal"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            value={duracao}
            onChange={(e) => setDuracao(e.target.value)}
            placeholder="Duração (min)"
            inputMode="numeric"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <button
            onClick={adicionar}
            className="rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Salvar serviço
          </button>
        </div>
        {erro && (
          <p role="alert" className="mt-2 text-sm text-red-400">
            {erro}
          </p>
        )}
      </section>

      <ul className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-900">
        {lista.map((s) => (
          <li
            key={s.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-medium">{s.nome}</p>
              <p className="text-sm text-slate-400">{s.duracao} minutos</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-yellow-400">
                {formatarPreco(s.preco)}
              </span>
              <button
                onClick={() => remover(s.id)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 transition hover:border-red-400 hover:text-red-400"
              >
                Remover
              </button>
            </div>
          </li>
        ))}

        {lista.length === 0 && (
          <li className="p-6 text-center text-sm text-slate-400">
            Nenhum serviço cadastrado. Preencha o formulário acima para criar o
            primeiro.
          </li>
        )}
      </ul>
    </div>
  );
}