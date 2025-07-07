import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native";

export const Logo = () => {
  return (
    <View className="flex-row items-center justify-center ">
      <Feather name="trending-up" size={32} color="#bcbc" />
      <Text className="text-4xl text-gray-400 ml-2">Cast</Text>
      <Text className="text-4xl text-green-800">Finanças</Text>
    </View>
  );
};
