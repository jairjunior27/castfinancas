import { Text, View } from "react-native";

export const Balanco = () => {
  return (
    <View className="bg-gray-200 rounded-2xl -mt-10  sm:mt-6 p-4 mb-4 " style={{shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,}}>
      <View className="flex-row mb-2 ">
        <View className="flex-1 ">
          <Text className="mb-1 font-bold text-md md:text-lg">Entradas</Text>
          <Text className="mb-1 font-normal text-md md:text-lg">R$ 1000</Text>
        </View>
        <View className="flex-1 ">
          <Text className="mb-1 font-bold text-md md:text-lg">Saidas</Text>
          <Text className="mb-1 font-normal text-md md:text-lg">..</Text>
        </View>
      </View>
      <View className="">
        <Text className="mb-1 font-bold text-md md:text-lg">Total</Text>
        <Text className="mb-1 font-normal text-md md:text-lg">..</Text>
      </View>
    </View>
  );
};
