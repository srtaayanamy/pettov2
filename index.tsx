import { Text, View, TouchableOpacity, Image, ScrollView, FlatList } from "react-native";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

export default function Index() {
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

  useFocusEffect(
    useCallback(() => {
      buscarPets();
    }, [])
  );

  // Sempre inclui o botão de cadastrar como primeiro item
  const petData = [
    {
      id: 'add-pet',
      isAddButton: true
    },
    ...pets.map(pet => ({
      ...pet,
      isAddButton: false
    }))
  ];

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

      {/* Conteúdo com ScrollView */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
        {/* Seus pets */}
        <View className="mb-6 pl-5">
          <View className="flex-row items-center mt-3 mb-3">
            <Text className="text-2xl font-semibold mr-2">Seus pets</Text>
            <Ionicons name="chevron-forward-outline" size={18} color="black" />
          </View>

          {/* Carrossel horizontal de pets */}
          <View className="h-40">
            <FlatList
              horizontal
              data={petData}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
              renderItem={({ item, index }) => (
                <View className={`${item.isAddButton ? 'items-center' : 'items-center ml-4'}`}>
                  {item.isAddButton ? (
                    // Botão para cadastrar novo pet
                    <TouchableOpacity
                      className="w-24 h-24 bg-gray-100 rounded-full justify-center items-center shadow-sm shadow-slate-950"
                      onPress={() => router.push('/cadastro_pet')}
                    >
                      <Image
                        source={require('./images/icone-adicionar-pet.jpg')}
                        className="w-full h-full rounded-full"
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    // Pets cadastrados
                    <TouchableOpacity className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 justify-center items-center shadow">
                      {item.imagem ? (
                        <Image source={{ uri: item.imagem }} className="w-full h-full" resizeMode="cover" />
                      ) : (
                        <Ionicons name="paw-outline" size={48} color="gray" />
                      )}
                    </TouchableOpacity>
                  )}
                  <Text className="text-sm mt-1">
                    {item.isAddButton ? 'Cadastrar pet' : item.nome}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>

        {/* Imagem do gatinho */}
        <View className="flex-1 justify-start items-center pt-4">
          <Image
            source={require('./images/Erro_Gatinho.png')}
            className="w-80 h-80 mb-3 rounded-xl"
            resizeMode="contain"
          />
          <Text className="text-lg text-gray-500">
            {pets.length === 0 ? 'Selecione ou cadastre um Pet!' : 'Acompanhe seus pets!'}
          </Text>
        </View>
      </ScrollView>

      {/* Menu inferior fixo */}
      <View className="flex-row justify-around items-center py-6 border-t border-gray-200 bg-white">
        <TouchableOpacity className="items-center">
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
}
