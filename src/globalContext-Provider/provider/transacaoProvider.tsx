import { useDataBaseTransacoes } from "@/src/libs/bancoTransacao";
import { transacoesType } from "@/src/types/transacoes";
import { ReactNode, useEffect, useState } from "react";
import { TransacaoContext } from "../context/transacaoContext";

export const TransacaoProvider = ({ children }: { children: ReactNode }) => {
  const [transacao, setTransacao] = useState<transacoesType[]>([]);
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const { create, getAll, remove, update } = useDataBaseTransacoes();

  const loadTransacoes = async () => {
    const data = await getAll();
    setTransacao(data || []);
  };

  useEffect(() => {
    const all = async () => {
      await loadTransacoes();
    };
    all();
  }, []);

  const adcionarTransacoes = async (novatransacao: transacoesType) => {
    await create(novatransacao);
    await loadTransacoes();
  };

  const excluirTransacoes = async (id: number) => {
    await remove(id);
    await loadTransacoes();
  };
  const editarTransacoes = async (novatransacao: transacoesType) => {
    await update(novatransacao);
    await loadTransacoes();
  };

  return (
    <TransacaoContext.Provider
      value={{
        adcionarTransacoes,
        transacao,
        loadTransacoes,
        mesAtual,
        setMesAtual,
        anoAtual,
        setAnoAtual,
        editarTransacoes,
        excluirTransacoes,
      }}
    >
      {children}
    </TransacaoContext.Provider>
  );
};
