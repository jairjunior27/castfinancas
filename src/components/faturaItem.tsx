import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { FaturaType } from "../types/faturaType";
import { formatarDataTimestamp } from "../utils/formatData";

type prop = {
  fatura: FaturaType;
  onDelete: (id: number) => void;
};
export const FaturaItem = ({ fatura, onDelete }: prop) => {
  return (
    <View className="flex-row items-center  border-2 border-dotted border-slate-500 p-1 mb-6">
      <Feather name="file-text" size={24} color="#879" />
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        className="mx-4 text-sm md:text-lg text-gray-900 flex-1 my-3"
      >
        {fatura.titulo}
      </Text>
      <Text className="mx-3 text-red-800 font-semibold">
        {formatarDataTimestamp(fatura.data)}
      </Text>
      <TouchableOpacity onPress={() => onDelete(fatura.id)}>
        <Feather name="trash" size={20} color="#047" />
      </TouchableOpacity>
    </View>
  );
};
