import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

type prop = {
  label: string;
  icon: any;
  isSelect: boolean;
  onPress: () => void;
};
export const SelectedIcon = ({ label, icon, onPress, isSelect }: prop) => {
  return (
    <TouchableOpacity onPress={onPress} className="mt-10 mx-2">
      <Feather
        name={icon}
        size={28}
        style={
          isSelect
            ? { color: "#FFD700" }
            : { color: "#808080" }
        }
        className="text-center"
      />
      <Text className="text-xs text-gray-400">{label}</Text>
    </TouchableOpacity>
  );
};
