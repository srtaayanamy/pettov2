import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Stack, useRouter } from "expo-router";
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

const CadastroPet = () => {
    const router = useRouter();
    const [imagem, setImagem] = useState(null);
    const [formulario, setFormulario] = useState({
        nome: '',
        nascimento: '',
        tipo: '',
        cor: '',
        peso: '',
        raca: '',
        sexo: '',
    });

    const handleInputChange = (field, value) => {
        setFormulario({ ...formulario, [field]: value });
    };

    const selecionarImagem = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });
        if (!result.cancelled) {
            setImagem(result.assets[0].uri);
        }
    };

    const salvarPet = async () => {
        try {
            const novosPets = {
                id: Date.now().toString(),
                ...formulario,
                imagem: imagem || null,
            };
            const petsSalvos = await AsyncStorage.getItem('pets');
            const pets = petsSalvos ? JSON.parse(petsSalvos) : [];
            pets.push(novosPets);
            await AsyncStorage.setItem('pets', JSON.stringify(pets));
            router.back();
        } catch (error) {
            console.error('Erro ao salvar pet:', error);
        }
    };

    return (
        <View className="flex-1 bg-white p-1">
            <Stack.Screen options={{ headerShown: false }} />

            <View className="w-full bg-[#F5F5F5] py-4 items-center">
                <Image
                    source={require('./images/nome-Petto-semfundo.png')}
                    className="w-40 h-12"
                    resizeMode="contain"
                />
            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1">
                <View className='mb-6 pl-5'>
                    <TouchableOpacity onPress={() => router.back()} className="flex-row items-center mt-3 mb-3">
                        <Ionicons name="chevron-back-outline" size={24} color="black" />
                        <Text className="text-2xl font-semibold ml-2">Cadastre um pet!</Text>
                    </TouchableOpacity>
                </View>

                {/* Inserir foto */}
                <TouchableOpacity onPress={selecionarImagem} className="w-32 h-32 bg-gray-100 rounded-xl justify-center items-center self-center mb-6 shadow">
                    {imagem ? (
                        <Image source={{ uri: imagem }} className="w-full h-full rounded-xl" resizeMode="cover" />
                    ) : (
                        <Text className="text-gray-500 text-sm">Inserir foto</Text>
                    )}
                </TouchableOpacity>

                {/* Campos */}
                {[
                    { placeholder: "Nome do Pet", field: "nome" },
                    { placeholder: "Data de Nascimento", field: "nascimento" },
                    { placeholder: "Tipo (ex. Cachorro, Gato, etc.)", field: "tipo" },
                    { placeholder: "Cor", field: "cor" },
                    { placeholder: "Peso", field: "peso" },
                    { placeholder: "Raça", field: "raca" },
                    { placeholder: "Sexo", field: "sexo" }
                ].map((item, index) => (
                    <TextInput
                        key={index}
                        className="h-11 bg-gray-100 w-80 self-center rounded-md px-3 mb-3 shadow-sm"
                        placeholder={item.placeholder}
                        placeholderTextColor="#999"
                        value={formulario[item.field]}
                        onChangeText={(text) => handleInputChange(item.field, text)}
                    />
                ))}

                {/* Botão cadastrar */}
                <TouchableOpacity onPress={salvarPet} className="bg-black py-3 w-32 self-center rounded-md items-center mb-4 mt-1">
                    <Text className="text-white font-semibold">Cadastrar Pet</Text>
                </TouchableOpacity>

                {/* Voltar */}
                <TouchableOpacity onPress={() => router.back()} className="items-center mb-6">
                    <Text className="text-sm text-[#828282] underline">Voltar para a página inicial</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* MENU INFERIOR */}
            <View className="flex-row justify-around items-center py-6 border-t border-gray-200 bg-white">
                <TouchableOpacity onPress={() => router.back()} className="items-center">
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
                <TouchableOpacity className="items-center">
                    <FontAwesome6 name="user-large" size={24} color="gray" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CadastroPet;
