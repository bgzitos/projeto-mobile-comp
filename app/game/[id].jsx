import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getGameDetails } from "/home/lucas/projeto-mobile/services/api";

export default function InfoJogo () {

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchGameDetails = async () => {
            setLoading(true);
            setError(null);
            try{
                const resposta = await getGameDetails(id);
                console.log("Detalhes do jogo recebidos", resposta.data);
                setGameDetails(resposta.data); 
            } catch (err) {
                console.error("Erro ao buscar detalhes do jogo:", err);
                setError("Falha ao carregar jogo.");
            } finally {
                setLoading(false);
            }
        };

        fetchGameDetails();
    }, [id]);

    if (loading) {
        return (
            <View style={[estilo.container, estilo.centered]}>
                <Text style={estilo.errorText}>Jogo não encontrado.</Text>
            </View>
        );
    }

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

                <Image source={{ uri: gameDetails.background_image }} style={estilo.coverImage} />

                <Text style={estilo.title}>{gameDetails.name}</Text>

                <Text style={estilo.sectionTitle}>Plataformas</Text>
                <View style={estilo.platformContainer}>
                    {gameDetails.platforms.map(platform => (
                    <View key={platform.platform.id} style={estilo.platformTag}>
                        <Text style={estilo.platformText}>{platform.platform.name}</Text>
                    </View>
                    ))}
                </View>

                <Text style={estilo.sectionTitle}>Descrição</Text>
                <Text style={estilo.description}>{gameDetails.description_raw}</Text>

            </ScrollView>
        </View>
    );
}

const estilo = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    centered: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
    },
    backButtonError: {
        marginTop: 20,
        backgroundColor: '#333',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
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