"use client";

import { useState } from "react";

type Cliente = {
  id: number;
  nome: string;
  telefone: string;
  visitas: number;
  ultimaVisita: string;
};

const inicial: Cliente[] = [
  { id: 1, nome: "Rafael Souza", telefone: "(92) 99111-2233", visitas: 14, ultimaVisita: "02/10" },
  { id: 2, nome: "Lucas Mendes", telefone: "(92) 99222-3344", visitas: 8, ultimaVisita: "30/09" },
  { id: 3, nome: "Bruno Alves", telefone: "(92) 99333-4455", visitas: 21, ultimaVisita: "05/10" },
  { id: 4, nome: "Carlos Lima", telefone: "(92) 99444-5566", visitas: 3, ultimaVisita: "21/09" },
];

export default function ClientesPage() {
  const [lista, setLista] = useState(inicial);
  const [busca, setBusca] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");

  const visiveis = lista.filter((c) =>
    c.nome.toLowerCase().includes(busca.toLowerCase())
  );

  function adicionar() {
    if (nome.trim().length < 3) {
      setErro("Digite o nome do cliente.");
      return;
    }
    if (telefone.trim().length < 8) {
      setErro("Digite um telefone válido.");
      return;
    }
    setErro("");
    setLista((atual) => [
      {
        id: Date.now(),
        nome: nome.trim(),
        telefone: telefone.trim(),
        visitas: 0,
        ultimaVisita: "—",
      },
      ...atual,
    ]);
    setNome("");
    setTelefone("");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Clientes</h1>
      <p className="mt-1 text-sm text-slate-400">
        {lista.length} clientes cadastrados.
      </p>

      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="font-semibold">Novo cliente</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Nome"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <input
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            placeholder="Telefone"
            className="rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400"
          />
          <button
            onClick={adicionar}
            className="rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-yellow-300"
          >
            Salvar cliente
          </button>
        </div>
        {erro && (
          <p role="alert" className="mt-2 text-sm text-red-400">
            {erro}
          </p>
        )}
      </section>

      <input
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar cliente pelo nome"
        className="mt-6 w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 outline-none focus:border-yellow-400"
      />

      <ul className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-900">
        {visiveis.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div>
              <p className="font-medium">{c.nome}</p>
              <p className="text-sm text-slate-400">{c.telefone}</p>
            </div>
            <div className="text-right text-sm text-slate-400">
              <p>
                <span className="font-bold text-yellow-400">{c.visitas}</span>{" "}
                visitas
              </p>
              <p>Última: {c.ultimaVisita}</p>
            </div>
          </li>
        ))}

        {visiveis.length === 0 && (
          <li className="p-6 text-center text-sm text-slate-400">
            Nenhum cliente encontrado com esse nome.
          </li>
        )}
      </ul>
    </div>
  );
}