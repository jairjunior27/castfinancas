import { useContext } from "react";
import { Dimensions, FlatList, Text, View } from "react-native";
import { TransacaoContext } from "../globalContext-Provider/context/transacaoContext";
import { DadosDespesas } from "../utils/dadosDespesas";
import { DadosReceitas } from "../utils/dadosReceita";
import { formatarDataParaArray } from "../utils/formatData";
import { TransacaoItem } from "./transacaoItem";
const { height } = Dimensions.get("window");

export const Transacao = () => {
  const transacao = useContext(TransacaoContext);
  const maxHeigth = height * 0.47;

  const transascaoReverse = [...(transacao?.transacao || [])].reverse();

  const dadosFiltrados = transascaoReverse.filter((f) => {
    const [, mes, ] = formatarDataParaArray(f.data);
    return transacao?.mesAtual  === mes
  });
  return (
    <View className="" style={{ height: maxHeigth }}>
      <Text className="text-center">Ultimas Transações</Text>
      {dadosFiltrados.length <= 0 && <Text className="text-center mt-5 text-xl ">Não existe transação.</Text>}

     {dadosFiltrados.length  > 0 &&  <FlatList
        data={dadosFiltrados}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const cor =
            DadosDespesas.find((i) => i.icon === item.icon)?.cor ||
            DadosReceitas.find((j) => j.icon === item.icon)?.color ||
            "";

          return (
            <TransacaoItem
              data={item.data}
              color={cor}
              icon={item.icon}
              label={item.tipo}
              title={item.title}
              valor={item.valor}
            />
          );
        }}
      />}
    </View>
  );
};
