import { transacoesType } from "@/src/types/transacoes";
import { createContext } from "react";
interface transacoesContext {
  transacao: transacoesType[];
  adcionarTransacoes: (novatransacao: transacoesType) => Promise<void>;
  excluirTransacoes: (id: number) => void;
  editarTransacoes: (novaTransacao: transacoesType) => void;
  loadTransacoes: () => void;
  mesAtual: number;
  setMesAtual: (mes: number) => void;
  anoAtual: number;
  setAnoAtual: (mes: number) => void;
}
export const TransacaoContext = createContext<transacoesContext | undefined>(
  undefined
);
