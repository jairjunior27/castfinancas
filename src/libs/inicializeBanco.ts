import { SQLiteDatabase } from "expo-sqlite";

export async function InicializeDataBase(dataBase: SQLiteDatabase) {
  await dataBase.execAsync(`
    CREATE TABLE IF NOT EXISTS transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      valor REAL NOT NULL,
      icon TEXT NOT NULL,
      data TEXT NOT NULL,
      tipo TEXT NOT NULL
    );

     CREATE TABLE IF NOT EXISTS faturas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT,
      valor REAL,
      data INTEGER
    );
  `);
}
