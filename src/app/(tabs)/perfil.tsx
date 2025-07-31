import { Logo } from "@/src/components/logo";
import { UserContext } from "@/src/globalContext-Provider/context/userContext";
import { Feather } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";
import { useContext, useState } from "react";

import {
  Alert,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const user = useContext(UserContext);
  const [isModal, setIsModal] = useState(false);
  const [msg, setMsg] = useState("");
  const [imagem, setImagem] = useState<string | null>(null);
  const [dadosEditado, setDadosEditado] = useState({
    nome: user?.user?.nome || "",
    idade: user?.user?.idade || "",
    email: user?.user?.email || "",
  });
  const { height } = Dimensions.get("window");
  const maxHeight = height * 0.25;
  const usuario = useContext(UserContext);
  const handleDelete = async () => {
    await usuario?.excluirConta();
  };

  const screenWidth = Dimensions.get("window").width;
  const MAX_WIDTH = 300;
  const handleImagem = async () => {
    const { status } = await imagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Habilite o acesso à galeria.");
      return;
    }

    const result = await imagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
    }
  };

  const handleEditar = async () => {
    if (!dadosEditado.nome || !dadosEditado.idade || !dadosEditado.email) {
      return setMsg("Favor preencher todos os campos !!!");
    }

    const novaImagem = imagem || user?.user?.imagem;

    if (!novaImagem) {
      return setMsg("Favor inserir uma imagem !!!");
    }
    const novoUser = {
      ...user?.user,
      nome: dadosEditado.nome,
      idade: dadosEditado.idade,
      email: dadosEditado.email,
      imagem: imagem || user?.user?.imagem,
    };

    try {
      await usuario?.editarConta(novoUser);
      setIsModal(false);
    } catch (e) {
      setMsg(`Erro", "Não foi possível atualizar os dados."`);
    }
  };
  return (
    <SafeAreaView className="flex-1">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="bg-slate-900 rounded-b-2xl  p-6">
        <View className="mt-6 mb-10">
          <Logo />
        </View>
      </View>
      <View className="items-center justify-center ">
        <View>
          {user?.user?.imagem && (
            <Image
              source={{ uri: user?.user?.imagem }}
              style={{ width: 120, height: 120 }}
              className="rounded-full border-2 border-gray-200 -mt-12"
            />
          )}
        </View>
      </View>

      <View className="items-center mt-4 md:mb-20">
        <View className="flex-row items-center mb-2 my-4  ">
          <Text className="text-yellow-700  mx-2 font-light text-xl md:text-4xl">
            Olá,
          </Text>
          <Text
            className="text-slate-900 font-extralight    text-xl md:text-4xl"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{ width: 180 }}
          >
            {user?.user?.nome}{" "}
          </Text>
        </View>
        <Text className="text-xl text-slate-600 font-semibold">
          {user?.user?.idade} anos
        </Text>
        <Text className="text-xl text-slate-600 font-semibold">
          {" "}
          {user?.user?.email}
        </Text>
      </View>

      <View className="items-center justify-center my-10 mx-6  ">
        <TouchableOpacity
          className="flex-row items-center justify-center mb-10 bg-yellow-500 px-6 py-4 
           rounded-full w-full max-w-2xl"
          onPress={() => setIsModal(true)}
        >
          <Feather name="edit" size={24} color="#111" />
          <Text className="text-xl mx-4 ">Editar conta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-center bg-gray-400 w-full rounded-full px-6 py-4 max-w-2xl "
          onPress={handleDelete}
        >
          <Feather name="trash" size={24} color="#111" />
          <Text className="text-xl mx-4">Excluir conta</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModal}
        animationType="slide"
        onRequestClose={() => setIsModal(false)}
      >
        <View className="bg-slate-900 flex-1 p-8">
          <View className="mt-18 mb-10 ">
            <View className="flex-row">
              <TouchableOpacity onPress={() => setIsModal(false)}>
                <View className="bg-yellow-400 rounded-full">
                  <Feather name="chevron-left" size={26} color="#fff" />
                </View>
              </TouchableOpacity>
              <Text className="flex-1 text-center text-lg text-gray-300 md:text-2xl">
                Editar Transação
              </Text>
            </View>
          </View>

          <View>
            <TextInput
              className="w-full bg-gray-200 mb-8 rounded-xl p-3"
              placeholder="Edite seu nome"
              value={dadosEditado.nome}
              onChangeText={(e) =>
                setDadosEditado((prev) => ({ ...prev, nome: e }))
              }
            />
            <TextInput
              className="w-full bg-gray-200 mb-8 rounded-xl p-3"
              placeholder="Edite sua idade"
              value={dadosEditado.idade}
              onChangeText={(e) =>
                setDadosEditado((prev) => ({ ...prev, idade: e }))
              }
            />
            <TextInput
              className="w-full bg-gray-200 mb-8 rounded-xl p-3"
              placeholder="Edite seu email"
              value={dadosEditado.email}
              onChangeText={(e) =>
                setDadosEditado((prev) => ({ ...prev, email: e }))
              }
            />

            <TouchableOpacity
              className="flex-row items-center mb-8"
              onPress={handleImagem}
            >
              <Feather name="image" size={30} color="#ccc" />
              <Text className="text-gray-200 mx-4">Adicione uma imagem</Text>
            </TouchableOpacity>

            {imagem && (
              <View className="items-center  mb-10">
                <View
                  style={[
                    {
                      width: Math.min(screenWidth * 0.9, MAX_WIDTH),
                      aspectRatio: 1,
                      borderRadius: 20,
                      height: 100,
                    },
                  ]}
                >
                  {imagem && (
                    <Image
                      source={{ uri: imagem }}
                      className="w-full h-full rounded-full"
                    />
                  )}
                </View>
              </View>
            )}
            {msg && <Text className="text-center text-gray-200">{msg}</Text>}
            <TouchableOpacity
              className="bg-yellow-300 p-3 rounded-xl items-center"
              onPress={handleEditar}
            >
              <Text>Atualizar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
