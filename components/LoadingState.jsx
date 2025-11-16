import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { useTheme } from '../context/ThemeContext';

export default function LoadingIndicator() {

    const { colors } = useTheme();
    const styles = createStyles(colors);

    return (
        <View style={styles.centered}>
            <ActivityIndicator size="large" color={colors.text} />
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
    }
});