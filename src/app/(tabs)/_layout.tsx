import { TransacaoProvider } from "@/src/globalContext-Provider/provider/transacaoProvider";
import { UserProvider } from "@/src/globalContext-Provider/provider/userProvider";
import { InicializeDataBase } from "@/src/libs/inicializeBanco";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { useEffect } from "react";
import { Platform, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export async function configurarNotificacoes() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permissão de notificação não concedida");
    return;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
}

export default function Layout() {
  useEffect(() => {
    configurarNotificacoes();
  }, []);

  if (Platform.OS === "web") {
    return (
      <Text style={{ padding: 20 }}>
        O banco de dados funciona apenas no Android. Use o app para testes
        completos.
      </Text>
    );
  }

  return (
    <SafeAreaProvider>
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
              />
              <Tabs.Screen
                name="moeda"
                options={{
                  title: "Moeda",
                  tabBarIcon: ({ color }: any) => (
                    <Ionicons name="cash" size={20} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="fatura"
                options={{
                  title: "Fatura",
                  tabBarIcon: ({ color }: any) => (
                    <Ionicons
                      name="document-text-outline"
                      size={20}
                      color={color}
                    />
                  ),
                }}
              />
              <Tabs.Screen
                name="transacao"
                options={{
                  title: "Transações",
                  tabBarIcon: ({ color }: any) => (
                    <Ionicons name="wallet" size={20} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="grafico"
                options={{
                  title: "Grafico",
                  tabBarIcon: ({ color }: any) => (
                    <Ionicons name="bar-chart" size={20} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="perfil"
                options={{
                  title: "Perfil",
                  tabBarIcon: ({ color }: any) => (
                    <Ionicons name="person" size={20} color={color} />
                  ),
                }}
              />
            </Tabs>
          </UserProvider>
        </TransacaoProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
