import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, Image } from 'react-native';

export default function UserPage() {
  const [username, setUsername] = useState('');
  interface GitHubUser {
    avatar_url: string;
    name: string | null;
    bio: string | null;
    public_repos: number;
    followers: number;
    following: number;
  }

  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchGitHubUser = async () => {
    if (!username) {
      Alert.alert('Erro', 'Por favor, insira um nome de usuário.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        Alert.alert('Erro', 'Usuário não encontrado no GitHub.');
        setUserData(null);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao buscar o usuário.');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Usuário do GitHub</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome de usuário"
        value={username}
        onChangeText={setUsername}
      />
      <Pressable
        onPress={fetchGitHubUser}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#333' : '#000' },
        ]}
      >
        <Text style={styles.buttonText}>{loading ? 'Buscando...' : 'Buscar'}</Text>
      </Pressable>

      {userData && (
        <View style={styles.userInfo}>
          <Image source={{ uri: userData.avatar_url }} style={styles.avatar} />
          <Text style={styles.name}>{userData.name || 'Nome não disponível'}</Text>
          <Text style={styles.bio}>{userData.bio || 'Bio não disponível'}</Text>
          <Text style={styles.stats}>
            Repositórios Públicos: {userData.public_repos}
          </Text>
          <Text style={styles.stats}>
            Seguidores: {userData.followers} | Seguindo: {userData.following}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  bio: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  stats: {
    fontSize: 14,
    color: '#333',
  },
});