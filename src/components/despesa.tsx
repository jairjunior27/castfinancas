import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TransacaoContext } from "../globalContext-Provider/context/transacaoContext";
import { UserContext } from "../globalContext-Provider/context/userContext";
import { DadosDespesas } from "../utils/dadosDespesas";
import { formatarMoeda } from "../utils/formatarMoeda";
import { SelectedIcon } from "./selectedIcon";

interface CotacaoResponse {
  USDBRL: {
    code: string;
    codein: string;
    name: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };
}

export const Despesa = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState(new Date());
  const [mostrar, setMostrar] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>("");
  const tipo: "Entrada" | "Saida" = "Saida";
  const despesas = DadosDespesas;

  const transacao = useContext(TransacaoContext);
  const open = useContext(UserContext);
  const handleDate = (_: any, selectedDate?: Date) => {
    setMostrar(Platform.OS === "ios");
    if (selectedDate) setData(selectedDate);
  };

  const handleWebDate = (e: any) => {
    const [ano, mes, dia] = e.target.value.split("-");
    const novaData = new Date(Number(ano), Number(mes) - 1, Number(dia));
    setData(novaData);
  };

  const handleDespesas = async () => {
    if (!title || !valor || selected === null)
      return setMsg("Favor preencher todos os campos !");

    const novaTransacao = {
      id: new Date().getTime(),
      title,
      valor: parseFloat(
        valor
          .replace(/\./g, "")
          .replace(",", ".")
          .replace(/[^\d.-]/g, "")
      ),
      data: data.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" }),
      icon: DadosDespesas.find((item) => item.id === selected)?.icon || "",
      tipo,
    };

    try {
      await transacao?.adcionarTransacoes(novaTransacao);
      setTitle("");
      setValor("");
      setSelected(null);
      setMsg("Transação salva com sucesso !");
      setDisable(true);
    } catch (e) {
      console.error("Erro ao salvar transação:", e);
    }
  };

  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => {
      setMsg("");
      open?.setIsModal(false);
    }, 3000);

    return () => clearTimeout(time);
  }, [msg]);

  return (
    <View className="items-center justify-center mx-4">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View className="flex-row items-center">
          {despesas.map((item) => (
            <SelectedIcon
              key={item.id}
              icon={item.icon}
              label={item.label}
              isSelect={selected === item.id}
              onPress={() => setSelected(item.id)}
            />
          ))}
        </View>
      </ScrollView>

      <View className="w-full sm:max-w-4xl mt-8">
        <TextInput
          placeholder="Digite o nome da Despesa"
          placeholderTextColor="#888"
          value={title}
          onChangeText={(e) => setTitle(e)}
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
        onPress={handleDespesas}
        disabled={disable}
      >
        <Text className="text-gray-800 font-semibold">Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};
