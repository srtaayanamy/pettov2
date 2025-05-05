import { Text, View, TouchableOpacity, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather, MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

export default function User() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            {/* Remove cabeçalho padrão */}
            <Stack.Screen options={{ headerShown: false }} />

            {/* Cabeçalho */}
            <View className="w-full bg-[#F5F5F5] py-4 items-center">
                <Image
                    source={require('./images/nome-Petto-semfundo.png')}
                    className="w-40 h-12"
                    resizeMode="contain"
                />
            </View>

            <View className=" mb-6 pl-5">
                <View className="flex-row items-center mt-3 mb-3">
                    <Text className="text-2xl font-semibold mr-2">Tela de usuário</Text>
                    <Ionicons name="chevron-forward-outline" size={18} color="black" />
                </View>
            </View>

            <View className="mb-3 p-5 flex-row items-center">
                <View className="w-24 h-24 rounded-full border-2 border-black justify-center items-center">
                    <Image
                        source={require('./images/perfil-icon.jpg')}
                        className="w-[90%] h-[90%] rounded-full"
                        resizeMode="cover"
                    />
                </View>
                <View className="ml-4">
                    <Text className="text-lg">Olá,</Text>
                    <Text className="text-2xl font-bold">(Nome do usuário)!</Text>
                </View>
            </View>


            {/* Botões em grade */}
            <View className="flex-1 p-2">
                <View className="flex-row flex-wrap justify-center gap-4">
                    {/* Botão 1 */}
                    <TouchableOpacity className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <Feather name="edit" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Editar usuário</Text>
                    </TouchableOpacity>

                    {/* Botão 2 */}
                    <TouchableOpacity className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <Feather name="edit-3" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Editar pets</Text>
                    </TouchableOpacity>

                    {/* Botão 3 */}
                    <TouchableOpacity onPress={() => router.push('/remover_pet')} className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <MaterialIcons name="delete-outline" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Remover pet</Text>
                    </TouchableOpacity>

                    {/* Botão 4 */}
                    <TouchableOpacity className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <Ionicons name="calendar" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Agenda</Text>
                    </TouchableOpacity>

                    {/* Botão 5 */}
                    <TouchableOpacity className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <FontAwesome5 name="notes-medical" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Saúde</Text>
                    </TouchableOpacity>

                    {/* Botão 6 */}
                    <TouchableOpacity className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <FontAwesome5 name="paw" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Diários</Text>
                    </TouchableOpacity>

                    {/* Botão 7 */}
                    <TouchableOpacity onPress={() => router.push('/suporte')} className="w-32 h-32 bg-white p-4 items-center justify-center shadow-lg">
                        <Feather name="help-circle" size={32} color="black" />
                        <Text className="mt-2 text-center text-sm">Suporte</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* MENU INFERIOR */}
            <View className="flex-row justify-around items-center py-6 border-t border-gray-200 bg-white">
                {/* Botão home */}
                <TouchableOpacity onPress={() => router.back()}>
                    <MaterialIcons name="home-filled" size={28} color="gray" />
                </TouchableOpacity>

                {/* Botão agenda */}
                <TouchableOpacity className="items-center">
                    <Ionicons name="calendar-sharp" size={24} color="gray" />
                </TouchableOpacity>

                {/* Botão diário */}
                <TouchableOpacity className="items-center">
                    <FontAwesome5 name="paw" size={24} color="gray" />
                </TouchableOpacity>

                {/* Botão saúde */}
                <TouchableOpacity className="items-center">
                    <FontAwesome5 name="notes-medical" size={24} color="gray" />
                </TouchableOpacity>

                {/* Botão perfil */}
                <TouchableOpacity className="items-center">
                    <FontAwesome6 name="user-large" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}
