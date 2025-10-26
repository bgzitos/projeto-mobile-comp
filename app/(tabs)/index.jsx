import { StyleSheet, View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GameCard from "../../components/GameCard";

const mockGames = [
    { id: '1', name: 'Elden Ring', coverImage: 'https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg', rating: '9.5' },
    { id: '2', name: 'Baldur\'s Gate 3', coverImage: 'https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg', rating: '9.8' },
    { id: '3', name: 'Cyberpunk 2077', coverImage: 'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg', rating: '8.9' },
];

export default function TelaInicial (){
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.header}>Jogos Populares</Text>
            <FlatList
            data={mockGames}
            renderItem={({ item }) => <GameCard game={item} />}
            keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        margin: 16,
    },
});
