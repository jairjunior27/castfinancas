import { useDataBaseTransacoes } from "@/src/libs/bancoTransacao";
import { UserType } from "@/src/types/user";
import { AtualizarUsuario, getCadastro } from "@/src/utils/userAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { ReactNode, useEffect, useState } from "react";
import { Alert } from "react-native";
import { UserContext } from "../context/userContext";
import { useDataBaseFatura } from "@/src/libs/bancoFatura";

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isModal, setIsModal] = useState<boolean>(false);
  const { clearAll } = useDataBaseTransacoes();
  const {removeTodasFaturas} = useDataBaseFatura()

  const route = useRouter();

  const loadUser = async () => {
    const data = await getCadastro();
    setUser(data || []);
  };

  useEffect(() => {
    const getAll = async () => {
      await loadUser();
    };
    getAll();
  }, []);

  const excluirConta = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir sua conta e todos os dados? Essa ação é irreversível.",

      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("cadastro");
              await clearAll();
              await removeTodasFaturas()
              setUser(null);
              route.replace("/");
            } catch (e) {
              console.log("Erro ao excluir dados:", e);
            }
          },
        },
      ]
    );
  };

  const editarConta = async (novo: UserType) => {
    await AtualizarUsuario(novo);
    await loadUser();
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isModal, setIsModal, excluirConta, editarConta }}
    >
      {children}
    </UserContext.Provider>
  );
};
