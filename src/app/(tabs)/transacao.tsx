import { Logo } from "@/src/components/logo";
import { TransacaoItem } from "@/src/components/transacaoItem";
import { TransacaoContext } from "@/src/globalContext-Provider/context/transacaoContext";
import { transacoesType } from "@/src/types/transacoes";
import { DadosDespesas } from "@/src/utils/dadosDespesas";
import { DadosMensalCompleto } from "@/src/utils/dadosMensal";
import { DadosReceitas } from "@/src/utils/dadosReceita";
import { formatarDataParaArray } from "@/src/utils/formatData";
import { FormatDinheiroBr } from "@/src/utils/formatValor";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height, width } = Dimensions.get("window");
export default function Page() {
  const [mes, setMes] = useState(new Date().getMonth());
  const [editado, setEditado] = useState<transacoesType | null>(null);
  const [isModal, setIsModal] = useState(false);
  const ano = new Date().getFullYear();
  const transacoes = useContext(TransacaoContext);

  const isTablet = width >= 768;
  const maxHeight = isTablet ? height * 0.76 : height * 0.65;

  const hanbdleDelete = async (id: number) => {
    await transacoes?.excluirTransacoes(id);
  };
  const handleEdite = async (e: transacoesType) => {
    setEditado(e);
    setIsModal(true);
  };
  const handleMinus = () => {
    if (mes > 0 && setMes) {
      setMes(mes - 1);
    }
  };
  const handlePlus = () => {
    if (mes < 11) {
      setMes(mes + 1);
    }
  };

  const dadosFiltrados = transacoes?.transacao.filter((i) => {
    const [, mesAtual, anoAtual] = formatarDataParaArray(i.data);
    return mes === mesAtual && ano === anoAtual;
  });

  const handleEdit = async (t: transacoesType) => {
    await transacoes?.editarTransacoes(t);
    setIsModal(false);
  };

  return (
    <SafeAreaView className="  flex-1 ">
      <View className="bg-slate-900 p-10">
        <Logo />
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-gray-200">
              Quantidade: {dadosFiltrados?.length}
            </Text>
          </View>
          <View className="flex-row items-center justify-end mt-8">
            <TouchableOpacity onPress={handleMinus}>
              <Feather name="chevron-left" size={32} color="#fff" />
            </TouchableOpacity>
            <Text className="text-gray-200">
              {DadosMensalCompleto[mes]}/{transacoes?.anoAtual}
            </Text>
            <TouchableOpacity onPress={handlePlus}>
              <Feather name="chevron-right" size={32} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text className="text-center mt-6 text-lg md:text-2xl font-bold text-gray-600">
        Transações
      </Text>
      <View style={{ height: maxHeight }} className="p-4  ">
        {dadosFiltrados && dadosFiltrados?.length === 0 && (
          <Text className="text-gray-900 font-semibold text-xl text-center">
            Não existe dados !!!
          </Text>
        )}
        {dadosFiltrados && dadosFiltrados?.length > 0 && (
          <FlatList
            data={dadosFiltrados}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const cor =
                DadosDespesas.find((i) => i.icon === item.icon)?.cor ||
                DadosReceitas.find((j) => j.icon === item.icon)?.color ||
                "";

              return (
                <TransacaoItem
                  color={cor}
                  data={item.data}
                  icon={item.icon}
                  label={item.tipo}
                  title={item.title}
                  valor={item.valor}
                  onDelete={() => hanbdleDelete(item.id)}
                  onEdit={() => handleEdite(item)}
                />
              );
            }}
          />
        )}
      </View>
      <Modal visible={isModal} animationType="slide">
        <View className="bg-slate-900 flex-1 p-6 ">
          <View className="flex-row   items-center my-8">
            <TouchableOpacity
              onPress={() => setIsModal(false)}
              className="bg-yellow-500 rounded-full ml-3"
            >
              <Feather name="chevron-left" size={28} color="#fff" />
            </TouchableOpacity>
            <Text className="text-gray-200 text-lg text-center flex-1  ">
              Editar Transação
            </Text>
          </View>
          <Logo />
          <View className="my-10">
            <TextInput
              className="bg-gray-200 p-4   rounded-xl mb-10"
              value={editado?.title || ""}
              onChangeText={(e) =>
                setEditado((prev) => (prev ? { ...prev, title: e } : null))
              }
            />
            <TextInput
              value={
                editado?.valor !== undefined
                  ? FormatDinheiroBr(editado.valor)
                  : ""
              }
              className="bg-gray-200  p-4  rounded-xl mb-8"
              keyboardType="numeric"
              onChangeText={(texto) => {
                const numero = Number(texto.replace(/\D/g, "")) / 100;
                setEditado((prev) =>
                  prev ? { ...prev, valor: numero } : null
                );
              }}
            />

            <TouchableOpacity
              className="bg-yellow-400 p-4 rounded-xl items-center justify-center font-semibold mt-10"
              style={{width: "100%", maxWidth: 800, alignSelf: "center"}}
              onPress={() => editado && handleEdit(editado)}
            >
              <Text>Editar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
