import { Balanco } from "@/src/components/balanco";
import { Header } from "@/src/components/header";


import { StatusBar, View } from "react-native";

export default function Home() {

  

  return (
    <View className=" flex-1 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />
      <View className="mx-4">
        <Balanco/>
      </View>
    </View>
  );
}
