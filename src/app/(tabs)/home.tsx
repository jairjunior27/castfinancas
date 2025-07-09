import { Balanco } from "@/src/components/balanco";
import { ButtonInfo } from "@/src/components/buttonInfo";
import { Header } from "@/src/components/header";
import { Transacao } from "@/src/components/transacao";
import { UserContext } from "@/src/globalContext-Provider/context/userContext";
import { Feather } from "@expo/vector-icons";
import { useContext, useState } from "react";

import { Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  const user = useContext(UserContext);
  return (
    <View className=" flex-1 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header />
      <View className="mx-4">
        <Balanco />
        <Transacao />

        <Modal
          visible={user?.isModal}
          animationType="slide"
          onRequestClose={() => user?.setIsModal(false)}
        >
          <View className="bg-slate-800 flex-1 pt-8">
            <View className=" p-4">
              <View className="flex-row">
                <TouchableOpacity onPress={() => user?.setIsModal(false)}>
                  <View className="bg-yellow-400 rounded-full">
                    <Feather name="chevron-left" size={26} color="#fff" />
                  </View>
                </TouchableOpacity>
                <Text className="flex-1 text-center text-lg text-gray-300 md:text-2xl">
                  Adcionar Transação
                </Text>
              </View>
            </View>

            <View>
              <ButtonInfo />
            </View>
          </View>
        </Modal>
      </View>
      <TouchableOpacity
        className="bg-slate-600 absolute right-6 bottom-7 p-3 rounded-full "
        onPress={() => user?.setIsModal(true)}
      >
        <Feather name="plus" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
