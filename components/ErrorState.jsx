import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ErrorDisplay({ message }) {

    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.centered}>
            <Text style={styles.errorText}>{message || "Ocorreu um erro."}</Text>
        </View>
    );
}


const createStyles = (colors) => StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        padding: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    }
});