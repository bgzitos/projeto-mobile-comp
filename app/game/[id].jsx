import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { getGameDetails } from "../../services/api";
import SectionHeader from "../../components/SectionHeader";
import LoadingIndicator from "../../components/LoadingState";
import ErrorDisplay from "../../components/ErrorState";
import { useTheme } from "../../context/ThemeContext";

export default function InfoJogo () {

    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [gameDetails, setGameDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { colors } = useTheme();
    const styles = estilo(colors);

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
        return <LoadingIndicator />;
    }

    if (error) {
        return <ErrorDisplay message={error} />
    }

    return (

        <View style={styles.container}>

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()} >

                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                    <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>

            <ScrollView
                contentContainerStyle={styles.contentContainer}>

                <Image source={{ uri: gameDetails.background_image }} style={styles.coverImage} />

                <Text style={styles.title}>{gameDetails.name}</Text>

                <SectionHeader title="Plataformas" />
                <View style={styles.platformContainer}>
                    {gameDetails.platforms.map(platform => (
                    <View key={platform.platform.id} style={styles.platformTag}>
                        <Text style={styles.platformText}>{platform.platform.name}</Text>
                    </View>
                    ))}
                </View>

                <SectionHeader title="Descrição" />
                <Text style={styles.description}>{gameDetails.description_raw}</Text>

            </ScrollView>
        </View>
    );
}

const estilo = (colors) => StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
        backgroundColor: colors.button,
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
        backgroundColor: colors.background,
    },
    backButtonText: {
        color: colors.text,
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
        color: colors.text,
    },
    idText: {
        fontSize: 18,
        color: colors.text,
        marginBottom: 20,
    },
  platformContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  platformTag: {
    backgroundColor: colors.card,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  platformText: {
    color: colors.text,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
});