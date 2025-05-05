import { Text, View, TouchableOpacity, Image } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Ionicons, Feather, MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

const Suporte = () => {
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

            {/* Voltar e título */}
            <View className='mb-2 pt-5 px-5'>
                <TouchableOpacity onPress={() => router.back()} className="flex-row items-center mt-3 mb-3">
                    <Ionicons name="chevron-back-outline" size={24} color="black" />
                    <Text className="text-2xl font-semibold ml-2">Suporte</Text>
                </TouchableOpacity>
            </View>

            {/* Conteúdo principal */}
            <View className="flex-1 items-center px-5">
                {/* Imagem grande */}
                <Image
                    source={require('./images/contate a nossa equipe.png')}
                    className="w-full h-72 rounded-xl mb-5"
                    resizeMode="cover"
                />

                {/* Informações de contato */}
                <View className="w-full bg-gray-100 rounded-xl p-5 items-center">
                    {/* Email */}
                    <View className="flex-row items-center border-b-hairline border-gray-300 pb-4 mb-4">
                        <Feather name="mail" size={20} color="black" />
                        <Text className="ml-2 text-base">petto@gmail.com</Text>
                    </View>

                    {/* Telefone */}
                    <View className="flex-row items-center border-b-hairline border-gray-300 pb-4 mb-4">
                        <Feather name="phone" size={20} color="black" />
                        <Text className="ml-2 text-base">+55 (88) 9002-8922</Text>
                    </View>

                    {/* Instagram */}
                    <View className="flex-row items-center">
                        <FontAwesome5 name="instagram" size={20} color="black" />
                        <Text className="ml-2 text-base">@petto on Instagram</Text>
                    </View>
                </View>
            </View>

            {/* MENU INFERIOR */}
            <View className="flex-row justify-around items-center py-6 border-t border-gray-200 bg-white">
                {/* Botão home */}
                <TouchableOpacity>
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
                <TouchableOpacity onPress={() => router.back()} className="items-center">
                    <FontAwesome6 name="user-large" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Suporte;
