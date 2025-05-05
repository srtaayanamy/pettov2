import { View, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { Stack, useRouter, useFocusEffect } from 'expo-router';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

const ExcluirPet = () => {
  const router = useRouter();
  const [pets, setPets] = useState([]);

  const buscarPets = async () => {
    try {
      const petsSalvos = await AsyncStorage.getItem('pets');
      if (petsSalvos) {
        setPets(JSON.parse(petsSalvos));
      }
    } catch (error) {
      console.error('Erro ao buscar pets:', error);
    }
  };

  const removerPet = async (idPet) => {
    try {
      const novosPets = pets.filter(pet => pet.id !== idPet);
      await AsyncStorage.setItem('pets', JSON.stringify(novosPets));
      setPets(novosPets);
      Alert.alert('Sucesso', 'Pet removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover pet:', error);
      Alert.alert('Erro', 'Não foi possível remover o pet.');
    }
  };

  useFocusEffect(
    useCallback(() => {
      buscarPets();
    }, [])
  );

  return (
    <View className="flex-1 bg-white p-1">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Cabeçalho */}
      <View className="w-full bg-[#F5F5F5] py-4 items-center">
        <Image
          source={require('./images/nome-Petto-semfundo.png')}
          className="w-40 h-12"
          resizeMode="contain"
        />
      </View>

      {/* Botão voltar + título */}
      <TouchableOpacity onPress={() => router.back()} className="flex-row items-center my-4 ml-4">
        <Ionicons name="chevron-back-outline" size={24} color="black" />
        <Text className="text-xl font-semibold ml-2">Remover pet</Text>
      </TouchableOpacity>

      {/* Lista de pets */}
      <ScrollView className="flex-1 px-5">
        <View className="bg-gray-100 rounded-xl p-4 mb-4">
          {pets.length > 0 ? (
            pets.map((pet) => (
              <View key={pet.id} className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center">
                  {pet.imagem ? (
                    <Image source={{ uri: pet.imagem }} className="w-12 h-12 rounded-full mr-3" />
                  ) : (
                    <Ionicons name="paw-outline" size={48} color="gray" className="mr-3" />
                  )}
                  <Text className="text-lg">{pet.nome}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => removerPet(pet.id)}
                  className="bg-black py-2 px-4 rounded-md"
                >
                  <Text className="text-white font-semibold">Remover</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text className="text-center text-gray-500">Nenhum pet cadastrado</Text>
          )}
        </View>

        {/* Botão para voltar */}
        <TouchableOpacity onPress={() => router.push('/user')} className="self-center mt-2">
          <Text className="text-gray-500 underline">Voltar para a página do usuário</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* MENU INFERIOR */}
      <View className="flex-row justify-around items-center py-6 border-t border-gray-200 bg-white">
        <TouchableOpacity onPress={() => router.push('/')} className="items-center">
          <MaterialIcons name="home-filled" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <Ionicons name="calendar-sharp" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FontAwesome5 name="paw" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity className="items-center">
          <FontAwesome5 name="notes-medical" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/user')} className="items-center">
          <FontAwesome6 name="user-large" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ExcluirPet;
