import { FontAwesome } from '@expo/vector-icons';
import { View, TextInput, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { use, useState } from 'react';
import { searchGames } from '../../services/api';
import GameCard from '../../components/GameCard';

export default function SearchScreen() {

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery) return;

        console.log(`Buscando por: ${searchQuery}`);
        setLoading(true);
        setError(null);
        setHasSearched(true);
        setResults([]);

        try{
            const resposta = await searchGames(searchQuery);
            console.log(`Encontrados ${resposta.data.results.length} resultados`);
            setResults(resposta.data.results);
        } catch (err) {
            console.error("Erro na busca:", err);
            setError("Falha ao buscar. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const renderEmptyComponent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#fff" style={{ marginTop: 50 }} />;
        }
        if (error) {
            return <Text style={styles.messageText}>{error}</Text>;
        }
        if (hasSearched && results.length === 0) {
            return <Text style={styles.messageText}>Nenhum jogo foi encontrado com o nome de "{searchQuery}"</Text>;
        }
        if (!hasSearched) {
            return <Text style={styles.messageText}>Digite algo para buscar</Text>;
        }
        return null;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Procure por um jogo..."
                    placeholderTextColor="#888"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Buscar</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={results}
                renderItem={({ item }) => <GameCard game={item} />}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                ListEmptyComponent={renderEmptyComponent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#202020',
        borderRadius: 10,
        margin: 16,
        paddingHorizontal: 10,
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#fff',
    },
    searchButton: {
        backgroundColor: '#505050',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    messageText: {
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    }
});