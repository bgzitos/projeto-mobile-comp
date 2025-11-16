import { Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SectionHeader ({ title }) {

    const { colors } = useTheme();
    const styles = createStyles(colors);

    return <Text style={styles.header}>{title}</Text>
}

const createStyles = (colors) => StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.header,
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 10,
    },
})