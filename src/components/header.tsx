import { useContext } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { UserContext } from "../globalContext-Provider/context/userContext";
import { Logo } from "./logo";

const { height, width } = Dimensions.get("window");
const headerScreen = width <= 764;
const h = headerScreen ? height * 0.3 : height * 0.15;

export const Header = () => {
  const user = useContext(UserContext);

  return (
    <View
      className="bg-slate-900  p-12 rounded-b-2xl "
      style={{ height: h } }
    >
      <Logo />
      <View className="flex-row items-center my-2">
        <Text className="text-gray-200">Bem vindo (a)</Text>
        <Text
          className="text-gray-200 mx-2 font-extralight w-[100px] flex-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user?.user?.nome}
        </Text>
        {typeof user?.user?.imagem === "string" && (
          <View
            style={{ width: 60, height: 60 }}
            className="rounded-full border-2 border-yellow-100 overflow-hidden "
          >
            <Image
              source={{ uri: user.user.imagem }}
              className="w-full h-full "
              resizeMode="cover"
            />
          </View>
        )}
      </View>
    </View>
  );
};
