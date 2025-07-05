import { UserProvider } from "@/src/globalContext-Provider/provider/userProvider";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
export default function Layout() {
  return (
    <UserProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: "#1e293b" },
          tabBarActiveBackgroundColor: "rgba(0, 0, 0, 0.49)",
          tabBarInactiveTintColor: "#ccc",
          tabBarActiveTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }: any) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        ></Tabs.Screen>
      </Tabs>
    </UserProvider>
  );
}
