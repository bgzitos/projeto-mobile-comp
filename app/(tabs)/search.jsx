import { FontAwesome } from '@expo/vector-icons';
import { View, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
                <TextInput
                style={styles.input}
                placeholder="Procure por um jogo..."
                placeholderTextColor="#888"
                />
            </View>
            {/*adicionar botoes de filtro no futuro*/}
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
});