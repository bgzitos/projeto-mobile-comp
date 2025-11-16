import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { searchGames } from '../../services/api';
import GameCard from '../../components/GameCard';
import SearchBar from '../../components/SearchBar';
import LoadingIndicator from '../../components/LoadingState';
import ErrorDisplay from '../../components/ErrorState';
import { useTheme } from '../../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

export default function SearchScreen() {

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [hasSearched, setHasSearched] = useState(false);

    const { colors, theme, toggleTheme } = useTheme();
    const styles = createStyles(colors);

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
            return <LoadingIndicator />;
        }
        if (error) {
            return <ErrorDisplay message={error} />;
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

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Buscar</Text>
                <TouchableOpacity onPress={toggleTheme} style={styles.themeButton}>
                    <Ionicons 
                        name={theme === 'light' ? 'moon' : 'sunny'} 
                        size={24} 
                        color={colors.text} 
                    />
                </TouchableOpacity>
            </View>

            <SearchBar
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onSearch={handleSearch}
            />

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

const createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text,
    },
    themeButton: {
        padding: 8,
    },
    messageText: {
        color: '#888',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    }
});