import { Tabs } from "expo-router";
import { Zocial } from "@expo/vector-icons"; // Importa o ícone Zocial
import Colors from "@/constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarStyle: {
          backgroundColor: "black",
        },
        headerShown: false,
      }}
    >
      {/* Aba de Repositórios */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Repositórios",
          tabBarIcon: ({ color }) => <Zocial name="github" size={24} color={color} />, // Ícone para a aba de repositórios
        }}
      />

      {/* Aba de Perfil */}
      <Tabs.Screen
        name="perfilo"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => <Zocial name="github" size={24} color={color} />, // Ícone para a aba de perfil
        }}
      />
    </Tabs>
  );
}