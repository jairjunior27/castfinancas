import { TransacaoProvider } from "@/src/globalContext-Provider/provider/transacaoProvider";
import { UserProvider } from "@/src/globalContext-Provider/provider/userProvider";
import { InicializeDataBase } from "@/src/libs/inicializeBanco";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
export default function Layout() {
  return (
    <SQLiteProvider databaseName="transacoes.db" onInit={InicializeDataBase}>
      <TransacaoProvider>
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
            <Tabs.Screen
              name="moeda"
              options={{
                title: "Moeda",
                tabBarIcon: ({ color }: any) => (
                  <Ionicons name="cash" size={20} color={color} />
                ),
              }}
            ></Tabs.Screen>
          </Tabs>
        </UserProvider>
      </TransacaoProvider>
    </SQLiteProvider>
  );
}
