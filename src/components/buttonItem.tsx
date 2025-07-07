import { Text, TouchableOpacity } from "react-native";

type prop = {
  label: string;
  clickButton: () => void;
  isSelected: boolean;
};

export const ButtonItem = ({ label, clickButton, isSelected }: prop) => {
  return (
    <TouchableOpacity
      onPress={clickButton}
      className="mx-3 p-2 rounded-2xl w-[90px] md:w-[300px] "
      style={
        isSelected
          ? { backgroundColor: "#eab308" }
          : { backgroundColor: "#fff" }
      }
    >
      <Text
        className="text-center font-medium"
        style={isSelected ? { color: "#fff" } : { color: "#111" }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
