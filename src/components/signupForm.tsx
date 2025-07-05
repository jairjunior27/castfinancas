import { Feather } from "@expo/vector-icons";
import * as imagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signupSchema } from "../utils/schema";
import { CadastroUserAsync } from "../utils/userAsyncStorage";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const MAX_WIDTH = 300;

export const SignupForm = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    idade: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof form, string>>
  >({});
  const [imagem, setImagem] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const [msgEnvio, setMsgEnvio] = useState("");
  const router = useRouter()


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

  const handleSubmit = async () => {
    const result = signupSchema.safeParse(form);

    if (!result.success ) {
      const fildError = result.error.flatten().fieldErrors;
      setErrors({
        nome: fildError.nome?.[0],
        email: fildError.email?.[0],
        idade: fildError.idade?.[0],
      });
      
      if (!imagem) {
        setMsg("Favor inserir a imagem");
      
      }
     
    return
    }


    const  formData ={
     nome: form.nome,
     idade: form.idade,
     email: form.email,
     imagem
    }


    try{
      if(formData){
        await CadastroUserAsync(formData)
         setMsgEnvio("Cadastro realizado com sucesso!");
         setForm({nome: "",email:"" , idade: ""})
         setImagem(null)
         setMsg("")
        router.push("/(tabs)/home");

      }
    }catch(e){
      setMsgEnvio(`Falha ao cadastrar ${e}`)
    }
     
    }

    useEffect(() => {
      setImagem(null);
    }, []);
  
  return (
    <View className="mt-8  ">
      <TextInput
        placeholder="Digite seu nome:"
        className="w-full bg-gray-300 rounded p-3 mb-4 outline-0"
        value={form.nome}
        onChangeText={(e) => setForm({ ...form, nome: e })}
        autoFocus
      />
      {errors.nome && (
        <Text className="text-red-600 mb-2 text-center">{errors.nome}</Text>
      )}

      <TextInput
        placeholder="Digite sua idade:"
        className="w-full bg-gray-300 rounded p-3 mb-4 outline-0"
        value={form.idade}
        onChangeText={(e) => setForm({ ...form, idade: e })}
        keyboardType="numeric"
      />
      {errors.idade && (
        <Text className="text-red-600 mb-2 text-center">{errors.idade}</Text>
      )}
      <TextInput
        placeholder="Digite seu email"
        className="w-full bg-gray-300 rounded p-3 mb-4 outline-0"
        value={form.email}
        onChangeText={(e) => setForm({ ...form, email: e })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && (
        <Text className="text-red-600 mb-4 text-center">{errors.email}</Text>
      )}
      <TouchableOpacity onPress={handleImagem}>
        <View className="flex-row items-center ">
          <Feather name="image" size={45} color="#ccc" />
          <Text className="ml-4">Adicione uma imagem</Text>
        </View>
        {msg && <Text className="text-red-600 mb-4 text-center">{msg}</Text>}
      </TouchableOpacity>
      {imagem && (
        <View className="m-auto my-4">
          <View  style={[
                {
                  width: Math.min(screenWidth * 0.9, MAX_WIDTH),
                  aspectRatio: 1,
                  borderRadius: 20,
                  height: 200
                },
              ]}>
            <Image
              source={{ uri: imagem }}
             className="w-full h-full"
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-gray-500 py-3 mt-5 rounded items-center"
      >
        <Text className="text-white font-semibold text-lg ">Cadastrar</Text>
      </TouchableOpacity>
      {msgEnvio && <Text className="text-green-600 mb-4 text-center">{msgEnvio}</Text>}
    </View>
  )}

