import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, Pressable, Share, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export interface IUserResponse {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}

export default function Perfilo() {
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const sair = async () => {
    await AsyncStorage.removeItem("@username");
    router.replace("/");
  };

  const compartilharPerfil = async () => {
    if (user) {
      try {
        const result = await Share.share({
          message: `Confira o perfil de ${user.name || user.login} no GitHub: ${user.html_url}`,
          url: user.html_url, // Compatível com algumas plataformas
          title: `Perfil de ${user.name || user.login}`,
        });
  
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log("Compartilhado com o tipo de atividade:", result.activityType);
          } else {
            console.log("Perfil compartilhado com sucesso!");
          }
        } else if (result.action === Share.dismissedAction) {
          console.log("Compartilhamento cancelado.");
        }
      } catch (error: any) {
        console.error("Erro ao compartilhar:", error.message);
        Alert.alert("Erro", "Não foi possível compartilhar o perfil.");
      }
    } else {
      console.error("Usuário não encontrado para compartilhar.");
      Alert.alert("Erro", "Usuário não encontrado para compartilhar.");
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("@username");
        if (!storedUsername) {
          throw new Error("Usuário não encontrado no AsyncStorage");
        }

        const response = await fetch(`https://api.github.com/users/${storedUsername}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao buscar dados do usuário");
        }

        setUser(data);
      } catch (error: any) {
        console.error("Erro:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Usuário não encontrado.</Text>
        <Pressable style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
      <Text style={styles.name}>{user.name || "Nome não disponível"}</Text>
      <Text style={styles.username}>@{user.login}</Text>
      <Text style={styles.bio}>{user.bio || "Bio não disponível"}</Text>
      <Text style={styles.stats}>
        Repositórios Públicos: {user.public_repos}
      </Text>
      <Text style={styles.stats}>
        Seguidores: {user.followers} | Seguindo: {user.following}
      </Text>

      <Pressable style={styles.button} onPress={sair}>
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>

      <Pressable style={styles.shareButton} onPress={compartilharPerfil}>
        <Text style={styles.buttonText}>Compartilhar Perfil</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  username: {
    fontSize: 16,
    color: "#777",
    marginBottom: 10,
  },
  bio: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  stats: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  shareButton: {
    marginTop: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});