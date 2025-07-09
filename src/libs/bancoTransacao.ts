import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { transacoesType } from "../types/transacoes";
import { InicializeDataBase } from "./inicializeBanco";

export function useDataBaseTransacoes() {
  const db = useSQLiteContext();

  useEffect(() => {
    const initDataBase = async () => {
      try {
        await InicializeDataBase(db);
      } catch (e) {
        console.error("Erro ao inicializar banco de dados:", e);
      }
    };
    initDataBase();
  }, [db]);

  const create = async (data: transacoesType) => {
    try {
      const stmt = await db.prepareAsync(
        "INSERT INTO transacoes(title, valor, icon, data, tipo) VALUES ($title, $valor, $icon, $data, $tipo)"
      );
      const result = await stmt.executeAsync({
        $title: data.title,
        $valor: data.valor,
        $icon: data.icon,
        $data: data.data,
        $tipo: data.tipo,
      });
      return { insertRowId: result.lastInsertRowId?.toString() };
    } catch (e) {
      console.error("Erro ao inserir transação:", e);
      throw e;
    }
  };

  const getAll = async (): Promise<transacoesType[]> => {
    try {
      const result = await db.getAllAsync<transacoesType>(
        "SELECT * FROM transacoes;"
      );
      return result;
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
      return [];
    }
  };

  const update = async (transacao: transacoesType) => {
    if (!transacao.id) return;
    try {
      await db.runAsync(
        `UPDATE transacoes SET title = ?, valor = ?, icon = ?, data = ?, tipo = ? WHERE id = ?;`,
        [
          transacao.title,
          transacao.valor,
          transacao.icon,
          transacao.data,
          transacao.tipo,
          transacao.id,
        ]
      );
    } catch (error) {
      console.error("Erro ao editar transação:", error);
    }
  };

  const remove = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM transacoes WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Erro ao deletar transação:", error);
    }
  };

  const clearAll = async () => {
    try {
      await db.runAsync("DELETE FROM transacoes;");
      await db.runAsync("DELETE FROM sqlite_sequence WHERE name='transacoes';");
      await InicializeDataBase(db);
    } catch (error) {
      console.error("Erro ao deletar todas as transações:", error);
    }
  };

  return {
    create,
    getAll,
    update,
    remove,
    clearAll,
  };
}
