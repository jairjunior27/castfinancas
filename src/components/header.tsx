import { useContext } from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { UserContext } from "../globalContext-Provider/context/userContext";
import { Logo } from "./logo";

const { height, width } = Dimensions.get("window");
const headerScreen = width <= 768;
const h = height * 0.3;

export const Header = () => {
  const user = useContext(UserContext);

  return (
    <View
      style={headerScreen ? { height: h } : {}}
      className=" bg-slate-900  px-4  rounded-b-6xl flex items-center justify-center 
         flex-col md:rounded  md:flex-row md:justify-between"
    >
      <Logo />
      <View className="flex-row justify-between  my-5">
        <View className="flex-row items-center  ">
          <Text className="text-gray-200">Bem vindo (a)</Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="mx-2 text-yellow-200 font-light w-[100px] "
          >
            {user?.user?.nome}
          </Text>
        </View>

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
