import { StatusBar, View } from "react-native";
import { Logo } from "../components/logo";
import { SignupForm } from "../components/signupForm";

export default function Page() {
  return (
    <View className="items-center justify-center flex-1" >
 
        <Logo />
        <SignupForm />
      
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
    
    </View>
  );
}
