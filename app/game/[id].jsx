import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function InfoJogo () {

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const mockDetalhes = {
        title: 'Nome do jogo',
        coverImage: 'https://via.placeholder.com/400x200.png?text=Capa+do+Jogo',
        description: 'Descrição detalhada do jogo',
        platforms: ['PC', 'Playstation 5', 'Xbox Series X'],
    };

    return (

        <View style={estilo.container}>

            <TouchableOpacity
                style={estilo.backButton}
                onPress={() => router.back()} >

                    <Ionicons name="chevron-back" size={24} color="white" />
                    <Text style={estilo.backButtonText}>Voltar</Text>
                </TouchableOpacity>

            <ScrollView
            contentContainerStyle={estilo.contentContainer}>

                <Image source={{ uri: mockDetalhes.coverImage }} style={estilo.coverImage} />

                <Text style={estilo.title}>{mockDetalhes.title}</Text>
                <Text style={estilo.idText}>(ID do Jogo: {id})</Text>

                <Text style={estilo.sectionTitle}>Plataformas</Text>
                <View style={estilo.platformContainer}>
                    {mockDetalhes.platforms.map(platform => (
                    <View key={platform} style={estilo.platformTag}>
                    <Text style={estilo.platformText}>{platform}</Text>
                    </View>
                    ))}
                    </View>

                    <Text style={estilo.sectionTitle}>Descrição</Text>
                    <Text style={estilo.description}>{mockDetalhes.description}</Text>

            </ScrollView>
        </View>
    );
}

const estilo = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 50,
        paddingBottom: 10,
        backgroundColor: '#121212',
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        marginLeft: 6,
    },
    coverImage: {
        width: '100%',
        height: 200,
        marginBottom: 16,
    },
    content: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    idText: {
        fontSize: 18,
        color: '#ccc',
        marginBottom: 20,
    },
    sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 10,
  },
  platformContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  platformTag: {
    backgroundColor: '#333',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  platformText: {
    color: '#fff',
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 24,
  },
});