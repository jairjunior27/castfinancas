import { FaturaItem } from "@/src/components/faturaItem";
import { Logo } from "@/src/components/logo";
import { useDataBaseFatura } from "@/src/libs/bancoFatura";
import { FaturaType } from "@/src/types/faturaType";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Dimensions, FlatList, SafeAreaView, StatusBar, Text, View } from "react-native";
const { height,width } = Dimensions.get("window");

export default function page() {
  const [fatura, setFatura] = useState<FaturaType[]>([]);
  const { getAllFatura, removeFatura } = useDataBaseFatura();
  const [msg, setMsg] = useState("");

  const isTablet = width >= 764
  const maxHeigth = isTablet ? height * 0.77 : height * .62
  useFocusEffect(
    useCallback(() => {
      loadFatura();
    }, [])
  );

  const loadFatura = async () => {
    const dados = await getAllFatura();
    setFatura(dados);
  };

  useEffect(() => {
    if (!msg) return;
    const time = setTimeout(() => {
      setMsg("");
    }, 3000);
    return () => clearTimeout(time);
  }, [msg]);

  useEffect(() => {
    loadFatura();
  }, []);

  const handleDelete = async (id: number) => {
    const item = fatura.find((i) => i.id === id);
    await removeFatura(id);
    setMsg(`Fatura ${item?.titulo} removida`);
    await loadFatura();
  };
  return (
    <SafeAreaView className=" flex-1 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View className=" bg-slate-900 p-16 rounded-b-lg">
        <Logo />
      </View>
      <Text className="text-center mt-8 text-xl font-semibold">
        Faturas a vencer
      </Text>
      <View
        className="px-8  border-b-2 border-dashed border-yellow-700 py-4"
        style={{ height: maxHeigth }}
      >
        <View className="my-4 items-end ">
          <Text className="text-slate-700 text-sm font-bold">
            Total de faturas:{" "}
            {fatura.length < 10 ? `0${fatura.length}` : fatura.length}
          </Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={fatura}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <FaturaItem key={item.id} fatura={item} onDelete={handleDelete} />
          )}
        />
      </View>
      {msg && (
        <Text className="text-center text-sm font-bold text-gray-800 p-4">
          {msg}
        </Text>
      )}
    </SafeAreaView>
  );
}
