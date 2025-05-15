import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export interface IUserResponse {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  url: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

export default function Perfilo() {
  const { username } = useLocalSearchParams(); // Obtém o nome de usuário enviado como parâmetro
  const router = useRouter(); // Inicializa o router para navegação
  const [user, setUser] = useState<IUserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      if (!username) return; // Verifica se o nome de usuário foi fornecido

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (response.ok) {
          const data: IUserResponse = await response.json();
          setUser(data);
        } else {
          console.error("Usuário não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [username]);

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

      {/* Botão Sair */}
      <Pressable style={styles.button} onPress={() => router.push("/(tabs)")}>
        <Text style={styles.buttonText}>Sair</Text>
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
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});