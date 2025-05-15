import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ActivityIndicator,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import { Zocial } from "@expo/vector-icons";
  import { useRouter } from "expo-router";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const Index = () => {
    const [username, setUsername] = useState<string>("");
    const [isChecking, setIsChecking] = useState(true);
    const route = useRouter();
  
    useEffect(() => {
      const checkStoredUsername = async () => {
        try {
          const storedUsername = await AsyncStorage.getItem("@username");
          if (storedUsername) {
            route.push("/(tabs)");
          } else {
            setIsChecking(false);
          }
        } catch (e) {
          console.error("Erro ao verificar AsyncStorage", e);
          setIsChecking(false);
        }
      };
  
      checkStoredUsername();
    }, []);
  
    const handleClick = async () => {
      try {
        await AsyncStorage.setItem("@username", username.trim());
        setUsername(username.trim());
        route.replace("/(tabs)");
      } catch (e) {
        Alert.alert("Erro", "Erro ao salvar");
      }
    };
  
    if (isChecking) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
          <Text style={{ marginTop: 10, color: "#fff" }}>
            Verificando usuário...
          </Text>
        </View>
      );
    }
  
    return (
      <View
        style={{
          backgroundColor: "#000",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 22,
            color: "#fff",
            marginVertical: 4,
          }}
        >
          Nome do usuário
        </Text>
        <TextInput
          value={username}
          onChangeText={setUsername}
          style={{
            fontSize: 18,
            backgroundColor: "#fff",
            width: 200,
            height: 45,
            borderRadius: 25,
            padding: 8,
          }}
        />
        <Pressable
          onPress={handleClick}
          style={{
            flexDirection: "row",
            backgroundColor: "#000",
            width: 200,
            height: 50,
            borderRadius: 25,
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#fff",
            marginVertical: 8,
          }}
        >
          <Zocial name="github" size={18} color="white" />
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginLeft: 8,
            }}
          >
            Entrar
          </Text>
        </Pressable>
      </View>
    );
  };
  
  export default Index;
  