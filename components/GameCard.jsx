import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function GameCard({ game }) {
    return (
        <Link href={`/game/${game.id}`} asChild>
            <TouchableOpacity>
                <View style={styles.card}>
                    <Image source={{ uri: game.coverImage }} style={styles.coverImage} />
                    <Text style={styles.title}>{game.name}</Text>
                    <Text style={styles.rating}>Avaliação: {game.rating}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#202020',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
    },
    coverImage: {
        width: '100%',
        height: 180,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        paddingHorizontal: 12,
        paddingTop: 10,
    },
    rating: {
        fontSize: 14,
        color: '#ccc',
        paddingHorizontal: 12,
        paddingBottom: 10,
    },
});