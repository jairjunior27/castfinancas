import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { UserContext } from "../globalContext-Provider/context/userContext";
import { useDataBaseFatura } from "../libs/bancoFatura";
import { formatarMoeda } from "../utils/formatarMoeda";
import { verificaNotificacao } from "../utils/notificacao";

export const FaturaForm = () => {
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");
  const [msg, setMsg] = useState("");
  const [data, setData] = useState(new Date());
  const [isDataHoje, setIsDataHoje] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [disable, setDisable] = useState(false);
  const open = useContext(UserContext);
  const { adcionarFatura } = useDataBaseFatura();

  const isToday = (date: Date) => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return hoje.getTime() === d.getTime();
  };

  const handleDate = (_: any, selectedDate?: Date) => {
    setMostrar(Platform.OS === "ios");
    if (selectedDate) setData(selectedDate);
  };

  const handleWebDate = (e: any) => {
    const [ano, mes, dia] = e.target.value.split("-");
    const novaData = new Date(Number(ano), Number(mes) - 1, Number(dia));
    setData(novaData);
  };

  const handleFatura = async () => {
    if (!titulo || !valor) {
      return setMsg("Favor preencher todos os campos !");
    }

    if (isDataHoje) {
      return setMsg(
        "Esta fatura vence hoje! Não será  adicionada as notificações "
      );
    }

    const novaFatura = {
      id: Date.now(),
      titulo,
      valor: formatarMoeda(valor),
      data: data.getTime(),
    };

    try {
      await adcionarFatura(novaFatura);
      await verificaNotificacao(novaFatura);
      setMsg("Fatura adicionada com sucesso");
      setDisable(true);
    } catch (e) {
      console.error("Erro ao salvar fatura:", e);
    }
  };

  useEffect(() => {
    const time = setTimeout(() => {
      if (!msg) return null;
      setMsg("");
      open?.setIsModal(false);
    }, 5000);

    return () => clearTimeout(time);
  });

  useEffect(() => {
    setIsDataHoje(isToday(data));
  }, [data]);
  return (
    <View className="items-center justify-center mx-4">
      <View className="w-full sm:max-w-4xl mt-8">
        <TextInput
          placeholder="Digite o nome da Fatura"
          placeholderTextColor="#888"
          value={titulo}
          onChangeText={(e) => setTitulo(e)}
          className=" bg-gray-100 p-3 rounded-md mb-8 outline-0 mt-3"
        />

        <TextInput
          placeholder="Digite o valor R$"
          placeholderTextColor="#888"
          keyboardType="numeric"
          onChangeText={(e) => setValor(formatarMoeda(e))}
          value={valor}
          className=" bg-gray-200 p-3 rounded-md mb-4 outline-0"
        />

        <View>
          <Text className="mb-2 text-gray-500">Data da transação:</Text>

          {Platform.OS === "web" ? (
            <>
              <input
                type="date"
                value={data.toISOString().split("T")[0]}
                onChange={handleWebDate}
                placeholder="Selecione a Data"
                style={{
                  padding: 8,
                  borderColor: "#ccc",
                  outline: 0,
                  borderWidth: 1,
                  borderRadius: 6,

                  color: "#333",
                  cursor: "pointer",
                  textAlign: "center",
                }}
              />
            </>
          ) : (
            <>
              <Button
                title="Selecionar Data"
                onPress={() => setMostrar(true)}
              />
              {mostrar && (
                <DateTimePicker
                  value={data}
                  mode="date"
                  display="default"
                  onChange={handleDate}
                />
              )}
            </>
          )}

          <Text className="mt-4 mb-4 font-bold text-center text-gray-400">
            Data Selecionada: {data.toLocaleDateString("pt-BR")}
          </Text>
        </View>
      </View>
      {msg && <Text className="text-center mt-2 text-gray-200">{msg}</Text>}

      <TouchableOpacity
        className="bg-gray-400 w-full items-center justify-center p-3 rounded sm:max-w-4xl mt-4"
        disabled={disable}
        onPress={handleFatura}
      >
        <Text className="text-gray-800 font-semibold">Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};
