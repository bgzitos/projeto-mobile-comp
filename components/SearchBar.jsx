import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export default function SearchBar({ query, onQueryChange, onSearch }) {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
      <View style={styles.searchContainer}>
          <FontAwesome name="search" size={20} color={colors.tabInactive} style={styles.searchIcon} />
          <TextInput
          style={styles.input}
          placeholder="Procure por um jogo"
          placeholderTextColor={colors.tabInactive}
          value={query}
          onChangeText={onQueryChange}
          onSubmitEditing={onSearch}
          />
          <TouchableOpacity onPress={onSearch} style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableOpacity>
      </View>
    );
}

const createStyles = (colors) => StyleSheet.create({
    searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.searchBar,
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
    color: colors.text,
  },
  searchButton: {
    backgroundColor: colors.button,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: colors.text,
    fontWeight: 'bold',
  },
});