import { useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { FaturaType } from "../types/faturaType";
import { InicializeDataBase } from "./inicializeBanco";

export function useDataBaseFatura() {
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

  const adcionarFatura = async (data: FaturaType) => {
    try {
      const add = await db.prepareAsync(
        "INSERT INTO faturas(titulo, valor, data) VALUES ($titulo, $valor,  $data)"
      );
      const result = await add.executeAsync({
        $titulo: data.titulo,
        $valor: data.valor,
        $data: data.data,
      });
      return { insertRowId: result.lastInsertRowId?.toString() };
    } catch (e) {
      console.error("Erro ao inserir faturas:", e);
      throw e;
    }
  };

  const getAllFatura = async (): Promise<FaturaType[]> => {
    try {
      const result = await db.getAllAsync<FaturaType>("SELECT * FROM faturas;");
      return result;
    } catch (error) {
      console.error("Erro ao buscar faturas:", error);
      return [];
    }
  };

  const updateFatura = async (fatura: FaturaType) => {
    if (!fatura.id) return;
    try {
      await db.runAsync(
        `UPDATE faturas SET titulo = ?, valor = ?, data = ? WHERE id = ?;`,
        [fatura.titulo, fatura.valor, fatura.data, fatura.id]
      );
    } catch (error) {
      console.error("Erro ao editar faturas:", error);
    }
  };

  const removeFatura = async (id: number) => {
    try {
      await db.runAsync(`DELETE FROM faturas WHERE id = ?;`, [id]);
    } catch (error) {
      console.error("Erro ao deletar fatura:", error);
    }
  };

  const removeTodasFaturas = async () => {
    try {
      await db.runAsync(`DELETE FROM faturas`);
    } catch (error) {
      console.error("Erro ao deletar todas as faturas:", error);
    }
  };

  return {
    adcionarFatura,
    removeFatura,
    updateFatura,
    getAllFatura,
    removeTodasFaturas,
  };
}
