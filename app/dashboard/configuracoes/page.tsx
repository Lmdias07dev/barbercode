"use client";

import { useState } from "react";

const dias = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

export default function ConfiguracoesPage() {
  const [nome, setNome] = useState("Barbearia do Lucas");
  const [telefone, setTelefone] = useState("(92) 99999-0000");
  const [endereco, setEndereco] = useState("Manaus, AM");
  const [abertura, setAbertura] = useState("09:00");
  const [fechamento, setFechamento] = useState("19:00");
  const [intervalo, setIntervalo] = useState("30");
  const [abertos, setAbertos] = useState<string[]>([
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
  ]);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function alternarDia(dia: string) {
    setMensagem("");
    setAbertos((atual) =>
      atual.includes(dia) ? atual.filter((d) => d !== dia) : [...atual, dia]
    );
  }

  function salvar() {
    setMensagem("");

    if (nome.trim().length < 3) {
      setErro("Digite o nome da barbearia.");
      return;
    }
    if (abertura >= fechamento) {
      setErro("O horário de fechamento precisa ser depois da abertura.");
      return;
    }
    if (abertos.length === 0) {
      setErro("Escolha pelo menos um dia de funcionamento.");
      return;
    }

    setErro("");
    // TODO: salvar no banco de dados
    setMensagem("Configurações salvas.");
  }

  const campo =
    "mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2.5 outline-none focus:border-yellow-400";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold">Configurações</h1>
      <p className="mt-1 text-sm text-slate-400">
        Dados e horário de funcionamento da sua barbearia.
      </p>

      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="font-semibold">Dados da barbearia</h2>

        <label className="mt-4 block text-sm text-slate-300" htmlFor="nome">
          Nome
        </label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={campo}
        />

        <label className="mt-4 block text-sm text-slate-300" htmlFor="tel">
          Telefone
        </label>
        <input
          id="tel"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          className={campo}
        />

        <label className="mt-4 block text-sm text-slate-300" htmlFor="end">
          Endereço
        </label>
        <input
          id="end"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className={campo}
        />
      </section>

      <section className="mt-6 rounded-xl border border-white/10 bg-slate-900 p-5">
        <h2 className="font-semibold">Horário de funcionamento</h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm text-slate-300" htmlFor="abre">
              Abre às
            </label>
            <input
              id="abre"
              type="time"
              value={abertura}
              onChange={(e) => setAbertura(e.target.value)}
              className={campo}
            />
          </div>
          <div>
            <label className="text-sm text-slate-300" htmlFor="fecha">
              Fecha às
            </label>
            <input
              id="fecha"
              type="time"
              value={fechamento}
              onChange={(e) => setFechamento(e.target.value)}
              className={campo}
            />
          </div>
          <div>
            <label className="text-sm text-slate-300" htmlFor="intervalo">
              Intervalo entre horários
            </label>
            <select
              id="intervalo"
              value={intervalo}
              onChange={(e) => setIntervalo(e.target.value)}
              className={campo}
            >
              <option value="15">15 minutos</option>
              <option value="30">30 minutos</option>
              <option value="45">45 minutos</option>
              <option value="60">60 minutos</option>
            </select>
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-300">Dias de funcionamento</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {dias.map((dia) => (
            <button
              key={dia}
              type="button"
              onClick={() => alternarDia(dia)}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                abertos.includes(dia)
                  ? "bg-yellow-400 font-semibold text-slate-950"
                  : "bg-slate-800 text-slate-300 hover:bg-white/10"
              }`}
            >
              {dia}
            </button>
          ))}
        </div>
      </section>

      {erro && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          {erro}
        </p>
      )}
      {mensagem && (
        <p role="status" className="mt-4 text-sm text-green-400">
          {mensagem}
        </p>
      )}

      <button
        onClick={salvar}
        className="mt-4 rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-yellow-300"
      >
        Salvar configurações
      </button>
    </div>
  );
}