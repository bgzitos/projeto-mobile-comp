import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GameCard from '../../components/GameCard'; //
import { getPopularGames } from '../../services/api'; //

export default function TelaInicial (){
  const [games, setGames] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("TelaInicial: useEffect iniciado"); 
    const fetchGames = async () => {
      setLoading(true); 
      setError(null);
      console.log("TelaInicial: Buscando jogos..."); 
      try {
        const response = await getPopularGames();
        console.log("TelaInicial: Resposta da API recebida:", response.status);

        if (response && response.data && Array.isArray(response.data.results)) {
          console.log(`TelaInicial: ${response.data.results.length} jogos recebidos.`);
          setGames(response.data.results); 
        } else {
          console.error("TelaInicial: Estrutura da resposta da API inválida:", response.data);
          setError('Formato de dados inesperado recebido.');
          setGames([]);
        }
        
      } catch (err) {
        console.error("TelaInicial: ERRO DETALHADO ao buscar jogos:", err.response?.data || err.message || err);
        setError('Falha ao buscar os jogos. Verifique sua conexão ou a chave da API.');
        setGames([]);
      } finally {
        console.log("TelaInicial: Finalizando busca (loading: false)");
        setLoading(false); 
      }
    };

    fetchGames();
  }, []);

  console.log("TelaInicial: Renderizando - Loading:", loading, "Error:", error, "Games count:", games.length);

  if (loading) {
    console.log("TelaInicial: Renderizando ActivityIndicator");
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    console.log("TelaInicial: Renderizando mensagem de erro");
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  console.log("TelaInicial: Renderizando FlatList com", games.length, "jogos.");
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Jogos Populares</Text>
      <FlatList
        data={games}
        renderItem={({ item }) => <GameCard game={item} />}
        keyExtractor={item => item.id.toString()}
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
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
      margin: 20,
    }
});