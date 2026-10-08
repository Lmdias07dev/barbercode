-- CreateEnum
CREATE TYPE "StatusAgendamento" AS ENUM ('PENDENTE', 'CONFIRMADO', 'CONCLUIDO');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servico" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "duracao" INTEGER NOT NULL,

    CONSTRAINT "Servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Barbeiro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL DEFAULT 'Geral',
    "inicio" TEXT NOT NULL DEFAULT '09:00',
    "fim" TEXT NOT NULL DEFAULT '18:00',
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Barbeiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "status" "StatusAgendamento" NOT NULL DEFAULT 'PENDENTE',
    "clienteId" INTEGER NOT NULL,
    "servicoId" INTEGER NOT NULL,
    "barbeiroId" INTEGER NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plano" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL DEFAULT 'Sem descrição',
    "preco" DECIMAL(10,2) NOT NULL,
    "assinantes" INTEGER NOT NULL DEFAULT 0,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Plano_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_servicoId_fkey" FOREIGN KEY ("servicoId") REFERENCES "Servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamento" ADD CONSTRAINT "Agendamento_barbeiroId_fkey" FOREIGN KEY ("barbeiroId") REFERENCES "Barbeiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
