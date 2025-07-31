import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TransacaoContext } from "../globalContext-Provider/context/transacaoContext";
import { DadosMensal } from "../utils/dadosMensal";
import { formatarDataParaArray } from "../utils/formatData";
import { FormatDinheiroBr } from "../utils/formatValor";

export const Balanco = () => {
  const [entrada, setEntrada] = useState(0);
  const [saida, setSaida] = useState(0);
  const [total, setTotal] = useState(0);

  const transacoes = useContext(TransacaoContext);
  const mesAtual = transacoes?.mesAtual ?? new Date().getMonth();
  const setMesAtual = transacoes?.setMesAtual;
  const anoAtual = transacoes?.anoAtual;

  const loadBalanco = async () => {
    const transacoesFiltradas =
      transacoes?.transacao.filter((t) => {
        const [, mes] = formatarDataParaArray(t.data);
        return mes === transacoes.mesAtual && transacoes.anoAtual === anoAtual;
      }) ?? [];

    const totalEntrada = transacoesFiltradas
      .filter((t) => t.tipo === "Entrada")
      .reduce((acc, item) => acc + item.valor, 0);
    const totalSaida = transacoesFiltradas
      .filter((t) => t.tipo === "Saida")
      .reduce((acc, item) => acc + item.valor, 0);

    setEntrada(totalEntrada);
    setSaida(totalSaida);
    setTotal(totalEntrada - totalSaida);
  };

  useEffect(() => {
    loadBalanco();
  }, [transacoes]);

  const handleMinus = () => {
    if (mesAtual > 0 && setMesAtual) {
      setMesAtual(mesAtual - 1);
    }
  };

  const handlePlus = () => {
    if (mesAtual < 11 && setMesAtual) {
      setMesAtual(mesAtual + 1);
    }
  };

  return (
    <View
      className="w-full max-w-6xl  bg-gray-200 rounded-2xl    p-4  mb-5 -mt-12 "
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 5,
      }}
    >
      <View className="flex-row mb-2 ">
        <View className="flex-1 ">
          <Text className="mb-1 font-bold text-md md:text-lg">Entradas</Text>
          <Text className="mb-1 font-normal text-md md:text-lg text-green-700">
            {FormatDinheiroBr(entrada)}
          </Text>
        </View>
        <View className="flex-1 ">
          <Text className="mb-1 font-bold text-md md:text-lg">Saidas</Text>
          <Text className="mb-1 font-normal text-md md:text-lg text-red-700">
            {FormatDinheiroBr(saida)}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <View className="flex-1">
          <Text className="mb-1 font-bold text-md md:text-lg">Total</Text>
          <Text
            className="mb-1 font-normal text-md md:text-lg"
            style={total > 0 ? { color: "#15803d" } : { color: "#b91c1c" }}
          >
            {FormatDinheiroBr(total)}
          </Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center">
            <TouchableOpacity
              className="mr-2 rounded-xl bg-slate-800"
              onPress={handleMinus}
            >
              <Feather name="chevron-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text>
              {DadosMensal[mesAtual]}/{anoAtual}
            </Text>
            <TouchableOpacity
              className="ml-2 bg-slate-800 rounded-xl"
              onPress={handlePlus}
            >
              <Feather name="chevron-right" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
