import { useRouter } from "expo-router";
import { useEffect } from "react";
import { SafeAreaView, StatusBar, View } from "react-native";
import { Logo } from "../components/logo";
import { SignupForm } from "../components/signupForm";
import { getCadastro } from "../utils/userAsyncStorage";

export default function Page() {
  const route = useRouter();
  useEffect(() => {
    const getAll = async () => {
      const user = await getCadastro();

      if (user) {
        return route.replace("/(tabs)/home");
      }
    };
    getAll();
  }, []);
  return (
    <SafeAreaView className="flex-1  bg-slate-900 px-6 pt-20">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />
      <View className="w-full max-w-4xl">
        <View className="mb-10">
          <Logo />
        </View>
        <SignupForm />
      </View>
    </SafeAreaView>
  );
}
