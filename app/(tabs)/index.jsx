import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameCard from '../../components/GameCard';
import { getPopularGames } from '../../services/api';
import LoadingIndicator from '../../components/LoadingState';
import ErrorDisplay from '../../components/ErrorState';
import SectionHeader from '../../components/SectionHeader';
import { useTheme } from '../../context/ThemeContext';

export default function TelaInicial (){
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { colors } = useTheme();
  const styles = createStyles(colors);

  useEffect(() => {
    fetchGames(1);
  }, []);

  const fetchGames = async (pageNumber) => {
    if (pageNumber === 1) {
      setLoading(true);
    } else {
      setLoadingMore(true);
    }
    setError(null);

    try {
      const response = await getPopularGames(pageNumber);

      if (response && response.data && Array.isArray(response.data.results)) {
        setGames(prevGames => {
          const newGames = response.data.results.filter (
            newGame => !prevGames.some(existingGame => existingGame.id === newGame.id)
          );
          return pageNumber === 1 ? newGames : [...prevGames, ...newGames];
        });
      } else {
        setError('Formato de dados inesperado recebido.');
      }

    } catch (err) {
      console.error("TelaInicial: erro detalhado ao buscar jogos:", err.response?.data || err.message || err);
      setError('Falha ao buscar os jogos.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore) return;

    const nextPage = page +1;
    setPage(nextPage);
    fetchGames(nextPage);
  };

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  };

  if (loading && page === 1) {
    return <LoadingIndicator />;
  }

  if (error && games.length === 0) {
    return <ErrorDisplay message={error} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <SectionHeader title="Jogos Populares" />
      <FlatList
        data={games}
        renderItem={({ item }) => <GameCard game={item} />}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
}

const createStyles = (colors) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});