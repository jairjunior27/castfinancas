import { Logo } from "@/src/components/logo";
import { TransacaoContext } from "@/src/globalContext-Provider/context/transacaoContext";
import { DadosMensalCompleto } from "@/src/utils/dadosMensal";
import { FormatDinheiroBr } from "@/src/utils/formatValor";
import { gerarPDF } from "@/src/utils/gerarPdf";
import { Feather } from "@expo/vector-icons";
import { useContext, useRef } from "react";
import {
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import ViewShot from "react-native-view-shot";
import { LineSegment, VictoryPie, VictoryTheme } from "victory-native";
export default function Page() {
  const { width, height } = Dimensions.get("window");
  const { width: screenWidth } = useWindowDimensions();
  const transacao = useContext(TransacaoContext);
  if (!transacao) return null;
  const data = DadosMensalCompleto;
  const graficoRef = useRef<View>(null);
  const isTablet = screenWidth >= 768;

  const handleMinus = () => {
    if (transacao?.mesAtual > 0) {
      transacao?.setMesAtual(transacao.mesAtual - 1);
    }
  };

  const handlePlus = () => {
    if (transacao.mesAtual < 11) {
      transacao.setMesAtual(transacao.mesAtual + 1);
    }
  };

  let totalDespesas = 0;
  let totalReceitas = 0;
  let entradaAnterior = 0;
  let saidaAnterior = 0;

  const transacaoFiltrada = transacao.transacao.filter((t) => {
    const data = t.data.split(",")[0];
    const [, mes, ano] = data.split("/");
    return (
      Number(mes) - 1 === transacao.mesAtual &&
      Number(ano) === transacao.anoAtual
    );
  });

  transacaoFiltrada.forEach((i) => {
    if (i.tipo === "Entrada") totalReceitas += i.valor;
    if (i.tipo === "Saida") totalDespesas += i.valor;
  });

  const transacaoAnterior = transacao.transacao.filter((t) => {
    const data = t.data.split(",")[0];
    const [, mes, ano] = data.split("/");
    return (
      Number(mes) - 1 === transacao.mesAtual - 1 &&
      Number(ano) === transacao.anoAtual
    );
  });

  transacaoAnterior.forEach((i) => {
    if (i.tipo === "Entrada") entradaAnterior += i.valor;
    if (i.tipo === "Saida") saidaAnterior += i.valor;
  });

  const dados = [
    { x: "Receita", y: totalReceitas, fill: "#22c55e" },
    { x: "Despesa", y: totalDespesas, fill: "#ef4444" },
  ];

  const temDados = totalDespesas > 0 || totalReceitas > 0;
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-slate-900 p-10">
        <Logo />
        <View className="flex-row items-center justify-center  mt-6">
          <TouchableOpacity onPress={handleMinus}>
            <Feather name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <Text className="mx-20 text-gray-200 text-lg font-semibold">
            {transacao && data[transacao?.mesAtual]}/{transacao?.anoAtual}
          </Text>
          <TouchableOpacity onPress={handlePlus}>
            <Feather name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="mx-6 mt-10 ">
        {temDados ? (
          <View className="justify-center items-center   ">
            <View className="flex-row  mb-4 ">
              <Text className="text-sm md:text-lg  font-semibold mr-6">
                Despesas: {FormatDinheiroBr(totalDespesas)}
              </Text>
              <Text className="text-sm  md:text-lg font-semibold">
                Entradas: {FormatDinheiroBr(totalReceitas)}
              </Text>
            </View>
            <ViewShot ref={graficoRef} options={{ format: "png", quality: 1 }}>
              <VictoryPie
                theme={VictoryTheme.clean}
                radius={isTablet ? 200 : 100}
                padAngle={3}
                width={isTablet ? width * 0.9 : width * 0.7}
                height={isTablet ? height * 0.5 : height * 0.4}
                labelIndicator={
                  <LineSegment
                    style={{
                      labels: { fontSize: 18 },
                      stroke: "gray",
                      strokeDasharray: 8,
                    }}
                  />
                }
                data={dados}
                colorScale={dados.map((c) => c.fill)}
              />
            </ViewShot>

            <View className="my-5 flex-row items-center ">
              <Text className="text-sm md:text-lg">Saldo mensal:</Text>
              <Text
                className="mx-2 text-sm md:text-lg"
                style={
                  totalReceitas - totalDespesas > 0
                    ? { color: "#22c55e" }
                    : { color: "#ef4444" }
                }
              >
                {FormatDinheiroBr(totalReceitas - totalDespesas)}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#334155",
                padding: 16,
                borderRadius: 12,
                width: "100%",
                maxWidth: 600,
                alignSelf: "center",
                marginTop: 20,
              }}
              className="bg-slate-700  rounded-xl  "
              onPress={() =>
                gerarPDF(
                  graficoRef,
                  transacao.mesAtual,
                  transacao.anoAtual,
                  { entradas: totalReceitas, saidas: totalDespesas },
                  { entradas: entradaAnterior, saidas: saidaAnterior }
                )
              }
            >
              <Text className="text-gray-200 text-center">Baixar pdf</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-center mt-10">Não existe dados</Text>
        )}
      </View>
    </SafeAreaView>
  );
}
