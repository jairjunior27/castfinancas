import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");
const imageSize = Math.min(width * 0.6, 400);
const w = width * 0.99;
const h = height * 0.7;

const data = [
  {
    title: "Bem-vindo(a) ao Cast Finanças",
    description:
      "Organize suas finanças de forma simples e eficiente com o Cast Finanças: registre transações, acompanhe gráficos, receba notificações e baixe relatórios em PDF.  ",
    image: require("../assets/images/controle1.png"),
  },
  {
    title: "Adicione suas transações",
    description:
      "Toque no botão destacado para registrar receitas, despesas ou faturas, como mostra a imagem acima.",
    image: require("../assets/images/imagem1.jpeg"),
  },
  {
    title: "Escolha uma Opção:",
    description:
      "Para adicionar uma transação, selecione uma das opções: Despesa, Receita ou Fatura. Para voltar, toque no botão ao lado do texto 'Adicionar Transação'.",
    image: require("../assets/images/imagem2.jpeg"),
  },
  {
    title: "Escolhendo Despesas:",
    description:
      "Logo abaixo dos botões Despesa, Receita e Fatura, você verá ícones de categorias. Selecione o que melhor representa sua transação e deslize para a esquerda ou direita para ver mais opções. Em seguida, preencha o título, valor e data, e toque em 'Enviar' para finalizar.",
    image: require("../assets/images/imagemdespesa.jpeg"),
  },
  {
    title: "Escolhendo Receita:",
    description:
      "Logo abaixo dos botões Despesa, Receita e Fatura, você verá ícones de categorias. Selecione o que melhor representa sua transação e deslize para a esquerda ou direita para ver mais opções. Em seguida, preencha o título, valor e data, e toque em 'Enviar' para finalizar.",
    image: require("../assets/images/imagemreceita.jpeg"),
  },
  {
    title: "Escolhendo Fatura:",
    description:
      "Informe o título, o valor e a data da fatura. Em seguida, toque em 'Salvar Fatura' para concluir o cadastro.",
    image: require("../assets/images/imagemfatura.jpeg"),
  },
  {
    title: "Analise seus Gastos:",
    description:
      "Na tela de Gráficos, veja suas receitas e despesas semanais e baixe o relatório em PDF com um toque.",
    image: require("../assets/images/telaGrafico.jpeg"),
  },
  {
    title: "Transações:",
    description:
      "Gerencie suas transações diretamente na tela de Transações: veja, edite ou exclua conforme necessário.",
    image: require("../assets/images/telaTransacao.jpeg"),
  },
  {
    title: "Veja suas Faturas:",
    description:
      "Quando você adiciona uma fatura, ela fica visível na tela de Faturas até o dia do vencimento. No dia do vencimento, você receberá uma notificação avisando que a fatura está para vencer. Após o vencimento, a fatura será excluída automaticamente.",
    image: require("../assets/images/telaFatura.jpeg"),
  },
  {
    description:
      "Confira gráficos e balanços que vão te ajudar a se organizar melhor.",
    image: require("../assets/images/dolar.png"),
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDone = useCallback(() => {
    router.replace("/cadastro");
  }, [router]);

  return (
    <SafeAreaView className="flex-1  items-center justify-center  bg-white px-4 ">
      <Carousel
        width={w}
        height={h}
        data={data}
        loop={false}
        onSnapToItem={setCurrentIndex}
        renderItem={({ item }) => (
          <View className="items-center justify-center h-full ">
            <Text className="text-xl md:text-4xl font-bold text-center mb-8 text-gray-800">
              {item.title}
            </Text>
            <View style={{ height: imageSize, width: imageSize }}>
              <Image
                source={item.image}
                style={{ width: "100%", height: "100%" }}
                resizeMode="contain"
              />
            </View>

            <Text className="text-md md:text-lg  text-center  font-light m-4  text-gray-900  max-w-[800px]">
              {item.description.trim()}
            </Text>
          </View>
        )}
      />

      <View className="mt-10 justify-center items-center">
        {currentIndex === data.length - 1 ? (
          <TouchableOpacity
            onPress={handleDone}
            className="bg-blue-600 px-6 py-3 rounded-md"
          >
            <Text className="text-white font-semibold text-lg">Começar</Text>
          </TouchableOpacity>
        ) : (
          <Text className="text-gray-500">
            {currentIndex + 1} / {data.length}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}
