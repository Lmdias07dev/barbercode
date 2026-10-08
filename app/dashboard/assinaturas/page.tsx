"use client";

import { useState } from "react";

type Plano = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  assinantes: number;
  ativo: boolean;
};

const inicial: Plano[] = [
  { id: 1, nome: "Plano Corte", descricao: "4 cortes por mês", preco: 120, assinantes: 18, ativo: true },
  { id: 2, nome: "Plano Barba", descricao: "4 barbas por mês", preco: 90, assinantes: 9, ativo: true },
  { id: 3, nome: "Plano Completo", descricao: "4 cortes + 4 barbas por mês", preco: 190, assinantes: 10, ativo: true },
];

function reais(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function AssinaturasPage() {
  const [lista, setLista] = useState(inicial);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [erro, setErro] = useState("");

  const totalAssinantes = lista
    .filter((p) => p.ativo)
    .reduce((soma, p) => soma + p.assinantes, 0);
  const receita = lista
    .filter((p) => p.ativo)
    .reduce((soma, p) => soma + p.assinantes * p.preco, 0);

  function adicionar() {
    const precoNumero = Number(preco.replace(",", "."));

    if (nome.trim().length < 3) {
      setErro("Digite o nome do plano.");
      return;
    }
    if (!precoNumero || precoNumero <= 0) {
      setErro("Digite um preço mensal maior que zero.");
      return;
    }

    setErro("");
    setLista((atual) => [
      ...atual,
      {
        id: Date.now(),
        nome: nome.trim(),
        descricao: descricao.trim() || "Sem descrição",
        preco: precoNumero,
        assinantes: 0,
        ativo: true,
      },
    ]);
    setNome("");
    setDescricao("");
    setPreco("");
  }

  function alternar(id: number) {
    setLista((atual) =>
      atual.map((p) => (p.id === id ? { ...p, ativo: !p.ativo } : p))
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Assinaturas</h1>
      <p className="mt-1 text-sm text-slate-400">
        Planos mensais para ter uma receita previsível.
      </p>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Assinantes ativos</p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {totalAssinantes}
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Receita mensal recorrente</p>
          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {reais(receita)}
          </p>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="font-semibold">Novo plano</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome do plano"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="O que inclui"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="Preço por mês (R$)"
            inputMode="decimal"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <button
            onClick={adicionar}
            className="rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Salvar plano
          </button>
        </div>
        {erro && (
          <p role="alert" className="mt-2 text-sm text-red-400">
            {erro}
          </p>
        )}
      </section>

      <ul className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-900">
        {lista.map((p) => (
          <li
            key={p.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className={p.ativo ? "" : "opacity-50"}>
              <p className="font-medium">{p.nome}</p>
              <p className="text-sm text-slate-400">
                {p.descricao} · {p.assinantes} assinantes
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-yellow-400">
                {reais(p.preco)}
              </span>
              <button
                onClick={() => alternar(p.id)}
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  p.ativo
                    ? "bg-green-500/20 text-green-400"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {p.ativo ? "Ativo" : "Pausado"}
              </button>
            </div>
          </li>
        ))}

        {lista.length === 0 && (
          <li className="p-6 text-center text-sm text-slate-400">
            Nenhum plano cadastrado. Preencha o formulário acima para criar o
            primeiro.
          </li>
        )}
      </ul>
    </div>
  );
}