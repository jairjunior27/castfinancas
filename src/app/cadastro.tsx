import { SafeAreaView, StatusBar, View } from "react-native";
import { Logo } from "../components/logo";
import { SignupForm } from "../components/signupForm";

export default function Page() {
  return (
    <SafeAreaView className="flex-1 m-8 ">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
      />

      <View className="flex-1 justify-center items-center ">
        <View className="w-full max-w-4xl">
          <Logo />
          <SignupForm />
        </View>
      </View>
    </SafeAreaView>
  );
}
