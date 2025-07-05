import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTYpe } from "../types/user";

export const CadastroUserAsync = async (value: UserTYpe) => {
  try {
    const user = JSON.stringify(value);
    await AsyncStorage.setItem("cadastro", user);
  } catch (e) {
    console.log("erro ao cadastrar storage ", e);
  }
};

export const getCadastro = async () => {
  try {
    const user = await AsyncStorage.getItem("cadastro");
    return user != null ? JSON.parse(user) : null;
  } catch (e) {
    console.log("não foi possivel carregar os dados", e);
  }
};

export const atualizarImagem = async (novaImagem: string) => {
  const dados = await getCadastro();
  if (dados) {
    const atualizado = { ...dados, imagem: novaImagem };
    await CadastroUserAsync(atualizado);
    return atualizado;
  }
  return null;
};
