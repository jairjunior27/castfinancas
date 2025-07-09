import { Logo } from "@/src/components/logo";
import { useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [idioma, setIdioma] = useState<"br" | "en">("en");
  const [valorFormatado, setValorFormatado] = useState("");
  const [items, setItems] = useState([
    { label: "Brasil", value: "br" },
    { label: "USD Americano", value: "en" },
  ]);

  const [paraOpen, setParaOpen] = useState(false);
  const [idiomaPara, setIdiomaPara] = useState<"br" | "en">("br");
  const [itemsPara, setItemsPara] = useState([
    { label: "Brasil", value: "br" },
    { label: "USD Americano", value: "en" },
  ]);

  const [valor, setValor] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);
  const [cotacao, setCotacao] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const mapToCurrencyCode = {
    br: "BRL",
    en: "USD",
  };

  const buscarCotacao = async () => {
    if (!valor || isNaN(Number(valor.replace(",", ".")))) {
      setResultado("Valor inválido");
      return;
    }

    const de = mapToCurrencyCode[idioma];
    const para = mapToCurrencyCode[idiomaPara];

    if (de === para) {
      setResultado("As moedas selecionadas são iguais.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${de}-${para}`
      );
      const data = await res.json();
      const key = `${de}${para}`;
      const bid = parseFloat(data[key].bid);

      setCotacao(bid);

      const valorNumerico = parseFloat(valor.replace(",", "."));
      const convertido = (valorNumerico * bid).toLocaleString(
        idiomaPara === "en" ? "en-US" : "pt-BR",
        {
          style: "currency",
          currency: para,
        }
      );
      setResultado(convertido);
    } catch (err) {
      setResultado("Erro ao buscar cotação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full max-w-4xl mx-auto px-4 mt-12 ">
      <Logo />
      <Text className="text-xl sm:text-2xl text-center my-6  font-semibold">
        Conversor de Moeda
      </Text>

      <Text className="mb-2 text-gray-500">De:</Text>
      <DropDownPicker
        open={open}
        items={items}
        setOpen={setOpen}
        setValue={setIdioma}
        value={idioma}
        setItems={setItems}
        style={{ marginBottom: 70 }}
      />

      <Text className="my-2 text-gray-500">Para:</Text>
      <DropDownPicker
        open={paraOpen}
        items={itemsPara}
        setOpen={setParaOpen}
        setValue={setIdiomaPara}
        value={idiomaPara}
        setItems={setItemsPara}
        style={{ marginBottom: 20 }}
      />

      <TextInput
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={valorFormatado}
        onChangeText={(e) => {
          const apenasNumeros = e.replace(/\D/g, "");
          const numero = (parseInt(apenasNumeros || "0", 10) / 100).toFixed(2);
          const numeroReal = Number(numero);
          setValor(numeroReal.toString());
          setValorFormatado(
            numeroReal.toLocaleString(idioma === "en" ? "en-US" : "pt-BR", {
              style: "currency",
              currency: idioma === "en" ? "USD" : "BRL",
            })
          );
        }}
        className="border-1 rounded-md p-3 my-4 border-slate-900 mb-4 text-lg outline-0"
      />

      <TouchableOpacity
        className="bg-slate-700 p-4 rounded-md items-center"
        onPress={buscarCotacao}
      >
        <Text className="text-white font-bold">Converter</Text>
      </TouchableOpacity>

      <View className="mt-6 items-center">
        {loading && <ActivityIndicator size="large" color="#555" />}
        {!loading && resultado && (
          <>
            {cotacao && (
              <Text className="text-gray-500">
                Cotação atual: {cotacao.toFixed(2)}
              </Text>
            )}
            <Text className="text-xl font-semibold text-gray-800 mt-2">
              {resultado}
            </Text>
          </>
        )}
      </View>
    </View>
  );
}
