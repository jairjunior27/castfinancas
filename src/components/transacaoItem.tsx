import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { FormatData } from "../utils/formatData";
import { FormatDinheiroBr } from "../utils/formatValor";

type prop = {
  icon: any;
  title: string;
  valor: number;
  data: string;
  color: string;
  label: string;
  onEdit?: () => void;
  onDelete?: () => void;
};
export const TransacaoItem = ({
  icon,
  title,
  valor,
  data,
  color,
  label,
  onEdit,
  onDelete,
}: prop) => {
  return (
    <View className="my-4 mx-2 items-center p-2 rounded   border-2 border-dotted border-slate-500">
      <View className="flex-row ">
        <View className="items-center">
          <Feather name={icon} size={22} color={color} />
          <Text className="text-xs">{label}</Text>
        </View>
        <Text
          className="mx-4 text-gray-800 font-semibold text-lg flex-1 w-[140px] "
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <View className="flex-col justify-end items-end">
          <Text
            className="font-semibold text-sm"
            style={
              label === "Saida" ? { color: "#ef4444" } : { color: "#15803d" }
            }
          >
            {FormatDinheiroBr(valor)}
          </Text>
          <Text className="text-xs">{FormatData(data)}</Text>
        </View>
      </View>

      {onDelete && onEdit && (
        <View className="flex-row  w-full justify-end  my-2">
          <TouchableOpacity className="mx-4" onPress={onEdit}>
            <Feather name="edit" size={20} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Feather name="trash" size={20}  color="#ef4444" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
